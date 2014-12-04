
chrome.runtime.sendMessage({ action: "show" });






var s = document.createElement('script')

s.src = chrome.extension.getURL('script.js')

s.onload = function() {
    alert('hello')
}



