# Portfolio Tracker

A Project where you can create and manage your portfolio.

Currently, it only has 5 stocks, but more can be added to the code.
And yes don't worry, the stock price is updated every midnight.

#### Live Demo: https://portfolio-tracker-kappa.vercel.app/dashboard

## Local Deployment

To run it locally you will need to run three services

### 1. Postgres (Docker)

`docker run --env=POSTGRES_PASSWORD="your password" -p 5432:5432 -d postgres:14.15-alpine3.21`

### 2. Backend (Java)

Go to folder: `cd backend`

In the src\main\resources folder replace the `.env.template` file with `.env` file with the correct values.

Deploying: `.\mvnw clean verify spring-boot:run`

### 3. Frontend (Next.js)

Go to folder: `cd frontend`

In the root folder replace the `.env.template` file with `.env` file with the correct values.

Installing dependencies: `npm I --legacy-peer-deps`

Deploying (Dev Mode): `npm run dev`
