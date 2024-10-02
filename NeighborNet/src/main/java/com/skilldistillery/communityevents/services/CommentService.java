package com.skilldistillery.communityevents.services;

import java.util.List;
import java.util.Set;

import com.skilldistillery.communityevents.entities.Comment;

public interface CommentService {
	
	public Set<Comment> index(String username);

	public List<Comment> showAllEnabledComments();
	
	public List<Comment> showCommentsByReportId(int reportId);
	
	public Comment create(int reportId, String username, Comment comment);
	
//	public Comment show(String username, int id);

	public Comment update(int commentId, String username, Comment comment);

	
	public Comment disable(String username, int commentId, Comment comment);
	

//	public boolean destroy(String username, int id);



}
