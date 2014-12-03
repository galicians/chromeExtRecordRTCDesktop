
var videoRecorder;
var user;
var numAnswer;
var questionId;

function gotStream(stream) {
    console.log(window.screen.width)
    console.log(window.screen.height)
    var mediaStream = stream;
    console.log("Received  media stream: ", mediaStream);
    $('#video').attr({"src": URL.createObjectURL(mediaStream) })
    var videoConfig = { type: 'video' };
    videoRecorder = RecordRTC(stream, videoConfig);
    videoRecorder.startRecording();
  
  stream.onended = function() { 
    console.log("Ended");

    videoRecorder.stopRecording(function(videoUrl){
        videoRecorder.getDataURL(function(videoDataURL) {
        var video = {
            blob: videoRecorder.getBlob(),
            dataURL: videoDataURL 
        };
        console.log(video)
        postFiles(video);
        });
    })

    };
}

// ---------------------posting to the server// ---------------------

function postFiles(video) {
  
    var fileName = 'answer_' + questionId + "_" + numAnswer
    console.log(fileName)
    console.log(user)

    // this object is used to allow submitting multiple recorded blobs
    var files = { };
    
    files.video = {
        name: fileName + '.' + video.blob.type.split('/')[1],
        author: user,
        type: video.blob.type,
        contents: video.dataURL
    };
   
    console.log('inside of postfiles, my video object looks like, ', files)

    xhr('http://localhost:8000/upload', JSON.stringify(files), function(_fileName) {
        var href = location.href.substr(0, location.href.lastIndexOf('/') + 1);
        console.log('in the client inside xhr')
   
    });

}



// ---------------------// ---------------------


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
    console.log(url)
    request.open('POST', url);
    console.log(data)
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
      video: { mandatory: { maxWidth: window.screen.width,
                            maxHeight: window.screen.height,
                            chromeMediaSource: "desktop",
                            chromeMediaSourceId: id } }
  }, gotStream, getUserMediaError);
}

// $(function() {
//     $('#start').click(function() {  })
    chrome.desktopCapture.chooseDesktopMedia(["screen",'window'], onAccessApproved)
// })


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request)
    if (request.script == "data") { 
    user = request.aut;
    numAnswer = request.countAnswers
    questionId = request.qId
    console.log("Author is: ", user)
    console.log("Answer number: ", numAnswer)
    console.log("question id: ", questionId)
    }
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('inside extension', request)
   user = request.aut;
    numAnswer = request.countAnswers
    questionId = request.qId
})


chrome.storage.local.get('a', function(result) { user = result['a'] } )
chrome.storage.local.get('num', function(result) { numAnswer = result.num } )
chrome.storage.local.get('id', function(result) { questionId = result['id'] } )







