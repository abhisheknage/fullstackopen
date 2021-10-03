import React from "react";

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="message message--error">{message}</div>;
};

export default ErrorNotification;
