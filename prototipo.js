
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

function limitar(valor) {
  return Math.max(0, Math.min(100, valor));
}

function desenharBarra(id, valor, alerta) {
  const barra = el(id);
  barra.firstElementChild.style.width = valor + "%";
  barra.classList.toggle("warn", alerta);
}

function renderSensores() {
  const secoAlto = humidade < 30 || humidade > 70;
  let estadoHumidade = "Ideal";
  if (humidade < 30) estadoHumidade = "Baixa: regar";
  if (humidade > 70) estadoHumidade = "Alta: reduzir a rega";
  el("txt-humidade").textContent = humidade + "% · " + estadoHumidade;
  desenharBarra("bar-humidade", humidade, secoAlto);

  const nutrientesBaixos = nutrientes < 30;
  el("txt-nutrientes").textContent =
    nutrientes + "% · " + (nutrientesBaixos ? "Baixo: adicionar nutrientes" : "Suficiente");
  desenharBarra("bar-nutrientes", nutrientes, nutrientesBaixos);
}

function renderTempo() {
  const previsao = previsoes[el("sel-tempo").value];
  const caixa = el("txt-tempo");
  caixa.textContent = previsao.texto;
  caixa.classList.toggle("perigo", previsao.perigo);
}

function renderInventario() {
  const corpo = el("corpo-inventario");
  corpo.textContent = "";
  let kgEnviados = 0;

  inventario.forEach(function (item) {
    const linha = document.createElement("tr");
    const estado = item.enviado ? "Enviado" : item.dias <= 1 ? "Escoar já" : "Disponível";
    if (item.enviado) kgEnviados += item.kg;

    [item.produto, item.kg + " kg", item.dias + (item.dias === 1 ? " dia" : " dias"), estado].forEach(
      function (texto, i) {
        const celula = document.createElement("td");
        celula.textContent = texto;
        if (i === 3 && estado === "Escoar já") celula.className = "estado-urgente";
        linha.appendChild(celula);
      }
    );

    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "act";
    botao.textContent = "Enviar ao distribuidor";
    botao.disabled = item.enviado;
    botao.addEventListener("click", function () {
      item.enviado = true;
      renderInventario();
    });
    celulaBotao.appendChild(botao);
    linha.appendChild(celulaBotao);
    corpo.appendChild(linha);
  });

  el("txt-resumo").textContent =
    "Total já encaminhado para distribuição: " + kgEnviados + " kg.";
}

// Eventos
el("btn-regar").addEventListener("click", function () {
  humidade = limitar(humidade + 20);
  renderSensores();
});

el("btn-sol").addEventListener("click", function () {
  humidade = limitar(humidade - 15);
  nutrientes = limitar(nutrientes - 5);
  renderSensores();
});

el("btn-adubar").addEventListener("click", function () {
  nutrientes = limitar(nutrientes + 25);
  renderSensores();
});

el("sel-tempo").addEventListener("change", renderTempo);

el("btn-animal").addEventListener("click", function () {
  const animal = animais[Math.floor(Math.random() * animais.length)];
  const hora = new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
  const item = document.createElement("li");
  item.textContent = hora + " · " + animal + " detetado junto à vedação. Alerta enviado ao agricultor.";
  el("lista-animais").prepend(item);
  el("txt-animais-vazio").hidden = true;
});

el("form-produto").addEventListener("submit", function (evento) {
  evento.preventDefault();
  inventario.push({
    id: proximoId++,
    produto: el("in-produto").value.trim(),
    kg: Number(el("in-kg").value),
    dias: Number(el("in-dias").value),
    enviado: false,
  });
  evento.target.reset();
  renderInventario();
});

renderSensores();
renderTempo();
renderInventario();

