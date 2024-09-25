package com.skilldistillery.communityevents.services;

import com.skilldistillery.communityevents.entities.User;

public interface AuthService {
	public User register(User user);
	public User getUserByUsername(String username);

}
