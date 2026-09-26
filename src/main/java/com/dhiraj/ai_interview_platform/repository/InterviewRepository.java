package com.dhiraj.ai_interview_platform.repository;

import com.dhiraj.ai_interview_platform.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewRepository extends JpaRepository<Interview, Integer> {

    List<Interview> findByUserUserIdOrderByCreatedAtDesc(Integer userId);
}