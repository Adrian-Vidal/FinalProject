package com.skilldistillery.communityevents.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.communityevents.entities.ReportCategory;

public interface ReportCategoryRepository extends JpaRepository<ReportCategory, Integer>{

}
