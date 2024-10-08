package com.skilldistillery.communityevents.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.skilldistillery.communityevents.entities.Report;

public interface ReportService {

	public Set<Report> index(String username);

	public Report show(String username, int id);

	public Report create(String username, Report report);

	public Report update(String username, int id, Report report);

	public Report disable(String username, int id, Report report);
//	public boolean unenable(String username, int reportId);

	public boolean destroy(String username, int id);

	public List<Report> showAllEnabledReports();

	public boolean unenable(String name, int rid);

	Optional<Report> findById(int id);

}
