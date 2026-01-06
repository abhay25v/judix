# API Documentation

Base URL (dev): `http://localhost:5000`

Authentication uses a JWT stored in an httpOnly cookie named `token`.

## Auth

### POST /auth/register

Creates a user and sets the auth cookie.

Body:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

### POST /auth/login

Logs in a user and sets the auth cookie.

Body:
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

### GET /auth/me

Returns the current authenticated user.

Requires cookie: `token`

### POST /auth/logout

Clears the auth cookie.

## Tasks

All task endpoints require authentication (cookie: `token`).

### POST /tasks

Creates a task.

Body:
```json
{
  "title": "Finish assignment",
  "description": "Build auth + tasks"
}
```

### GET /tasks

List tasks for the current user.

Query params:
- `search` (string) searches in title/description
- `completed` (`true` or `false`) filters by completion

Examples:
- `/tasks?search=assignment`
- `/tasks?completed=true`

### PUT /tasks/:id

Updates a task owned by the current user.

Body (any subset):
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

### DELETE /tasks/:id

Deletes a task owned by the current user.
