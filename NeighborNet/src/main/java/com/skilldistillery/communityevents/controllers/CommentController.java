package com.skilldistillery.communityevents.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.communityevents.entities.Comment;
import com.skilldistillery.communityevents.services.CommentService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	

	@GetMapping("comments/user")
	public Set<Comment> index(Principal principal, HttpServletRequest req, HttpServletResponse res) { 
		System.out.println("CommentController Firing!!!!");
		return commentService.index(principal.getName());
	}
	
	@GetMapping("comments")
	public List<Comment> showAllEnabledComments(HttpServletRequest req, HttpServletResponse res){
		List<Comment> enabledComments = commentService.showAllEnabledComments();
		return enabledComments; // May need to a
	}
	
}



	
	


