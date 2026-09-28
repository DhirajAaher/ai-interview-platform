package com.dhiraj.ai_interview_platform.controller;
import com.dhiraj.ai_interview_platform.dto.InterviewResultDTO;
import com.dhiraj.ai_interview_platform.entity.Interview;
import com.dhiraj.ai_interview_platform.service.InterviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.dhiraj.ai_interview_platform.dto.StartInterviewRequest;
@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @PostMapping
    public Interview createInterview(@RequestBody Interview interview) {
        return interviewService.createInterview(interview);
    }

    @GetMapping
    public List<Interview> getAllInterviews() {
        return interviewService.getAllInterviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Interview> getInterviewById(@PathVariable Integer id) {

        return interviewService.getInterviewById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Interview updateInterview(
            @PathVariable Integer id,
            @RequestBody Interview interview) {

        return interviewService.updateInterview(id, interview);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInterview(@PathVariable Integer id) {

        interviewService.deleteInterview(id);

        return ResponseEntity.ok("Interview deleted successfully");
    }
    @PostMapping("/start")
    public Interview startInterview(
            @RequestBody StartInterviewRequest request) {

        return interviewService.startInterview(request);
    }	
    @GetMapping("/{id}/result")
    public InterviewResultDTO getInterviewResult(
            @PathVariable Integer id) {

        return interviewService.getInterviewResult(id);
    }
    @GetMapping("/user/{userId}")
    public List<Interview> getInterviewsByUserId(
            @PathVariable Integer userId) {

        return interviewService.getInterviewsByUserId(userId);
    }
    
    @PutMapping("/{id}/complete")
    public ResponseEntity<Interview> completeInterview(
            @PathVariable Integer id) {

        Interview completedInterview =
                interviewService.completeInterview(id);

        return ResponseEntity.ok(completedInterview);
    }
}	