# Portfolio Tracker

A Project where you can create and manage your portfolio.

Currently, it only has 5 stocks, but more can be added to the code.
And yes don't worry, the stock price is updated every midnight.

#### Live Demo: https://portfolio-tracker-kappa.vercel.app/

## Local Deployment

To run it locally you will need to run three services

### 1. MySql (Docker)

`docker run --env=MYSQL_DATABASE="your database" --env=MYSQL_PASSWORD="your password" --env=MYSQL_ROOT_PASSWORD="your root password" --env=MYSQL_USER="your user" -p 3306:3306 -d mysql:latest`

### 2. Backend (Java)

Go to folder: `cd backend`

In the src\main\resources folder replace the `.env.template` file with `.env` file with the correct values.

Deploying: `.\mvnw clean verify spring-boot:run`

### 3. Frontend (Next.js)

Go to folder: `cd frontend`

In the root folder replace the `.env.template` file with `.env` file with the correct values.

Installing dependencies: `npm I --legacy-peer-deps`

Deploying (Dev Mode): `npm run dev`
