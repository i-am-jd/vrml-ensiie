function updateStandAnim() {
	for(var i=0; i<3; i++) {
		standBodyTran.keyValue[0][i] = hanim_HumanoidRoot.translation[i];
		standBodyTran.keyValue[1][i] = hanim_HumanoidRoot.translation[i];
	}
	for(var i=0; i<4; i++) {
		standBodyRot.keyValue[0][i] = hanim_HumanoidRoot.rotation[i];
		standBodyRot.keyValue[1][i] = hanim_HumanoidRoot.rotation[i];
	}
}	

function updateWalkAnim() {
	var dx = Math.sin(currentAngle);
    var dz = Math.cos(currentAngle);
	var x0 = hanim_HumanoidRoot.translation[0];
	var z0 = hanim_HumanoidRoot.translation[2];
	var steps = [0, 0.04167, 0.125, 0.1667, 0.2083, 0.25, 0.2917, 0.375, 0.4583, 0.5, 0.5417, 0.5833, 0.625, 0.7083, 0.75, 0.7917, 0.875, 0.9167, 1]
	for(var i = 0; i < 19; i++) {
		walkBodyTran.keyValue[i][0] = x0 + steps[i] * dx;
		walkBodyTran.keyValue[i][2] = z0 + steps[i] * dz;
	}
	
	walkBodyRot.key = new Array(0, 0.25, 1);
	
	walkBodyRot.keyValue[0][0] = 0;
	walkBodyRot.keyValue[0][1] = 1;
	walkBodyRot.keyValue[0][2] = 0;
	walkBodyRot.keyValue[0][3] = hanim_HumanoidRoot.rotation[3];
		
	walkBodyRot.keyValue[1][0] = 0;
	walkBodyRot.keyValue[1][1] = 1;
	walkBodyRot.keyValue[1][2] = 0;
	walkBodyRot.keyValue[1][3] = currentAngle;
		
	walkBodyRot.keyValue[2][0] = 0;
	walkBodyRot.keyValue[2][1] = 1;
	walkBodyRot.keyValue[2][2] = 0;
	walkBodyRot.keyValue[2][3] = currentAngle;
}

function walkTo(x1, z1, time) {
	var x0 = hanim_HumanoidRoot.translation[0];
	var z0 = hanim_HumanoidRoot.translation[2];
	var angle = Math.atan2(x1 - x0, z1 - z0);
	var dist = Math.sqrt(Math.pow((x1 - x0), 2) + Math.pow((z1 - z0), 2));
	startWalk(angle, dist, time);
}

function testWalk(time) {
	//startWalk(Math.PI/4, 10.5, time);
	walkTo(10, 10, time);
	//startWalk(Math.atan2(10, 10), 5.1);
}

function startWalk(angle, length, time) {
	//Update state
    cyclesNb = Math.floor(length);
	cyclesFraction = length % 1.0;
	currentAngle = angle;
	
	//Walk!
	updateWalkAnim();
	Walk_Time.set_enabled = true;
    Walk_Time.set_startTime = time;
}

function continueWalk(b, time) {
    if(!b && cyclesNb == 0) {
		updateWalkAnim();
		
		if(cyclesFraction > 0.0) {
			//Stop animation when endFraction of animation reached
			Browser.addRoute(Walk_Time, "fraction_changed", this, "stopWalk");
			updateWalkAnim();
			Walk_Time.set_startTime = time;
		} else {
			updateStandAnim();
			Stand_Time.set_startTime = time;
		}
		
    } else if(!b && cyclesNb > 0) {
		//Trigger new cycle
		updateWalkAnim();
		Walk_Time.set_startTime = time;
    } else {
		//Start cycle
		cyclesNb--;
    }
}

function stopWalk(fraction, time) {
	//Stop animation when endFraction of it reached
	if(fraction >= cyclesFraction) {
		Walk_Time.set_enabled = false;
		Browser.deleteRoute(Walk_Time, "fraction_changed", this, "stopWalk");
		updateStandAnim();
		Stand_Time.set_startTime = time;
		cyclesFraction = 0.;		
	}	
}