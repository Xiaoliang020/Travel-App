package com.travelapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "posts")
@Data
public class Post {
    @Id
    private String id;
    private String title;
    private String content;
    private String userid;
    private String avatarid;
    private String pathid;
    private List<Comment> comments;
    private Date createdAt;
}
