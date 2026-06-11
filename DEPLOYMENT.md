# Deployment Guide

## Railway (Recommended)
1. Push this repository to GitHub.
2. Connect your GitHub account to [Railway](https://railway.app/).
3. Create a new Project -> Deploy from GitHub repo.
4. Add a **PostgreSQL** plugin in Railway.
5. Set the following environment variables in the Railway service settings:
   - `DATABASE_URL`: (Automatically provided by Railway)
   - `JWT_SECRET`: A long random string.
   - `ADMIN_PHONE`: 2347066068160
   - `NODE_ENV`: production
6. Railway will detect the `package.json` in the `backend` folder and deploy.

## Docker
A `Dockerfile` can be added to the root for containerized deployment.

```dockerfile
FROM node:18
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
EXPOSE 5000
CMD ["npm", "start"]
```
