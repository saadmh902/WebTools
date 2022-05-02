/* Written by Saad M
  This code is to detect if a user is inactive using JS and redirects them to a timeout page
  Checks for mousemovement keypresses etc
*/
function getCurrentUnixTime(){
var ts = Math.round((new Date()).getTime() / 1000);
//console.log(ts);
return ts;
}
function getLastUnixTime(){
var lastUnix = 0;
var cookieSplit = "";
lastUnix[1] = 0;
lastUnix = document.cookie.split(";");
	for(let i = 0; i < lastUnix.length; i++){
		cookieSplit = lastUnix[i];
		info = cookieSplit.split("=");
		if(info[0].replace(" ","") == "currentUnixTime"){
			return info[1];
		}
	}
}

/* Set listeners for timeout */

function setTimeoutListeners(){

	element = $('html');
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
	//console.log("Set new unix time to:" + time);

}
function killPage(){
	$('html').html("Inactive.");
	window.location="/timeout.php";
}
function warnPage(){
	console.log("Warning, you will be logged out soon if you continue being inactive.");
}
function checkTimeout(){
	var intervalId = window.setInterval(function(){
  	
  	var timeout = 900;

  	//timeElapsed = getCurrentUnixTime() - getLastUnixTime()
  	//console.log(timeElapsed)
  	if((getCurrentUnixTime() - getLastUnixTime()) > timeout){//If there has been a difference of 900 seconds between current time and last activity then kill page
  		//alert("Its been too long!");
  		killPage();
  	}
  	if((getCurrentUnixTime() - getLastUnixTime()) > (timeout - 120)){

  		//warnPage();
  	}

	}, 5000); //Check the time every 5 seconds
}

//Check if session is timed out BEFORE setting timeout listeners, this will allow timeouts if the browser is closed and reopened.
checkTimeout();
setTimeoutListeners();
