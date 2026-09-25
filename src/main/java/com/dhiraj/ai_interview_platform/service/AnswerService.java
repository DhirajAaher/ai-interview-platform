package com.dhiraj.ai_interview_platform.service;

import com.dhiraj.ai_interview_platform.dto.SubmitAnswerRequest;
import com.dhiraj.ai_interview_platform.entity.Answer;
import com.dhiraj.ai_interview_platform.entity.Question;
import com.dhiraj.ai_interview_platform.repository.AnswerRepository;
import com.dhiraj.ai_interview_platform.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final AIAnswerEvaluationService aiAnswerEvaluationService;
    private final InterviewService interviewService;
    public AnswerService(
            AnswerRepository answerRepository,
            QuestionRepository questionRepository,
            AIAnswerEvaluationService aiAnswerEvaluationService,
            InterviewService interviewService) {

        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.aiAnswerEvaluationService = aiAnswerEvaluationService;
        this.interviewService = interviewService;
    }

    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }

    public Optional<Answer> getAnswerById(Integer id) {
        return answerRepository.findById(id);
    }

    public Answer updateAnswer(Integer id, Answer updatedAnswer) {

        Answer existingAnswer = answerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        existingAnswer.setQuestion(updatedAnswer.getQuestion());
        existingAnswer.setAnswerText(updatedAnswer.getAnswerText());
        existingAnswer.setScore(updatedAnswer.getScore());
        existingAnswer.setFeedback(updatedAnswer.getFeedback());

        return answerRepository.save(existingAnswer);
    }

    public void deleteAnswer(Integer id) {
        answerRepository.deleteById(id);
    }

    public List<Answer> getAnswersByQuestionId(Integer questionId) {
        return answerRepository.findByQuestionQuestionId(questionId);
    }

    public Answer submitAnswer(SubmitAnswerRequest request) {

        Question question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        Answer answer = new Answer();

        answer.setQuestion(question);
        answer.setAnswerText(request.getAnswerText());

        // First save the answer
        Answer savedAnswer = answerRepository.save(answer);

        // Then evaluate using Gemini
        Answer evaluatedAnswer =
                aiAnswerEvaluationService.evaluateAnswer(savedAnswer);

        // Save score and feedback
        return answerRepository.save(evaluatedAnswer);
    }
    public Answer evaluateAnswer(
            Integer answerId,
            AIAnswerEvaluationService evaluationService) {

        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        Answer evaluatedAnswer = evaluationService.evaluateAnswer(answer);

        return answerRepository.save(evaluatedAnswer);
    }
    public Answer evaluateAnswer(Integer answerId) {

        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        Answer evaluatedAnswer =
                aiAnswerEvaluationService.evaluateAnswer(savedAnswer);

        Answer finalAnswer = answerRepository.save(evaluatedAnswer);

        // Check whether all questions of this interview are answered
        Integer interviewId =
                question.getInterview().getInterviewId();

        List<Question> questions =
                questionRepository.findByInterviewInterviewId(interviewId);

        boolean allAnswered = true;

        for (Question q : questions) {

            List<Answer> answers =
                    answerRepository.findByQuestionQuestionId(
                            q.getQuestionId());

            if (answers.isEmpty()) {
                allAnswered = false;
                break;
            }
        }

        // Complete interview when all questions are answered
        if (allAnswered) {
            interviewService.completeInterview(interviewId);
        }

        return finalAnswer;
    }
}