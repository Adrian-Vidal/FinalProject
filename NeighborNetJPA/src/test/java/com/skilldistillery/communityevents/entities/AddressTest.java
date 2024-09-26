package com.skilldistillery.communityevents.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class AddressTest {

	private static EntityManagerFactory emf;
	private static EntityManager em;
	private Address address;
	

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("NeighborNetJPA");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		em.getTransaction().begin();
        // Initialize the user object from the database
        address = em.find(Address.class, 1); 
		}

	@AfterEach
	void tearDown() throws Exception {
		em.close();	
		}

	@Test
	void test_User_basic_mappings() {
		assertNotNull(address);
		assertEquals("McDonald's", address.getName());
		assertEquals("2214 W 76 Country Blvd", address.getStreet());
		
	}
	@Test
	void test_address_has_many_Users() {
		assertNotNull(address.getUsers());
		System.out.println(address.getUsers().size());
		System.out.println(address.getUsers());
		System.out.println(address);
		assertTrue(address.getUsers().size()>0);
		
	}

}
