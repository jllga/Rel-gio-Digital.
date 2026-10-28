
const elementoHora = document.getElementById("hora");
const elementoPeriodo = document.getElementById("periodo");
const elementoData = document.getElementById("data");
const botaoFormato = document.getElementById("botaoFormato");

let formato24Horas = true;

function atualizarRelogio() {
    const agora = new Date();

    const opcoesHora = {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: !formato24Horas
    };

    const horaFormatada = new Intl.DateTimeFormat(
        "pt-BR",
        opcoesHora
    ).format(agora);

    elementoHora.textContent = horaFormatada;

    if (formato24Horas) {
        elementoPeriodo.textContent = "";
    } else {
        const periodo = new Intl.DateTimeFormat("pt-BR", {
            timeZone: "America/Sao_Paulo",
            hour: "numeric",
            hour12: true
        }).formatToParts(agora)
          .find(parte => parte.type === "dayPeriod");

        elementoPeriodo.textContent = periodo
            ? periodo.value.toUpperCase()
            : "";
    }

    const opcoesData = {
        timeZone: "America/Sao_Paulo",
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    };

    elementoData.textContent = new Intl.DateTimeFormat(
        "pt-BR",
        opcoesData
    ).format(agora);
}

botaoFormato.addEventListener("click", function () {
    formato24Horas = !formato24Horas;

    botaoFormato.textContent = formato24Horas
        ? "Mudar para formato 12h"
        : "Mudar para formato 24h";

    atualizarRelogio();
});

atualizarRelogio();

setInterval(atualizarRelogio, 1000);
