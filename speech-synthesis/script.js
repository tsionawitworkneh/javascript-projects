const synth = window.speechSynthesis;

function onSubmit(e){
    e.preventDefault();

    const textInput = document.getElementById('text-input');

    const ulterThis = new SpeechSynthesisUtterance(textInput.value);

    synth.speak(ulterThis);
}

document.getElementById('form').addEventListener('submit',onSubmit);