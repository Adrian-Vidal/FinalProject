package com.skilldistillery.communityevents.services;

import java.util.List;
import java.util.Set;

import com.skilldistillery.communityevents.entities.Comment;

public interface CommentService {
	
	public Set<Comment> index(String username);

	public Comment show(String username, int id);

	public Comment create(String username, Comment comment);

	public Comment update(String username, int id, Comment comment);
	
	public Comment disable(String username, int id, Comment comment);
//	public boolean unenable(String username, int reportId);

	public boolean destroy(String username, int id);
	
	public List<Comment> showAllEnabledComments();

	public boolean unenable(String name, int rid);

}
