package com.dhiraj.ai_interview_platform.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dhiraj.ai_interview_platform.entity.User;
import com.dhiraj.ai_interview_platform.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    public User updateUser(Integer id, User user) {

        User existingUser = userRepository.findById(id).orElse(null);

        if (existingUser == null) {
            return null;
        }

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());

        return userRepository.save(existingUser);
    }
        public User registerUser(User user) {

            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

            if (existingUser.isPresent()) {
                throw new RuntimeException("Email already registered");
            }

            return userRepository.save(user);
        }

        public User loginUser(String email, String password) {

            System.out.println("========== LOGIN DEBUG ==========");
            System.out.println("Email received: [" + email + "]");
            System.out.println("Password received: [" + password + "]");

            Optional<User> user = userRepository.findByEmail(email);

            if (user.isEmpty()) {
                System.out.println("USER NOT FOUND");
                throw new RuntimeException("User not found");
            }

            System.out.println("User found: " + user.get().getEmail());
            System.out.println("Password from DB: [" + user.get().getPassword() + "]");

            if (user.get().getPassword() == null ||
                    !user.get().getPassword().equals(password)) {

                System.out.println("PASSWORD DOES NOT MATCH");
                throw new RuntimeException("Invalid password");
            }

            System.out.println("LOGIN SUCCESS");
            return user.get();
        }
        
    }
