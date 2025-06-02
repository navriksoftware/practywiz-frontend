"use client";

import React, { useState } from "react";

export function BasicInformation({
  title,
  author,
  category,
  // tags,
  onInputChange,
  onTagAdd,
  onTagRemove,
  errors = {},
}) {
  // const [newTag, setNewTag] = useState("");

  // const handleTagKeyDown = (e) => {
  //   if (e.key === "Enter" || e.key === ",") {
  //     e.preventDefault();
  //     if (newTag.trim()) {
  //       onTagAdd(newTag.trim());
  //       setNewTag("");
  //     }
  //   }
  // };

  return (
    <section className="new-case-add-section">
      <h2 className="new-case-add-section-title">Basic Information</h2>

      <div className="new-case-add-field">
        <label htmlFor="case-title" className="new-case-add-label">
          Case Study Title
        </label>
        <input
          id="case-title"
          type="text"
          className={`new-case-add-input ${
            errors.title ? "new-case-add-input-error" : ""
          }`}
          placeholder="Enter case study title"
          value={title}
          onChange={(e) => onInputChange("title", e.target.value)}
        />
        {errors.title && (
          <div className="new-case-add-error">{errors.title}</div>
        )}
      </div>

      <div className="new-case-add-field">
        <label htmlFor="author" className="new-case-add-label">
          Author
        </label>
        <input
          id="author"
          type="text"
          className={`new-case-add-input ${
            errors.author ? "new-case-add-input-error" : ""
          }`}
          placeholder="Enter author name"
          value={author}
          onChange={(e) => onInputChange("author", e.target.value)}
        />
        {errors.author && (
          <div className="new-case-add-error">{errors.author}</div>
        )}
      </div>

      <div className="new-case-add-row">
        <div className="new-case-add-field new-case-add-field-half">
          <label htmlFor="category" className="new-case-add-label">
            Category
          </label>
          <div className="new-case-add-select-wrapper">
            <select
              id="category"
              className={`new-case-add-select ${
                errors.category ? "new-case-add-input-error" : ""
              }`}
              value={category}
              onChange={(e) => onInputChange("category", e.target.value)}
            >
              <option value="">Select category</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
              <option value="finance">Finance</option>
              <option value="operations">Operations</option>
              <option value="strategy">Strategy</option>
              <option value="leadership">Leadership</option>
              <option value="management">Management</option>
            </select>
            <i className="fas fa-chevron-down new-case-add-select-icon"></i>
          </div>
          {errors.category && (
            <div className="new-case-add-error">{errors.category}</div>
          )}
        </div>

        {/* <div className="new-case-add-field new-case-add-field-half">
          <label htmlFor="tags" className="new-case-add-label">
            Tags
          </label>
          <div className="new-case-add-tags-container">
            <div className="new-case-add-tags">
              {tags.map((tag, index) => (
                <div key={index} className="new-case-add-tag">
                  {tag}
                  <button
                    type="button"
                    className="new-case-add-tag-remove"
                    onClick={() => onTagRemove(tag)}
                    aria-label={`Remove ${tag} tag`}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
              <input
                type="text"
                className="new-case-add-tag-input"
                placeholder="Add tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={() => {
                  if (newTag.trim()) {
                    onTagAdd(newTag.trim());
                    setNewTag("");
                  }
                }}
              />
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
