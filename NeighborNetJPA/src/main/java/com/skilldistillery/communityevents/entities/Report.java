package com.skilldistillery.communityevents.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Report {

	// == FIELDS ==
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

	private Boolean resolved;
	private Boolean enabled;

	// == FOREIGN ==

	@ManyToOne
	@JoinColumn(name = "address_id")
	private Address address;

	@ManyToOne()
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToMany
	@JoinTable(name = "user_has_report_liked", joinColumns = @JoinColumn(name = "report_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	private List<User> usersLiked;

	@ManyToOne
	@JoinColumn(name = "report_category_id")
	private ReportCategory reportCategory;
	
	@JsonIgnore
	@ManyToMany(mappedBy = "reports")
	private List<ReportTag> reportTags;

	// == CONSTRUCTORS ==
	public Report() {

	}

	public Report(int id, String name, String description, LocalDateTime createDate, LocalDateTime modifiedDate,
			String imageUrl, LocalDateTime eventDate, LocalDateTime eventDateEnd, Boolean resolved, Boolean enabled,
			Address address, User user, List<User> usersLiked, ReportCategory reportCategory,
			List<ReportTag> reportTags) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.createDate = createDate;
		this.modifiedDate = modifiedDate;
		this.imageUrl = imageUrl;
		this.eventDate = eventDate;
		this.eventDateEnd = eventDateEnd;
		this.resolved = resolved;
		this.enabled = enabled;
		this.address = address;
		this.user = user;
		this.usersLiked = usersLiked;
		this.reportCategory = reportCategory;
		this.reportTags = reportTags;
	}

	// == GETTERS & SETTERS ==
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

	public List<User> getUsersLiked() {
		return usersLiked;
	}

	public void setUsersLiked(List<User> users) {
		this.usersLiked = users;
	}

	public LocalDateTime getEventDateEnd() {
		return eventDateEnd;
	}

	public void setEventDateEnd(LocalDateTime eventDateEnd) {
		this.eventDateEnd = eventDateEnd;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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
				.append(", eventDateEnd=").append(eventDateEnd).append(", resolved=").append(resolved)
				.append(", enabled=").append(enabled).append("]");
		return builder.toString();
	}

}
