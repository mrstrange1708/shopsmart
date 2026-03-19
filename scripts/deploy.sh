#!/bin/bash
set -e

# ===== CONFIG =====
REPO_URL="https://github.com/mrstrange1708/shopsmart.git"
APP_DIR="/home/ec2-user/shopsmart"
SERVER_DIR="$APP_DIR/server"
CLIENT_DIR="$APP_DIR/client"
APP_PORT=7777
APP_NAME="shopsmart"

echo "========================================="
echo " ShopSmart Deployment Started"
echo "========================================="

# ===== BLOCK 1: INSTALL GIT =====
echo "[1/6] Installing git..."
if ! command -v git &> /dev/null; then
  echo "[INFO] Git not found. Installing..."
  sudo dnf install -y git
else
  echo "[INFO] Git already installed. Skipping."
fi

# ===== BLOCK 2: REPO =====
echo "[2/6] Checking repository..."
if [ -d "$APP_DIR" ]; then
  echo "[INFO] Repo exists. Pulling latest..."
  cd "$APP_DIR"
  git pull origin main
else
  echo "[INFO] Repo not found. Cloning fresh..."
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

# ===== BLOCK 3: NODE =====
echo "[3/6] Checking Node.js..."
if ! command -v node &> /dev/null; then
  echo "[INFO] Node not found. Installing..."
  curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
  sudo dnf install -y nodejs
else
  echo "[INFO] Node $(node -v) already installed. Skipping."
fi

# ===== BLOCK 4: DEPENDENCIES + BUILD =====
echo "[4/6] Installing dependencies and building..."

cd "$SERVER_DIR"
npm ci

cd "$CLIENT_DIR"
npm ci
npm run build

echo "[INFO] Build complete."

# ===== BLOCK 5: PM2 =====
echo "[5/6] Checking pm2..."
if ! command -v pm2 &> /dev/null; then
  echo "[INFO] pm2 not found. Installing globally..."
  sudo npm install -g pm2
else
  echo "[INFO] pm2 already installed. Skipping."
fi

cd "$SERVER_DIR"

if pm2 list | grep -q "$APP_NAME"; then
  echo "[INFO] App already running. Restarting..."
  pm2 restart "$APP_NAME"
else
  echo "[INFO] App not running. Starting fresh..."
  pm2 start npm --name "$APP_NAME" -- start
  pm2 save
  sudo pm2 startup systemd -u ec2-user --hp /home/ec2-user
fi

# ===== BLOCK 6: HEALTH CHECK =====
echo "[6/6] Running health check..."
sleep 5

if curl -f http://localhost:$APP_PORT/api/health; then
  echo ""
  echo "[SUCCESS] App is live on port $APP_PORT"
else
  echo "[FAILURE] Health check failed. Stopping app..."
  pm2 stop "$APP_NAME"
  exit 1
fi

echo "========================================="
echo " Deployment Finished Successfully"
echo "========================================="