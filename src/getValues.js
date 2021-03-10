const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const valence = parseInt(urlParams.get("valence"));
const arousal = parseInt(urlParams.get("arousal"));
const angle = parseFloat(urlParams.get("angle"));

const onBack = () => {
  window.location.href = `index.html?valence=${valence}&arousal=${arousal}&angle=${angle}`;
};

const onDownload = () => {
  const canvas = document.getElementById("defaultCanvas0");
  const base64 = canvas.toDataURL("image/pdf");

  let pdf = new jsPDF();
  pdf.addImage(base64, "PNG", 0, 0);
  pdf.save("drawing.pdf");
};
