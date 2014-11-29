


$(function() {
    $('#start').click(function() { console.log('hello user') })
    chrome.desktopCapture.chooseDesktopMedia(["screen",'window'], function(id) { console.log(id)   })
})








