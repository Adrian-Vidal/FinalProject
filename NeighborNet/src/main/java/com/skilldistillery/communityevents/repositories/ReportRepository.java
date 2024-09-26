package com.skilldistillery.communityevents.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.communityevents.entities.Report;

public interface ReportRepository extends JpaRepository<Report, Integer>{
	
	Set<Report> findByUser_Username(String username);

}
