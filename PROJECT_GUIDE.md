# 🚀 Full-Stack Task Manager & Student Portfolio
### Advanced Web Development Frameworks (AWDF - Semester 5)
**Student:** Naitik (24IT071) | **Project:** Full-Stack REST API & React Portfolio Application

---

## 📌 1. Project Overview

This project is an end-to-end full-stack web application developed as part of the **Advanced Web Development Frameworks (AWDF)** course. It consists of:

1. **Frontend (`student-portfolio`)**: A responsive single-page application (SPA) built with **React**, **Vite**, and **Tailwind CSS**, featuring route-based code splitting, dynamic project listings, and an interactive Task Management dashboard with authentication.
2. **Backend (`task-manager-api`)**: A production-ready **Node.js & Express** REST API adhering to **Richardson Maturity Model (RMM) Level 3 (HATEOAS)**, featuring JWT authentication, MongoDB data persistence, request validation, in-memory caching, and decoupled event-driven listeners.
3. **Containerization**: Full container orchestration using **Docker** and **Docker Compose** to run MongoDB, the Express backend, and the React frontend simultaneously in isolated networks.

---

## 🛠️ 2. Technologies Used

| Layer | Technologies | Purpose |
|---|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, React Router DOM, Lucide Icons | Fast, modern, responsive UI with client-side routing & lazy loading |
| **Backend API** | Node.js, Express.js | High-performance modular REST API adhering to MVC architecture |
| **Database** | MongoDB & Mongoose ODM | Document-based data storage with schema validation & user referencing |
| **Security & Auth** | JSON Web Tokens (JWT), BcryptJS | Stateless token-based authentication & salted password hashing |
| **REST Architecture** | HATEOAS (`_links`), RMM Level 3 | Self-descriptive API responses with hypermedia links |
| **Performance** | `node-cache` | Server-side in-memory caching with `X-Cache` (`HIT`/`MISS`) tracking |
| **Event Architecture** | Node.js `EventEmitter` | Decoupled event-driven background task processing & notifications |
| **DevOps / Containers** | Docker, Dockerfile, Docker Compose | Isolated, reproducible multi-container deployment |
| **API Testing** | Postman / cURL / REST Client | Manual API verification and header inspection |

---

## ⭐ 3. Key Features

### 💻 Frontend (React + Vite)
- **Portfolio Showcase**: Modern presentation with Home, About, Skills, Projects, and Contact sections.
- **Code Splitting & Lazy Loading**: Uses `React.lazy()` and `<Suspense>` for fast initial page load times.
- **Authentication Flow**: Modal/inline Login and Register forms with client-side JWT token storage (`localStorage`).
- **Real-time Task Operations**: Create, read, update status (completed/pending), and delete tasks tied to the authenticated user.
- **Interactive UI Feedback**: Loading spinners, custom error banners, and clean modal dialogs.

