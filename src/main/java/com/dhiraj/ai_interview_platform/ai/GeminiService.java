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

                Give a score from 0 to 10.

                Scoring guide:
                0 = Completely incorrect or no meaningful answer
                1-3 = Very poor understanding
                4-5 = Partial understanding
                6-7 = Good understanding with some gaps
                8-9 = Very good and mostly complete answer
                10 = Fully correct, clear, and complete answer

                IMPORTANT:
                Return ONLY these two lines.
                Do not add any other text.

                SCORE: <number from 0 to 10>
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
    public String analyzeJobFit(
            String resumeText,
            String jobDescription) {

        System.out.println("Calling Gemini for Job Fit Analysis...");

        String prompt = """
                You are an expert technical recruiter and career advisor.

                Analyze the candidate's resume against the given job description.

                CANDIDATE RESUME:
                %s

                JOB DESCRIPTION:
                %s

                Analyze the candidate based ONLY on the information
                provided in the resume and job description.

                Evaluate:
                1. Overall skill match
                2. Relevant technical skills
                3. Missing or weak skills
                4. Relevant projects or experience
                5. Education requirements
                6. Practical recommendations for improving the match

                Give an overall match score from 0 to 100.

                IMPORTANT:
                Return the response in exactly this structure:

                MATCH_SCORE: <number>
                MATCHING_SKILLS: <comma-separated skills>
                MISSING_SKILLS: <comma-separated skills>
                RELEVANT_EXPERIENCE: <short explanation>
                EDUCATION_MATCH: <short explanation>
                RECOMMENDATIONS: <short explanation>
                SUMMARY: <short overall explanation>
                """.formatted(
                        resumeText,
                        jobDescription
                );

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.5-flash-lite",
                        prompt,
                        null
                );

        System.out.println(
                "Gemini Job Fit response received."
        );

        return response.text();
    }
}