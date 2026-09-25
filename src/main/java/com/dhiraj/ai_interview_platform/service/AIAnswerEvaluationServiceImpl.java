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

        Integer score = extractScore(result);
        String feedback = extractFeedback(result);

        answer.setScore(score);
        answer.setFeedback(feedback);

        return answer;
    }

    private Integer extractScore(String result) {

        for (String line : result.split("\\R")) {

            if (line.trim().startsWith("SCORE:")) {

                String scoreText =
                        line.substring("SCORE:".length()).trim();

                try {
                    return Integer.parseInt(scoreText);
                } catch (NumberFormatException e) {
                    throw new RuntimeException(
                            "Invalid score returned by Gemini"
                    );
                }
            }
        }

        throw new RuntimeException("Score not found in Gemini response");
    }

    private String extractFeedback(String result) {

        for (String line : result.split("\\R")) {

            if (line.trim().startsWith("FEEDBACK:")) {

                return line.substring("FEEDBACK:".length()).trim();
            }
        }

        return "No feedback generated.";
    }
}