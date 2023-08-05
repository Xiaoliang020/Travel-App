package com.travelapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;

import com.travelapp.model.Path;
import com.travelapp.repository.PathRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PathService {
    private final PathRepository pathRepository;

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    public PathService(PathRepository pathRepository) {
        this.pathRepository = pathRepository;
    }

    public Path savePath(Path path) {
        return pathRepository.save(path);
    }

    public Optional<Path> findPath(String id) {
        return pathRepository.findById(id);
    }

    public List<Path> getPathsByUserId(String userid) {
        return pathRepository.findByUserid(userid);
    }

    public boolean deletePathById(String pathId) {
        // Check if the path with the given pathId exists in the database
        if (pathRepository.existsById(pathId)) {
            pathRepository.deleteById(pathId);
            return true;
        } else {
            return false;
        }
    }

    // Save the path screenshot image to MongoDB GridFS and update the path's screenshotUrl field
    public String saveScreenshot(String pathId, MultipartFile file) throws IOException {
        // Save the screenshot image to MongoDB GridFS
        DBObject metaData = new BasicDBObject();
        metaData.put("type", "screenshot");
        ObjectId fileId = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType(), metaData);

        // Save the screenshot image to MongoDB GridFS and get the avatar URL or ID
        String screenshotUrlOrId = fileId.toString();

        // Update the user's avatarUrl field with the new avatar URL or ID
        Path path = pathRepository.findById(pathId).orElseThrow(() -> new RuntimeException("Path not found"));
        path.setScreenshotUrl(screenshotUrlOrId);
        pathRepository.save(path);

        return screenshotUrlOrId;
    }

    // Method to fetch screenshot data by URL
    public byte[] getScreenshotDataByUrl(String screenshotUrl) throws IOException {
        // Convert the avatarUrl string to ObjectId
        ObjectId screenshotObjectId;
        try {
            screenshotObjectId = new ObjectId(screenshotUrl);
        } catch (IllegalArgumentException e) {
            throw new FileNotFoundException("Invalid screenshot URL format.");
        }

        // Create a query to find the avatar with the given ObjectId
        Query query = new Query(Criteria.where("_id").is(screenshotObjectId));

        // Find the avatar in GridFS
        GridFSFile gridFSFile = gridFsTemplate.findOne(query);

        if (gridFSFile == null) {
            throw new FileNotFoundException("Screenshot not found for the given URL.");
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

        return outputStream.toByteArray();
    }
}
