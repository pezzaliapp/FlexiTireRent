// app.js
document.getElementById('preventivoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Raccolta dati dal form
    const larghezza = Number(document.getElementById('larghezza').value);
    const altezza = Number(document.getElementById('altezza').value);
    const diametro = Number(document.getElementById('diametro').value);
    const quantita = Number(document.getElementById('quantita').value);
    const periodo = Number(document.getElementById('periodo').value);

    const servizi = {
        deposito: document.getElementById('deposito').checked,
        noleggio: document.getElementById('noleggio').checked,
        trasporto: document.getElementById('trasporto').checked,
        manutenzione: document.getElementById('manutenzione').checked,
        assicurazione: document.getElementById('assicurazione').checked,
        cauzione: document.getElementById('cauzione').checked
    };

    // Prezzi base (modificabili in base alle tue esigenze)
    let costoTotale = 0;

    if (servizi.deposito) costoTotale += 25 * quantita * (periodo / 6);
    if (servizi.noleggio) costoTotale += 50 * quantita * (periodo / 6);
    if (servizi.trasporto) costoTotale += 20;
    if (servizi.manutenzione) costoTotale += 15 * quantita;
    if (servizi.assicurazione) costoTotale += 30;
    if (servizi.cauzione) costoTotale += 100;

    // Applicazione IVA 22%
    const iva = costoTotale * 0.22;
    const totaleConIVA = costoTotale + iva;

    // Mostra il risultato (temporaneamente in console, successivamente nel PDF)
    console.log("Costo Netto:", costoTotale.toFixed(2), "€");
    console.log("IVA (22%):", iva.toFixed(2), "€");
    console.log("Costo Totale IVA inclusa:", totaleConIVA.toFixed(2), "€");

    alert(`Preventivo calcolato:\nTotale IVA inclusa: ${totaleConIVA.toFixed(2)} €`);
});
