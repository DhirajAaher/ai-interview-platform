package com.dhiraj.ai_interview_platform.controller;

import com.dhiraj.ai_interview_platform.dto.JobFitRequest;
import com.dhiraj.ai_interview_platform.entity.JobFitAnalysis;
import com.dhiraj.ai_interview_platform.service.JobFitAnalysisService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-fit")
public class JobFitController {

    private final JobFitAnalysisService jobFitAnalysisService;

    public JobFitController(
            JobFitAnalysisService jobFitAnalysisService) {

        this.jobFitAnalysisService =
                jobFitAnalysisService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeJobFit(
            @RequestBody JobFitRequest request) {

        try {

            String result =
                    jobFitAnalysisService.analyzeJobFit(request);

            return ResponseEntity.ok(result);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<JobFitAnalysis>> getHistory(
            @PathVariable Integer userId) {

        return ResponseEntity.ok(
                jobFitAnalysisService
                        .getAnalysesByUser(userId)
        );
    }

    @GetMapping("/{analysisId}")
    public ResponseEntity<?> getAnalysis(
            @PathVariable Integer analysisId) {

        JobFitAnalysis analysis =
                jobFitAnalysisService
                        .getAnalysisById(analysisId);

        if (analysis == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(analysis);
    }
}