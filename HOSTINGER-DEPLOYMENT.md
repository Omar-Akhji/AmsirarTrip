# 🚀 VPS & Docker Deployment Guide - AmsirarTrip

This guide covers deploying AmsirarTrip to a VPS (Hostinger, DigitalOcean, Hetzner, etc.) using Docker.

## Prerequisites

1.  **VPS Server**: Ubuntu 22.04 or 24.04 (Recommended).
2.  **Domain**: Pointed to your VPS IP address.
3.  **Docker & Docker Compose**: Installed on the VPS.

---

## Step 1: Prepare the Application

### 1.1 Enable Standalone Output

Ensure `next.config.ts` has `output: 'standalone'` (Already configured).

### 1.2 Verify Build Locally (Optional)

```bash
docker build -t amsirartrip .
docker run -p 3000:3000 amsirartrip
```

---

## Step 2: VPS Setup

### 2.1 SSH into your VPS

```bash
ssh root@your-vps-ip
```

### 2.2 Install Docker & Docker Compose

If not already installed:

```bash
# Update packages
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Verify
docker --version
docker compose version
```

---

## Step 3: Deploying the Application

You have two main methods to deploy:

### Method A: Build on VPS (Simpler for updates)

1.  **Clone your repository** on the VPS:

    ```bash
    git clone https://github.com/yourusername/amsirartrip.git
    cd amsirartrip
    ```

2.  **Create/Edit Environment Variables**:
    Create a `.env.production` file (DO NOT COMMIT THIS TO GIT):

    ```bash
    nano .env.production
    ```

    Add your secrets:

    ```env
    NODE_ENV=production
    GMAIL_USER=your-email@gmail.com
    GMAIL_PASS=your-app-password
    MAIL_TO=bookings@amsirartrip.com
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-key
    RECAPTCHA_SECRET_KEY=your-secret
    ```

3.  **Start with Docker Compose**:
    ```bash
    docker compose up -d --build
    ```

### Method B: Generic Transfer (No Git on VPS)

1.  **Copy files to VPS** (Dockerfile, docker-compose.yml, public/, package.json, src/, etc.):
    ```bash
    scp -r . root@your-vps-ip:/app/amsirartrip
    ```
2.  **SSH and Build**:
    ```bash
    ssh root@your-vps-ip
    cd /app/amsirartrip
    docker compose up -d --build
    ```

---

## Step 4: Setup Reverse Proxy (Nginx) & SSL

For a production environment, you should use Nginx to handle SSL and forward traffic to Docker.

### 4.1 Install Nginx

```bash
apt install nginx -y
```

### 4.2 Configure Nginx

Create a config file: `/etc/nginx/sites-available/amsirartrip`

```nginx
server {
    server_name amsirartrip.com www.amsirartrip.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable it:

```bash
ln -s /etc/nginx/sites-available/amsirartrip /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

### 4.3 Setup SSL (Certbot)

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d amsirartrip.com -d www.amsirartrip.com
```

---

## Step 5: Post-Deployment Verification

After the site is live, run the security verification script from your local machine to ensure everything is secure:

```bash
# Verify production security headers and protections
npm run verify:prod
```

---

## Maintenance

### Updating the App

```bash
# Pull latest changes
git pull

# Rebuild and restart container
docker compose up -d --build
```

### Viewing Logs

```bash
docker compose logs -f
```

### Stopping the App

```bash
docker compose down
```
