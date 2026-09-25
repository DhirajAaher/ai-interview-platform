package com.dhiraj.ai_interview_platform.repository;

import com.dhiraj.ai_interview_platform.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewRepository extends JpaRepository<Interview, Integer> {
}