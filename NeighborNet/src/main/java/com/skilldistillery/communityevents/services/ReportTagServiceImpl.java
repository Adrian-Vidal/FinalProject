package com.skilldistillery.communityevents.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.communityevents.entities.Report;
import com.skilldistillery.communityevents.entities.ReportTag;
import com.skilldistillery.communityevents.repositories.ReportTagRepository;

@Service
public class ReportTagServiceImpl implements ReportTagService {

	@Autowired
	private ReportTagRepository tagRepo;

	@Override
	public List<ReportTag> findByReport_ReportId(int id) {
		return tagRepo.findByReports_Id(id);
	}

	
	
}
