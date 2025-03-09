// app.js
document.getElementById('preventivoForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const { jsPDF } = window.jspdf;

    // Raccolta dati
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

    // Calcolo preventivo
    let costoTotale = 0;
    if (servizi.deposito) costoTotale += 25 * quantita * (periodo / 6);
    if (servizi.noleggio) costoTotale += 50 * quantita * (periodo / 6);
    if (servizi.trasporto) costoTotale += 20;
    if (servizi.manutenzione) costoTotale += 15 * quantita;
    if (servizi.assicurazione) costoTotale += 30;
    if (servizi.cauzione) costoTotale += 100;

    const iva = costoTotale * 0.22;
    const totaleConIVA = costoTotale + iva;

    // Creazione PDF
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Preventivo FlexiTireRent", 20, 20);

    doc.setFontSize(12);
    doc.text(`Misure Pneumatici: ${larghezza}/${altezza} R${diametro}`, 20, 40);
    doc.text(`Quantità: ${quantita}`, 20, 50);
    doc.text(`Periodo: ${periodo} mesi`, 20, 60);

    let y = 80;
    doc.text("Servizi Inclusi:", 20, y);
    y += 10;

    let serviziInclusi = '';
    for (const [key, value] of Object.entries(servizi)) {
        if (value) {
            const nomeServizio = key.charAt(0).toUpperCase() + key.slice(1);
            doc.text(`- ${nomeServizio}`, 30, y);
            serviziInclusi += `- ${nomeServizio}%0A`;
            y += 10;
        }
    }

    doc.text(`Costo Netto: ${costoTotale.toFixed(2)} €`, 20, y+10);
    doc.text(`IVA 22%: ${iva.toFixed(2)} €`, 20, y+20);
    doc.text(`Totale IVA Inclusa: ${totaleConIVA.toFixed(2)} €`, 20, y+30);

    doc.save("Preventivo_FlexiTireRent.pdf");

    // Messaggio WhatsApp
    const messaggio = 
        `*Preventivo FlexiTireRent*%0A` +
        `Misure Pneumatici: ${larghezza}/${altezza} R${diametro}%0A` +
        `Quantità: ${quantita}%0A` +
        `Periodo: ${periodo} mesi%0A` +
        `Servizi inclusi:%0A${serviziInclusi}` +
        `Costo Netto: ${costoTotale.toFixed(2)}€%0A` +
        `IVA 22%: ${iva.toFixed(2)}€%0A` +
        `*Totale IVA inclusa:* ${totaleConIVA.toFixed(2)}€`;

    const urlWhatsApp = `https://wa.me/?text=${messaggio}`;
    
    window.open(urlWhatsApp, '_blank');
});
