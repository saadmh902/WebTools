/* Written by Saad M
  This code is to detect if a user is inactive using JS and redirects them to a timeout page
  Checks for mousemovement keypresses etc
*/
function getCurrentUnixTime(){
  var unix = Math.round((new Date()).getTime() / 1000);
  return unix;
  }
  function getLastUnixTime(){
  var lastUnix = 0;
  lastUnix[1] = 0;
  var cookie = document.cookie;
  lastUnix = cookie.split("=");
  return lastUnix[1];
}

function setTimeoutListeners(){

	element = document.getElementsByTagName("html")[0];
	element.addEventListener("mouseover", setNewUnixTime);
	element.addEventListener("click", setNewUnixTime);
	element.addEventListener("mouseout", setNewUnixTime);
	element.addEventListener("mousein", setNewUnixTime);
	element.addEventListener("keyup", setNewUnixTime);
	element.addEventListener("move", setNewUnixTime);
	window.addEventListener('scroll', (event) => {
	    setNewUnixTime();
	});
}


function setNewUnixTime(){
	var time = getCurrentUnixTime();
	document.cookie = "currentUnixTime" + "=" + time + "; path=/";
}
function killPage(){
	window.location="timeout.php";
}
function warnPage(){
	//Do some stuff to warn the user that they will be logged off
}
function checkTimeout(){
	var intervalId = window.setInterval(function(){
  	
  	var timeout = 900;

  	if((getCurrentUnixTime() - getLastUnixTime()) > timeout){
  		killPage();
  	}
  	if((getCurrentUnixTime() - getLastUnixTime()) > (timeout - 120)){

  		warnPage();
  	}

	}, 5000); //Check the time every 5 seconds
}


checkTimeout();
setTimeoutListeners();
