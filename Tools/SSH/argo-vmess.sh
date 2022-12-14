#!/bin/bash
# one key vmess

rm -rf xray cloudflared-linux-amd64
wget https://github.com/XTLS/Xray-core/releases/latest/download/Xray-linux-64.zip
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x cloudflared-linux-amd64
unzip -d xray Xray-linux-64.zip
rm -rf Xray-linux-64.zip
cat>xray/config.json<<EOF
{
	"inbounds": [
		{
			"port": 37777,
			"listen": "localhost",
			"protocol": "vmess",
			"settings": {
				"clients": [
					{
						"id": "ffffffff-ffff-ffff-ffff-ffffffffffff",
						"alterId": 0
					}
				]
			},
			"streamSettings": {
				"network": "ws",
				"wsSettings": {
					"path": "/"
				}
			}
		}
	],
	"outbounds": [
		{
			"protocol": "freedom",
			"settings": {}
		}
	]
}
EOF
kill -9 $(ps -ef | grep xray | grep -v grep | awk '{print $2}')
kill -9 $(ps -ef | grep cloudflared-linux-amd64 | grep -v grep | awk '{print $2}')
./xray/xray &
./cloudflared-linux-amd64 tunnel --url http://localhost:37777 --no-autoupdate>argo.log 2>&1 &
sleep 2
clear
echo waiting for cloudflare argo address
sleep 3
argo=$(cat argo.log | grep trycloudflare.com | awk 'NR==2{print}' | awk -F// '{print $2}' | awk '{print $1}')
clear
echo There is your vmess link：
echo 'vmess://'$(echo '{"add":"speed.cloudflare.com","aid":"0","host":"'$argo'","id":"ffffffff-ffff-ffff-ffff-ffffffffffff","net":"ws","path":"","port":"8080","ps":"'$(echo $isp | sed -e 's/_/ /g')'","tls":"","type":"none","v":"2"}' | base64 -w 0) 
