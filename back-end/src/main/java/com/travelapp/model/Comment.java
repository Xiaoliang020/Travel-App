package com.travelapp.model;

import lombok.Data;

@Data
public class Comment {
    private String id;
    private String userid;
    private String content;
    // You can add more fields like createdAt, updatedAt, etc., if needed.
}
