package com.skilldistillery.communityevents.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class Report {
	// ----------FIELDS--------------------------------------------------------------------------
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	private String description;

	@CreationTimestamp
	@Column(name = "create_date")
	private LocalDateTime createDate;

	@UpdateTimestamp
	@Column(name = "modified_date")
	private LocalDateTime modifiedDate;

	@Column(name = "image_url")
	private String imageUrl;

	@Column(name = "event_date")
	private LocalDateTime eventDate;

	@Column(name = "event_date_end")
	private LocalDateTime eventDateEnd;

	@ManyToOne
	@JoinColumn(name = "report_category_id")
	private ReportCategory reportCategory;

	private Boolean resolved;

	private Boolean enabled;

	@ManyToMany
	@JoinTable(name = "user_has_report_liked", joinColumns = @JoinColumn(name = "report_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	private List<User> users;

	@ManyToMany(mappedBy = "reports")
	private List<ReportTag> reportTags;

//	@OneToMany
//	@JoinColumn(name = "comment_id")
//	private List<Comment> comments;

	// ----------CONSTRUCTOR and
	// HASHCODE--------------------------------------------------------------------------
	public Report() {

	}

	public Report(int id, String name, String description, LocalDateTime createDate, LocalDateTime modifiedDate,

			String imageUrl, LocalDateTime eventDate, ReportCategory reportCategory, Boolean resolved, Boolean enabled,
			List<User> users) {
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
		this.users = users;
	}

	// ----------Getters and
	// Setters--------------------------------------------------------------------------

	public int getId() {
		return id;
	}

	public List<ReportTag> getReportTags() {
		return reportTags;
	}

	public void setReportTags(List<ReportTag> reportTags) {
		this.reportTags = reportTags;
	}

	public Boolean getResolved() {
		return resolved;
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

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
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
