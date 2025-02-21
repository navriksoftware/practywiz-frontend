import React from "react";
import "./allcourse.css";
import altImg from "../../Images/Courses/vb4.jpg";

const CourseCard = ({ course }) => {
  const {
    title,
    description,
    image,
    instructor,
    instructorRole,
    students,
    rating,
    price,
    duration,
    category,
  } = course;

  return (
    <div key={course.id} className="practywiz-training-card">
      <div className="practywiz-training-card-image">
        <img
          // src={image || '/placeholder.svg'}
          src={altImg}
          alt={title}
          width={300}
          height={200}
          className="practywiz-training-img"
        />
        <span className="practywiz-training-duration">{duration}</span>
      </div>
      <div className="practywiz-training-card-content">
        <div className="practywiz-training-card-body">
          <div className="practywiz-training-card-category">{category}</div>
          <h3>{title}</h3>
          <p>{description}</p>

          <div className="practywiz-training-instructor">
            {/* <div className="practywiz-training-instructor-avatar">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt={instructor}
                width={40}
                height={40}
              />
            </div> */}
            {/* <div className="practywiz-training-instructor-info">
              <strong>{instructor}</strong>
              <span>{instructorRole}</span>
            </div> */}
          </div>
        </div>
        <div className="practywiz-training-card-footer">
          <div className="practywiz-training-rating">
            <div className="practywiz-training-stars">
              <i className="fa-star fa-solid text-primary"></i>
            </div>
            <span>{rating}</span>
          </div>
          <div className="practywiz-training-students">{students}</div>
          <div className="practywiz-training-price">{price}</div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
