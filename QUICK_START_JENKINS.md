# Quick Start Guide - Running on Jenkins

## What's New for Jenkins Deployment

We've added the following files to support Jenkins deployment:

1. **Jenkinsfile** - Complete CI/CD pipeline configuration
2. **deploy.sh** - Bash script for easy deployment management
3. **.env.example** - Environment configuration template
4. **.gitignore** - Git ignore rules for Node.js projects
5. **JENKINS_SETUP.md** - Detailed Jenkins setup guide
6. **docker-compose.yaml** - Updated Docker Compose configuration
7. Updated **server.js** - Enhanced with error handling and HOST configuration

## Fastest Way to Deploy on Jenkins

### Step 1: Prerequisites
```bash
# On your Jenkins server, ensure you have:
- Docker installed
- Jenkins running
- Git access configured
```

### Step 2: Create Jenkins Job
1. Go to Jenkins Dashboard
2. Click **New Item**
3. Enter name: `Haris-Vegetarian-Kitchen`
4. Select **Pipeline**
5. Click **OK**

### Step 3: Configure Pipeline
In job configuration:
- **Definition**: Pipeline script from SCM
- **SCM**: Git
- **Repository URL**: `https://github.com/Purva1610/restraunt.git`
- **Branch**: `*/main`
- **Script Path**: `Jenkinsfile`

### Step 4: Save & Build
1. Click **Save**
2. Click **Build Now**
3. Wait for pipeline to complete

### Step 5: Access Application
```
http://<your-jenkins-server>:3000
```

## Manual Deployment (Without Jenkins UI)

### Using deploy.sh Script
```bash
# On Jenkins server
cd /var/lib/jenkins/workspace/Haris-Vegetarian-Kitchen

# Full deployment
./deploy.sh deploy

# Or use interactive menu
./deploy.sh

# View logs
./deploy.sh logs

# Restart container
./deploy.sh restart

# Check health
./deploy.sh health
```

### Using docker-compose
```bash
cd /var/lib/jenkins/workspace/Haris-Vegetarian-Kitchen

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Using Docker directly
```bash
# Build image
docker build -t haris-vegetarian-kitchen:latest .

# Run container
docker run -d \
  --name haris-veg-app \
  -p 3000:3000 \
  -e NODE_ENV=production \
  haris-vegetarian-kitchen:latest

# Check status
docker ps

# View logs
docker logs -f haris-veg-app
```

## Troubleshooting

### Build Fails in Jenkins

**Problem**: "Docker not found" error
```bash
# Solution: Add Jenkins user to docker group
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

**Problem**: Port 3000 already in use
```bash
# Solution: Kill existing process
lsof -i :3000
kill -9 <PID>

# Or use different port in Jenkins job env var
PORT=3001
```

**Problem**: npm install fails
```bash
# Solution: Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Container Won't Start

**Problem**: Container exits immediately
```bash
# Check logs
docker logs haris-veg-app

# Verify Node.js installation in Docker
docker run -it haris-vegetarian-kitchen node -v
```

**Problem**: Health check failing
```bash
# Check if server is listening
curl http://localhost:3000

# Check container network
docker inspect haris-veg-app | grep -i network
```

### Slow Build Performance

**Solutions**:
- Increase Docker disk space
- Clear Docker cache: `docker system prune -a`
- Move to SSD storage
- Increase Jenkins memory: `-Xmx2g` in startup script

## Performance Tips

1. **Cache Dependencies**: Add to Jenkinsfile
   ```groovy
   stage('Cache') {
       steps {
           sh 'npm ci --prefer-offline'
       }
   }
   ```

2. **Parallel Stages**: Run lint and build in parallel
3. **Use Alpine Linux**: Dockerfile uses `alpine:3.22` for small images
4. **Enable Docker BuildKit**: Faster builds
   ```bash
   export DOCKER_BUILDKIT=1
   ```

## Monitoring & Logging

### Jenkins Console
- Go to job > Build > Console Output
- Search for build stages and errors

### Docker Logs
```bash
# Real-time logs
docker logs -f haris-veg-app

# Last 100 lines
docker logs --tail 100 haris-veg-app

# With timestamps
docker logs --timestamps haris-veg-app
```

### System Logs (Linux)
```bash
# Jenkins logs
tail -f /var/log/jenkins/jenkins.log

# Docker logs
journalctl -u docker -f
```

## Continuous Integration Best Practices

1. **Enable GitHub Webhooks**: Auto-deploy on push
   - GitHub Repo > Settings > Webhooks
   - Payload URL: `http://jenkins:8080/github-webhook/`

2. **Branch Protection**: Require passing builds
   - GitHub Repo > Settings > Branches
   - Require status checks to pass before merging

3. **Keep Secrets Safe**
   - Never commit .env files
   - Use Jenkins credentials
   - Rotate API keys regularly

4. **Regular Backups**
   ```bash
   # Backup Jenkins
   tar -czf jenkins-backup.tar.gz /var/lib/jenkins/jobs/
   
   # Backup Docker images
   docker save haris-vegetarian-kitchen:latest | gzip > haris-veg-app.tar.gz
   ```

## Next Steps

1. Read [JENKINS_SETUP.md](JENKINS_SETUP.md) for advanced configuration
2. Configure GitHub webhooks for automatic deployments
3. Set up email notifications in Jenkins
4. Monitor application logs in production
5. Plan backup and disaster recovery strategy

## Support & Debugging

For detailed debugging:
```bash
# Verbose Jenkins output
jenkins-cli build Haris-Vegetarian-Kitchen -f -v

# Docker debug mode
docker run -it --entrypoint /bin/sh haris-vegetarian-kitchen

# Check Node.js inside container
docker exec haris-veg-app node -v
docker exec haris-veg-app npm -v
```

---

🌿 **Happy Deploying!** 🌿

Need help? Check JENKINS_SETUP.md for comprehensive documentation.
