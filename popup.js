var btnStartRecording = document.querySelector('#btn-start-recording');
var btnStopRecording  = document.querySelector('#btn-stop-recording');
var videoElement      = document.querySelector('video');
var progressBar = document.querySelector('#progress-bar');
var percentage = document.querySelector('#percentage');




btnStartRecording.onclick = function() {
  btnStartRecording.disabled = true;
}

btnStopRecording.onclick = function() {
  btnStartRecording.disabled = false;
  btnStopRecording.disabled = true;
};