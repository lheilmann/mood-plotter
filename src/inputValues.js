const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let valence = urlParams.get("valence")
  ? parseInt(urlParams.get("valence"))
  : 50;
let arousal = urlParams.get("arousal")
  ? parseInt(urlParams.get("arousal"))
  : 50;
let angle = urlParams.get("angle") ? parseInt(urlParams.get("angle")) : 0;

const onSubmit = () => {
  window.location.href = `drawing.html?valence=${valence}&arousal=${arousal}&angle=${angle}`;
};
