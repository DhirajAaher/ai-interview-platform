package com.dhiraj.ai_interview_platform.service;

import com.dhiraj.ai_interview_platform.ai.GeminiService;
import com.dhiraj.ai_interview_platform.entity.Answer;
import org.springframework.stereotype.Service;

@Service
public class AIAnswerEvaluationServiceImpl
        implements AIAnswerEvaluationService {

    private final GeminiService geminiService;

    public AIAnswerEvaluationServiceImpl(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @Override
    public Answer evaluateAnswer(Answer answer) {

        String result = geminiService.evaluateAnswer(
                answer.getQuestion().getQuestionText(),
                answer.getAnswerText()
        );

        if (result == null || result.isBlank()) {
            throw new RuntimeException("Gemini returned an empty response");
        }

        System.out.println("Gemini Evaluation Result:");
        System.out.println(result);

        // Extract AI evaluation fields
        Integer score = extractScore(result);
        String feedback = extractField(result, "FEEDBACK:");
        String improvedAnswer = extractField(result, "IMPROVED_ANSWER:");
        String correctAnswer = extractField(result, "CORRECT_ANSWER:");
        String explanation = extractField(result, "EXPLANATION:");
        String keyPoints = extractField(result, "KEY_POINTS:");
        String interviewTip = extractField(result, "INTERVIEW_TIP:");

        // Set values in Answer entity
        answer.setScore(score);
        answer.setFeedback(feedback);
        answer.setImprovedAnswer(improvedAnswer);
        answer.setCorrectAnswer(correctAnswer);
        answer.setExplanation(explanation);
        answer.setKeyPoints(keyPoints);
        answer.setInterviewTip(interviewTip);

        return answer;
    }

    private Integer extractScore(String result) {

        String scoreText = extractField(result, "SCORE:");

        try {

            int score = Integer.parseInt(scoreText.trim());

            if (score < 0 || score > 10) {
                throw new RuntimeException(
                        "Score must be between 0 and 10"
                );
            }

            return score;

        } catch (NumberFormatException e) {

            throw new RuntimeException(
                    "Invalid score returned by Gemini: " + scoreText
            );
        }
    }

    private String extractField(String result, String fieldName) {

        for (String line : result.split("\\R")) {

            String trimmedLine = line.trim();

            if (trimmedLine.startsWith(fieldName)) {

                return trimmedLine
                        .substring(fieldName.length())
                        .trim();
            }
        }

        return "Not provided by AI.";
    }
}