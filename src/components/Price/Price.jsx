import React from "react";

export const Price = ({ price = 0, locale = "en-IN", currency = "INR" }) => {
  const formatCurrency = () => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(price);
  };

  return <span>{formatCurrency()}</span>;
};

// Price.defaultProps = {
//   locale: "en-IN",
//   currency: "INR",
// };


