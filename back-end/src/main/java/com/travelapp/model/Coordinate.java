package com.travelapp.model;

import lombok.Data;

@Data
public class Coordinate {
    private double lat;
    private double lng;
    private String type;
    private int pathId;
}
