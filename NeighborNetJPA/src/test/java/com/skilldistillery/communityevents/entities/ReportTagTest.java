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

class ReportTagTest {

	private static EntityManagerFactory emf;
	private static EntityManager em;
	private ReportTag reportTag;

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
		reportTag = em.find(ReportTag.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
	}

	@Test
	void test_reportCategory_basic_mappings() {
		assertNotNull(reportTag);
		assertEquals("Tornado", reportTag.getTagName());

	}
	@Test
	void test_reportTag_has_reports() {
		assertNotNull(reportTag.getReports());
		assertTrue(reportTag.getReports().size()==0);//TODO: change to > 0 when data is input
		
	}

}
