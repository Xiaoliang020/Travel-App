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

import com.travelapp.model.User;
import com.travelapp.repository.UserRepository;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GridFsTemplate gridFsTemplate;

    // Save the avatar image to MongoDB GridFS and update the user's avatarUrl field
    public String saveAvatar(String userId, MultipartFile file) throws IOException {
        // Save the avatar image to MongoDB GridFS
        DBObject metaData = new BasicDBObject();
        metaData.put("type", "avatar");
        ObjectId fileId = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType(), metaData);

        // Save the avatar image to MongoDB GridFS and get the avatar URL or ID
        String avatarUrlOrId = fileId.toString();

        // Update the user's avatarUrl field with the new avatar URL or ID
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setAvatarUrl(avatarUrlOrId);
        userRepository.save(user);

        return avatarUrlOrId;
    }

    public Optional<User> findUser(String id) {
        return userRepository.findById(id);
    }

    // Method to fetch avatar data by URL
    public byte[] getAvatarDataByUrl(String avatarUrl) throws IOException {
        // Convert the avatarUrl string to ObjectId
        ObjectId avatarObjectId;
        try {
            avatarObjectId = new ObjectId(avatarUrl);
        } catch (IllegalArgumentException e) {
            throw new FileNotFoundException("Invalid avatar URL format.");
        }

        // Create a query to find the avatar with the given ObjectId
        Query query = new Query(Criteria.where("_id").is(avatarObjectId));

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

        return outputStream.toByteArray();
    }

    // Method to delete the avatar file from MongoDB GridFS
    public void deleteAvatar(String avatarUrl) throws IOException {
        // Extract the ObjectId from the avatarUrl
        ObjectId avatarObjectId = new ObjectId(avatarUrl);

        // Create a query to find the avatar file by its ObjectId in both fs.files and fs.chunks collections
        Query fileQuery = Query.query(Criteria.where("_id").is(avatarObjectId));
        Query chunksQuery = Query.query(Criteria.where("files_id").is(avatarObjectId));

        // Use GridFsTemplate to delete the avatar file from both collections
        gridFsTemplate.delete(fileQuery);
        gridFsTemplate.delete(chunksQuery);
    }
}