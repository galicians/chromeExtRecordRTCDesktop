// $(document).ready(function() {
var i = 1;

setInterval( function() {
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

    if (document.querySelector('#reply') && i < 2 ) {
            document.querySelector('#reply').addEventListener('click',function(e) { 
                console.log('screen capture time')
                 chrome.runtime.sendMessage({ script: "data",  aut: author, countAnswers: answerNum , qId: questionId }, function(response) {
                  console.log(response.farewell);
                });
            } )
            console.log('inside the if')
             i = i + 1
     }

     console.log('the value of i is, ', i)
    

   }, 5000)

// });