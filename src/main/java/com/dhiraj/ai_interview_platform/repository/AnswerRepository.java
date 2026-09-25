package com.dhiraj.ai_interview_platform.repository;

import com.dhiraj.ai_interview_platform.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {

    List<Answer> findByQuestionQuestionId(Integer questionId);
}