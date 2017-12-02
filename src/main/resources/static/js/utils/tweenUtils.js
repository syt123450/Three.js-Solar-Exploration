/**
 * Created by ss on 2017/11/9.
 */

var TweenUtils = (function () {

    function createRotationTween(planetMesh, planetAggregation) {
        var rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);

        rotateTween.onUpdate(function () {

            planetMesh.rotation.y += 0.001;
            // planetAggregation.rotation.y += 0.001;
        });

        rotateTween.repeat(Infinity);

        return rotateTween;
    }

    function createInertiaTween(planetMesh, speed, inertiaControls) {

        var startSpeed = {speed: speed};
        var endSpeed = {speed: 0};

        var inertiaTween = new TWEEN.Tween(startSpeed).to(endSpeed, 500);
        inertiaTween.easing(TWEEN.Easing.Linear.None);
        inertiaTween.onUpdate(function () {
            planetMesh.rotation.y += this.speed;
        }).onComplete(function () {
            inertiaControls.isInertia = false;
        });

        return inertiaTween;
    }

    function createEarthInertiaTween(earthMesh, atmosphereMesh, speed, inertiaControls) {

        var startSpeed = {speed: speed};
        var endSpeed = {speed: 0};

        var inertiaTween = new TWEEN.Tween(startSpeed).to(endSpeed, 500);
        coneCount++;
        inertiaTween.name = 'inertia ' + coneCount;
        inertiaTween.easing(TWEEN.Easing.Linear.None);
        inertiaTween.onUpdate(function () {
            earthMesh.rotation.y += this.speed;
            atmosphereMesh.rotation.y += this.speed;
        }).onComplete(function () {
            inertiaControls.isInertia = false;
        });

        return inertiaTween;
    }

    function createEarthMeshRotationTween(earthMesh) {
        var rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);
        coneCount++;
        rotateTween.name = 'Earth ' + coneCount;
        rotateTween.onUpdate(function () {

            earthMesh.rotation.y += 0.003;
        }).onStart(function () {
            console.log("start mesh rotation tween.");
        });

        rotateTween.repeat(Infinity);

        return rotateTween;
    }

    function createAtmosphereRotationTween(atmosphereMesh) {
        var rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);
        coneCount++;
        rotateTween.name = 'atmosphere ' + coneCount;
        rotateTween.onUpdate(function () {

            atmosphereMesh.rotation.y += 0.004;
        });

        rotateTween.repeat(Infinity);

        return rotateTween;
    }

    function createMoonRotationTween(moonMesh) {

        var moonRotateRadius = 0.7;
        var rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);
        coneCount++;
        rotateTween.name = 'moon ' + coneCount;
        rotateTween.onUpdate(function () {

            // Moon Rotation
            moonMesh.rotateY(0.01);

            // Moon Revolution
            var timer = Date.now() * 0.0001;
            moonMesh.position.x = Math.cos(-timer) * moonRotateRadius;
            moonMesh.position.z = Math.sin(-timer) * moonRotateRadius;

            moonMesh.position.x = (Math.sin(-timer) * moonRotateRadius) * Math.cos(Math.PI * 23.5 / 180);
            moonMesh.position.y = (Math.sin(-timer) * moonRotateRadius) * Math.sin(Math.PI * 23.5 / 180);
            moonMesh.position.z = -Math.sqrt(Math.pow(moonRotateRadius, 2) - Math.pow(moonMesh.position.x, 2) - Math.pow(moonMesh.position.y, 2));

            if (timer % (2 * Math.PI) >= (Math.PI / 2) && timer % (2 * Math.PI) <= (3 * Math.PI / 2)) {
                moonMesh.position.z = -moonMesh.position.z;
            }
        });

        rotateTween.repeat(Infinity);

        return rotateTween;
    }

    function createStarFlashingTween(stars) {

        var flashTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);

        flashTween.onUpdate(function () {

            stars.forEach(function (star) {
                star.count += Math.random() > 0.5 ? 2 : 3;
                if (star.count > 30) {
                    star.material.color.set(Math.round(Math.random() * 256) * 0x010101);
                    star.count = 0;
                }
            });
        });

        flashTween.repeat(Infinity);

        return flashTween;
    }

    function createMeteorsSweepTween(meteors) {

        var sweepTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);

        sweepTween.onUpdate(function () {

            meteors.forEach(function (meteor) {
                meteor.position.x -= 0.01;
                meteor.position.y -= 0.01;
                if (meteor.position.x <= -4 || meteor.position.y <= -4) {
                    meteor.position.x = 3 * Math.random();
                    meteor.position.y = 3 * Math.random();
                }
            });
        });

        sweepTween.repeat(Infinity);

        return sweepTween;
    }
	
	function createPlanetMoveLeftTween(planetAggregation) {
		var startPos = { x: planetAggregation.position.x };
		var endPos = { x: - planetAggregation.children[0].geometry.parameters.radius  };
		var tween = new TWEEN.Tween(startPos)
			.to(endPos, 1000);
		
		tween.onUpdate(function () {
			planetAggregation.position.x = startPos.x;
			
			// move glow mesh too
			if (planetAggregation.children.length === 3) {
				planetAggregation.children[1].position.x = startPos.x * 0.15;
				planetAggregation.children[2].position.x = startPos.x * 0.15;
			}
			
			if (planetAggregation.children.length === 4) {
				planetAggregation.children[2].position.x = startPos.x * 0.15;
				planetAggregation.children[3].position.x = startPos.x * 0.15;
			}
			
		});
		
		return tween;
	}
	
	function createPlanetMoveRightTween(planetAggregation) {
		var startPos = { x: planetAggregation.position.x };
		var endPos = { x: 0 };
		var tween = new TWEEN.Tween(startPos)
			.to(endPos, 1000);
		
		tween.onUpdate(function () {
			planetAggregation.position.x = startPos.x;
			
			// move glow mesh too
			if (planetAggregation.children.length === 3) {
				planetAggregation.children[1].position.x = startPos.x * 0.15;
				planetAggregation.children[2].position.x = startPos.x * 0.15;
			}
			
			if (planetAggregation.children.length === 4) {
				planetAggregation.children[2].position.x = startPos.x * 0.15;
				planetAggregation.children[3].position.x = startPos.x * 0.15;
			}
			
		});
		return tween;
	}
	
	/**
	 * Move the planet closer to the screen
	 * @param planetAggregation
	 */
	function createPlanetMoveCloserTween(planetAggregation) {
		var startPos = { z: - planetAggregation.children[0].geometry.parameters.radius * 3 };
		var endPos = { z: 0 };
		var tween = new TWEEN.Tween(startPos)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.to(endPos, 500);
		
		tween.onStart(function() {
			console.log('createPlanetMoveCloserTween started');
			
		}).onUpdate(function () {
			// console.log('planet position', planetAggregation.position);
			// console.log('planet position', planetAggregation.position);
			planetAggregation.position.set(0, 0, startPos.z);
			
			// // move glow mesh too
			// if (planetAggregation.children.length === 3) {
			// 	planetAggregation.children[1].position.x = startPos.x * 0.15;
			// 	planetAggregation.children[2].position.x = startPos.x * 0.15;
			// }
			//
			// if (planetAggregation.children.length === 4) {
			// 	planetAggregation.children[2].position.x = startPos.x * 0.15;
			// 	planetAggregation.children[3].position.x = startPos.x * 0.15;
			// }
			
		});
		return tween;
	}
	
	/**
	 * Transition of the camera perspective when enter the solar scene
	 * @param camera
	 * @param solarAggregation
	 */
	function createEnterSolarSceneTween(camera, solarAggregation) {
		var startPos = { y: 0.9, z: 0.0};
		var endPos = { y: 0.3, z: 0.9};
		// var startPosZ = { z: 0 };
		// var endPosZ = { z: 0.9 };
		var animationTime = 1000;
		var tween = new TWEEN.Tween(startPos)
			.to(endPos, animationTime);
		
		tween.onStart(function() {
			console.log('tween started');
		}).onUpdate(function () {
			console.log('camera position', camera.position);
			camera.position.set(0, startPos.y, startPos.z);
			camera.lookAt(solarAggregation.position);
		});
		return tween;
	}

    function createPlanetFadeInTween(scene) {

        var initFog = {density: -500};
        var finalDensity = {density: 0};

        var tween = new TWEEN.Tween(initFog).to(finalDensity, 1000)
            // .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(function() {
                scene.fog.near = initFog.density;
                console.log(scene.fog.near);
                console.log(initFog.density);
            });

        return tween;
    }
	
    this.createPlanetRotationTween = createRotationTween;
    this.createPlanetInertiaTween = createInertiaTween;
    this.createEarthInertiaTween = createEarthInertiaTween;
    this.createEarthMeshRotationTween = createEarthMeshRotationTween;
    this.createAtmosphereRotationTween = createAtmosphereRotationTween;
    this.createMoonRotationTween = createMoonRotationTween;
    this.createStarFlashingTween = createStarFlashingTween;
    this.createMeteorsSweepTween = createMeteorsSweepTween;
    
    this.createPlanetMoveRightTween = createPlanetMoveRightTween;
    this.createPlanetMoveLeftTween = createPlanetMoveLeftTween;
	this.createPlanetMoveCloserTween = createPlanetMoveCloserTween;
	
	this.createEnterSolarSceneTween = createEnterSolarSceneTween;

	this.createPlanetFadeInTween = createPlanetFadeInTween;
    
    return this;

})();

