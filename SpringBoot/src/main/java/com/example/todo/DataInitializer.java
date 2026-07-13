package com.example.todo;

import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TodoRepository todoRepository;

    public DataInitializer(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public void run(String... args) {
        // Seed some sample todos
        Todo t1 = new Todo();
        t1.setTitle("Buy groceries");
        t1.setDescription("Milk, eggs, bread, and coffee");
        t1.setPriority(Todo.Priority.HIGH);

        Todo t2 = new Todo();
        t2.setTitle("Read a book");
        t2.setDescription("Finish 'Clean Code' by Robert Martin");
        t2.setPriority(Todo.Priority.MEDIUM);

        Todo t3 = new Todo();
        t3.setTitle("Go for a walk");
        t3.setDescription("30-minute walk in the park");
        t3.setCompleted(true);
        t3.setPriority(Todo.Priority.LOW);

        todoRepository.save(t1);
        todoRepository.save(t2);
        todoRepository.save(t3);

        System.out.println("✅ Sample todos loaded!");
    }
}
