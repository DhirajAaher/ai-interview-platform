package com.dhiraj.ai_interview_platform.dto;

import java.util.List;

public class InterviewResultDTO {

    private Integer interviewId;
    private String jobRole;
    private Integer totalQuestions;
    private Integer answeredQuestions;
    private Double averageScore;
    private List<QuestionResultDTO> questions;

    public InterviewResultDTO() {
    }

    public Integer getInterviewId() {
        return interviewId;
    }

    public void setInterviewId(Integer interviewId) {
        this.interviewId = interviewId;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public Integer getAnsweredQuestions() {
        return answeredQuestions;
    }

    public void setAnsweredQuestions(Integer answeredQuestions) {
        this.answeredQuestions = answeredQuestions;
    }

    public Double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(Double averageScore) {
        this.averageScore = averageScore;
    }

    public List<QuestionResultDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionResultDTO> questions) {
        this.questions = questions;
    }
}