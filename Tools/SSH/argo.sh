#!/bin/bash
# one key v2ray
read -p "请选择v2ray协议(默认1.vmess,2.vless):" mode
if [ -z "$mode" ]
then
	mode=1
fi
if [ $mode != 1 ] && [ $mode != 2 ]
then
	echo 请输入正确的v2ray模式
	exit
fi
read -p "请选择argo连接模式IPV4或者IPV6(输入4或6,默认4):" ips
if [ -z "$ips" ]
then
	ips=4
fi
if [ $ips != 4 ] && [ $ips != 6 ]
then
	echo 请输入正确的argo连接模式
	exit
fi
linux_os=("Debian" "Ubuntu" "CentOS" "Fedora" "Alpine")
linux_update=("apt update" "apt update" "yum -y update" "yum -y update" "apk update -f")
linux_install=("apt -y install" "apt -y install" "yum -y install" "yum -y install" "apk add -f")
n=0
for i in `echo ${linux_os[@]}`
do
	if [ $i == $(grep -i PRETTY_NAME /etc/os-release | cut -d \" -f2 | awk '{print $1}') ]
	then
		break
	else
		n=$[$n+1]
	fi
done
if [ $n == 5 ]
then
	echo 当前系统$(grep -i PRETTY_NAME /etc/os-release | cut -d \" -f2)没有适配
	echo 默认使用APT包管理器
	n=0
fi
if [ -z $(type -P unzip) ]
then
	${linux_update[$n]}
	${linux_install[$n]} unzip
fi
if [ -z $(type -P wget) ]
then
	${linux_update[$n]}
	${linux_install[$n]} wget
fi
rm -rf v2ray cloudflared-linux v2ray.zip
case "$(uname -m)" in
	x86_64 | x64 | amd64 )
	wget https://github.com/v2fly/v2ray-core/releases/latest/download/v2ray-linux-64.zip -O v2ray.zip
	wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -O cloudflared-linux
	;;
	i386 | i686 )
	wget https://github.com/v2fly/v2ray-core/releases/latest/download/v2ray-linux-32.zip -O v2ray.zip
	wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-386 -O cloudflared-linux
	;;
	armv8 | arm64 | aarch64 )
	echo arm64
	wget https://github.com/v2fly/v2ray-core/releases/latest/download/v2ray-linux-arm64-v8a.zip -O v2ray.zip
	wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64 -O cloudflared-linux
	;;
	arm71 )
	wget https://github.com/v2fly/v2ray-core/releases/latest/download/v2ray-linux-arm32-v7a.zip -O v2ray.zip
	wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm -O cloudflared-linux
	;;
	* )
	echo 当前架构$(uname -m)没有适配
	exit
	;;
esac
chmod +x cloudflared-linux
unzip -d v2ray v2ray.zip
rm -rf v2ray.zip
uuid=$(cat /proc/sys/kernel/random/uuid)
urlpath=$(echo $uuid | awk -F- '{print $1}')
port=$[$RANDOM+10000]
if [ $mode == 1 ]
then
cat>v2ray/config.json<<EOF
{
	"inbounds": [
		{
			"port": $port,
			"listen": "localhost",
			"protocol": "vmess",
			"settings": {
				"clients": [
					{
						"id": "$uuid",
						"alterId": 0
					}
				]
			},
			"streamSettings": {
				"network": "ws",
				"wsSettings": {
					"path": ""
				}
			}
		}
	],
	"outbounds": [
		{
			"protocol": "freedom",
			"settings": {}
		}
	],
	"policy": {
		"levels": {
			"0": {
				"handshake": 3,
				"connIdle": 5,
				"uplinkOnly": 0,
				"downlinkOnly": 0,
				"bufferSize": 0
			}
		}
	}
}
EOF
fi
if [ $mode == 2 ]
then
cat>v2ray/config.json<<EOF
{
	"inbounds": [
		{
			"port": $port,
			"listen": "localhost",
			"protocol": "vless",
			"settings": {
				"decryption": "none",
				"clients": [
					{
						"id": "$uuid"
					}
				]
			},
			"streamSettings": {
				"network": "ws",
				"wsSettings": {
					"path": ""
				}
			}
		}
	],
	"outbounds": [
		{
			"protocol": "freedom",
			"settings": {}
		}
	],
	"policy": {
		"levels": {
			"0": {
				"handshake": 3,
				"connIdle": 5,
				"uplinkOnly": 0,
				"downlinkOnly": 0,
				"bufferSize": 0
			}
		}
	}
}
EOF
fi
kill -9 $(ps -ef | grep v2ray | grep -v grep | awk '{print $2}')
kill -9 $(ps -ef | grep cloudflared-linux | grep -v grep | awk '{print $2}')
./v2ray/v2ray run>/dev/null 2>&1 &
./cloudflared-linux tunnel --url http://localhost:$port --no-autoupdate --edge-ip-version $ips --protocol h2mux>argo.log 2>&1 &
sleep 2
clear
echo 等待cloudflare argo生成地址
sleep 10
argo=$(cat argo.log | grep trycloudflare.com | awk 'NR==2{print}' | awk -F// '{print $2}' | awk '{print $1}')
clear
if [ $mode == 1 ]
then
	echo vmess链接已经生成,IP地址可替换为CF优选IP
	echo 'vmess://'$(echo '{"add":"speed.cloudflare.com","aid":"0","host":"'$argo'","id":"'$uuid'","net":"ws","path":"","port":"443","ps":"vmess_tls","tls":"tls","type":"none","v":"2"}' | base64 -w 0)
	echo 'vmess://'$(echo '{"add":"speed.cloudflare.com","aid":"0","host":"'$argo'","id":"'$uuid'","net":"ws","path":"","port":"80","ps":"vmess","tls":"","type":"none","v":"2"}' | base64 -w 0)
fi
if [ $mode == 2 ]
then
	echo vless链接已经生成,IP地址可替换为CF优选IP
	echo 'vless://'$uuid'@speed.cloudflare.com:443?encryption=none&security=tls&type=ws&host='$argo'&path=#vless_tls'
	echo 'vless://'$uuid'@speed.cloudflare.com:80?encryption=none&security=none&type=ws&host='$argo'&path=#vless'
fi
rm -rf argo.log
