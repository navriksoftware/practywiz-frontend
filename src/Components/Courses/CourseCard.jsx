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
    <div key={course.id} className="yewaale-card">
      <div className="yewaale-card-image">
        <img
          // src={image || '/placeholder.svg'}
          src={altImg}
          alt={title}
          width={300}
          height={200}
          className="yewaale-img"
        />
        <span className="yewaale-duration">{duration}</span>
      </div>
      <div className="yewaale-card-content">
        <div className="yewaale-card-body">
          <div className="yewaale-card-category">{category}</div>
          <h3>{title}</h3>
          <p>{description}</p>

          <div className="yewaale-instructor">
            {/* <div className="yewaale-instructor-avatar">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt={instructor}
                width={40}
                height={40}
              />
            </div> */}
            <div className="yewaale-instructor-info">
              <strong>{instructor}</strong>
              <span>{instructorRole}</span>
            </div>
          </div>
        </div>
        <div className="yewaale-card-footer">
          <div className="yewaale-rating">
            <div className="yewaale-stars">
              <i className="fa-star fa-solid text-primary"></i>
            </div>
            <span>{rating}</span>
          </div>
          <div className="yewaale-students">{students}</div>
          <div className="yewaale-price">{price}</div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
