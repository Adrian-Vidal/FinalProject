package com.skilldistillery.communityevents.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.communityevents.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	User findByUsername(String username);

}
