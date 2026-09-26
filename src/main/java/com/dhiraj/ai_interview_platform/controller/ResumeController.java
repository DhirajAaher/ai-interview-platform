package com.dhiraj.ai_interview_platform.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dhiraj.ai_interview_platform.entity.Resume;
import com.dhiraj.ai_interview_platform.entity.User;
import com.dhiraj.ai_interview_platform.repository.UserRepository;
import com.dhiraj.ai_interview_platform.service.ResumeService;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {
    private final ResumeService resumeService;
    private final UserRepository userRepository;
    public ResumeController(
            ResumeService resumeService,
            UserRepository userRepository) {

        this.resumeService = resumeService;
        this.userRepository = userRepository;
    }
    @PostMapping
    public Resume createResume(@RequestBody Resume resume) {
        return resumeService.createResume(resume);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Integer userId) {

        try {

            // Check file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("Please select a resume file.");
            }

            // Get original filename
            String originalFileName =
                    file.getOriginalFilename();

            // Check PDF
            if (originalFileName == null ||
                    !originalFileName.toLowerCase().endsWith(".pdf")) {

                return ResponseEntity.badRequest()
                        .body("Only PDF resumes are allowed.");
            }

            // Find user
            User user = userRepository.findById(userId)
                    .orElseThrow(() ->
                            new RuntimeException("User not found"));

            // Create upload directory
            Path uploadPath =
                    Paths.get("uploads/resumes");

            Files.createDirectories(uploadPath);

            // Create unique filename
            String fileName =
                    System.currentTimeMillis()
                            + "_"
                            + originalFileName;

            Path filePath =
                    uploadPath.resolve(fileName);

            // Save PDF
            Files.copy(
                    file.getInputStream(),
                    filePath
            );

            // Save resume information
            Resume resume = new Resume();

            resume.setResumeName(originalFileName);
            resume.setResumeUrl(filePath.toString());
            resume.setUser(user);

            Resume savedResume =
                    resumeService.createResume(resume);

            return ResponseEntity.ok(savedResume);

        } catch (IOException e) {

            return ResponseEntity.internalServerError()
                    .body("Failed to upload resume.");

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public List<Resume> getAllResumes() {
        return resumeService.getAllResumes();
    }

    @GetMapping("/{id}")
    public Resume getResumeById(@PathVariable Integer id) {
        return resumeService.getResumeById(id);
    }

    @PutMapping("/{id}")
    public Resume updateResume(
            @PathVariable Integer id,
            @RequestBody Resume resume) {

        return resumeService.updateResume(id, resume);
    }

    @DeleteMapping("/{id}")
    public void deleteResume(@PathVariable Integer id) {
        resumeService.deleteResume(id);
    }
   
   
}