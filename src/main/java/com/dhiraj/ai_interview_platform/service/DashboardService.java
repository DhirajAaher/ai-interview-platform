package com.dhiraj.ai_interview_platform.service;

import com.dhiraj.ai_interview_platform.dto.DashboardDTO;
import com.dhiraj.ai_interview_platform.entity.Answer;
import com.dhiraj.ai_interview_platform.entity.Interview;
import com.dhiraj.ai_interview_platform.entity.Question;
import com.dhiraj.ai_interview_platform.repository.AnswerRepository;
import com.dhiraj.ai_interview_platform.repository.InterviewRepository;
import com.dhiraj.ai_interview_platform.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final InterviewRepository interviewRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    public DashboardService(
            InterviewRepository interviewRepository,
            QuestionRepository questionRepository,
            AnswerRepository answerRepository) {

        this.interviewRepository = interviewRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    public DashboardDTO getDashboardData(Integer userId) {

        // Get user's interviews
        List<Interview> interviews =
                interviewRepository.findByUserUserIdOrderByCreatedAtDesc(userId);

        long totalInterviews = interviews.size();

        // Count completed interviews
        long completedInterviews =
                interviews.stream()
                        .filter(interview ->
                                "COMPLETED".equalsIgnoreCase(
                                        interview.getStatus()))
                        .count();

        long totalQuestions = 0;
        long answeredQuestions = 0;

        int totalScore = 0;
        int scoredAnswers = 0;

        // Process each interview
        for (Interview interview : interviews) {

            List<Question> questions =
                    questionRepository.findByInterviewInterviewId(
                            interview.getInterviewId());

            totalQuestions += questions.size();

            // Process questions
            for (Question question : questions) {

                List<Answer> answers =
                        answerRepository.findByQuestionQuestionId(
                                question.getQuestionId());

                if (!answers.isEmpty()) {

                    // Use latest answer
                    Answer answer =
                            answers.get(answers.size() - 1);

                    answeredQuestions++;

                    if (answer.getScore() != null) {

                        totalScore += answer.getScore();

                        scoredAnswers++;
                    }
                }
            }
        }

        double averageScore =
                scoredAnswers > 0
                        ? (double) totalScore / scoredAnswers
                        : 0.0;

        return new DashboardDTO(
                totalInterviews,
                completedInterviews,
                totalQuestions,
                answeredQuestions,
                averageScore
        );
    }
}