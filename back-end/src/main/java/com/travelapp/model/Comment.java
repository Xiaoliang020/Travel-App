package com.travelapp.model;

import lombok.Data;
import java.util.Date;

@Data
public class Comment {
    private String id;
    private String userid;
    private String username;
    private String avatarid;
    private String content;
    // You can add more fields like createdAt, updatedAt, etc., if needed.
    private Date createdAt;
}
