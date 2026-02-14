export const formatMoney = (amount) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + " so‘m";
  };
  
  export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('uz-UZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };