package com.dhiraj.ai_interview_platform.service;

import com.dhiraj.ai_interview_platform.entity.Interview;
import com.dhiraj.ai_interview_platform.entity.Question;

import java.util.List;

public interface AIQuestionService {

    List<Question> generateQuestions(
            Interview interview,
            int numberOfQuestions
    );
}