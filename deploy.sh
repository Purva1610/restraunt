#!/bin/bash

# Deployment script for Hari's Vegetarian Kitchen
# This script handles deployment, health checks, and management

set -e

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
CONTAINER_NAME="haris-veg-app"
IMAGE_NAME="haris-vegetarian-kitchen"
PORT="3000"
LOG_FILE="/tmp/haris-deployment.log"

# Functions
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a $LOG_FILE
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a $LOG_FILE
}

# Check if Docker is running
check_docker() {
    log "Checking Docker status..."
    if ! docker info > /dev/null 2>&1; then
        error "Docker is not running. Please start Docker service."
    fi
    log "✅ Docker is running"
}

# Build Docker image
build_image() {
    log "Building Docker image: $IMAGE_NAME"
    docker build -t $IMAGE_NAME:latest -t $IMAGE_NAME:$(date +%s) . || error "Failed to build Docker image"
    log "✅ Docker image built successfully"
}

# Stop existing container
stop_container() {
    if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
        log "Stopping existing container: $CONTAINER_NAME"
        docker stop $CONTAINER_NAME || warning "Failed to stop container"
        docker rm $CONTAINER_NAME || warning "Failed to remove container"
        log "✅ Container stopped and removed"
    else
        log "No existing container found"
    fi
}

# Start new container
start_container() {
    log "Starting new container: $CONTAINER_NAME"
    docker run -d \
        --name $CONTAINER_NAME \
        -p $PORT:3000 \
        -e NODE_ENV=production \
        -e PORT=3000 \
        -e HOST=0.0.0.0 \
        --restart unless-stopped \
        --health-cmd="curl -f http://localhost:3000 || exit 1" \
        --health-interval=30s \
        --health-timeout=10s \
        --health-retries=3 \
        $IMAGE_NAME:latest || error "Failed to start container"
    log "✅ Container started with ID: $(docker ps -q -f name=$CONTAINER_NAME)"
}

# Health check
health_check() {
    log "Running health check..."
    sleep 2
    for i in {1..30}; do
        if curl -f http://localhost:$PORT > /dev/null 2>&1; then
            log "✅ Application is healthy and responding"
            return 0
        fi
        echo -n "."
        sleep 1
    done
    error "Health check failed after 30 seconds"
}

# View logs
view_logs() {
    log "Displaying container logs:"
    docker logs -f $CONTAINER_NAME
}

# Deployment complete
deployment_complete() {
    log ""
    log "╔════════════════════════════════════════════╗"
    log "║   🌿 Deployment Completed Successfully! 🌿  ║"
    log "╚════════════════════════════════════════════╝"
    log ""
    log "Application Details:"
    log "  Container Name: $CONTAINER_NAME"
    log "  Image Name: $IMAGE_NAME"
    log "  Port: $PORT"
    log "  Access URL: http://$(hostname -I | awk '{print $1}'):$PORT"
    log ""
    log "Useful Commands:"
    log "  View logs: docker logs -f $CONTAINER_NAME"
    log "  Stop container: docker stop $CONTAINER_NAME"
    log "  View status: docker ps -f name=$CONTAINER_NAME"
    log ""
}

# Main deployment process
deploy() {
    log "Starting deployment process..."
    log "=================================="
    
    check_docker
    build_image
    stop_container
    start_container
    health_check
    deployment_complete
}

# Menu
show_menu() {
    echo ""
    echo "Hari's Vegetarian Kitchen - Deployment Manager"
    echo "================================================"
    echo "1. Deploy (Full deployment)"
    echo "2. View Logs"
    echo "3. Stop Container"
    echo "4. Restart Container"
    echo "5. Health Check"
    echo "6. View Container Status"
    echo "7. Exit"
    echo ""
    read -p "Enter your choice (1-7): " choice
}

# Parse command line arguments
case "${1:-menu}" in
    deploy)
        deploy
        ;;
    logs)
        view_logs
        ;;
    stop)
        stop_container
        ;;
    restart)
        stop_container
        start_container
        health_check
        deployment_complete
        ;;
    health)
        health_check
        ;;
    status)
        log "Container Status:"
        docker ps -f name=$CONTAINER_NAME || log "Container not running"
        ;;
    *)
        show_menu
        case $choice in
            1) deploy ;;
            2) view_logs ;;
            3) stop_container ;;
            4) stop_container; start_container; health_check; deployment_complete ;;
            5) health_check ;;
            6) docker ps -f name=$CONTAINER_NAME || log "Container not running" ;;
            7) exit 0 ;;
            *) error "Invalid option" ;;
        esac
        ;;
esac
