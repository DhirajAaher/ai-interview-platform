package com.dhiraj.ai_interview_platform.service;

import com.dhiraj.ai_interview_platform.entity.Interview;
import com.dhiraj.ai_interview_platform.entity.Question;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AIQuestionServiceImpl implements AIQuestionService {

    private final Client geminiClient;

    public AIQuestionServiceImpl(Client geminiClient) {
        this.geminiClient = geminiClient;
    }

    @Override
    public List<Question> generateQuestions(
            Interview interview,
            int numberOfQuestions) {

        String prompt = """
                Generate %d interview questions for the following candidate.

                Job Role: %s
                Experience Level: %s
                Job Description: %s

                Requirements:
                - Generate exactly %d questions.
                - Focus on technical interview questions.
                - Questions should match the job role and job description.
                - Keep questions suitable for the candidate's experience level.
                - Return only the questions, one question per line.
                """.formatted(
                numberOfQuestions,
                interview.getJobRole(),
                interview.getExperienceLevel(),
                interview.getJobDescription(),
                numberOfQuestions
        );

        GenerateContentResponse response =
                geminiClient.models.generateContent(
                        "gemini-3.5-flash-lite",
                        prompt,
                        null
                );

        String generatedText = response.text();

        List<Question> questions = new ArrayList<>();

        if (generatedText != null) {

            String[] lines = generatedText.split("\\R");

            for (String line : lines) {

                line = line.trim();

                if (line.isEmpty()) {
                    continue;
                }

                // Remove numbering such as "1.", "2.", etc.
                line = line.replaceFirst("^\\d+[.)]\\s*", "");

                Question question = new Question();

                question.setInterview(interview);
                question.setQuestionText(line);
                question.setQuestionType("Technical");
                question.setDifficulty("Medium");

                questions.add(question);

                if (questions.size() == numberOfQuestions) {
                    break;
                }
            }
        }

        return questions;
    }
}