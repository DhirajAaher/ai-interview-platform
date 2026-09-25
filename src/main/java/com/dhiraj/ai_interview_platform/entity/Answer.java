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

    @Column(length = 50)
    private String feedback;

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
}