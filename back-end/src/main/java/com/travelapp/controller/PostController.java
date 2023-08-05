package com.travelapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelapp.common.Result;
import com.travelapp.model.Post;
import com.travelapp.model.Comment;
import com.travelapp.service.PostService;

import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/make-post")
    public Result<?> savePathData(@RequestBody Post postData) {
        postService.savePost(postData);
        return Result.success();
    }

    @GetMapping("/posts")
    public Result<?> getAllPosts() {
        return Result.success(postService.getAllPosts());
    }

    @GetMapping("/post/{postid}")
    public Result<?> getPostById(@PathVariable String postid) {
        Optional<Post> post = postService.getPost(postid);
        if (post.isPresent()) {
            return Result.success(post.get());
        } else {
            return Result.error("-1", "Post not found");
        }
    }

    @PostMapping("/post/{postId}/reply")
    public Result<?> addReplyToPost(@PathVariable String postId, @RequestBody Comment newComment) {
        // Generate a UUID for the new comment
        String commentId = UUID.randomUUID().toString();
        newComment.setId(commentId);
        // Fetch the existing post from the database
        Optional<Post> postOp = postService.getPost(postId);
        if (!postOp.isPresent()) {
            return Result.error("-1", "Post not found");
        }
        Post post = postOp.get();
        // Add the new comment to the post's comments list
        if (post.getComments() == null) {
            post.setComments(new ArrayList<>());
        }
        newComment.setCreatedAt(new Date()); // Set the creation date of the new comment
        post.getComments().add(newComment);

        // Save the updated post back to the database
        postService.savePost(post);

        return Result.success(post.getComments());
    }
}
