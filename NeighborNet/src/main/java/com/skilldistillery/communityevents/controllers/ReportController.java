package com.skilldistillery.communityevents.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.communityevents.services.ReportService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class ReportController {
	
	@Autowired
	private ReportService reportService;
	
	
	

}
