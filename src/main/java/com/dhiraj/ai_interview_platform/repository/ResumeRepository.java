package com.dhiraj.ai_interview_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dhiraj.ai_interview_platform.entity.Resume;

public interface ResumeRepository extends JpaRepository<Resume, Integer> {

}