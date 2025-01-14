import React from "react";
import Skeleton from "react-loading-skeleton";
function ListStatusSkeleton({ columns }) {
  return (
    <>
      <tr>
        {Array.from({ length: columns }).map((_, index) => (
          <td key={index}>
            <Skeleton width={"100%"} height={25} />
          </td>
        ))}
      </tr>
    </>
  );
}

export default ListStatusSkeleton;
