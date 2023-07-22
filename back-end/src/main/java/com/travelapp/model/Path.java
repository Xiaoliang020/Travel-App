package com.travelapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "paths")
@Data
public class Path {
    @Id
    private String id;
    private List<String> path;
    private String startTime;
    private String endTime;
    private int duration;
    private String startAddress;
    private String endAddress;
    private String userid;
}
