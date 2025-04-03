export const numberFormat = (price) => {
  const rupiahformat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: "0",
  }).format(price);

  return rupiahformat
};

export const genSelectAmount = (amount) => {
  return Array.from({ length: amount }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
