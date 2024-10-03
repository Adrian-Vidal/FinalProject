package com.skilldistillery.communityevents.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "comment")
public class Comment {

	// == FIELDS ==
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String body;

	@CreationTimestamp
	@Column(name = "create_date")
	private LocalDateTime createDate;

	@UpdateTimestamp
	@Column(name = "modified_date")
	private LocalDateTime modifiedDate;

	@Column(name = "image_url")
	private String imageUrl;

	private boolean enabled;

	// FOREIGN
	@ManyToOne
	@JoinColumn(name = "report_id")
	private Report report;

	@ManyToOne
	@JoinColumn(name = "user_id")
//	@JsonIgnore
	private User user;

	@ManyToOne
	@JsonIgnoreProperties({"inReplyTo","report"})
	@JoinColumn(name = "in_reply_to_id")
	private Comment inReplyTo;

	@OneToMany(mappedBy = "inReplyTo")
	@JsonIgnore
	private List<Comment> replies;

	// == CONSTRUCTORS ==
	public Comment() {
		super();
	}

	public Comment(int id, String body, LocalDateTime createDate, LocalDateTime modifiedDate, String imageUrl,
			boolean enabled, Report report, User user, Comment inReplyTo, List<Comment> replies) {
		super();
		this.id = id;
		this.body = body;
		this.createDate = createDate;
		this.modifiedDate = modifiedDate;
		this.imageUrl = imageUrl;
		this.enabled = enabled;
		this.report = report;
		this.user = user;
		this.inReplyTo = inReplyTo;
		this.replies = replies;
	}

	// == GETTERS & SETTERS ==
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
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

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public Report getReport() {
		return report;
	}

	public void setReport(Report report) {
		this.report = report;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Comment getInReplyTo() {
		return inReplyTo;
	}

	public void setInReplyTo(Comment inReplyTo) {
		this.inReplyTo = inReplyTo;
	}

	public List<Comment> getReplies() {
		return replies;
	}

	public void setReplies(List<Comment> replies) {
		this.replies = replies;
	}

	// == HASHCODE & EQUALS ==
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
		Comment other = (Comment) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Comment [id=").append(id).append(", body=").append(body).append(", createDate=")
				.append(createDate).append(", modifiedDate=").append(modifiedDate).append(", imageUrl=")
				.append(imageUrl).append(", enabled=").append(enabled).append("]");
		return builder.toString();
	}

}
