package com.skilldistillery.communityevents.services;

import java.util.List;

import com.skilldistillery.communityevents.entities.Report;
import com.skilldistillery.communityevents.entities.ReportTag;

public interface ReportTagService {
	
	List<ReportTag> findByReport_ReportId(int id);

}
