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
	 * Transition of the camera perspective when enter the solar scene
	 * @param camera
	 * @param solarAggregation
	 */
	function createEnterSolarSceneTween(camera, solarAggregation) {
		// seg.1
		var animationTime_1 = 5000;
        var startPos_1 = { x:0.0, y: -0.9, z: 0.0};
        var endPos_1 = { x:0.0, y: -0.3, z: 0.9};
		var tween_1 = new TWEEN.Tween(startPos_1)
			.to(endPos_1, animationTime_1);
		
		tween_1.onUpdate(function () {
			console.log('t1 cam', camera.position);
			camera.position.set(startPos_1.x, startPos_1.y, startPos_1.z);
			camera.lookAt(solarAggregation.position);
		});
		
		// seg.2
		var animationTime_2 = 5000;
        var startPos_2 = { x:0.0, y: -0.3, z: 0.9};
        var endPos_2 = { x: -0.9, y: -0.15, z: 0.0 };
		var tween_2 = new TWEEN.Tween(startPos_2)
			.to(endPos_2, animationTime_2);

		tween_2.onUpdate(function () {
			console.log('t2 cam', camera.position);
			camera.position.set(startPos_2.x, startPos_2.y, startPos_2.z);
			camera.lookAt(solarAggregation.position);
		});

		// seg.3
		var animationTime_3 = 5000;
        var startPos_3 = { x: -0.9, y: -0.15, z: 0.0 };
        var endPos_3 = { x: 0.0, y: 0.0, z: -0.9 };
		var tween_3 = new TWEEN.Tween(startPos_3)
			.to(endPos_3, animationTime_3);

		tween_3.onUpdate(function () {
			console.log('t3 cam', camera.position);
			camera.position.set(startPos_3.x, startPos_3.y, startPos_3.z);
			camera.lookAt(solarAggregation.position);
		});

		// seg.4
		var animationTime_4 = 5000;
        var startPos_4 = { x: 0.0, y: 0.0, z: -0.9 };
        var endPos_4 = { x: 0.9, y: 0.15, z: 0.0 };
		var tween_4 = new TWEEN.Tween(startPos_4)
			.to(endPos_4, animationTime_4);

		tween_4.onUpdate(function () {
			console.log('t4 cam', camera.position);
			camera.position.set(startPos_4.x, startPos_4.y, startPos_4.z);
			camera.lookAt(solarAggregation.position);
		});

		// seg.5
		var animationTime_5 = 5000;
        var startPos_5 = { x: 0.9, y: 0.15, z: 0.0 };
        var endPos_5 = { x: 0.0, y: 0.3, z: 0.9 };
		var tween_5 = new TWEEN.Tween(startPos_5)
			.to(endPos_5, animationTime_5);

		tween_5.onUpdate(function () {
			console.log('t5 cam', camera.position);
			camera.position.set(startPos_5.x, startPos_5.y, startPos_5.z);
			camera.lookAt(solarAggregation.position);
		});
		
		tween_1.onComplete(function () {
			tween_2.start();
		});
		tween_2.onComplete(function () {
			tween_3.start();
		});
		tween_3.onComplete(function () {
			tween_4.start();
		});
		tween_4.onComplete(function () {
			tween_5.start();
		});

		return tween_1;
	}
	
	/**
	 * Move the planet closer to the screen
	 * @param planetAggregation
	 */
	function createPlanetMoveCloserTween(planetAggregation) {
		var startPos = { z: - planetAggregation.children[0].geometry.parameters.radius * 10 };
		var endPos = { z: 0 };
		var animationTime = 3000;
		var tween = new TWEEN.Tween(startPos)
		// .easing(TWEEN.Easing.Quadratic.InOut)
			.to(endPos, animationTime);
		
		tween.onStart(function() {
			console.log('createPlanetMoveCloserTween started');
			
		}).onUpdate(function () {
			planetAggregation.position.set(0, 0, startPos.z);
		});
		return tween;
	}
	
    function createPlanetFadeInTween(scene) {

        var initFog = {density: -5000};
        var finalDensity = {density: 0};
		var animationTime = 3000;
        var tween = new TWEEN.Tween(initFog)
	        .to(finalDensity, animationTime)
            // .easing(TWEEN.Easing.Quadratic.InOut)
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

