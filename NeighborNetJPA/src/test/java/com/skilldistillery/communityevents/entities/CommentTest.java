package com.skilldistillery.communityevents.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class CommentTest {

	private static EntityManagerFactory emf;
	private static EntityManager em;
	private Comment comment;

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
		comment = em.find(Comment.class, 1);
//		comment = em.find(Comment.class, 4);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
	}

	@Test
	void test_Comment_basic_mappings() {
		assertNotNull(comment);
		assertEquals("Thanks for the heads up!", comment.getBody());
//		assertEquals("No problem!", comment.getBody());
	}
	
	@Test
	void test_Comment_ManyToOne_with_Report() {
		assertNotNull(comment.getReport());
		assertEquals("Traffic jam!", comment.getReport().getName());
	}
	
	@Test
	void test_Comment_ManyToOne_with_User() {
		assertNotNull(comment.getUser());
		assertEquals("John", comment.getUser().getFirstName());
		assertEquals("Anon", comment.getUser().getLastName());
		assertEquals("janon@gmail.com", comment.getUser().getEmail());
	}

	@Test
	void test_Comment_1_has_replies() {
		assertNull(comment.getInReplyTo());
		assertTrue(comment.getReplies().size() > 0);
		
		// Inverse to above.
		assertNotNull(comment.getReplies().get(0).getInReplyTo());
	}
	
	
	
	

}
