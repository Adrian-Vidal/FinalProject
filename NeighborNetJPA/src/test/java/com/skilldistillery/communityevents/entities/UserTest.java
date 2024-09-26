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

class UserTest {

	private static EntityManagerFactory emf;
	private static EntityManager em;
	private User user;
	

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
        user = em.find(User.class, 1); 
		}

	@AfterEach
	void tearDown() throws Exception {
		em.close();	
		}

	@Test
	void test_User_basic_mappings() {
		assertNotNull(user);
		assertEquals("test", user.getUsername());
		assertEquals("standard", user.getRole());
		assertTrue(user.isEnabled());
	}
	@Test
	void test_User_has_an_address() {
		assertNotNull(user.getAddress());		
		assertEquals("Branson", user.getAddress().getCity());
		
	}
	@Test
	void test_User_has_many_sentMessages() {
//		assertNotNull(user.getSentMessages());	
////		assertTrue(user.getSentMessages().size()>0);
////		assertNotNull(user.getRecievedMessages());	
////		assertTrue(user.getRecievedMessages().size()>0);
//		
		
		
	}

}
