let speedRange = document.getElementById("speed");
let pitchRange = document.getElementById("pitch");
let showSpeed = document.querySelector(".showSpeed");
let showPitch = document.querySelector(".showPitch");

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
  speechSynthesis.cancel(); //! Every time you click, reading starts from the begining
  const text = document.getElementById("text").value;
  const utterance = new SpeechSynthesisUtterance(text);

  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.rate = +speedRange.value;
  utterance.pitch = +pitchRange.value;

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

//! to display the speed and pitch
speedRange.onchange = () => {
  showSpeed.innerText = speedRange.value + "X";
};
pitchRange.onchange = () => {
  showPitch.innerText = pitchRange.value + "X";
};
//! to alert user if he opens in opera browser
window.onload = function () {
  const ua = navigator.userAgent;
  // Opera detection
  const isOpera = ua.includes("OPR") || ua.includes("Opera");
  if (isOpera) {
    alert(
      "If reading feature is not compatible with opera browser, use google chrome. Thank you!"
    );
  }
};
