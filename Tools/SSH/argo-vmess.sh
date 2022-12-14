#!/bin/bash
# one key vless

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
			"listen": "127.0.0.1",
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
	]
}
EOF
kill -n 9 $(ps -ef | grep xray | grep -v grep | awk '{print $2}')
kill -n 9 $(ps -ef | grep cloudflared-linux-amd64 | grep -v grep | awk '{print $2}')
./xray/xray run -config ./xray/config.json &
./cloudflared-linux-amd64 tunnel --url http://localhost:37777 --no-autoupdate >argo.log 2>&1 &
sleep 2
echo "waiting for cloudflare argo address"
sleep 10
argo=$(cat argo.log | grep trycloudflare.com | awk 'NR==2{print}' | awk -F// '{print $2}' | awk '{print $1}')
clear
echo 'vmess://'$(echo '{"add":"cdn.7788.tk","aid":"0","host":"'$argo'","id":"'ffffffff-ffff-ffff-ffff-ffffffffffff'","net":"ws","path":"","port":"8080","ps":"argo","tls":"","type":"none","v":"2"}' | base64 -w 0) 
