import React from "react";

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className="message message--success">
      {message}
      <br />
    </div>
  );
};

export default SuccessNotification;
