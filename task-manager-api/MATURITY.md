# Richardson Maturity Model (RMM) Evaluation

This document evaluates the **Task Management API** against the **Richardson Maturity Model (RMM)** to measure its level of REST compliance.

---

## Evaluation Summary

- **Current RMM Level Satisfied:** **Level 3 (HATEOAS / Hypermedia Controls)** *(Upgraded from Level 2)*
- **Justification:** 
  1. **Level 1 (Resources):** The API defines distinct resource URIs (`/tasks`, `/tasks/:id`) instead of a single endpoint.
  2. **Level 2 (HTTP Verbs & Status Codes):** Uses standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`), status codes (`200`, `201`, `400`, `404`, `500`), and `Location` header on creation.
  3. **Level 3 (HATEOAS):** Response payloads include hypermedia controls (`_links`) embedding self-referential and actionable URLs (`self`, `delete`).

---

## Evaluation Matrix

| Level | Criterion | Does your API satisfy this? | Evidence |
|---|---|---|---|
| **Level 0** | Single URI, single HTTP method (RPC style). | **Exceeded** | API uses dedicated resource paths and appropriate HTTP verbs instead of RPC tunneling. |
| **Level 1** | Multiple URIs identifying individual resources (`/tasks`, `/tasks/:id`). | **Yes** | Distinct URIs exist for resource collections (`/tasks`) and individual tasks (`/tasks/:id`). |
| **Level 2** | Correct use of HTTP Verbs (`GET`, `POST`, `PUT`, `DELETE`) and HTTP Status Codes (`200`, `201`, `400`, `404`, `500`). | **Yes** | `GET /tasks` (200), `GET /tasks/:id` (200), `POST /tasks` (201 + `Location` header), `PUT /tasks/:id` (200), `DELETE /tasks/:id` (200). |
| **Level 3** | Hypermedia Controls (HATEOAS) embedded in responses allowing clients to discover actions via `_links`. | **Yes** | Every task resource in responses includes a `_links` object containing `self` and `delete` URIs. |

---

## HATEOAS Awareness & Implementation

**HATEOAS (Hypermedia As The Engine Of Application State)** is the core requirement for RMM Level 3. It allows clients to dynamically discover actions and nav-links directly from the resource response without hardcoding URLs.

### Response Payload Structure with HATEOAS (`_links`)

```json
{
  "id": 1,
  "title": "Set up Express server",
  "completed": true,
  "_links": {
    "self": "/tasks/1",
    "delete": "/tasks/1"
  }
}
```

### Links Included in Response:
1. **`self` (`/tasks/:id`)**: Direct URI to retrieve/view the specific task resource.
2. **`delete` (`/tasks/:id`)**: Action URI to remove the task resource.
