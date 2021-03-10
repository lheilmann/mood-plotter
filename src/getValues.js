const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const valence = parseInt(urlParams.get("valence"));
const arousal = parseInt(urlParams.get("arousal"));
const angle = parseFloat(urlParams.get("angle"));

const onBack = () => {
  window.location.href = `index.html?valence=${valence}&arousal=${arousal}&angle=${angle}`;
};
