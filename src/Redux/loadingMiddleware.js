// // src/middleware/loadingMiddleware.js
// import { setLoading } from "./loadingRedux";

// const loadingMiddleware =
//   ({ dispatch }) =>
//   (next) =>
//   (action) => {
//     if (action.type.endsWith("/pending")) {
//       dispatch(setLoading(true)); // Set loading to true on API request start
//     } else if (
//       action.type.endsWith("/fulfilled") ||
//       action.type.endsWith("/rejected")
//     ) {
//       dispatch(setLoading(false)); // Set loading to false when API request completes
//     }

//     return next(action);
//   };

// export default loadingMiddleware;
