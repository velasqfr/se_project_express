//This will allow us to share the currentUser data throughout the app without passing it through props.
import React from "react";

const CurrentUserContext = React.createContext(null);

export default CurrentUserContext;
