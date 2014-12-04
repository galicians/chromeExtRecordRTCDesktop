$(document).ready(function() {

    console.log('--------------- script js start ------------------')

    var author = document.querySelector('#currentUser').innerHTML
    var answerNum = document.querySelector('#numAnswers').innerHTML
    var questionId = document.querySelector('#questionId').innerHTML


    console.log('--------------------------------------------------')
    console.log("the author in the extension is: ", author)
    console.log("num of answers in the extension is: ", answerNum)
    console.log("questionId in the extension is: ", questionId)


 console.log('--------------- script js end ------------------')

    chrome.storage.local.set({'a': author});
    chrome.storage.local.set({'num': answerNum});
    chrome.storage.local.set({'id': questionId});

document.querySelector('#reply').addEventListener('click',function(e) { 
     chrome.runtime.sendMessage({ script: "data",  aut: author, countAnswers: answerNum , qId: questionId }, function(response) {
      console.log(response.farewell);
    });
} )
   

});