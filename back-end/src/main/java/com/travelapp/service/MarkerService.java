package com.travelapp.service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.travelapp.model.Marker;
import com.travelapp.model.User;
import com.travelapp.repository.MarkerRepository;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Service
public class MarkerService {
    private final MarkerRepository markerRepository;
    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    public MarkerService(MarkerRepository markerRepository) {
        this.markerRepository = markerRepository;
    }

    public Marker saveMarker(Marker marker) {
        return markerRepository.save(marker);
    }

    public List<Marker> getPathsByUserId(String pathid) {
        return markerRepository.findByPathID(pathid);
    }

    // Save the icon image to MongoDB GridFS and update the marker's icon field
    public String saveIcon(MultipartFile file) throws IOException {
        // Save the icon image to MongoDB GridFS
        DBObject metaData = new BasicDBObject();
        metaData.put("type", "icon");
        ObjectId fileId = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType(),
                metaData);

        // Save the icon image to MongoDB GridFS and get the icon URL or ID
        String iconUrlOrId = fileId.toString();

        // Update the marker's icon field with the new icon URL or ID
        // Marker marker = markerRepository.findByMarkerID(markerID).orElseThrow(() ->
        // new RuntimeException("Marker not found"));
        // marker.setIcon(iconUrlOrId);
        // markerRepository.save(marker);

        return iconUrlOrId;
    }

    // Save the picture image to MongoDB GridFS and update the marker's picture
    // field
    public String savePicture(MultipartFile file) throws IOException {
        // Save the icon image to MongoDB GridFS
        DBObject metaData = new BasicDBObject();
        metaData.put("type", "picture");
        ObjectId fileId = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType(),
                metaData);

        // Save the icon image to MongoDB GridFS and get the icon URL or ID
        String pictureUrlOrId = fileId.toString();

        // // Update the marker's picture field with the new picture objectID
        // Marker marker = markerRepository.findByMarkerID(markerID).orElseThrow(() ->
        // new RuntimeException("Marker not found"));
        // marker.setIcon(iconUrlOrId);
        // markerRepository.save(marker);

        return pictureUrlOrId;
    }

    // Method to fetch icon data by URL
    public byte[] getIconDataByIconId(String icon) throws IOException {
        // Convert the icon string to ObjectId
        ObjectId iconObjectId;
        try {
            iconObjectId = new ObjectId(icon);
        } catch (IllegalArgumentException e) {
            throw new FileNotFoundException("Invalid icon URL format.");
        }

        // Create a query to find the icon with the given ObjectId
        Query query = new Query(Criteria.where("_id").is(iconObjectId));

        // Find the icon in GridFS
        GridFSFile gridFSFile = gridFsTemplate.findOne(query);

        if (gridFSFile == null) {
            throw new FileNotFoundException("Icon not found for the given URL.");
        }

        // Get the InputStream of the icon file
        GridFsResource resource = gridFsTemplate.getResource(gridFSFile);
        InputStream inputStream = resource.getInputStream();

        // Read the icon data and convert it to a byte array
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        int data;
        while ((data = inputStream.read()) != -1) {
            outputStream.write(data);
        }
        inputStream.close();
        outputStream.close();

        return outputStream.toByteArray();
    }

    // Method to fetch picture data by URL
    public byte[] getPictureDataByPictureId(String picture) throws IOException {
        // Convert the picture string to ObjectId
        ObjectId pictureObjectId;
        try {
            pictureObjectId = new ObjectId(picture);
        } catch (IllegalArgumentException e) {
            throw new FileNotFoundException("Invalid picture URL format.");
        }

        // Create a query to find the picture with the given ObjectId
        Query query = new Query(Criteria.where("_id").is(pictureObjectId));

        // Find the picture in GridFS
        GridFSFile gridFSFile = gridFsTemplate.findOne(query);

        if (gridFSFile == null) {
            throw new FileNotFoundException("Picture not found for the given URL.");
        }

        // Get the InputStream of the icon file
        GridFsResource resource = gridFsTemplate.getResource(gridFSFile);
        InputStream inputStream = resource.getInputStream();

        // Read the picture data and convert it to a byte array
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        int data;
        while ((data = inputStream.read()) != -1) {
            outputStream.write(data);
        }
        inputStream.close();
        outputStream.close();

        return outputStream.toByteArray();
    }

    public Marker updateMarker(Marker marker) {
        Optional<Marker> optionalMarker = markerRepository.findByMarkerID(marker.getMarkerID());
        if (!optionalMarker.isPresent()) {
            throw new RuntimeException("Marker not found");
        }

        Marker oldMarker = optionalMarker.get();
        oldMarker.setMarkerLat(marker.getMarkerLat());
        oldMarker.setMarkerLng(marker.getMarkerLng());
        oldMarker.setType(marker.getType());
        oldMarker.setName(marker.getName());
        oldMarker.setText(marker.getText());
        oldMarker.setIcon(marker.getIcon());
        oldMarker.setPicture(marker.getPicture());

        return markerRepository.save(oldMarker);
    }

}
