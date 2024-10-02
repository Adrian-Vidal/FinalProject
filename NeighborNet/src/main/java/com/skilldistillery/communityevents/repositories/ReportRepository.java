package com.skilldistillery.communityevents.repositories;


import java.util.Optional;

import java.util.List;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.communityevents.entities.Report;

public interface ReportRepository extends JpaRepository<Report, Integer>{
	
	Set<Report> findByUser_Username(String username);
	
	Optional<Report> findById (int id);

	Set<Report> findByUser_UsernameAndEnabledTrue(String username);


	List<Report> findByEnabled(Boolean enabled);
	
	Report findByUser_UsernameAndId(String username, int id);
	


}
