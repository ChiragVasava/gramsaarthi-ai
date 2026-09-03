#!/bin/bash
set -e

# Update and install Docker + git
apt-get update -y
apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release git

# Install Docker
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Install Caddy for automatic Let's Encrypt SSL
apt-get install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt-get update -y
apt-get install -y caddy

# Clone GramSaarthi AI repo
mkdir -p /opt/app
cd /opt/app
git clone https://github.com/ChiragVasava/gramsaarthi-ai.git .

# Start Docker container
docker compose up -d --build

# Configure Caddy Reverse Proxy with Automatic SSL
cat <<EOF > /etc/caddy/Caddyfile
aws.chiragvasava.me {
    reverse_proxy localhost:3000
}
EOF

# Restart Caddy to obtain SSL
systemctl restart caddy
systemctl enable caddy
