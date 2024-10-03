package com.skilldistillery.communityevents.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.communityevents.entities.Report;
import com.skilldistillery.communityevents.entities.ReportTag;

public interface ReportTagRepository extends JpaRepository<ReportTag, Integer> {
	
	List<ReportTag> findByReports_Id(int id);

}
