package com.dhiraj.ai_interview_platform.controller;
import com.dhiraj.ai_interview_platform.dto.SubmitAnswerRequest;
import com.dhiraj.ai_interview_platform.entity.Answer;
import com.dhiraj.ai_interview_platform.service.AnswerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @PostMapping
    public Answer createAnswer(@RequestBody Answer answer) {
        return answerService.createAnswer(answer);
    }

    @GetMapping
    public List<Answer> getAllAnswers() {
        return answerService.getAllAnswers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Answer> getAnswerById(
            @PathVariable Integer id) {

        return answerService.getAnswerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Answer updateAnswer(
            @PathVariable Integer id,
            @RequestBody Answer answer) {

        return answerService.updateAnswer(id, answer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAnswer(
            @PathVariable Integer id) {

        answerService.deleteAnswer(id);

        return ResponseEntity.ok("Answer deleted successfully");
    }
    @GetMapping("/question/{questionId}")
    public List<Answer> getAnswersByQuestionId(
            @PathVariable Integer questionId) {

        return answerService.getAnswersByQuestionId(questionId);
    }	
    @PostMapping("/submit")
    public Answer submitAnswer(
            @RequestBody SubmitAnswerRequest request) {

        return answerService.submitAnswer(request);
    }
    @PostMapping("/evaluate/{answerId}")
    public Answer evaluateAnswer(
            @PathVariable Integer answerId) {

        return answerService.evaluateAnswer(answerId);
    }
}