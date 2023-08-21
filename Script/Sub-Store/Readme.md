# https://github.com/xream/scripts/tree/main/surge/modules/sub-store-scripts/lite
#参数&


参数列表
host 修改 Host 混淆. 默认为空 不修改. 例 a.189.cn

hostPrefix 为修改了 Host 的节点名添加前缀. 默认为空

hostSuffix 为修改了 Host 的节点名添加后缀. 默认为空. 例 [微博混淆]

path 修改 Path 路径. 默认为空 不修改. 例 /TS/recharge/tzUrl.html

pathPrefix 为修改了 Path 的节点名添加前缀. 默认为空

pathSuffix 为修改了 Path 的节点名添加后缀. 默认为空. 例 [广停路径]

port 修改 Port 端口 默认为空 不修改. 例 80

portPrefix 为修改了 Port 的节点名添加前缀. 默认为空

portSuffix 为修改了 Port 的节点名添加前缀. 默认为空. 例 [80]

method method 默认为空 不修改. 例 GET. 网络为 http 时, 可能需要设置此项

array 是否把 host, path 设为数组. 默认不是数组. 如果要用于 Clash 系的客户端输出, 应设为 true. 不需要的时候, 请不要传这个字段

defaultNetwork 默认的 network. 节点无 network 时, 将设置为此值. 最新版已默认为 http

当 network 为 http 时:

defaultPath 默认的 path. 节点无 network 时, 将设置为此值. 最新版已默认为 /

defaultMethod 默认的 method. 节点无 method 时, 将设置为此值. 最新版已默认为 GET
