import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, isLoggedIn }) {
  //If the user is logged in, render the protected content
  if (isLoggedIn) {
    return children;
  }

  //Otherwise, redirect to the main page
  return <Navigate to="/" replace />;
}
