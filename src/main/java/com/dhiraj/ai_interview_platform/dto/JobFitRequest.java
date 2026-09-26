package com.dhiraj.ai_interview_platform.dto;

public class JobFitRequest {

    private Integer resumeId;
    private String jobDescription;

    public JobFitRequest() {
    }

    public Integer getResumeId() {
        return resumeId;
    }

    public void setResumeId(Integer resumeId) {
        this.resumeId = resumeId;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }
}