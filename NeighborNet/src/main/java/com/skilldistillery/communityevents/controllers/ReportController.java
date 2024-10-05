package com.skilldistillery.communityevents.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

	// GET reports --- PROFILE (on front end) // user / {reports}
	@GetMapping("reports/user")
	public Set<Report> index(Principal principal, HttpServletRequest req, HttpServletResponse res) {
//		return todoService.index(username);
		System.out.println("ReportController Firing!!!!");
		return reportService.index(principal.getName());
	}

	@PostMapping("reports")
	public Report create(Principal principal, HttpServletRequest req, HttpServletResponse res,
			@RequestBody Report report) {

		Report createdReport = reportService.create(principal.getName(), report);
		if (createdReport == null) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		} else {
			res.setStatus(HttpServletResponse.SC_CREATED);
		}
		return createdReport;
	}

	@PutMapping("reports/{id}")
	public Report update(Principal principal, HttpServletRequest req, HttpServletResponse res,
			@PathVariable("id") int id, @RequestBody Report report) {
		System.out.println(report);
		System.out.println(report.getReportCategory().getName());
		Optional<Report> reportOpt = reportService.findById(id);
		if (reportOpt.isPresent()) {
			Report managedReport = reportOpt.get();
			if (!managedReport.getUser().getUsername().equals(principal.getName())) {
				res.setStatus(HttpServletResponse.SC_FORBIDDEN);
				return null;
			}
		}
		Report updatedReport = reportService.update(principal.getName(), id, report);
		if (updatedReport == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
		}
		return updatedReport;
	}

	@PutMapping("reports/user/{id}/disable")
	public Report disable(Principal principal, HttpServletRequest req, HttpServletResponse res,
			@PathVariable("id") int id, @RequestBody Report report) {
		Report disableReport = reportService.disable(principal.getName(), id, report);
		if (disableReport == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
		} else {
			res.setStatus(HttpServletResponse.SC_OK);
		}
		return disableReport;
	}

	@GetMapping("reports")
	public List<Report> showAllEnabledReports(HttpServletRequest req, HttpServletResponse res) {
		List<Report> enabledReports = reportService.showAllEnabledReports();
		return enabledReports; // May need to add principal
	}

//  DELETE todos/{tid}
	@DeleteMapping("reports/{rid}")
	public void disable(Principal principal, HttpServletRequest req, HttpServletResponse res,
			@PathVariable("rid") int rid) {

		try {
			if (reportService.unenable(principal.getName(), rid)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(404);
		}
	}
}
