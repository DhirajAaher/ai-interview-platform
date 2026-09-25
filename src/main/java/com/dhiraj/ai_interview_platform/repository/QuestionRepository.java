package com.dhiraj.ai_interview_platform.repository;

import com.dhiraj.ai_interview_platform.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

    List<Question> findByInterviewInterviewId(Integer interviewId);
}