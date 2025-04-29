# 🌌 Fusion API: Integrating SWAPI + Weather API with Serverless and DynamoDB

This repository contains a modern and scalable implementation of an API that merges data from the *Star Wars* universe (sourced from [SWAPI](https://swapi.dev)) with current weather information from [WeatherAPI](https://www.weatherapi.com/), all built on a **serverless architecture on AWS**.

## 🧠 Project Objective

Build an API that:

- Merges Star Wars characters with weather data from real-world cities sharing similar planetary traits.
- Uses DynamoDB as both a **database** and **cache system**.
- Leverages a **modular and scalable architecture**, organized by domains (`store`, `fusion`, `history`).
- Enables isolated and reliable unit and integration testing.
- Lays the foundation for scaling toward a **Clean Architecture**.

## 🧱 Architecture

```
User → API Gateway → Lambdas → DynamoDB (as DB + cache)
                          ↓
                Weather API + SWAPI
```
### 🧩 Code Structure

- `src/api`: Handlers organized by domain (`store`, `fusion`, `history`).
- `src/database`: Repositories for accessing DynamoDB.
- `src/integrations`: External clients like SWAPI and Weather API.
- `tests`: Unit and integration tests by domain.
- `.env*`: Environment variables for each stage (`.env`, `.env.test`, etc.).

## 🚀 Installation

1. Clone the repository and navigate to the main folder:


```bash
cd fusion-api-project
```

2. Install dependencies:

```bash
npm install
```

3. Ensure you are using Node.js version 18.x or 20.x (the offline environment uses Node 18). 

---

## ⚙️ Configuración

1. Copy `.env.example` to `.env` and `.env.test`:

```bash
cp .env.example .env
cp .env.example .env.test
```

2. Adjust the necessary variables, especially:

```env
AWS_REGION=us-east-1
DYNAMODB_FUSION_TABLE=FusionHistorial-dev
DYNAMODB_FUSION_PARTITION=fusion
DYNAMODB_CACHE_TABLE=FusionCache-dev
DYNAMODB_EARTH_TABLE=FusionEarth-dev
AWS_REGION=us-east-1
DYNAMODB_LOCAL_ENDPOINT=http://localhost:8000
IS_OFFLINE=true
...
```

---
## 🧪 Testing

### ✅ Unit tests

```bash
npm run test:unit
```

### 🧪 Integration tests

#### Step 1: Install local DynamoDB

```bash
npx serverless dynamodb install
```

#### Step 2: Launch visual dashboard (optional)

```bash
DYNAMO_ENDPOINT=http://localhost:8000 npx dynamodb-admin
```

#### Step 3: Build the project

```bash
npm run build
```

#### Step 4: Start API Gateway and Lambdas locally

```bash
npm run start:offline
```

#### Step 5: Run integration tests

```bash
npm run test:e2e
```

> **Note:** If you are using Node.js 20, Serverless Offline may not fully support it. You can temporarily switch using a script like `npm run set:runtime:18`.

### 🧪 Run all tests

```bash
npm run test:all
```

### 🧪 Full e2e tests with auto bootstrap

```bash
npm run test:e2e:complete
```

---

## ☁️ Deployment to AWS

1. Make sure the `IS_OFFLINE` variable is set to false and that your AWS profile is properly configured (`~/.aws/credentials` and `config`).  
   Use the command:

```bash
export AWS_PROFILE=your-profile
```

2. Deploy to your `dev` environment:

```bash
npm run deploy:dev
```

### 📜 View logs per function

```bash
npm run logs:[LAMBDA_FN]
# Example:
npm run logs:fusion
```

### 🧨 Remove the AWS stack

```bash
npm run remove:dev
```

---

## 👨‍💻 Contributions

This project is completely open-source.  
If you have ideas, suggestions, or improvements, they are more than welcome! 😄

---

## 📦 Tech Stack

- Node.js 18/20 + TypeScript
- Serverless Framework
- DynamoDB (local and AWS)
- Jest for testing
- SWAPI + Weather API
- Modular domain-driven architecture

---

## 📍 Current Status

- ✅ Fully functional unit and integration tests
- ✅ Serverless offline environment with DynamoDB caching
- ⏳ In progress: Full separation into layers (Clean Architecture)

---

## 📬 Contact

If you want to learn more about this project or collaborate, feel free to reach out via GitHub or [LinkedIn](https://www.linkedin.com/in/neyracorsinoalvaro/).

---

🔭 *May the Force and the Weather be with you!* 🌤️🪐