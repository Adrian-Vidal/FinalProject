package com.skilldistillery.communityevents.repositories;



import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.communityevents.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer>{
	
	
	Set<Comment> findByUser_Username(String username);
	
	Comment findById (int id);

	Set<Comment> findByUser_UsernameAndEnabledTrue(String username);

	List<Comment> findByEnabled(Boolean enabled);
	
	List<Comment> findByReport_Id(int reportId);

}
