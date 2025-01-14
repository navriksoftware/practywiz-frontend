import React from "react";
import Skeleton from "react-loading-skeleton";
function ListStatusSkeleton() {
  return (
    <>
      <tr>
        <td>
          <Skeleton width={"100%"} height={25} />
        </td>
        <td>
          <Skeleton width={"100%"} height={25} />
        </td>
        <td>
          <Skeleton width={"100%"} height={25} />
        </td>
        <td>
          <Skeleton width={"100%"} height={25} />
        </td>
        <td>
          <Skeleton width={"100%"} height={25} />
        </td>
        <td>
          <Skeleton width={"100%"} height={25} />
        </td>
        <td>
          <Skeleton width={"100%"} height={25} />
        </td>
      </tr>
    </>
  );
}

export default ListStatusSkeleton;
