# Deployment Guide for Hostinger VPS

## Prerequisites

- Hostinger VPS with SSH access
- Domain pointed to VPS IP
- Basic Linux knowledge

## Step 1: Prepare Your Local Build

✅ Run `npm run build:full` to build the frontend and package everything together in `dist/`.

## Step 2: Upload Files to VPS

Upload the entire `dist/` folder to your VPS using SCP, SFTP, or FTP:

```bash
scp -r dist/ user@your-vps-ip:/home/user/
```

## Step 2.5: Install Dependencies on VPS

SSH into your VPS and install the backend dependencies:

```bash
cd /home/user/dist
npm install
```

## Step 3: Install Node.js on VPS

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (latest LTS)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

## Step 4: Install PM2 for Process Management

```bash
sudo npm install -g pm2
```

## Step 5: Configure Environment Variables

The `.env` file is already included in the uploaded `dist/` folder. If you need to make changes:

```bash
cd /home/user/dist
nano .env
```

## Step 6: Install and Configure Nginx

```bash
# Install Nginx
sudo apt install nginx -y

# Create site configuration
sudo nano /etc/nginx/sites-available/amsirar
```

Add this configuration (replace yourdomain.com):

```
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Serve static files from dist
    root /home/user/dist;
    index index.html;

    # Handle React Router (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to backend
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/amsirar /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## Step 7: Start Backend with PM2

```bash
cd /home/user/dist
pm2 start server.js --name amsirar-backend
pm2 save
pm2 startup
```

## Step 9: Install SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install snapd -y
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Certbot will automatically update Nginx config for SSL
```

## Step 10: Final Checks

- Visit `https://yourdomain.com` - should load the frontend
- Test a form submission to verify backend API works
- Check PM2 status: `pm2 status`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

## Troubleshooting

- If backend doesn't start: Check `.env` file and run `node server.js` manually for errors
- If API calls fail: Verify Nginx proxy config and backend port
- If images don't load: Ensure `dist/` permissions allow Nginx to read files
- For email issues: Confirm Gmail app password and less secure apps setting

## Maintenance

- Update code: Upload new build, restart PM2: `pm2 restart amsirar-backend`
- View logs: `pm2 logs amsirar-backend`
- Monitor: `pm2 monit`
