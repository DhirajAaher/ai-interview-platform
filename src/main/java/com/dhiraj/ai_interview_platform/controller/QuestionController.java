package com.dhiraj.ai_interview_platform.controller;

import com.dhiraj.ai_interview_platform.entity.Question;
import com.dhiraj.ai_interview_platform.service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public Question createQuestion(@RequestBody Question question) {
        return questionService.createQuestion(question);
    }

    @GetMapping
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(
            @PathVariable Integer id) {

        return questionService.getQuestionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Question updateQuestion(
            @PathVariable Integer id,
            @RequestBody Question question) {

        return questionService.updateQuestion(id, question);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuestion(
            @PathVariable Integer id) {

        questionService.deleteQuestion(id);

        return ResponseEntity.ok("Question deleted successfully");
    }

    @GetMapping("/interview/{interviewId}")
    public List<Question> getQuestionsByInterviewId(
            @PathVariable Integer interviewId) {

        return questionService.getQuestionsByInterviewId(interviewId);
    }
}