package com.skilldistillery.communityevents.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.communityevents.entities.User;
import com.skilldistillery.communityevents.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost/" })
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("user/{id}")
	public User show(Principal principal, HttpServletRequest req, HttpServletResponse res, @PathVariable("id") int id) {

		System.out.println("UserController");

		User user = userService.showUserById(id);
		if (user == null) {
			res.setStatus(404);
		}
		return user;
	}

}
