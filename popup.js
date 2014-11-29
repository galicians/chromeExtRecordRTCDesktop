var filename
var videoRecorder



function gotStream(stream) {
    var mediaStream = stream;
    console.log("Received  media stream: ", mediaStream);
  $('#video').attr({"src": URL.createObjectURL(mediaStream) })
  


  stream.onended = function() { console.log("Ended"); };
}

function xhr(url, data, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                callback(request.responseText);
            }
        };

        request.upload.onprogress = function(event) {
            console.log('request.upload.onprogress')
        };

        request.upload.onload = function() {
            console.log('request.upload.onload')
        };
        request.open('POST', url);
        request.send(data);
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




