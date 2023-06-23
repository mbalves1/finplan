export function formatCurrency(value) {
  const options = {
    style: 'currency',
    currency: 'BRL'
  };
  return new Intl.NumberFormat('pt-BR', options).format(value);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}