package com.skilldistillery.communityevents.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Report {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	private String description;
	
	@CreationTimestamp
	@Column(name="create_date")
	private LocalDateTime createDate;
	
	@UpdateTimestamp
	@Column(name="modified_date")
	private LocalDateTime modifiedDate;
	
	@Column(name="image_url")
	private String imageUrl;
	
	@Column(name="event_date")
	private LocalDateTime eventDate;
	
	@ManyToOne
	@JoinColumn(name = "report_category_id")
	private ReportCategory reportCategory;
	
	private Boolean resolved;
	
	private Boolean enabled;

//	@OneToMany
//	@JoinColumn(name = "comment_id")
//	private List<Comment> comments;
	
	public Report() {
		
	}

	public Report(int id, String name, String description, LocalDateTime createDate, LocalDateTime modifiedDate,
		String imageUrl, LocalDateTime eventDate, ReportCategory reportCategory, Boolean resolved, Boolean enabled) {
	super();
	this.id = id;
	this.name = name;
	this.description = description;
	this.createDate = createDate;
	this.modifiedDate = modifiedDate;
	this.imageUrl = imageUrl;
	this.eventDate = eventDate;
	this.reportCategory = reportCategory;
	this.resolved = resolved;
	this.enabled = enabled;
}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getCreateDate() {
		return createDate;
	}

	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
	}

	public LocalDateTime getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(LocalDateTime modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public LocalDateTime getEventDate() {
		return eventDate;
	}

	public void setEventDate(LocalDateTime eventDate) {
		this.eventDate = eventDate;
	}

	public Boolean isResolved() {
		return resolved;
	}

	public void setResolved(Boolean resolved) {
		this.resolved = resolved;
	}

	public ReportCategory getReportCategory() {
		return reportCategory;
	}

	public void setReportCategory(ReportCategory reportCategory) {
		this.reportCategory = reportCategory;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Report other = (Report) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Report [id=").append(id).append(", name=").append(name).append(", description=")
				.append(description).append(", createDate=").append(createDate).append(", modifiedDate=")
				.append(modifiedDate).append(", imageUrl=").append(imageUrl).append(", eventDate=").append(eventDate)
				.append(", resolved=").append(resolved).append("]");
		return builder.toString();
	}
	
	
	
}
