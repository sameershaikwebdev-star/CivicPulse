package com.example.todo.model;

import jakarta.validation.constraints.NotBlank;

public class TodoRequest {

    @NotBlank(message = "Title cannot be blank")
    private String title;

    private String description;

    private boolean completed = false;

    private Todo.Priority priority = Todo.Priority.MEDIUM;

    public TodoRequest() {}

    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public boolean isCompleted() { return completed; }
    public Todo.Priority getPriority() { return priority; }

    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public void setPriority(Todo.Priority priority) { this.priority = priority; }
}
