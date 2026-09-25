package com.dhiraj.ai_interview_platform.dto;

public class SubmitAnswerRequest {

    private Integer questionId;
    private String answerText;

    public SubmitAnswerRequest() {
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }
}