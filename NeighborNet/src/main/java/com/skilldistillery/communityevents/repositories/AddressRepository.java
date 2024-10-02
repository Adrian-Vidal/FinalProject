package com.skilldistillery.communityevents.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.communityevents.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Integer>{
	
	List<Address> findByStreetAndCityAndStateAndPostalCodeAndCountry (
			String street, String city, 
			String state, String postalCode, String country); 

}
