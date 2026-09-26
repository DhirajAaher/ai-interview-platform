package com.dhiraj.ai_interview_platform.service;

import com.dhiraj.ai_interview_platform.ai.GeminiService;
import com.dhiraj.ai_interview_platform.dto.JobFitRequest;
import com.dhiraj.ai_interview_platform.entity.JobFitAnalysis;
import com.dhiraj.ai_interview_platform.entity.Resume;
import com.dhiraj.ai_interview_platform.repository.JobFitAnalysisRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobFitAnalysisService {

    private final ResumeService resumeService;
    private final ResumeTextExtractionService resumeTextExtractionService;
    private final GeminiService geminiService;
    private final JobFitAnalysisRepository jobFitAnalysisRepository;

    public JobFitAnalysisService(
            ResumeService resumeService,
            ResumeTextExtractionService resumeTextExtractionService,
            GeminiService geminiService,
            JobFitAnalysisRepository jobFitAnalysisRepository) {

        this.resumeService = resumeService;
        this.resumeTextExtractionService = resumeTextExtractionService;
        this.geminiService = geminiService;
        this.jobFitAnalysisRepository = jobFitAnalysisRepository;
    }

    public String analyzeJobFit(JobFitRequest request) {

        if (request.getResumeId() == null) {
            throw new RuntimeException("Resume ID is required.");
        }

        if (request.getJobDescription() == null ||
                request.getJobDescription().isBlank()) {
            throw new RuntimeException("Job description is required.");
        }

        Resume resume =
                resumeService.getResumeById(request.getResumeId());

        if (resume == null) {
            throw new RuntimeException("Resume not found.");
        }

        String resumeText =
                resumeTextExtractionService.extractText(
                        resume.getResumeUrl()
                );

        String result =
                geminiService.analyzeJobFit(
                        resumeText,
                        request.getJobDescription()
                );

        saveAnalysis(
                resume,
                request.getJobDescription(),
                result
        );

        return result;
    }

    private void saveAnalysis(
            Resume resume,
            String jobDescription,
            String result) {

        JobFitAnalysis analysis = new JobFitAnalysis();

        analysis.setResume(resume);
        analysis.setJobDescription(jobDescription);
        analysis.setMatchScore(extractScore(result));
        analysis.setMatchingSkills(
                extractField(result, "MATCHING_SKILLS:")
        );
        analysis.setMissingSkills(
                extractField(result, "MISSING_SKILLS:")
        );
        analysis.setRelevantExperience(
                extractField(result, "RELEVANT_EXPERIENCE:")
        );
        analysis.setEducationMatch(
                extractField(result, "EDUCATION_MATCH:")
        );
        analysis.setRecommendations(
                extractField(result, "RECOMMENDATIONS:")
        );
        analysis.setSummary(
                extractField(result, "SUMMARY:")
        );
        analysis.setCreatedAt(LocalDateTime.now());

        jobFitAnalysisRepository.save(analysis);
    }

    private Integer extractScore(String result) {

        String value = extractField(result, "MATCH_SCORE:");

        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            throw new RuntimeException(
                    "Invalid match score returned by Gemini."
            );
        }
    }

    private String extractField(
            String result,
            String fieldName) {

        for (String line : result.split("\\R")) {

            if (line.trim().startsWith(fieldName)) {

                return line.substring(fieldName.length())
                        .trim();
            }
        }

        return "";
    }

    public List<JobFitAnalysis> getAnalysesByUser(
            Integer userId) {

        return jobFitAnalysisRepository
                .findByResumeUserUserIdOrderByCreatedAtDesc(
                        userId
                );
    }

    public JobFitAnalysis getAnalysisById(
            Integer analysisId) {

        return jobFitAnalysisRepository
                .findById(analysisId)
                .orElse(null);
    }
}