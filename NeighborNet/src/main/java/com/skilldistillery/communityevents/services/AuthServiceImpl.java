package com.skilldistillery.communityevents.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.communityevents.entities.User;
import com.skilldistillery.communityevents.repositories.AddressRepository;
import com.skilldistillery.communityevents.repositories.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private AddressRepository addrRepo;
	
	@Override
	public User register(User user) {
		//encode pw, set enabled,etc.
		String encryptedPw = encoder.encode(user.getPassword());
		
		user.setPassword(encryptedPw);
		user.setEnabled(true);
		user.setRole("standard");
		
		addrRepo.saveAndFlush(user.getAddress());
		userRepo.saveAndFlush(user);
		return user;
	}

	@Override
	public User getUserByUsername(String username) {
		User user = userRepo.findByUsername(username);
		System.out.println(user.isEnabled());
		System.out.println(user.isEnabled());
		System.out.println(user.isEnabled());
		System.out.println(user.isEnabled());
		System.out.println(user.isEnabled());

		return user;
//		return userRepo.findByUsername(username);	//OG
//		return userRepo.findByUsernameAndEnabled(username, true);		//Mine
	}

}


