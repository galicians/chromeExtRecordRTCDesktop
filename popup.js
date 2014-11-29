

function gotStream(stream) {
    console.log("Received local stream");
  $('#video').attr({"src": URL.createObjectURL(stream) })
  // $('#video').attr({"muted": true})
  console.log(URL.createObjectURL(stream))
  localstream = stream;
  stream.onended = function() { console.log("Ended"); };
}

function getUserMediaError() {
  console.log("getUserMedia() failed.");
}


function onAccessApproved(id) {
   navigator.webkitGetUserMedia({
      audio:false,
      video: { mandatory: { chromeMediaSource: "desktop",
                            chromeMediaSourceId: id } }
  }, gotStream, getUserMediaError);
}


$(function() {
    $('#start').click(function() { console.log('hello user') })
    chrome.desktopCapture.chooseDesktopMedia(["screen",'window'], onAccessApproved)
})


$(function() {
    $('#stop').click(function() { console.log('hello user') })
    chrome.desktopCapture.chooseDesktopMedia(["screen",'window'], onAccessApproved)
})




