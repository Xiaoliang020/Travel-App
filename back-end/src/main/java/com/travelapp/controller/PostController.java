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
import com.travelapp.service.PostService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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
}
