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

class DirectMessageTest {

	private static EntityManagerFactory emf;
	private static EntityManager em;
	private DirectMessage directMessage;

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
		directMessage = em.find(DirectMessage.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
	}

	@Test
	void test_User_basic_mappings() {
		assertNotNull(directMessage);
		assertEquals("I had a quick follow up question regarding your post the other day.", directMessage.getBody());
	}

	@Test
	void test_directmessage_has_a_sender_and_recipient() {
		assertNotNull(directMessage.getSender());
		assertEquals("John", directMessage.getSender().getFirstName());
		assertEquals("test", directMessage.getRecipient().getUsername());
	}

}
