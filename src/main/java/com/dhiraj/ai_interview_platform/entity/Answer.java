package com.dhiraj.ai_interview_platform.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "answers")
public class Answer {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer answerId;		
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
    @Column(columnDefinition = "TEXT")
    private String answerText;

    private Integer score;

    @Column(columnDefinition = "TEXT")
    private String feedback;
    @Column(columnDefinition = "TEXT")
    private String improvedAnswer;

    @Column(columnDefinition = "TEXT")
    private String correctAnswer;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @Column(columnDefinition = "TEXT")
    private String keyPoints;

    @Column(columnDefinition = "TEXT")
    private String interviewTip;

    public Answer() {
    }

    public Integer getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Integer answerId) {
        this.answerId = answerId;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }
    public String getImprovedAnswer() {
        return improvedAnswer;
    }

    public void setImprovedAnswer(String improvedAnswer) {
        this.improvedAnswer = improvedAnswer;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getKeyPoints() {
        return keyPoints;
    }

    public void setKeyPoints(String keyPoints) {
        this.keyPoints = keyPoints;
    }

    public String getInterviewTip() {
        return interviewTip;
    }

    public void setInterviewTip(String interviewTip) {
        this.interviewTip = interviewTip;
    }
}