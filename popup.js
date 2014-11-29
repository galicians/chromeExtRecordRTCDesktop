var filename;
var videoRecorder;
var audioRecorder;
var audioConfig = { type: 'audio'};



function gotStream(stream) {
    var mediaStream = stream;
    console.log("Received  media stream: ", mediaStream);
    $('#video').attr({"src": URL.createObjectURL(mediaStream) })
    var videoConfig = { type: 'video' };
    videoRecorder = RecordRTC(stream, videoConfig);
    videoRecorder.startRecording();
    audioRecorder = RecordRTC(stream, audioConfig);
    audioRecorder.startRecording();
    
  stream.onended = function() { 
    console.log("Ended");
    audioRecorder.getDataURL(function(audioDataURL) {
        var audio = {
            blob: audioRecorder.getBlob(),
            dataURL: audioDataURL
        };
        console.log('inside getDataURL')
        // if record both wav and webm
        if(!isRecordOnlyAudio) {
            videoRecorder.getDataURL(function(videoDataURL) {
                var video = {
                    blob: videoRecorder.getBlob(),
                    dataURL: videoDataURL
                };

                postFiles(video);
            });
        }

     
        if (isRecordOnlyAudio) postFiles(audio);
    });




    };
  // videoRecorder.stopRecording(stream.onended)
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

function onStopRecording() {
 console.log('on stop recoring')
}

function generateUrlVideo(){

    console.log('the url generated is')
}





function getUserMediaError() {
  console.log("getUserMedia() failed.");
}


function onAccessApproved(id) {
   navigator.webkitGetUserMedia({
      video: { mandatory: { chromeMediaSource: "desktop",
                            chromeMediaSourceId: id } }
  }, gotStream, getUserMediaError);
}

$(function() {
    $('#start').click(function() { console.log('hello user') })
    chrome.desktopCapture.chooseDesktopMedia(["screen",'window'], onAccessApproved)
})







