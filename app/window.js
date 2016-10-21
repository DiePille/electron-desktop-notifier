var path = require('path');
var $ = require('jquery');
var electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

var serverUrl = "http://localhost/notifications/server/";

function getUpdate()
{
  $.ajax({
    url: serverUrl+"index.php",
    data: {mode: 'update'},
    dataType: "json",
    cache: false,
    type: "GET",
  })
    .done(function( result ) {
      //$( "#results" ).append( html );
      //console.log(result);
      if(typeof result === "object" && result !== false)
      {
        //new Notification(result[0].title, result[0]);
        ipcRenderer.send('showBalloon', result);
      }
    });
}

$(document).ready(function(){


  var i = setInterval(function() { getUpdate(); }, 3000);

  $('div.update a').click(function() {
      clearInterval(i);
  });

  $('a.coffeeInProgress').click(function(){
    $.ajax({
      url: serverUrl+"index.php",
      data: {clientID: 'xyz', name: getName(), mode: 'setmsg', groupid: 1, msg: $('a.coffeeInProgress').attr('msg')},
      cache: false,
      type: "POST",
    });
  });
  $('a.coffeeReady').click(function(){
    $.ajax({
      url: serverUrl+"index.php",
      data: {clientID: 'xyz', name: getName(), mode: 'setmsg', groupid: 1, msg: $('a.coffeeReady').attr('msg')},
      cache: false,
      type: "POST",
    });
  });

  $('a.coffeeOut').click(function(){
    $.ajax({
      url: serverUrl+"index.php",
      data: {clientID: 'xyz', name: getName(), mode: 'setmsg', groupid: 1, msg: $('a.coffeeOut').attr('msg')},
      cache: false,
      type: "POST",
    });
  });

  $('button[name=msgSend]').click(function(){
    $.ajax({
      url: serverUrl+"index.php",
      data: {clientID: 'xyz', name: getName(), mode: 'setmsg', groupid: 1, msg: $('input[name=nachricht]').val()},
      cache: false,
      type: "POST"
    }).done(function( result ) {
      $('input[name=nachricht]').val("");
    });
  });


});

function getName()
{
  return $('input[name=username]').val();
}
