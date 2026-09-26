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

    // Submit answer and evaluate using AI
    public Answer submitAnswer(SubmitAnswerRequest request) {

        Question question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        Answer answer = new Answer();

        answer.setQuestion(question);
        answer.setAnswerText(request.getAnswerText());

        // Save answer first
        Answer savedAnswer = answerRepository.save(answer);

        // AI evaluation
        Answer evaluatedAnswer =
                aiAnswerEvaluationService.evaluateAnswer(savedAnswer);

        Answer finalAnswer =
                answerRepository.save(evaluatedAnswer);

        // Check whether all questions are answered
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

        // Mark interview as completed
        if (allAnswered) {
            interviewService.completeInterview(interviewId);
        }

        return finalAnswer;
    }

    // Evaluate an existing answer
    public Answer evaluateAnswer(Integer answerId) {

        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        // Evaluate answer using AI
        Answer evaluatedAnswer =
                aiAnswerEvaluationService.evaluateAnswer(answer);

        // Save score and feedback
        Answer finalAnswer =
                answerRepository.save(evaluatedAnswer);

        // Get interview through question
        Question question = answer.getQuestion();

        Integer interviewId =
                question.getInterview().getInterviewId();

        // Get all questions of this interview
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