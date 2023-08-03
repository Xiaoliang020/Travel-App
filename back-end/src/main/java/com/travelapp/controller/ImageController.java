package com.travelapp.controller;

import org.bson.types.ObjectId;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import java.io.IOException;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;

import com.travelapp.common.Result;

@RestController
public class ImageController {
    @Autowired
    private GridFsTemplate gridFsTemplate;

    @GetMapping("/img/{imageId}")
    public Result<?> getImage(@PathVariable String imageId) throws IOException {
        // Convert the avatarUrl string to ObjectId
        ObjectId imgObjectId;
        try {
            imgObjectId = new ObjectId(imageId);
        } catch (IllegalArgumentException e) {
            throw new FileNotFoundException("Invalid avatar URL format.");
        }

        // Create a query to find the avatar with the given ObjectId
        Query query = new Query(Criteria.where("_id").is(imgObjectId));

        // Find the avatar in GridFS
        GridFSFile gridFSFile = gridFsTemplate.findOne(query);

        if (gridFSFile == null) {
            throw new FileNotFoundException("Avatar not found for the given URL.");
        }

        // Get the InputStream of the avatar file
        GridFsResource resource = gridFsTemplate.getResource(gridFSFile);

        InputStream inputStream = resource.getInputStream();

        // Read the avatar data and convert it to a byte array
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        int data;
        while ((data = inputStream.read()) != -1) {
            outputStream.write(data);
        }
        inputStream.close();
        outputStream.close();

        byte[] avatarData = outputStream.toByteArray();

        return Result.success(avatarData);
    }
}
