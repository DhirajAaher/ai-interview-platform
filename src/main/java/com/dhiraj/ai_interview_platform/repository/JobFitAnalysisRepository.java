package com.dhiraj.ai_interview_platform.repository;

import com.dhiraj.ai_interview_platform.entity.JobFitAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobFitAnalysisRepository
        extends JpaRepository<JobFitAnalysis, Integer> {

    List<JobFitAnalysis> findByResumeUserUserIdOrderByCreatedAtDesc(
            Integer userId
    );
}