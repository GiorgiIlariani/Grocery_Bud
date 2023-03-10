import React, { useEffect } from "react";

const Alert = ({ alert, removeAlert, list, submitHandler }) => {
  const { msg, className } = alert;
  useEffect(() => {
    const timout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => {
      clearTimeout(timout);
    };
  }, [list, submitHandler]);

  return <div className={`alert alert-${className}`}>{msg}</div>;
};

export default Alert;
