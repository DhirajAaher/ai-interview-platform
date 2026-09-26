package com.dhiraj.ai_interview_platform.dto;

public class DashboardDTO {

    private long totalInterviews;
    private long completedInterviews;
    private long totalQuestions;
    private long answeredQuestions;
    private double averageScore;

    public DashboardDTO() {
    }

    public DashboardDTO(
            long totalInterviews,
            long completedInterviews,
            long totalQuestions,
            long answeredQuestions,
            double averageScore) {

        this.totalInterviews = totalInterviews;
        this.completedInterviews = completedInterviews;
        this.totalQuestions = totalQuestions;
        this.answeredQuestions = answeredQuestions;
        this.averageScore = averageScore;
    }

    public long getTotalInterviews() {
        return totalInterviews;
    }

    public void setTotalInterviews(long totalInterviews) {
        this.totalInterviews = totalInterviews;
    }

    public long getCompletedInterviews() {
        return completedInterviews;
    }

    public void setCompletedInterviews(long completedInterviews) {
        this.completedInterviews = completedInterviews;
    }

    public long getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(long totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public long getAnsweredQuestions() {
        return answeredQuestions;
    }

    public void setAnsweredQuestions(long answeredQuestions) {
        this.answeredQuestions = answeredQuestions;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
    }
}