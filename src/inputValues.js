const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let valence = parseInt(urlParams.get("valence")) ?? 0;
let arousal = parseInt(urlParams.get("arousal")) ?? 0;

const onSubmit = () => {
  window.location.href = `drawing.html?valence=${valence}&arousal=${arousal}`;
};
