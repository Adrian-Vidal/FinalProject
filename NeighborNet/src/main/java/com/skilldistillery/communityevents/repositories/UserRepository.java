package com.skilldistillery.communityevents.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.communityevents.entities.User;
import java.util.List;


public interface UserRepository extends JpaRepository<User, Integer> {
	
	User findByUsername(String username);
	
	User findByUsernameAndEnabled(String username, boolean enabled);

	User findById(int id);
}
