
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if( request.action == "show") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.pageAction.show(tabs[0].id);
      console.log('in the eventPage show event received')
    });
  }
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if( request.action == "launchExtension") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log('in the eventPage launchExtenstension event received')
      chrome.pageAction.show(tabs[0].id);
    });
  }
});