### ⚙️ Backend (Node.js + Express)
- **RESTful Endpoints**: Full CRUD operations on `/tasks` with proper HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`).
- **User Authentication (`/auth`)**: Secure registration and login issuing signed JWT tokens.
- **Protected Routes**: Custom `protect` middleware verifying Bearer tokens on protected resources.
- **RMM Level 3 / HATEOAS**: Each task response contains `_links` allowing clients to discover related actions (`self`, `delete`) without hardcoded endpoints.
- **In-Memory Caching**: `getAllTasks` serves cached results for maximum speed and auto-invalidates the cache on new task mutations.
- **Event-Driven Architecture**: Fires a `task-created` event upon task generation, received by an asynchronous listener simulating background notifications.
- **Centralized Error Handling & Logging**: Consistent JSON error format (`{ success: false, error: ... }`) and request logging middleware.

### 🐳 DevOps & Deployment (Docker)
- **Microservices Setup**: 3 interconnected containers defined in `docker-compose.yml`:
  1. `mongodb` (Official MongoDB image on port 27017 with volume persistence)
  2. `backend` (Containerized Express API on port 5001)
  3. `frontend` (Containerized Vite/React dev server on port 5173)
- **Isolated Network**: Connected through a shared bridge network (`app-network`).

---

## 📚 4. Course Practicals Mapping (What Has Been Done)

| Practical | Topic Covered | Implementation in Project |
|---|---|---|
| **Practical 1 - 3** | React UI, Components & Routing | `student-portfolio`: Navigation, Lazy-loaded routes, Tailwind styling, reusable UI components. |
| **Practical 4** | Express REST API Basics | `task-manager-api`: Modular routing, MVC architecture, custom logger and error handler middleware. |
| **Assignment** | Richardson Maturity Model (RMM) | `task-manager-api/MATURITY.md`: Formal evaluation achieving RMM Level 3. |
| **Practical 5** | MongoDB & Mongoose Integration | `config/db.js` & `models/Task.js`: MongoDB connection, Schema design, CRUD operations with MongoDB. |
| **Practical 6** | HATEOAS (Hypermedia) | `controllers/taskController.js` & `hateoas/server.js`: Hypermedia `_links` embedded in API responses. |
| **Practical 7 - 8** | Authentication & Authorization | `models/User.js`, `routes/authRoutes.js`, JWT Bearer token middleware, and React frontend Auth integration. |
| **Practical 9** | Performance & Caching | `config/cache.js`: `node-cache` implementation, `X-Cache: HIT / MISS` response headers. |
| **Practical 10** | Event-Driven Architecture | `events.js` & `listeners.js`: EventEmitter firing `task-created` and logging background notifications. |
| **Practical 11** | Docker Containerization | `Dockerfile` (frontend & backend) and `docker-compose.yml` orchestrating the entire stack. |

---

## 🎬 5. How to Demonstrate the Project (Step-by-Step Walkthrough)

Follow this simple script during your presentation or viva to show everything smoothly:

---

### Step 1: Start the Project

#### Option A: Running with Docker (Recommended for demonstrating Practical 11)
Open a terminal in the root directory and run:
```bash
docker-compose up --build
```
> **What to explain:** "Here, Docker Compose builds and starts 3 isolated containers — MongoDB, Express API, and the React frontend — all communicating over a private bridge network."

#### Option B: Running Locally (Fastest for quick manual demo)
1. **Terminal 1 (Backend):**
   ```bash
   cd task-manager-api
   npm run dev
   ```
2. **Terminal 2 (Frontend):**
   ```bash
   cd student-portfolio
   npm run dev
   ```

---

### Step 2: Show the Frontend UI (Practicals 1–3)
1. Open your browser at `http://localhost:5173`.
2. **Show Navigation:** Click through **Home**, **Projects**, and **Contact**.
3. **Point out:**
   - Smooth routing without page reloads using **React Router**.
   - Performance optimization using **Code Splitting (`React.lazy`)**.
   - Clean, dark-mode design styled with **Tailwind CSS**.

---

### Step 3: Show User Authentication (Practicals 7 & 8)
1. Navigate to the **Projects / Task Manager** section.
2. Show that protected tasks are hidden when logged out.
3. Switch to **Register** and create a new account (e.g., `user@test.com`, password: `password123`).
4. Switch to **Login** and log in with your credentials.
5. **Inspect in DevTools (F12):**
   - Open **Application Tab > Local Storage**: Show the stored `token` (JWT).
   - Open **Network Tab**: Show the `/auth/login` response containing the signed JWT.

---

### Step 4: Show CRUD & MongoDB Persistence (Practical 5)
1. In the Task Manager dashboard:
   - **Create Task:** Enter a Title (e.g., *"Finish AWDF Practical Viva"*) and Description, then click **Add Task**.
   - **Read Tasks:** Show the task appearing immediately in the task list.
   - **Update Status:** Click the checkmark/toggle to mark it completed.
   - **Delete Task:** Click delete to remove the task.
2. **What to explain:** "Each task is linked to the specific authenticated user in MongoDB via `user: req.user.id`."

---

### Step 5: Show HATEOAS / RMM Level 3 (Practical 6)
1. In the browser **Network Tab** (or Postman), click on the `GET /tasks` or `POST /tasks` request.
2. View the Response JSON:
   ```json
   {
     "success": true,
     "data": [
       {
         "_id": "66f...",
         "title": "Finish AWDF Practical Viva",
         "completed": false,
         "_links": {
           "self": "/tasks/66f...",
           "delete": "/tasks/66f..."
         }
       }
     ]
   }
   ```
3. **What to explain:** "Our API achieves Richardson Maturity Model Level 3 because it does not require clients to guess URLs. Every resource contains `_links` providing dynamic hypermedia controls."

---

### Step 6: Show In-Memory Caching (Practical 9)
1. In the browser Network tab (or Postman), make a request to `GET /tasks`:
   - **First request:** Check Response Headers -> `X-Cache: MISS`.
   - **Second request:** Check Response Headers -> `X-Cache: HIT`.
2. Look at the backend terminal:
   - First call logs: `[Cache] MISS - Querying MongoDB`
   - Second call logs: `[Cache] HIT - Returning cached tasks`
3. Add a new task:
   - Look at the terminal: `[Cache] Invalidation - Cache cleared`
   - Next `GET` request will be a `MISS` again.
4. **What to explain:** "This reduces load on the MongoDB database and speeds up response times significantly."

---

