# Task Management App — Product Requirements

## Core Features

1. **Create a task** — with title, description, priority, deadline, and status
2. **Update a task's properties** — title, description, priority, deadline, and status
3. **Delete a task**
4. **View all tasks** — organized in four columns by status: Todo, In Progress, Blocked, Done
5. **Click a task** — to view and edit its details
6. **Filter tasks by deadline** — default: current week; user can select a custom date range

## Task Properties

| Property      | Type   | Details                          |
|---------------|--------|----------------------------------|
| Title         | Text   | Required                         |
| Description   | Text   | Optional                         |
| Priority      | Enum   | High / Medium / Low              |
| Status        | Enum   | Todo / In progress / Blocked / Done |
| Deadline      | Date   | —                                |

## Out of Scope

- Authentication
- Drag and drop
