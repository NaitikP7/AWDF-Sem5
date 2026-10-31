# 🚀 AWDF-Sem5: Full-Stack Task Manager & Student Portfolio

> **Comprehensive Project Guide & Demonstration Walkthrough**: See [PROJECT_GUIDE.md](PROJECT_GUIDE.md) for full viva preparation, architecture breakdown, and demo instructions.

---

## ⚡ Quick Start (Docker)

To run the entire stack (MongoDB, Express API, and React Frontend) with one command:

```bash
docker-compose up --build
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5001](http://localhost:5001) (or `http://localhost:5000` locally)
- **MongoDB**: `localhost:27017`

---

## 📖 Key Project Components

1. **`student-portfolio`**: Modern React 19 + Vite + Tailwind CSS frontend with code splitting, client-side routing, and task management UI.
2. **`task-manager-api`**: Node.js & Express REST API with RMM Level 3 (HATEOAS), JWT authentication, MongoDB Mongoose integration, in-memory caching (`node-cache`), and EventEmitter-based background listeners.
3. **`docker-compose.yml`**: Multi-container orchestration linking all 3 services on an isolated bridge network.
4. **`hateoas`**: Standalone demonstration server for hypermedia controls.

For the project explanation, syllabus mapping and verification notes for Practicals 1–13, and the live demonstration guide, open **[PROJECT_GUIDE.md](PROJECT_GUIDE.md)**.
