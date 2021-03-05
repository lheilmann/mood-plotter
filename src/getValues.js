const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const valence = urlParams.get("valence");
const arousal = urlParams.get("arousal");
