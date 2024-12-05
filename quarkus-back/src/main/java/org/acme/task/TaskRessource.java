package org.acme.task;

import java.util.ArrayList;
import java.util.List;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.WebApplicationException;

@Path("/task")
public class TaskRessource {
    @GET
    public List<Task> findAll() {
        return Task.findAll().list();
    }

    @GET
    @Path("/{title}")
    public List<Task> findByTitle(@PathParam("title") String title) {
        if (title == null) {
            return new ArrayList<>();
        }
        return Task.findByTitle(title);
    }

    @POST
    @Transactional
    public Task add(Task task) {
        task.persist();
        return task;
    }

    @PUT
    @Transactional
    @Path("/{id}")
    public Task update(@PathParam("id") Long id, Task updatedTask) {
        Task existingTask = Task.findById(id);
        if (existingTask == null) {
            throw new WebApplicationException("Task with id " + id + " does not exist.", 404);
        }
        existingTask.title = updatedTask.title;
        existingTask.completed = updatedTask.completed;
        existingTask.description = updatedTask.description;

        return existingTask;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        boolean deleted = Task.deleteById(id);
        if (!deleted) {
            throw new WebApplicationException("Task with id " + id + " does not exist.", 404);
        }
    }
}
