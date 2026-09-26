package com.dhiraj.ai_interview_platform.controller;

import com.dhiraj.ai_interview_platform.dto.DashboardDTO;
import com.dhiraj.ai_interview_platform.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/{userId}")
    public DashboardDTO getDashboard(@PathVariable Integer userId) {
        return dashboardService.getDashboardData(userId);
    }
}