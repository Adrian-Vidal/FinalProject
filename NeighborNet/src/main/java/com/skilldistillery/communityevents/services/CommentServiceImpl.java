package com.skilldistillery.communityevents.services;



import java.util.List;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.communityevents.entities.Comment;
import com.skilldistillery.communityevents.repositories.AddressRepository;
import com.skilldistillery.communityevents.repositories.CommentRepository;
import com.skilldistillery.communityevents.repositories.ReportCategoryRepository;
import com.skilldistillery.communityevents.repositories.ReportRepository;
import com.skilldistillery.communityevents.repositories.UserRepository;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	private ReportRepository reportRepo;

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private AddressRepository addrRepo;
	
	@Autowired
	private ReportCategoryRepository reportCategoryRepo;
	
	@Autowired
	private CommentRepository commentRepo;

	@Override
	public Set<Comment> index(String username) {
		return commentRepo.findByUser_UsernameAndEnabledTrue(username);
	}
	
	@Override
	public List<Comment> showAllEnabledComments() {
		return commentRepo.findByEnabled(true);
	}
	
	@Override
	public List<Comment> showCommentsByReportId(int reportId) {
	    return commentRepo.findByReport_Id(reportId);
	}

//	@Override
//	public Comment show(String username, int id) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public Comment create(String username, Comment comment) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public Comment update(String username, int id, Comment comment) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public Comment disable(String username, int id, Comment comment) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public boolean destroy(String username, int id) {
//		// TODO Auto-generated method stub
//		return false;
//	}
//
//
//	@Override
//	public boolean unenable(String name, int rid) {
//		// TODO Auto-generated method stub
//		return false;
//	}

	

}
