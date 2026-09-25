package com.dhiraj.ai_interview_platform.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

@Service
public class GeminiService {

    private final Client client;

    public GeminiService(
            @Value("${gemini.api.key}") String apiKey) {

        this.client = Client.builder()
                .apiKey(apiKey)
                .build();
    }

    public String evaluateAnswer(String question, String answer) {

        System.out.println("Calling Gemini...");

        String prompt = """
                You are an expert technical interviewer.

                Evaluate the candidate's answer.

                Interview Question:
                %s

                Candidate Answer:
                %s

                Evaluate based on:
                1. Correctness
                2. Relevance
                3. Technical understanding
                4. Clarity

                Give a score from 0 to 100.

                IMPORTANT:
                Return ONLY these two lines.
                Do not add any other text.

                SCORE: <number>
                FEEDBACK: <short feedback>
                """.formatted(question, answer);

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.5-flash-lite",
                        prompt,
                        null
                );

        System.out.println("Gemini response received.");

        return response.text();
    }
}