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

        System.out.println("Calling Gemini for Answer Evaluation...");

        String candidateAnswer =
                (answer == null || answer.isBlank())
                        ? "NO ANSWER PROVIDED"
                        : answer;

        String prompt = """
                You are an expert technical interviewer and interview coach.

                Your task is to evaluate a candidate's answer and teach the
                candidate the correct concept.

                INTERVIEW QUESTION:
                %s

                CANDIDATE ANSWER:
                %s

                Evaluate the candidate based on:
                1. Correctness
                2. Relevance
                3. Technical understanding
                4. Completeness
                5. Clarity

                SCORE RULES:
                0 = No answer or completely incorrect
                1-3 = Very poor understanding
                4-5 = Partial understanding with major gaps
                6-7 = Good understanding with some gaps
                8-9 = Very good and mostly complete answer
                10 = Fully correct, clear, complete and technically accurate

                If the candidate did not provide an answer:
                - Give SCORE: 0
                - Clearly state that no answer was provided in FEEDBACK
                - Provide the complete CORRECT_ANSWER
                - Provide a useful EXPLANATION
                - Provide KEY_POINTS
                - Provide an INTERVIEW_TIP

                If the candidate provided an answer:
                - Evaluate the actual answer.
                - Identify what is correct.
                - Identify missing or incorrect information.
                - Provide an improved interview-ready answer.
                - Provide the complete correct answer.
                - Explain the concept clearly.
                - Give important key points.
                - Give a practical interview tip.

                IMPORTANT:
                Return ONLY the following fields.
                Do not use Markdown.
                Do not use bullets inside individual fields.
                Keep each field on ONE line.

                SCORE: <number from 0 to 10>
                FEEDBACK: <feedback about the candidate's answer>
                IMPROVED_ANSWER: <corrected and interview-ready version of the candidate's answer>
                CORRECT_ANSWER: <complete technically correct answer>
                EXPLANATION: <clear explanation of the concept>
                KEY_POINTS: <important points separated by |>
                INTERVIEW_TIP: <short practical interview advice>
                """.formatted(question, candidateAnswer);

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.5-flash-lite",
                        prompt,
                        null
                );

        System.out.println("Gemini Answer Evaluation response received.");

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