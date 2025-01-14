const StarRating = ({ rating }) => {
  const fullStars = Math?.floor(rating);
  const halfStar = rating % 1 !== 0; // Check if the rating has a fractional part
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Calculate the remaining empty stars

  return (
    <>
      {/* Render full stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <i
          key={index}
          className="fa-solid fa-star"
          style={{ color: "gold" }}
        ></i>
      ))}

      {/* Render half star if applicable */}
      {halfStar && (
        <i
          className="fa-solid fa-star-half-stroke"
          style={{ color: "gold" }}
        ></i>
      )}

      {/* Render empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <i
          key={index}
          className="fa-regular fa-star"
          style={{ color: "gray" }}
        ></i>
      ))}
    </>
  );
};

export default StarRating;
