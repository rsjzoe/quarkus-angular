package org.acme.task;

import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Task extends PanacheEntity {
    public String title;
    public String description;
    public boolean completed;

    public static List<Task> findByTitle(String title) {
        return Task.find("title", title).list();
    }
}
