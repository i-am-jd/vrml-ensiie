var opened = false;
var blocked = false;

function initialize() {
    Browser.essai = 3;
}

function open(time) {
  if(!opened) {
	opened = true;
	doorRotInterp.keyValue[0][3] = 0;
	doorRotInterp.keyValue[1][3] = -1.57;
  }
  doorRotTime.set_startTime = time; 
}

function close(time) {
  if(opened) {
    opened = false;
	doorRotInterp.keyValue[0][3] = -1.57;
	doorRotInterp.keyValue[1][3] = 0;
  }
  doorRotTime.set_startTime = time; 
}

function trigger(time) {
    if(blocked)
	return;
    if(!opened) {
      open(time);
    } else {
      close(time);
    }
}

function isActive(b, time) {
    blocked = b;
    if(!b) {// && Browser.aboutToGoThrough) {
	Browser.callPendingAction(time);
	Browser.aboutToGoThrough = false;
    }
}

function obj() {
    var door = new Object();
    door.open = open;
    door.close = close;
    return door;
}
