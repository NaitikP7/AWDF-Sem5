# Student Portfolio and Full-Stack Task Manager

An Advanced Web Development Frameworks (AWDF, Semester 5) project by **Naitik Patel**. It brings together a student portfolio and a task management application to demonstrate the course practicals, from React components and routing through a protected MongoDB API, caching, Docker, CI, and Gemini API integration.

## Project overview

The portfolio provides a home page, skills, contact form, and a task manager. Users can register and sign in, then create and manage personal tasks. The React frontend communicates with an Express REST API; MongoDB stores accounts and tasks.

The repository also includes a standalone HATEOAS demonstration server. The integrated task API adds links to task resources in its responses.

## Highlights

- **React portfolio:** reusable components, client-side routes, responsive layout, and lazy-loaded pages.
- **Task manager:** create, read, update, delete, and filter tasks; authenticated tasks remain in MongoDB after refresh.
- **Authentication:** bcrypt password hashing, JWT login, and protected task routes.
- **REST API:** Express routes, validation, structured errors, request logging, and HATEOAS links.
- **Performance:** per-user task-list cache with a 60-second TTL, `X-Cache` headers, and invalidation after writes.
- **Background events:** creating a task emits an event; a listener logs a delayed notification.
- **AI suggestion:** Gemini can draft an editable task description. A local fallback keeps the form usable when Gemini is not configured or unavailable.
- **Deployment and automation:** Docker Compose configuration for the frontend, API, and MongoDB, plus a GitHub Actions workflow for backend tests.

## Practical mapping

| Practical | Topic | Project implementation |
|---|---|---|
| **1** | React components and props | Portfolio composed from reusable components; Header and Skills receive props. |
| **2** | State and routing | Home, Projects, Contact, and 404 routes; controlled contact form and visibility toggle. |
| **3** | Public API rendering | A repository-list component is included. The later task-manager practical replaces repository data in the Projects route with the app's own task API. |
| **4** | Express REST API | Task CRUD endpoints, request logging, validation, and centralized error responses. |
| **5** | MongoDB and Mongoose | MongoDB connection and Mongoose User and Task models. |
| **6** | React API integration | The frontend uses authenticated API calls for task CRUD and displays loading/error states. |
| **7** | Authentication and validation | bcrypt password hashing, JWT issue/verification, protected task routes, and server-side input checks. |
| **8** | Lazy loading | Projects and Contact routes load on demand with a Suspense fallback. **Before/after bundle and load measurements still need to be added.** |
| **9** | Caching | 60-second per-user cache, HIT/MISS response headers, and invalidation on task writes. **Timing samples still need to be recorded.** |
| **10** | Event-driven processing | `task-created` event and delayed listener notification. |
| **11** | Docker and Compose | Dockerfiles and Compose configuration for frontend, backend, and MongoDB. Capture a successful full-stack run for the practical demonstration. |
| **12** | GitHub Actions CI | Workflow installs backend dependencies and runs tests on pushes to `main`. Add run evidence, including the requested failed/fixed demonstration, to the lab record. |
| **13** | Gemini API integration | Backend-only `GEMINI_API_KEY`, editable description suggestion, and fallback behavior. |

Practical 3's repository data flow is superseded by Practical 6 in the final Projects page. See [PROJECT_GUIDE.md](PROJECT_GUIDE.md) for the practical walkthrough, architecture notes, Postman guidance, and viva preparation.

## Technology

| Area | Main technologies |
|---|---|
| Frontend | React, Vite, Tailwind CSS, React Router, Lucide icons |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB |
| Authentication | bcryptjs, JSON Web Tokens |
| Caching and events | node-cache, Node.js EventEmitter |
| AI | Gemini API called from the backend |
| Containers and CI | Docker, Docker Compose, GitHub Actions, Jest, Supertest |

## Run with Docker Compose

### Requirements

- Docker Desktop (or Docker Engine with Docker Compose)
- Optional: a Gemini API key for live AI suggestions

### Start

From the repository root, create the backend environment file if you do not already have one (this preserves an existing `.env`):

```powershell
if (!(Test-Path task-manager-api/.env)) { Copy-Item task-manager-api/.env.example task-manager-api/.env }
```

To use live Gemini suggestions, put your key in `task-manager-api/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace the placeholder with your key. Keep `.env` private; it is ignored by Git and is used by the backend only. Without a key, the built-in fallback remains available.

Start the complete stack:

```powershell
docker compose up --build
```

Open the app at **http://localhost:5173**. The API is published at **http://localhost:5001** and MongoDB at **localhost:27017**. Docker starts all three services, so `npm run dev` is not needed for this mode.

Useful commands:

```powershell
docker compose ps
docker compose logs -f backend
docker compose down
```

MongoDB data is stored in the `mongo-data` named volume and remains after `docker compose down`. Running `docker compose down -v` also deletes that volume and its data.

## Run locally

Run MongoDB locally or in a separate container first. Copy `task-manager-api/.env.example` to `task-manager-api/.env` if needed, then set `MONGO_URI` to your local MongoDB address, for example `mongodb://127.0.0.1:27017/taskdb`.

In one terminal, start the backend:

```powershell
cd task-manager-api
npm install
npm run dev
```

The local API defaults to **http://localhost:5000**.

In a second terminal, start the frontend:

```powershell
cd student-portfolio
npm install
npm run dev
```

Open the Vite URL printed in the terminal, normally **http://localhost:5173**. By default, the frontend uses `http://localhost:5000` for API requests. `VITE_API_BASE_URL` can override that URL; do not put secret keys in frontend environment variables.

## API overview

Base URL is `http://localhost:5000` for local development or `http://localhost:5001` with Docker. Task endpoints require `Authorization: Bearer <JWT>`.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | API health and endpoint overview |
| `POST` | `/auth/register` | Register with an email and password |
| `POST` | `/auth/login` | Log in and receive a JWT |
| `GET` | `/tasks` | List the signed-in user's tasks; returns `X-Cache` |
| `POST` | `/tasks` | Create a task; requires a title |
| `GET` | `/tasks/:id` | Read one task belonging to the signed-in user |
| `PUT` | `/tasks/:id` | Update supplied task fields |
| `DELETE` | `/tasks/:id` | Delete a task belonging to the signed-in user |
| `POST` | `/api/ai/generate-description` | Generate a task description with Gemini or fallback |

Example task body:

```json
{
  "title": "Prepare the practical demonstration",
  "description": "Review the API and record the demo.",
  "completed": false
}
```

## Project structure

```text
AWDF-Sem5/
├── docker-compose.yml
├── .github/workflows/ci.yml
├── PROJECT_GUIDE.md
├── student-portfolio/
│   ├── Dockerfile
│   └── src/
│       ├── App.jsx
│       ├── config.js
│       └── components/
├── task-manager-api/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── events.js
│   └── listeners.js
└── hateoas/
    └── server.js
```

## Run checks

Frontend production build:

```powershell
cd student-portfolio
npm run build
```

Backend automated tests:

```powershell
cd task-manager-api
npm test
```

The GitHub Actions workflow runs the backend test command on pushes to `main`.
