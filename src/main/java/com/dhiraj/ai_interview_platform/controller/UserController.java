package com.dhiraj.ai_interview_platform.controller;
import com.dhiraj.ai_interview_platform.dto.RegisterRequest;
import java.util.List;
import com.dhiraj.ai_interview_platform.dto.LoginRequest;
import com.dhiraj.ai_interview_platform.dto.UserResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhiraj.ai_interview_platform.entity.User;
import com.dhiraj.ai_interview_platform.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }

    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Integer id,
            @RequestBody User user) {

        return userService.updateUser(id, user);
    }
    @PostMapping("/register")
    public UserResponse registerUser(@RequestBody RegisterRequest request) {

        User user = new User(
                request.getName(),
                request.getEmail(),
                request.getPassword()
        );

        User savedUser = userService.registerUser(user);

        return new UserResponse(
                savedUser.getUserId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }
    @PostMapping("/login")
    public UserResponse loginUser(@RequestBody LoginRequest request) {

        User user = userService.loginUser(
                request.getEmail(),
                request.getPassword()
        );

        return new UserResponse(
                user.getUserId(),
                user.getName(),
                user.getEmail()
        );
    }
}