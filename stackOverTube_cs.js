
chrome.runtime.sendMessage({ action: "show" });


var p = document.createElement('script')

p.src = chrome.extension.getURL('popup.js')


var s = document.createElement('script')

s.src = chrome.extension.getURL('script.js')

s.onload = function() {

}



