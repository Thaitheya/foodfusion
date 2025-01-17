import React from "react";

const DateTime = ({ 
  date, 
  options = {} 
}) => {
  const {
    weekday = "short",
    year = "numeric",
    month = "long",
    day = "numeric",
    hour = "numeric",
    minute = "numeric",
    second = "numeric",
  } = options;

  const currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale;

  const formattedDate = new Intl.DateTimeFormat(currentLocale, {
    year,
    month,
    weekday,
    day,
    hour,
    minute,
    second,
  }).format(Date.parse(date));

  return <span>{formattedDate}</span>;
};

DateTime.defaultProps = {
  options: {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  },
};

export default DateTime;
