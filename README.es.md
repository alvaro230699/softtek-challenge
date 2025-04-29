# 🌌 Fusion API: Integrando SWAPI + Weather API con Serverless y DynamoDB

Este repositorio contiene una implementación moderna y escalable de una API que fusiona datos del universo de *Star Wars* (provenientes de [SWAPI](https://swapi.dev)) con información climática actual de [WeatherAPI](https://www.weatherapi.com/), todo montado sobre una arquitectura **serverless en AWS**.

---

## 🧠 Objetivo del Proyecto

Construir una API que permita:

- Fusionar personajes de Star Wars con datos de clima de ciudades reales que tengan características planetarias similares.
- Utilizar DynamoDB como **base de datos** y **sistema de caché**.
- Aprovechar una arquitectura **modular y escalable**, con separación por dominios (`almacenar`, `fusionados`, `historial`).
- Permitir pruebas unitarias e integración aisladas y confiables.
- Dejar la base para escalar a una **Clean Architecture**.

---

## 🧱 Arquitectura

```
Usuario → API Gateway → Lambdas → DynamoDB (como DB + caché)
                          ↓
                Weather API + SWAPI
```

### 🧩 Estructura del código

- `src/api`: Handlers organizados por dominio (`almacenar`, `fusionados`, `historial`).
- `src/database`: Repositorios para acceder a DynamoDB.
- `src/integrations`: Clientes externos como SWAPI y Weather API.
- `tests`: Tests unitarios e integrales por dominio.
- `.env*`: Variables de entorno para cada stage (`.env`, `.env.test`, etc).

---

## 🚀 Instalación

1. Clona el repositorio y navega a la carpeta principal:

```bash
cd fusion-api-project
```

2. Instala dependencias:

```bash
npm install
```

3. Asegúrate de tener Node.js versión **18.x** o **20.x** (el entorno offline usa Node 18).

---

## ⚙️ Configuración

1. Copia `.env.example` a `.env` y `.env.test`:

```bash
cp .env.example .env
cp .env.example .env.test
```

2. Ajusta las variables necesarias, en especial:

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

#### Paso 1: Instalar DynamoDB local

```bash
npx serverless dynamodb install
```

#### Paso 2: Lanzar dashboard visual (opcional)

```bash
DYNAMO_ENDPOINT=http://localhost:8000 npx dynamodb-admin
```

#### Paso 3: Build del proyecto

```bash
npm run build
```

#### Paso 4: Lanzar API Gateway y Lambdas localmente

```bash
npm run start:offline
```

#### Paso 5: Ejecutar tests de integración

```bash
npm run test:e2e
```

> **Nota:** Si usas Node.js 20, es probable que Serverless Offline no lo soporte del todo. Puedes usar un script como `npm run set:runtime:18` para cambiar temporalmente.

### 🧪 Todos los tests

```bash
npm run test:all
```

### 🧪 Test e2e con todo levantado automáticamente

```bash
npm run test:e2e:complete
```

---

## ☁️ Despliegue a AWS

1. Asegúrate de tener la variable IS_OFFLINE en false y configurar tu perfil de AWS (`~/.aws/credentials` y `config`).  
   Usa el comando:

```bash
export AWS_PROFILE=tu-perfil
```

2. Despliega a tu entorno `dev`:

```bash
npm run deploy:dev
```

### 📜 Logs por función

```bash
npm run logs:[LAMBDA_FN]
# Ejemplo:
npm run logs:fusionar
```

### 🧨 Eliminar el stack de AWS

```bash
npm run remove:dev
```

---

## 👨‍💻 Contribuciones

Este proyecto es completamente abierto. Si tienes ideas, sugerencias o mejoras, ¡las recibiré con gusto! 😄

---

## 📦 Stack Tecnológico

- **Node.js 18/20 + TypeScript**
- **Serverless Framework**
- **DynamoDB (local y en AWS)**
- **Jest** para testing
- **SWAPI + Weather API**
- **Arquitectura modular orientada a dominio**

---

## 📍 Estado Actual

- ✅ Pruebas unitarias y de integración funcionales
- ✅ Serverless offline con caché en DynamoDB
- ⏳ En proceso: Separación completa por capa (Clean Architecture)

---

## 📬 Contacto

Si quieres saber más del proyecto o colaborar, puedes escribirme vía GitHub o [LinkedIn](https://www.linkedin.com/in/neyracorsinoalvaro/).

---

🔭 *¡Que la fuerza y el clima estén contigo!* 🌤️🪐