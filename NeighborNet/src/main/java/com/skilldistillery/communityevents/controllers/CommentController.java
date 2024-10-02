package com.skilldistillery.communityevents.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
		return enabledComments;
	}
	
	@GetMapping("comments/report/{id}")
	public List<Comment> showCommentsByReportId(@PathVariable("id") int reportId, HttpServletRequest req, HttpServletResponse res) {
	    List<Comment> reportComments = commentService.showCommentsByReportId(reportId);
	    return reportComments;
	}
	
	@PostMapping("comments/report/{reportId}")
	public Comment create(Principal principal, HttpServletRequest req, HttpServletResponse res, 
	                      @PathVariable("reportId") int reportId, @RequestBody Comment comment) {
	    Comment createdComment = commentService.create(reportId, principal.getName(), comment);
	    
	    if (createdComment == null) {
	        res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
	    } else {
	        res.setStatus(HttpServletResponse.SC_CREATED);
	    }
	    
	    return createdComment;
	}

	@PutMapping("comments/{commentId}")
	public Comment update(Principal principal, HttpServletRequest req, HttpServletResponse res, 
	                      @PathVariable("commentId") int commentId, @RequestBody Comment comment) {
	    Comment updatedComment = commentService.update(commentId, principal.getName(), comment);
	    if (updatedComment == null) {
	        res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
	    } else {
	        res.setStatus(HttpServletResponse.SC_OK);
	    }
	    return updatedComment;
	}



	
}



	
	


