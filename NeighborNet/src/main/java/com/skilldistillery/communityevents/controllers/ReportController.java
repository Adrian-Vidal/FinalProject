package com.skilldistillery.communityevents.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.communityevents.entities.Report;
import com.skilldistillery.communityevents.services.ReportService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class ReportController {
	
	@Autowired
	private ReportService reportService;
	
//	@GetMapping("ping")
//	public String ping() {
//		return "pong";
//	}
	
	// GET reports --- PROFILE (on front end) // user / {reports}
	@GetMapping("reports/user")
	public Set<Report> index(Principal principal, HttpServletRequest req, HttpServletResponse res) { 
//		return todoService.index(username);
		System.out.println("ReportController Firing!!!!");
		return reportService.index(principal.getName());
	}
	
	@PostMapping("reports")
	public Report create(Principal principal, HttpServletRequest req, HttpServletResponse res, @RequestBody Report report) {
		
		
		Report createdReport = reportService.create(principal.getName(), report);
		if (createdReport == null) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		} else {
		    res.setStatus(HttpServletResponse.SC_CREATED);
		}
		return createdReport;
	 	}
	
	@GetMapping("reports")
	public List<Report> showAllEnabledReports(HttpServletRequest req, HttpServletResponse res){
		List<Report> enabledReports = reportService.showAllEnabledReports();
		return enabledReports; // May need to a
	}

}
