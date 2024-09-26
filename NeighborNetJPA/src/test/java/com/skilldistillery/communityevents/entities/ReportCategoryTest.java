package com.skilldistillery.communityevents.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class ReportCategoryTest {

	private static EntityManagerFactory emf;
	private static EntityManager em;
	private ReportCategory reportCategory;
	

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
        reportCategory = em.find(ReportCategory.class, 1); 
		}

	@AfterEach
	void tearDown() throws Exception {
		em.close();	
		}

	@Test
	void test_reportCategory_basic_mappings() {
		assertNotNull(reportCategory);
		assertEquals("Weather", reportCategory.getName());
		assertEquals("Reports related to weather events", reportCategory.getDescription());
		
	}

}
