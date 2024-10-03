package com.skilldistillery.communityevents.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.communityevents.entities.Report;


public interface AdminRepository extends JpaRepository<Report, Integer> {
	

}
