package com.skilldistillery.communityevents.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.communityevents.services.AdminService;
import com.skilldistillery.communityevents.services.ReportService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost/"})
public class AdminController {
	
	@Autowired
	private AdminService adminService;

	@Autowired
	private ReportService reportService;
	
	@DeleteMapping("admin/{rid}")
	public void disable(Principal principal, HttpServletRequest req, 
						HttpServletResponse res, 
						@PathVariable("rid") int rid ) {
		System.out.println("Admin Controller mapping Good");
		try {
			if (adminService.unenable(rid)) {
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
