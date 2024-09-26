package com.skilldistillery.communityevents.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class User {
	///------------------------FIELDS------------------------------------------------------------------------------------------

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String username;

	private String password;

	private boolean enabled;

	private String role;
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	
	private String email;
	
	@Column(name="create_date")
	private LocalDateTime createDate;
	
	@Column(name="modified_date")
	private LocalDateTime modifiedDate;
	
	@Column(name="image_url")
	private String imageUrl;
	
	@ManyToOne
	@JoinColumn(name="address_id")
	private Address address;
	
	@OneToMany(mappedBy="sender")
	private List<DirectMessage> sentMessages;
	
	@OneToMany(mappedBy="recipient")
	private List<DirectMessage> recievedMessages;
	
	@JsonIgnore
	@ManyToMany(mappedBy="users")
	private List<Report> reports;
	
	///----------------------------CONSTRUCTOR--------------------------------------------------------------------------------------

	
	public User() {
		super();
	}
	
	public User(int id, String username, String password, boolean enabled, String role, String firstName,
			String lastName, String email, LocalDateTime createDate, LocalDateTime modifiedDate, String imageUrl,
			Address address, List<DirectMessage> sentMessages, List<DirectMessage> recievedMessages,
			List<Report> reports) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.enabled = enabled;
		this.role = role;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.createDate = createDate;
		this.modifiedDate = modifiedDate;
		this.imageUrl = imageUrl;
		this.address = address;
		this.sentMessages = sentMessages;
		this.recievedMessages = recievedMessages;
		this.reports = reports;
	}
	///-----------------------------------GETTERS AND SETTERS-------------------------------------------------------------------------------

	


	public String getFirstName() {
		return firstName;
	}

	public List<DirectMessage> getSentMessages() {
		return sentMessages;
	}

	public void setSentMessages(List<DirectMessage> sentMessages) {
		this.sentMessages = sentMessages;
	}

	public List<DirectMessage> getRecievedMessages() {
		return recievedMessages;
	}

	public void setRecievedMessages(List<DirectMessage> recievedMessages) {
		this.recievedMessages = recievedMessages;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	

	public List<Report> getReports() {
		return reports;
	}

	public void setReports(List<Report> reports) {
		this.reports = reports;
	}
	
	///------------------------------------------------------------------------------------------------------------------

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
		User other = (User) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("User [id=").append(id).append(", username=").append(username).append(", password=")
				.append(password).append(", enabled=").append(enabled).append(", role=").append(role).append("]");
		return builder.toString();
	}
	
	

}
