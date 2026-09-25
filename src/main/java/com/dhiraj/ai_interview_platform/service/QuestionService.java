package com.dhiraj.ai_interview_platform.service;

import com.dhiraj.ai_interview_platform.entity.Question;
import com.dhiraj.ai_interview_platform.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Optional<Question> getQuestionById(Integer id) {
        return questionRepository.findById(id);
    }

    public Question updateQuestion(Integer id, Question updatedQuestion) {

        Question existingQuestion = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        existingQuestion.setQuestionText(updatedQuestion.getQuestionText());
        existingQuestion.setQuestionType(updatedQuestion.getQuestionType());
        existingQuestion.setDifficulty(updatedQuestion.getDifficulty());
        existingQuestion.setInterview(updatedQuestion.getInterview());

        return questionRepository.save(existingQuestion);
    }

    public void deleteQuestion(Integer id) {
        questionRepository.deleteById(id);
    }
    public List<Question> getQuestionsByInterviewId(Integer interviewId) {
        return questionRepository.findByInterviewInterviewId(interviewId);
    }	
}