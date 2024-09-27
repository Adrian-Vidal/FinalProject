package com.skilldistillery.communityevents.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.communityevents.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Integer>{

}
