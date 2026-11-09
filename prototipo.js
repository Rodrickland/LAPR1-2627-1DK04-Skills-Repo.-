// Dados de exemplo (apenas em memória)
let humidade = 42;
let nutrientes = 25;
let proximoId = 4;
const inventario = [
  { id: 1, produto: "Tomate", kg: 120, dias: 3, enviado: false },
  { id: 2, produto: "Alface", kg: 60, dias: 1, enviado: false },
  { id: 3, produto: "Cenoura", kg: 200, dias: 10, enviado: false },
];
const previsoes = {
  sol: { texto: "Sem riscos. Boa altura para regar de manhã cedo.", perigo: false },
  chuva: { texto: "Chuva forte prevista. Suspenda a rega e verifique a drenagem.", perigo: true },
  tempestade: { texto: "Tempestade às 18h. Proteja as culturas e ative as coberturas.", perigo: true },
  geada: { texto: "Geada prevista. Cubra as plantas sensíveis ao frio.", perigo: true },
};

const animais = ["Javali", "Coelho", "Raposa", "Veado"];

function el(id) {
  return document.getElementById(id);
}

