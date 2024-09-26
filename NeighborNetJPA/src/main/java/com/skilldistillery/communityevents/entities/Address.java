package com.skilldistillery.communityevents.entities;

import java.util.List;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Address {
	///------------------------FIELDS------------------------------------------------------------------------------------------

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	private String street;
	
	private String city;
	
	private String state;
	
	private String country;
	
	private Boolean enabled;
	
	@OneToMany(mappedBy="address")
	private List<User> users;
	///----------------------------CONSTRUCTOR--------------------------------------------------------------------------------------


	public Address() {
	}
	///-----------------------------------GETTERS AND SETTERS-------------------------------------------------------------------------------

	
	
	public int getId() {
		return id;
	}

	public List<User> getUsers() {
		return users;
	}



	public void setUsers(List<User> users) {
		this.users = users;
	}



	public Boolean getEnabled() {
		return enabled;
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

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Boolean isEnabled() {
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
		Address other = (Address) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Address [id=").append(id).append(", name=").append(name).append(", street=").append(street)
				.append(", city=").append(city).append(", state=").append(state).append(", country=").append(country)
				.append(", enabled=").append(enabled).append("]");
		return builder.toString();
	}
	
	
	
}