### Step 7: Show Event-Driven Architecture (Practical 10)
1. In the frontend or Postman, create a new task.
2. Look at the **backend terminal output immediately**:
   ```
   [Listener] 'task-created' event received at 2026-10-28T...
   ... (2 seconds later) ...
   [Notification] Task "Finish AWDF Practical Viva" completed at 2026-10-28T...
   ```
3. **What to explain:** "We used Node.js `EventEmitter` to decouple task creation from background work like sending confirmation emails or notifications without blocking the API response."

---

### Step 8: Show Dockerization (Practical 11)
1. Open [`docker-compose.yml`](file:///docker-compose.yml).
2. Show the terminal running `docker ps`:
   - Point out the 3 running containers: `mongodb`, `backend`, and `frontend`.
   - Explain how `app-network` allows the backend to communicate directly with `mongodb://mongodb:27017/taskdb`.

---

## 💡 6. Quick Examiner / Viva Q&A (Cheat Sheet)

#### Q1: What is the Richardson Maturity Model (RMM)?
> **Ans:** It is a 4-level model (0 to 3) that measures how RESTful an API is.
> - **Level 0:** Swamp of POX (single URI, single method, RPC).
> - **Level 1:** Resources (multiple URIs like `/tasks` and `/tasks/:id`).
> - **Level 2:** HTTP Verbs & Status Codes (`GET`, `POST`, `PUT`, `DELETE`, 200, 201, 404).
> - **Level 3:** Hypermedia Controls (HATEOAS with `_links`). Our project achieves **Level 3**.

#### Q2: How does JWT Authentication work in your project?
> **Ans:** When a user logs in via `/auth/login`, passwords are verified using `bcrypt.compare`. If valid, the server signs a JSON Web Token containing the user's ID. The client stores it in `localStorage` and sends it in the `Authorization: Bearer <token>` header for protected routes. The `protect` middleware verifies the token using `jwt.verify`.

#### Q3: Why did you implement caching, and how does invalidation work?
> **Ans:** Fetching data from MongoDB on every request consumes database resources and increases latency. We use `node-cache` in memory. On `GET /tasks`, if the key exists, we return it with `X-Cache: HIT`. When a task is created, updated, or deleted, we call `cache.del("all_tasks")` so the next request fetches fresh data from MongoDB.

#### Q4: Why use Event-Driven Architecture for task creation?
> **Ans:** It keeps the request-response cycle fast. When a task is saved, we emit `taskEvents.emit("task-created", task)` and immediately return `201 Created` to the client. The listener handles background tasks (like logging or email simulations) asynchronously without blocking the user.

#### Q5: What is the benefit of Docker Compose over running services manually?
> **Ans:** It eliminates the *"it works on my machine"* problem. With one command (`docker-compose up`), anyone can run MongoDB, the Node.js backend, and the Vite frontend with consistent environment configurations, correct ports, and isolated networking without installing MongoDB or Node locally.

---

## 📁 7. Project File Structure

```text
AWDF-Sem5/
├── docker-compose.yml          # Multi-container orchestration (MongoDB, Backend, Frontend)
├── PROJECT_GUIDE.md           # This presentation & demonstration guide
│
├── task-manager-api/           # Express.js REST API
│   ├── config/
│   │   ├── db.js               # MongoDB connection logic
│   │   └── cache.js            # In-memory node-cache instance
│   ├── controllers/
│   │   ├── authController.js   # User registration & login logic
│   │   └── taskController.js   # Task CRUD, HATEOAS, and cache handling
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification middleware
│   │   ├── errorHandler.js     # Centralized error handler
│   │   ├── logger.js           # Request logger
│   │   └── validationMiddleware.js # Input validation
│   ├── models/
│   │   ├── Task.js             # Mongoose Task schema with user reference
│   │   └── User.js             # Mongoose User schema with bcrypt password hashing
│   ├── routes/
│   │   ├── authRoutes.js       # /auth/register & /auth/login
│   │   └── taskRoutes.js       # /tasks CRUD routes
│   ├── events.js               # EventEmitter instance
│   ├── listeners.js            # Background notification listener
│   ├── Dockerfile              # Backend container build instructions
│   ├── MATURITY.md             # Richardson Maturity Model documentation
│   └── server.js               # API entry point
│
├── student-portfolio/          # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.jsx        # Login & Register forms
│   │   │   ├── Projects.jsx    # Task Manager UI with API communication
│   │   │   ├── NavBar.jsx      # Navigation bar
│   │   │   └── ...             # Home, About, Skills, Contact, UI helpers
│   │   ├── App.jsx             # Main routing & lazy loading
│   │   └── main.jsx            # React root DOM rendering
│   ├── Dockerfile              # Frontend container build instructions
│   └── vite.config.js          # Vite build config
│
└── hateoas/                    # Standalone HATEOAS reference server
    └── server.js               # Demo server showcasing hypermedia links
```
