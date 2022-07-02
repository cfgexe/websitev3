function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
const HRS = document.getElementById('hrs'), MIN = document.getElementById('min'), SEC = document.getElementById('sec'), MIL = document.getElementById('mil'), TIME = document.getElementById('prevTime')
var stoppedTime = 0;
var TimeList = [getCookie("timeList")];
var hrs = min = sec = mil = dt = ps = pt = tt = t = 0, running = started = false, iID;
TIME.innerHTML = "Previous Times:" + getCookie("timeList");
function timerCycle()
{
	TIME.innerHTML = "Previous Times (press 'R' to reset times):<br>" + getCookie("timeList");
	if (running)
	{
		t = performance.now() * 0.001;
		dt += t - pt;
		pt = t;
		tt = Math.floor(dt);
		mil = dt - tt;
		MIL.textContent = (mil).toFixed(3).slice(-3);
		sec = tt%60;
		if ( sec == ps ) return;
		ps  = sec;
		min = Math.floor(tt/60)%60;
		hrs = Math.floor(tt/3600);
		HRS.textContent = '';
		MIN.textContent = ('0'+min).slice(-2);
		SEC.textContent = ('0'+sec).slice(-2);
	}
}

function stop()
{
	TIME.innerHTML = "Previous Times (press 'R' to reset times):<br>" + getCookie("timeList");
	if ( iID )
	{
		clearInterval(iID);
		iID = 0;
	}
}

function start()
{
	TIME.innerHTML = "Previous Times (press 'R' to reset times):<br>" + getCookie("timeList");
	if ( started && !running )
	{
		running = true;
		t = pt = performance.now() * 0.001;
		iID = setInterval(timerCycle, 33);
	}
}

function startTimer()
{
	TIME.innerHTML = "Previous Times (press 'R' to reset times):<br>" + getCookie("timeList");
	if ( !started )
	{
		started = true;
		stop();
		start();
	}
}

function stopTimer()
{
	TIME.innerHTML = "Previous Times (press 'R' to reset times):<br>" + getCookie("timeList");
	if ( started )
	{
		started = running = false;
		stop();
	}
}

function resetTimer()
{
	TIME.innerHTML = "Previous Times (press 'R' to reset times):<br>" + getCookie("timeList");
 	if ( !started )
	{
		running = false;
		dt = ps = 0;
		HRS.textContent = '';
		MIN.textContent = '00';
		SEC.textContent = '00';
		MIL.textContent = '00';
	}
}

function onVisibilityChange()
{
	TIME.innerHTML = "Previous Times (press 'R' to reset times):<br>" + getCookie("timeList");
	if ( started )
	{
		start();
	}
}

resetTimer();
document.addEventListener('visibilitychange', onVisibilityChange);
window.addEventListener('blur', onVisibilityChange);
document.addEventListener('keyup', event => {
  if (event.code === 'Space') {
	if (!running) {
		startTimer();
	}
	else {
		stoppedTime = " " + MIN.textContent + ':' + SEC.textContent + ':' + MIL.textContent;
		TimeList.push(stoppedTime);
		TIME.innerHTML = "Previous Times (press 'R' to reset times):<br>" + getCookie("timeList");
		createCookie("timeList", TimeList.join("<br>"), 32767);
		stopTimer();
		resetTimer();
	}
  }
  if (event.code == 'KeyR') {
	  TimeList = [];
	  createCookie("timeList", TimeList, 32767);
	  TIME.innerHTML = "Previous Times (press 'R' to reset times):" + getCookie("timeList");
  }
})