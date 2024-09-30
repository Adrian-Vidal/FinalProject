package com.skilldistillery.communityevents.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.communityevents.entities.Report;
import com.skilldistillery.communityevents.entities.User;
import com.skilldistillery.communityevents.repositories.AddressRepository;
import com.skilldistillery.communityevents.repositories.ReportCategoryRepository;
import com.skilldistillery.communityevents.repositories.ReportRepository;
import com.skilldistillery.communityevents.repositories.UserRepository;

@Service
public class ReportServiceImpl implements ReportService {
	
	@Autowired
	private ReportRepository reportRepo;

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private AddressRepository addrRepo;
	
	@Autowired
	private ReportCategoryRepository reportCategoryRepo;

	@Override
	public Set<Report> index(String username) {
		return reportRepo.findByUser_Username(username);
	}

	@Override
	public Report show(String username, int id) {
		
		return null;
	}

	@Override
	public Report create(String username, Report report) {
		User user = userRepo.findByUsername(username);
		if (user != null) {
			report.setUser(user);
			report.setEnabled(true);
			System.out.println("Is this firing");
			System.out.println(report);
			reportCategoryRepo.saveAndFlush(report.getReportCategory());
			addrRepo.saveAndFlush(report.getAddress());
		    return reportRepo.saveAndFlush(report);
		} else {
		  return null;
		}
	}

	@Override
	public Report update(String username, int id, Report report) {
		
		return null;
	}

	@Override
	public boolean destroy(String username, int id) {
		
		return false;
	}


	
	
	

}
