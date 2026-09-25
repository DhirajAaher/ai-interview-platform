package com.dhiraj.ai_interview_platform.service;
import com.dhiraj.ai_interview_platform.dto.InterviewResultDTO;
import com.dhiraj.ai_interview_platform.dto.QuestionResultDTO;
import com.dhiraj.ai_interview_platform.dto.StartInterviewRequest;
import com.dhiraj.ai_interview_platform.entity.Answer;
import com.dhiraj.ai_interview_platform.entity.Interview;
import com.dhiraj.ai_interview_platform.entity.Question;
import com.dhiraj.ai_interview_platform.entity.User;
import com.dhiraj.ai_interview_platform.repository.AnswerRepository;
import com.dhiraj.ai_interview_platform.repository.InterviewRepository;
import com.dhiraj.ai_interview_platform.repository.QuestionRepository;
import com.dhiraj.ai_interview_platform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final UserRepository userRepository;
    private final AIQuestionService aiQuestionService;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    public InterviewService(
            InterviewRepository interviewRepository,
            UserRepository userRepository,
            AIQuestionService aiQuestionService,
            QuestionRepository questionRepository,
            AnswerRepository answerRepository) {

        this.interviewRepository = interviewRepository;
        this.userRepository = userRepository;
        this.aiQuestionService = aiQuestionService;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    // Create Interview
    public Interview createInterview(Interview interview) {

        return interviewRepository.save(interview);
    }

    // Start Interview
    public Interview startInterview(StartInterviewRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Interview interview = new Interview();

        interview.setUser(user);
        interview.setJobRole(request.getJobRole());
        interview.setExperienceLevel(request.getExperienceLevel());
        interview.setJobDescription(request.getJobDescription());
        interview.setCreatedAt(LocalDate.now());
        interview.setStatus("STARTED");

        // Save interview first
        Interview savedInterview = interviewRepository.save(interview);

        // Generate AI questions
        List<Question> questions =
                aiQuestionService.generateQuestions(
                        savedInterview,
                        request.getNumberOfQuestions()
                );

        // Save generated questions
        questionRepository.saveAll(questions);

        return savedInterview;
    }

    // Get All Interviews
    public List<Interview> getAllInterviews() {

        return interviewRepository.findAll();
    }

    // Get Interview By ID
    public Optional<Interview> getInterviewById(Integer id) {

        return interviewRepository.findById(id);
    }

    // Update Interview
    public Interview updateInterview(
            Integer id,
            Interview updatedInterview) {

        Interview existingInterview = interviewRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Interview not found"));

        existingInterview.setJobRole(
                updatedInterview.getJobRole());

        existingInterview.setExperienceLevel(
                updatedInterview.getExperienceLevel());

        existingInterview.setJobDescription(
                updatedInterview.getJobDescription());

        existingInterview.setCreatedAt(
                updatedInterview.getCreatedAt());

        existingInterview.setStatus(
                updatedInterview.getStatus());

        existingInterview.setUser(
                updatedInterview.getUser());

        return interviewRepository.save(existingInterview);
    }

    // Delete Interview
    public void deleteInterview(Integer id) {

        interviewRepository.deleteById(id);
    }

    // Complete Interview
    public Interview completeInterview(Integer interviewId) {

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() ->
                        new RuntimeException("Interview not found"));

        interview.setStatus("COMPLETED");

        return interviewRepository.save(interview);
    }

    // Get Interview Result
    public InterviewResultDTO getInterviewResult(Integer interviewId) {

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() ->
                        new RuntimeException("Interview not found"));

        List<Question> questions =
                questionRepository.findByInterviewInterviewId(interviewId);

        List<QuestionResultDTO> questionResults =
                new ArrayList<>();

        int answeredQuestions = 0;
        int totalScore = 0;

        for (Question question : questions) {

            List<Answer> answers =
                    answerRepository.findByQuestionQuestionId(
                            question.getQuestionId());

            QuestionResultDTO result = new QuestionResultDTO();

            result.setQuestionId(
                    question.getQuestionId());

            result.setQuestion(
                    question.getQuestionText());

            if (!answers.isEmpty()) {

                Answer answer =
                        answers.get(answers.size() - 1);

                result.setAnswer(
                        answer.getAnswerText());

                result.setScore(
                        answer.getScore());

                result.setFeedback(
                        answer.getFeedback());

                if (answer.getScore() != null) {

                    answeredQuestions++;

                    totalScore += answer.getScore();
                }

            } else {

                result.setAnswer(null);
                result.setScore(null);
                result.setFeedback(null);
            }

            questionResults.add(result);
        }

        InterviewResultDTO result =
                new InterviewResultDTO();

        result.setInterviewId(
                interview.getInterviewId());

        result.setJobRole(
                interview.getJobRole());

        result.setTotalQuestions(
                questions.size());

        result.setAnsweredQuestions(
                answeredQuestions);

        double averageScore =
                answeredQuestions > 0
                        ? (double) totalScore / answeredQuestions
                        : 0.0;

        result.setAverageScore(
                averageScore);

        result.setQuestions(
                questionResults);

        return result;
    }
}