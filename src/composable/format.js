export function formatCurrency(value) {
  const options = {
    style: 'currency',
    currency: 'BRL'
  };
  return new Intl.NumberFormat('pt-BR', options).format(value);
}