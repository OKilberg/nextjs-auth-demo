import React from "react";

const AccessDenied = () => {
  return (
    <div>
      Access Denied! Please <a href="/register">Register</a> or{" "}
      <a href="/login">Login</a> to gain access.
    </div>
  );
};

export default AccessDenied;
