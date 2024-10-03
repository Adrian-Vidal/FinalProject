package com.skilldistillery.communityevents.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.communityevents.entities.Report;
import com.skilldistillery.communityevents.repositories.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private AdminRepository adminRepository;

	@Override
	public boolean unenable(int rid) {
		boolean deleted = false;
		Optional<Report> optionalReport = adminRepository.findById(rid);
		Report report = null;
		if (optionalReport.isPresent()) {
			report = optionalReport.get();
			report.setEnabled(false);
			adminRepository.saveAndFlush(report);
			deleted=true;
		}
		return deleted;
	}

}
