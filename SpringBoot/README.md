# 📝 Spring Boot Todo App

A clean, RESTful Todo application built with Spring Boot 3, Spring Data JPA, and an H2 in-memory database.

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven 3.8+

### Run the App

```bash
./mvnw spring-boot:run
```

The server starts at **http://localhost:8080**

### H2 Console (Database UI)
Visit **http://localhost:8080/h2-console**
- JDBC URL: `jdbc:h2:mem:tododb`
- Username: `sa`
- Password: *(leave blank)*

---

## 📡 API Endpoints

### Get All Todos
```
GET /api/todos
```
Optional query params:
- `?completed=true|false` — filter by status
- `?priority=LOW|MEDIUM|HIGH` — filter by priority
- `?search=keyword` — search by title

### Get Todo by ID
```
GET /api/todos/{id}
```

### Create Todo
```
POST /api/todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "HIGH"
}
```

### Update Todo
```
PUT /api/todos/{id}
Content-Type: application/json

{
  "title": "Buy groceries (updated)",
  "description": "Milk, eggs, bread, coffee",
  "completed": false,
  "priority": "HIGH"
}
```

### Toggle Complete/Incomplete
```
PATCH /api/todos/{id}/toggle
```

### Delete Todo
```
DELETE /api/todos/{id}
```

---

## 🏗️ Project Structure

```
src/
├── main/
│   ├── java/com/example/todo/
│   │   ├── TodoApplication.java       # Entry point
│   │   ├── DataInitializer.java       # Sample data loader
│   │   ├── controller/
│   │   │   ├── TodoController.java    # REST endpoints
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── model/
│   │   │   ├── Todo.java              # JPA entity
│   │   │   └── TodoRequest.java       # DTO / request body
│   │   ├── repository/
│   │   │   └── TodoRepository.java    # Spring Data repo
│   │   └── service/
│   │       └── TodoService.java       # Business logic
│   └── resources/
│       └── application.properties
└── test/
    └── java/com/example/todo/
        └── TodoServiceTest.java       # Unit tests
```

## 🔧 Tech Stack

| Layer        | Technology                  |
|--------------|-----------------------------|
| Framework    | Spring Boot 3.2             |
| Database     | H2 (in-memory)              |
| ORM          | Spring Data JPA / Hibernate |
| Validation   | Jakarta Validation          |
| Build Tool   | Maven                       |
| Java Version | 17                          |

## 🛠️ Switching to a Real Database

To use MySQL or PostgreSQL, replace the H2 dependency in `pom.xml` and update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/tododb
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```
