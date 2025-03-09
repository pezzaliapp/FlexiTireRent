// app.js

document.getElementById('preventivoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Raccolta dati dal form
    const inputs = event.target.elements;
    const larghezza = inputs[0].value;
    const altezza = inputs[1].value;
    const diametro = inputs[2].value;
    const quantita = inputs[3].value;
    const periodo = inputs[4].value;

    // Servizi aggiuntivi
    const servizi = {
        deposito: inputs[5].checked,
        noleggio: inputs[6].checked,
        trasporto: inputs[7].checked,
        manutenzione: inputs[8].checked,
        assicurazione: inputs[9].checked,
        cauzione: inputs[10].checked
    };

    // Mostra dati raccolti in console (per test iniziale)
    console.log({larghezza, altezza, diametro, quantita, periodo, servizi});

    // Qui inseriremo poi i calcoli del preventivo e generazione PDF
});
