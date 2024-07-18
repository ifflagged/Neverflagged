#!/bin/bash

# 确保脚本以root权限运行
if [[ $EUID -ne 0 ]]; then
   echo "此脚本必须以root权限运行"
   exit 1
fi

echo "开始系统维护和清理任务..."

start_space=$(df / | tail -n 1 | awk '{print $3}')

# 检测并设置包管理器变量
if command -v apt-get > /dev/null; then
    PKG_MANAGER="apt"
    CLEAN_CMD="apt-get autoremove --purge -y && apt-get clean && apt-get autoclean"
    PKG_UPDATE_CMD="apt-get update -y"
    FULL_UPGRADE_CMD="apt-get full-upgrade -y"
    INSTALL_CMD="apt-get install -y"
    PURGE_CMD="apt-get purge -y"
elif command -v dnf > /dev/null; then
    PKG_MANAGER="dnf"
    CLEAN_CMD="dnf autoremove -y && dnf clean all"
    PKG_UPDATE_CMD="dnf update -y"
    FULL_UPGRADE_CMD="dnf upgrade -y"
    INSTALL_CMD="dnf install -y"
    PURGE_CMD="dnf remove -y"
elif command -v apk > /dev/null; then
    PKG_MANAGER="apk"
    CLEAN_CMD="apk cache clean"
    PKG_UPDATE_CMD="apk update"
    FULL_UPGRADE_CMD="apk upgrade"
    INSTALL_CMD="apk add"
    PURGE_CMD="apk del"
else
    echo "不支持的包管理器"
    exit 1
fi

# 更新和升级系统
echo "正在更新软件包信息..."
$PKG_UPDATE_CMD

echo "正在升级系统..."
$FULL_UPGRADE_CMD

# 安装deborphan（仅适用于apt）
if [ "$PKG_MANAGER" = "apt" ]; then
    echo "正在检查deborphan是否安装..."
    if [ ! -x /usr/bin/deborphan ]; then
        echo "deborphan未安装，正在安装..."
        $INSTALL_CMD deborphan
    else
        echo "deborphan已安装"
    fi
fi

# 修复dpkg状态问题（仅适用于apt）
if [ "$PKG_MANAGER" = "apt" ]; then
    echo "正在检查dpkg状态..."
    dpkg --audit
    if [ $? -ne 0 ]; then
        echo "修复dpkg状态问题..."
        dpkg --configure -a
        apt-get install -f
    fi
fi

# 安全删除旧内核（只适用于使用apt和dnf的系统）
echo "正在删除未使用的内核..."
if [[ "$PKG_MANAGER" == "apt" || "$PKG_MANAGER" == "dnf" ]]; then
    current_kernel=$(uname -r)
    if [[ "$PKG_MANAGER" == "apt" ]]; then
        kernel_packages=$(dpkg --list | grep -E '^ii  linux-(image|headers)-[0-9]+' | awk '{ print $2 }' | grep -v "$current_kernel")
    else
        kernel_packages=$(rpm -qa | grep -E '^kernel-(core|modules|devel)-[0-9]+' | grep -v "$current_kernel")
    fi
    if [ ! -z "$kernel_packages" ]; then
        echo "找到旧内核，正在删除：$kernel_packages"
        $PURGE_CMD $kernel_packages
        [[ "$PKG_MANAGER" == "apt" ]] && update-grub
    else
        echo "没有旧内核需要删除。"
    fi
fi

# 清理系统日志文件
echo "正在清理系统日志文件..."
find /var/log -type f -name "*.log" -exec truncate -s 0 {} \;
find /root -type f -name "*.log" -exec truncate -s 0 {} \;
find /home -type f -name "*.log" -exec truncate -s 0 {} \;
find /ql -type f -name "*.log" -exec truncate -s 0 {} \;

# 清理缓存目录
echo "正在清理缓存目录..."
find /tmp -type f -mtime +1 -exec rm -f {} \;
find /var/tmp -type f -mtime +1 -exec rm -f {} \;
for user in /home/* /root; do
  cache_dir="$user/.cache"
  if [ -d "$cache_dir" ]; then
    rm -rf "$cache_dir"/* 
  fi
done

# 清理Docker（如果使用Docker）
if command -v docker &> /dev/null; then
    echo "正在清理Docker镜像、容器和卷..."
    docker system prune -a -f --volumes
fi

# 清理孤立包（仅适用于apt）
if [ "$PKG_MANAGER" = "apt" ]; then
    echo "正在清理孤立包..."
    deborphan --guess-all | xargs -r apt-get -y remove --purge
fi

# 清理包管理器缓存
echo "正在清理包管理器缓存..."
$CLEAN_CMD

# 清理dpkg残留配置（仅适用于apt）
if [ "$PKG_MANAGER" = "apt" ]; then
    echo "正在清理残留配置..."
    apt-get remove --purge $(dpkg -l | awk '/^rc/ {print $2}')
fi

# 清理systemd日志
echo "正在清理systemd日志..."
journalctl --rotate
journalctl --vacuum-time=1s
journalctl --vacuum-size=50M

end_space=$(df / | tail -n 1 | awk '{print $3}')
cleared_space=$((start_space - end_space))
echo "系统清理完成，清理了 $((cleared_space / 1024))M 空间！"
