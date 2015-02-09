'use strict';

function strikeThis() {
  console.log('heyblahstrike');
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var baseUrl = 'http://clickshame.nmajor.com';
    var data = 'address='+tabs[0].url;
    var request = new XMLHttpRequest();
    request.open('POST', baseUrl+'/strikes', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    request.send(data);
  });
}

document.getElementById('strike-this').onclick = strikeThis;