var angle0 = 3*Math.PI/2;

function updateStepAnim(angle) {
	var dx = Math.sin(angle);
    var dz = Math.cos(angle);
	var x0 = hanim_HumanoidRoot.translation[0];
	var z0 = hanim_HumanoidRoot.translation[2];
	var steps = [0, 0.04167, 0.125, 0.1667, 0.2083, 0.25, 0.2917, 0.375, 0.4583, 0.5, 0.5417, 0.5833, 0.625, 0.7083, 0.75, 0.7917, 0.875, 0.9167, 1]
	for(var i = 0; i < 19; i++) {
		bodyTran.keyValue[i][0] = x0 + steps[i] * dx;
		bodyTran.keyValue[i][2] = z0 + steps[i] * dz;
	}
	
	bodyRot.key[0] = 0;
	bodyRot.key[1] = 0.25;
	bodyRot.key[2] = 1;
	
	bodyRot.keyValue[0][0] = 0;
	bodyRot.keyValue[0][1] = 1;
	bodyRot.keyValue[0][2] = 0;
	bodyRot.keyValue[0][3] = hanim_HumanoidRoot.rotation[3];
		
	bodyRot.keyValue[1][0] = 0;
	bodyRot.keyValue[1][1] = 1;
	bodyRot.keyValue[1][2] = 0;
	bodyRot.keyValue[1][3] = angle;
		
	bodyRot.keyValue[2][0] = 0;
	bodyRot.keyValue[2][1] = 1;
	bodyRot.keyValue[2][2] = 0;
	bodyRot.keyValue[2][3] = angle;
}

function walkTo(x, z) {
	nbCycles = 1;
	updateStepAnim;
}

function startWalk(time) {
    nbCycles = 2;
	updateStepAnim(angle0);
    Walk_Time.set_startTime = time;
}

// function updateAnimationCoords() {
    // //Update animation coordinates
    // for(var i = 0; i < 19; i++) {
		// bodyTran.keyValue[i][2] += 1;
    // }
// }

function continueWalk(b, time) {
    if(!b && nbCycles == 0) {
		updateStepAnim(angle0);
    } else if(!b && nbCycles > 0) {
		//Trigger new cycle
		updateStepAnim(angle0);
		Walk_Time.set_startTime = time;
    } else {
		//Start cycle
		nbCycles--;
    }
}
