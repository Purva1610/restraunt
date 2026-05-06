# Jenkins Setup Guide for Hari's Vegetarian Kitchen

This guide will help you set up and run the restaurant website on a Jenkins server.

## Prerequisites

- Jenkins Server (version 2.400+)
- Docker installed on Jenkins machine
- Git plugin installed in Jenkins
- Docker plugin installed in Jenkins
- Node.js 16+ (if running without Docker)
- npm 8+

## Setup Steps

### 1. Install Required Jenkins Plugins

Go to **Manage Jenkins > Plugin Manager** and install:
- Docker plugin
- GitHub plugin
- Pipeline plugin
- NodeJS plugin
- Email Extension Plugin

### 2. Configure Jenkins Node

Ensure Jenkins has Docker access:
```bash
# On Jenkins server machine
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### 3. Create a New Pipeline Job

1. Click **New Item** in Jenkins
2. Enter job name: `Haris-Vegetarian-Kitchen`
3. Select **Pipeline** job type
4. Click **OK**

### 4. Configure Pipeline

In the job configuration:

#### General Tab
- Check **GitHub project**
- Enter project URL: `https://github.com/Purva1610/restraunt`

#### Build Triggers
- Check **GitHub hook trigger for GITScm polling**
- Check **Poll SCM** (as backup)
  - Schedule: `H/15 * * * *` (every 15 minutes)

#### Pipeline Tab
- **Definition**: Pipeline script from SCM
- **SCM**: Git
- **Repository URL**: `https://github.com/Purva1610/restraunt.git`
- **Branch Specifier**: `*/main`
- **Script Path**: `Jenkinsfile`

### 5. Save and Run

Click **Save** and then **Build Now** to test the pipeline.

## Jenkins Pipeline Stages

The Jenkinsfile includes these stages:

1. **Checkout** - Pulls code from GitHub
2. **Install Dependencies** - Runs `npm install`
3. **Lint** - Checks code quality
4. **Build** - Builds the application
5. **Test** - Runs tests
6. **Docker Build** - Creates Docker image
7. **Deploy** - Runs Docker container on port 3000

## Docker Requirements on Jenkins Machine

The Jenkins machine must have:
- Docker installed and running
- Docker daemon socket accessible to Jenkins user
- Sufficient disk space for images and containers

## Running on Jenkins Server

### Option 1: Docker Container Deployment

The pipeline automatically:
1. Builds Docker image: `haris-vegetarian-kitchen:${BUILD_NUMBER}`
2. Stops previous container
3. Runs new container on port 3000

Access at: `http://<jenkins-server-ip>:3000`

### Option 2: Docker Compose Deployment

If using docker-compose:
```bash
docker-compose up -d
```

This will:
- Build the image
- Start container named `haris-veg-app`
- Expose on port 3000
- Include health checks

### Option 3: Direct Node.js Deployment

If running without Docker:
```bash
ssh jenkins@<server>
cd /var/lib/jenkins/workspace/Haris-Vegetarian-Kitchen
npm install
npm start
```

## Troubleshooting

### Build Fails with "Docker not found"
```bash
# On Jenkins machine
which docker
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Port 3000 Already in Use
```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>
```

### npm install fails
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Permission Denied Errors
```bash
# Ensure Jenkins user has permissions
sudo chown -R jenkins:jenkins /var/lib/jenkins/workspace/
```

## Monitoring

After deployment:

1. **Check Jenkins Logs**
   - Jenkins > Haris-Vegetarian-Kitchen > Console Output

2. **Check Docker Container**
   ```bash
   docker ps
   docker logs haris-veg-app
   ```

3. **Test Application**
   ```bash
   curl http://localhost:3000
   ```

## GitHub Webhook Setup

For automatic builds on push:

1. Go to GitHub Repository Settings > Webhooks
2. Click **Add webhook**
3. Payload URL: `http://<jenkins-server>:8080/github-webhook/`
4. Content type: `application/json`
5. Select **Just the push event**
6. Click **Add webhook**

Now each push to `main` branch will trigger a Jenkins build!

## Environment Variables

In Jenkins job configuration, add environment variables:

```
NODE_ENV=production
PORT=3000
```

## Build Notifications

Configure email notifications:

1. Go to **Manage Jenkins > Configure System**
2. Scroll to **E-mail Notification**
3. Set SMTP server details
4. In job config, check **Email Notification**
5. Add recipient emails

## Maintenance

### Regular Tasks
- Monitor disk space for Docker images
- Prune old Docker images: `docker image prune -a`
- Check container logs weekly
- Update Node.js dependencies monthly

### Backup
```bash
# Backup Jenkins jobs
tar -czf jenkins-backup.tar.gz /var/lib/jenkins/jobs/
```

## Support

For issues, check:
- Jenkins system logs
- Docker container logs
- Application server.js console output
- GitHub Actions (if configured)

---

🌿 **Hari's Vegetarian Kitchen** is now ready to run on Jenkins!
