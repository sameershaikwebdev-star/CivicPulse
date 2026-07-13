package com.example.todo;

import com.example.todo.model.Todo;
import com.example.todo.model.TodoRequest;
import com.example.todo.repository.TodoRepository;
import com.example.todo.service.TodoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldReturnAllTodos() {
        Todo todo = new Todo(1L, "Test", "Desc", false, Todo.Priority.MEDIUM, null, null);
        when(todoRepository.findAll()).thenReturn(List.of(todo));

        List<Todo> result = todoService.getAllTodos();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).isEqualTo("Test");
    }

    @Test
    void shouldCreateTodo() {
        TodoRequest request = new TodoRequest();
        request.setTitle("New Task");
        request.setDescription("Details");
        request.setPriority(Todo.Priority.HIGH);

        Todo saved = new Todo(1L, "New Task", "Details", false, Todo.Priority.HIGH, null, null);
        when(todoRepository.save(any(Todo.class))).thenReturn(saved);

        Todo result = todoService.createTodo(request);

        assertThat(result.getTitle()).isEqualTo("New Task");
        assertThat(result.getPriority()).isEqualTo(Todo.Priority.HIGH);
    }

    @Test
    void shouldToggleCompletion() {
        Todo todo = new Todo(1L, "Task", null, false, Todo.Priority.MEDIUM, null, null);
        when(todoRepository.findById(1L)).thenReturn(Optional.of(todo));
        when(todoRepository.save(any(Todo.class))).thenAnswer(inv -> inv.getArgument(0));

        Todo result = todoService.toggleComplete(1L);

        assertThat(result.isCompleted()).isTrue();
    }

    @Test
    void shouldThrowWhenTodoNotFound() {
        when(todoRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> todoService.getTodoById(99L));
    }

    @Test
    void shouldDeleteTodo() {
        Todo todo = new Todo(1L, "Task", null, false, Todo.Priority.LOW, null, null);
        when(todoRepository.findById(1L)).thenReturn(Optional.of(todo));

        todoService.deleteTodo(1L);

        verify(todoRepository, times(1)).deleteById(1L);
    }
}
