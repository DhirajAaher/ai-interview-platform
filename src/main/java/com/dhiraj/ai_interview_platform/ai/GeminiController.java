package com.dhiraj.ai_interview_platform.ai;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class GeminiController {

    private final GeminiService geminiService;

    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @GetMapping("/test")
    public String testGemini() {

        return geminiService.evaluateAnswer(
                "What is Java?",
                "Java is a programming language used to build applications."
        );
    }
}