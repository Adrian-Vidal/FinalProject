package com.skilldistillery.communityevents.entities;

import java.util.List;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "report_tag")
public class ReportTag {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "tag_name")
	private String tagName;

	@ManyToMany
	@JoinTable(name = "report_has_report_tag", joinColumns = @JoinColumn(name = "report_tag_id"), inverseJoinColumns = @JoinColumn(name = "report_id"))
	private List<Report> reports;

	public ReportTag() {
	}

	public ReportTag(int id, String tagName) {
		super();
		this.id = id;
		this.tagName = tagName;
	}

	public int getId() {
		return id;
	}

	public List<Report> getReports() {
		return reports;
	}

	public void setReports(List<Report> reports) {
		this.reports = reports;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
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
		ReportTag other = (ReportTag) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ReportTag [id=").append(id).append(", tagName=").append(tagName).append("]");
		return builder.toString();
	}

}
