package com.skilldistillery.communityevents.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.communityevents.entities.Report;
import com.skilldistillery.communityevents.entities.ReportTag;
import com.skilldistillery.communityevents.services.ReportService;
import com.skilldistillery.communityevents.services.ReportTagService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class ReportTagController {

	@Autowired
	private ReportTagService tagService;

	@Autowired
	private ReportService reportService;

	@GetMapping("tags/reports/{id}")
	public List<ReportTag> showReportTagsByReportId(@PathVariable("id") int id, HttpServletRequest req,
			HttpServletResponse res) {
//	    List<ReportTag> reportTags = tagService.findByReport(reports);
		List<ReportTag> reportTags = tagService.findByReport_ReportId(id);
		return reportTags;
	}

}
