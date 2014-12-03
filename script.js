
console.log('--------------- script js start ------------------')

var author = document.querySelector('#currentUser').innerHTML
var answerNum = document.querySelector('#numAnswers').innerHTML
var questionId = document.querySelector('#questionId').innerHTML


console.log('--------------- script js end ------------------')

chrome.storage.local.set({'a': author});
chrome.storage.local.set({'num': answerNum});
chrome.storage.local.set({'id': questionId});

chrome.runtime.sendMessage({ script: "data",  aut: author, countAnswers: answerNum , qId: questionId }, function(response) {
  console.log(response.farewell);
});