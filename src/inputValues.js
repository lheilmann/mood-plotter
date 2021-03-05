let valence = 0;
let arousal = 0;

const onSubmit = () => {
  window.location.href = `drawing.html?valence=${valence}&arousal=${arousal}`;
};
