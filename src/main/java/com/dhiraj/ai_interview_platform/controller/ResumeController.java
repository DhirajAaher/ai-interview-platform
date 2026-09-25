package com.dhiraj.ai_interview_platform.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhiraj.ai_interview_platform.entity.Resume;
import com.dhiraj.ai_interview_platform.service.ResumeService;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping
    public Resume createResume(@RequestBody Resume resume) {
        return resumeService.createResume(resume);
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