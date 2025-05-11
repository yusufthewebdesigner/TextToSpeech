let readBtn = document.getElementById("read");
let pausePlayBtn = document.getElementById("pausePlay");
let cancelBtn = document.getElementById("cancel");

const voiceSelect = document.getElementById("voiceSelect");
let voices = [];

let populateVoices = () => {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.innerText = `${voice.name}`;
    voiceSelect.appendChild(option);
  });
};
speechSynthesis.onvoiceschanged = populateVoices;

readBtn.onclick = () => {
  const text = document.getElementById("text").value;
  const utterance = new SpeechSynthesisUtterance(text);

  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.rate = +document.getElementById("speed").value;
  utterance.pitch = +document.getElementById("pitch").value;

  speechSynthesis.speak(utterance);
};
pausePlayBtn.onclick = () => {
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
    pausePlayBtn.innerHTML = `Resume <i class="bi bi-play-circle"></i>`;
  } else {
    speechSynthesis.resume();
    pausePlayBtn.innerHTML = `Pause <i class="fa-regular fa-circle-pause"></i>`;
  }
};
cancelBtn.onclick = () => {
  speechSynthesis.cancel();
};

window.onload = speechSynthesis.cancel();
