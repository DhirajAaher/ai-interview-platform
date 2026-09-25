package com.dhiraj.ai_interview_platform.service;
import java.util.List;
import org.springframework.stereotype.Service;
import com.dhiraj.ai_interview_platform.entity.Resume;
import com.dhiraj.ai_interview_platform.repository.ResumeRepository;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;

    public ResumeService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    public Resume createResume(Resume resume) {
        return resumeRepository.save(resume);
    }

    public List<Resume> getAllResumes() {
        return resumeRepository.findAll();
    }

    public Resume getResumeById(Integer id) {
        return resumeRepository.findById(id).orElse(null);
    }

    public void deleteResume(Integer id) {
        resumeRepository.deleteById(id);
    }

    public Resume updateResume(Integer id, Resume resume) {

        Resume existingResume = resumeRepository.findById(id).orElse(null);

        if (existingResume == null) {
            return null;
        }

        existingResume.setResumeName(resume.getResumeName());
        existingResume.setResumeUrl(resume.getResumeUrl());
        existingResume.setUser(resume.getUser());
        
        return resumeRepository.save(existingResume);
        
    }
}