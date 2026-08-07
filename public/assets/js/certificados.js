async function carregarImagemComoPng(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Não foi possível carregar a imagem de fundo.');
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('A imagem de fundo não pôde ser lida.'));
    img.src = objectUrl;
  });

  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 850;
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  URL.revokeObjectURL(objectUrl);
  return canvas.toDataURL('image/png');
}

async function gerarCertificadoComPdfLib({ nomeCertificado, nomeBeneficiado, descricao, data, cargaHoraria, backgroundUrl }) {
  try {
    const { PDFDocument, rgb, StandardFonts } = window.pdfLib;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const backgroundImageData = await carregarImagemComoPng(backgroundUrl);
    const imageEmbed = await pdfDoc.embedPng(backgroundImageData);

    page.drawImage(imageEmbed, {
      x: 0,
      y: 0,
      width: 595,
      height: 842
    });

    page.drawText(nomeCertificado, {
      x: 60,
      y: 560,
      size: 24,
      font,
      color: rgb(0.15, 0.15, 0.15)
    });

    page.drawText(`O(a) aluno(a): ${nomeBeneficiado}`, {
      x: 60,
      y: 500,
      size: 16,
      font: regularFont,
      color: rgb(0.15, 0.15, 0.15)
    });

    page.drawText(descricao, {
      x: 60,
      y: 440,
      size: 14,
      font: regularFont,
      color: rgb(0.15, 0.15, 0.15)
    });

    page.drawText(`Data: ${data}`, {
      x: 60,
      y: 380,
      size: 14,
      font: regularFont,
      color: rgb(0.15, 0.15, 0.15)
    });

    page.drawText(`Carga Horária: ${cargaHoraria}`, {
      x: 60,
      y: 320,
      size: 14,
      font: regularFont,
      color: rgb(0.15, 0.15, 0.15)
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `certificado-${nomeBeneficiado.replace(/\s+/g, '-').toLowerCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert('Não foi possível gerar o certificado. Verifique se a imagem de fundo está disponível.');
  }
}
