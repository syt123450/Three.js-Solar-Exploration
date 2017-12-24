/**
 * Created by ss on 2017/11/9.
 */
var earthCounter = 0;

var TweenUtils = (function () {
	var conesLastTweenSize = {size: 1};
	var clickedConeTweenSize = {size: 1};
	var clickConeAnimateTime = 3000;
	var obliquity = 23.5;
		
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
            // console.log('update&&&&&&&&&&&&&&&', earthCounter);
        }).onStart(function () {
            earthCounter++;
            // console.log("start*************", earthCounter);
        });
        rotateTween.onStop(function () {
            earthCounter--;
            // console.log('stop----------', earthCounter);
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
        var startPos = {x: planetAggregation.position.x};
        var endPos = {x: -planetAggregation.children[0].geometry.parameters.radius};
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
        var startPos = {x: planetAggregation.position.x};
        var endPos = {x: 0};
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

        var radius = Math.sqrt(0.81 + 0.09) * 1.5;
        // seg.1
        var animationTime_1 = 6000;
        var startPos_1 = {x: 0.0, y: 1.2 * radius, z: 0.0};
        var endPos_1 = {x: 0.0, y: radius * Math.cos(0.75 * Math.PI), z: radius * Math.sin(0.75 * Math.PI)};
        var tween_1 = new TWEEN.Tween(startPos_1)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .to(endPos_1, animationTime_1);

        tween_1.onUpdate(function () {
            // console.log('t1 cam', camera.position);
            camera.position.set(startPos_1.x, startPos_1.y, startPos_1.z);
            camera.lookAt(solarAggregation.position);
        });

        // seg.2
        var animationTime_2 = 20000;
        var startPos_2 = {r: radius, theta: 0.75 * Math.PI, phi: 0.0};
        var endPos_2 = {r: 2 * radius / 3, theta: Math.PI / 3, phi: Math.PI * 2};
        var tween_2 = new TWEEN.Tween(startPos_2)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .to(endPos_2, animationTime_2);

        tween_2.onUpdate(function () {
            // console.log('t2 cam', camera.position);
            x = startPos_2.r * Math.sin(startPos_2.theta) * Math.sin(startPos_2.phi);
            z = startPos_2.r * Math.sin(startPos_2.theta) * Math.cos(startPos_2.phi);
            y = startPos_2.r * Math.cos(startPos_2.theta);
            camera.position.set(x, y, z);
            camera.lookAt(solarAggregation.position);
        });

        // // seg.3
        // var animationTime_3 = 5000;
        // var startPos_3 = { x: -0.9, y: -0.15, z: 0.0 };
        // var endPos_3 = { x: 0.0, y: 0.0, z: -0.9 };
        // var tween_3 = new TWEEN.Tween(startPos_3)
        // 	.to(endPos_3, animationTime_3);
        //
        // tween_3.onUpdate(function () {
        // 	console.log('t3 cam', camera.position);
        // 	camera.position.set(startPos_3.x, startPos_3.y, startPos_3.z);
        // 	camera.lookAt(solarAggregation.position);
        // });
        //
        // // seg.4
        // var animationTime_4 = 5000;
        // var startPos_4 = { x: 0.0, y: 0.0, z: -0.9 };
        // var endPos_4 = { x: 0.9, y: 0.15, z: 0.0 };
        // var tween_4 = new TWEEN.Tween(startPos_4)
        // 	.to(endPos_4, animationTime_4);
        //
        // tween_4.onUpdate(function () {
        // 	console.log('t4 cam', camera.position);
        // 	camera.position.set(startPos_4.x, startPos_4.y, startPos_4.z);
        // 	camera.lookAt(solarAggregation.position);
        // });
        //
        // // seg.5
        // var animationTime_5 = 5000;
        // var startPos_5 = { x: 0.9, y: 0.15, z: 0.0 };
        // var endPos_5 = { x: 0.0, y: 0.3, z: 0.9 };
        // var tween_5 = new TWEEN.Tween(startPos_5)
        // 	.to(endPos_5, animationTime_5);
        //
        // tween_5.onUpdate(function () {
        // 	console.log('t5 cam', camera.position);
        // 	camera.position.set(startPos_5.x, startPos_5.y, startPos_5.z);
        // 	camera.lookAt(solarAggregation.position);
        // });
        //
        tween_1.onComplete(function () {
            tween_2.start();
        });
        // tween_2.onComplete(function () {
        // 	tween_3.start();
        // });
        // tween_3.onComplete(function () {
        // 	tween_4.start();
        // });
        // tween_4.onComplete(function () {
        // 	tween_5.start();
        // });

        return tween_1;
    }

    /**
     * Move the planet closer to the screen
     * @param planetAggregation
     */
    function createPlanetMoveCloserTween(planetAggregation) {
        var startPos = {z: -planetAggregation.children[0].geometry.parameters.radius * 10};
        var endPos = {z: 0};
        var animationTime = 3000;
        var tween = new TWEEN.Tween(startPos)
        // .easing(TWEEN.Easing.Quadratic.InOut)
            .to(endPos, animationTime);

        tween.onStart(function () {
            console.log('createPlanetMoveCloserTween started');

        }).onUpdate(function () {
            planetAggregation.position.set(0, 0, startPos.z);
        });
        return tween;
    }

    function createPlanetFogInTween(scene) {

        var initFog = {density: -5000};
        var finalDensity = {density: 0};
        var animationTime = 3000;
        var tween = new TWEEN.Tween(initFog)
            .to(finalDensity, animationTime)
            // .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function () {
                scene.fog.near = initFog.density;
            });

        return tween;
    }

    function createPlanetFogOutTween(scene) {

        var initFog = {density: 0};
        var finalDensity = {density: -5000};

        var animationTime = 3000;

        var tween = new TWEEN.Tween(initFog)
            .to(finalDensity, animationTime)
            .onUpdate(function () {
                scene.fog.near = initFog.density;
            });

        return tween;
    }

    /** Earth tween **/
    /**
     * Move the earth closer to the screen
     * @param planetAggregation
     */
    function createEarthMoveCloserTween(earthAggregation) {
        var startPos = {z: -earthAggregation.children[0].geometry.parameters.radius * 10};
        var endPos = {z: 0};
        var animationTime = 3000;
        var tween = new TWEEN.Tween(startPos)
        // .easing(TWEEN.Easing.Quadratic.InOut)
            .to(endPos, animationTime);

        tween.onStart(function () {
            // console.log('createPlanetMoveCloserTween started');

        }).onUpdate(function () {
            earthAggregation.position.set(0, 0, startPos.z);
        });
        return tween;
    }

    /** Solar scene tween **/
    function getChangeSolarSceneTween(planetMesh, camera, planetName) {
        // console.log('planetMesh ===', planetMesh);
        var distanceStart = {val: camera.position.distanceTo(planetMesh.position)};

        // https://threejs.org/docs/#api/cameras/PerspectiveCamera
        // To get a full view of the planet, the minimum value of finalDistance must be greater or equal to
        // NF + R
        // NF = camera frustum near plane (default 0.1)
        // R: radius of the planet
        var finalDistance = typeof planetMesh.ring === 'undefined' ?
            Math.max(6 * planetMesh.geometry.parameters.radius, camera.near + 1.05 * planetMesh.geometry.parameters.radius) :
            Math.max(12 * planetMesh.geometry.parameters.radius, camera.near + 1.05 * planetMesh.geometry.parameters.radius);

        // console.log('final distance ===', finalDistance);
        var distanceEnd = {val: finalDistance};

        var animationDuration = 5000;

        var tween = new TWEEN.Tween(distanceStart);
        tween.to(distanceEnd, animationDuration)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function () {
                var distance = distanceStart.val;
                var cameraDirection = new THREE.Vector3();
                camera.lookAt(planetMesh.position);
                camera.getWorldDirection(cameraDirection);
                // audio.setVolume();
                // Set camera position
                camera.position.set(
                    planetMesh.position.x - cameraDirection.x * distance,
                    planetMesh.position.y - cameraDirection.y * distance,
                    planetMesh.position.z - cameraDirection.z * distance
                );
            })
            .onStart(function () {
                // TODO: save the initial position of the camera to a global variable
                // console.log('change scene camera', camera);
                setTransitionImage(TransitionConfig[planetName]);
                camera.positionHistory = Object.assign({}, camera.position);
                camera.directionHistory = Object.assign({}, camera.getWorldDirection());
            });
        return tween;
    }

    function createSolarFogOutTween(solarSystemScene) {

        var initFog = {density: 0};
        var finalDensity = {density: -500};

        var tween = new TWEEN.Tween(initFog).to(finalDensity, 5000)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(function () {
                solarSystemScene.fog.near = initFog.density;
            })
            .onComplete(function () {
                // console.log('1111111');
                solarSystemScene.fog.near = 0;
            });

        return tween;
    }

    function createSolarFogInTween(solarSystemScene) {

        var initFog = {density: -500};
        var finalDensity = {density: 0};

        var tween = new TWEEN.Tween(initFog).to(finalDensity, 3000)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(function () {
                solarSystemScene.fog.near = initFog.density;
            }).onStart(function() {
                solarSystemScene.fog.near = -500;
            });

        return tween;
    }

    function createEaseVolumeTween(sound) {

        var startVolume = {volume: 0.5};
        var endVolume = {volume: 0};

        var easeTween = new TWEEN.Tween(startVolume).to(endVolume, 3000);
        easeTween.easing(TWEEN.Easing.Linear.None);
        easeTween.onUpdate(function () {
            sound.setVolume(startVolume.volume);
        }).onStart(function () {
            sound.setVolume(startVolume.volume);
            console.log("Start easing volume.");
        }).onComplete(function () {
            console.log(222);
            sound.pause();
        });

        return easeTween;
    }

    function createMagnifyVolumeTween(sound) {

        console.log("Create magnify tween.");

        var startVolume = {volume: 0};
        var endVolume = {volume: 0.5};

        var magnifyTween = new TWEEN.Tween(startVolume).to(endVolume, 5000);
        magnifyTween.easing(TWEEN.Easing.Linear.None);
        magnifyTween.onUpdate(function () {
            console.log(66666);

            sound.setVolume(startVolume.volume);
        }).onStart(function () {
            console.log("play audio");
            sound.setVolume(startVolume.volume);
            sound.play();
        }).onComplete(function () {
            //for test
            console.log(7777);
            TWEEN.remove(this);
        });

        return magnifyTween;
    }
	
    /** EarthSceneController **/
		function createConeGrowTween(coneList) {
			
			var initPos = {size: 1};
			var endPos = {size: 1.2};
			
			var tween = new TWEEN.Tween(initPos)
				.to(endPos, 1000);
			coneCount++;
			tween.name = 'All cone grow ' + coneCount;
			var name = tween.name;
			tween.repeat(Infinity)
				.yoyo(true)
				.onUpdate(function () {
					coneList.forEach(function (coneMesh) {
						coneMesh.scale.set(initPos.size, initPos.size, initPos.size);
						// console.log((conesTweenSize.size - conesLastTweenSize.size) >= 0);
						coneMesh.translateY(((initPos.size - conesLastTweenSize.size) >= 0 ? -1 : 1) * coneMesh.initSize / 30);
						coneMesh.rotateY(0.05);
					});
					conesLastTweenSize.size = initPos.size;
					// console.log(TWEEN.getAll());
				})
				.onStart(function () {
					coneList.forEach(function (coneMesh) {
						coneMesh.setConeInitPos();
						coneMesh.scale.set(1, 1, 1);
					});
					conesLastTweenSize.size = 1;
					// console.log(tweenManager);
					
					// console.log(initPos);
					// console.log(endPos);
					// console.log("start " + name);
				});
			
			return tween;
		}
	
		function clickedConeGrowUpTween(clickedCone) {
			
			var initPos = clickedConeTweenSize;
			var endPos = {size: 1.5};
			
			var tween = new TWEEN.Tween(initPos)
				.to(endPos, 1000);
			coneCount++;
			tween.name = 'Single cone up ' + coneCount;
			
			tween.onUpdate(function () {
				clickedCone.scale.set(this.size, this.size, this.size);
				clickedCone.translateY(-clickedCone.initSize / 30);
				clickedCone.rotateY(0.05);
			}).onStart(function () {
				clickedCone.setConeInitPos();
				// clickedCone.translateY(0.01);
				// conesLastTweenSize.size = 1;
			});
			
			return tween;
		}
		
		function clickedConeGrowDownTween(clickedCone) {
			
			var initPos = clickedConeTweenSize;
			var endPos = {size: 1};
			
			var tween = new TWEEN.Tween(initPos)
				.to(endPos, 1000);
			coneCount++;
			tween.name = 'Single cone down ' + coneCount;
			
			tween.onUpdate(function () {
				clickedCone.scale.set(this.size, this.size, this.size);
				clickedCone.translateY(clickedCone.initSize / 30);
				clickedCone.rotateY(0.05);
			});
			
			return tween;
		}
	
		function createClickedConeTween(clickedCone) {
			
			// do not know why can not combine together, if combine together, the onComplete function will be called twice
			
			// var initPos = {size: 1};
			// var endPos = {size: 1.5};
			//
			// var tween = new TWEEN.Tween(initPos)
			//     .to(endPos, 1000);
			//
			// tween.repeat(Infinity)
			//     .yoyo(true)
			//     .onUpdate(function () {
			//         clickedCone.scale.set(this.size, this.size, this.size);
			//         clickedCone.translateY(((initPos.size - clickedConeLastTweenSize.size) >= 0 ? -1 : 1) * clickedCone.initSize / 30);
			//         clickedConeLastTweenSize.size = initPos.size;
			//         clickedCone.rotateY(0.05);
			//     })
			// .onStart(function () {
			//     clickedCone.setConeInitPos();
			//     // clickedCone.translateY(0.01);
			//     conesLastTweenSize.size = 1;
			// });
			
			var tween = clickedConeGrowUpTween(clickedCone);
			var backTween = clickedConeGrowDownTween(clickedCone);
			tween.chain(backTween);
			backTween.chain(tween);
			return tween;
		}
	
		// Rotate earthAggregation around its Z-axis CCW
		function adjustEarthTween(earthMesh) {
			var initObliquity = earthMesh.parent.rotation.z;
			
			var finalObliquity = 0;
			var obliquityStart = {obliquity: initObliquity};
			var obliquityEnd = {obliquity: finalObliquity};
			
			var tween = new TWEEN.Tween(obliquityStart);
			coneCount++;
			tween.name = 'adjust earth ' + coneCount;
			
			tween.to(obliquityEnd, clickConeAnimateTime);
			tween.onUpdate(function () {
				// console.log('adjust earth******');
				earthMesh.parent.rotation.z = obliquityStart.obliquity;
			});
			
			return tween;
		}
		
		// Rotate earth mesh around Y-axis CW
		function adjustConeTween(coneLongitude, earthMesh, atmosphereMesh) {
			var controlParameter = -40;
			yHistory = earthMesh.rotation.y;
			var initPosY = earthMesh.rotation.y;
			var finalPosY = -(90 + coneLongitude + controlParameter) / 180 * Math.PI;
			while (initPosY - finalPosY >= Math.PI * 2) {
				finalPosY += Math.PI * 2;
			}
			var posStart = {pos: initPosY};
			var posEnd = {pos: finalPosY};
			
			var tween = new TWEEN.Tween(posStart);
			coneCount++;
			tween.name = 'adjust cone ' + coneCount;
			
			tween.to(posEnd, clickConeAnimateTime);
			tween.onUpdate(function () {
				// console.log('adjust cone++++++');
				earthMesh.rotation.y = posStart.pos;
				atmosphereMesh.rotation.y = posStart.pos;
			});
			
			return tween;
		}
		
		// Move the earth aggregation to the left
		function translateTween(earthMesh) {
			var translationDis = 0.6;
			translationDis = translationDis || 0.8;
			var initPosX = earthMesh.parent.position.x;
			var finalPosX = -translationDis;
			var posStart = {pos: initPosX};
			var posEnd = {pos: finalPosX};
			
			var tween = new TWEEN.Tween(posStart);
			coneCount++;
			tween.name = 'translate ' + coneCount;
			
			tween.to(posEnd, clickConeAnimateTime);
			tween.onUpdate(function () {
				earthMesh.parent.position.x = posStart.pos;
				// console.log('move left=====');
				earthMesh.parent.children[2].position.x = posStart.pos * 0.3;
				earthMesh.parent.children[3].position.x = posStart.pos * 0.3;
			});
			return tween;
		}
		
		// Move the earth closer
		function moveEarthCloserTween(earthMesh) {
			var translationDis = 0.5;
			var initPosX = earthMesh.parent.position.z;
			var finalPosX = earthMesh.parent.position.z + translationDis;
			var posStart = {pos: initPosX};
			var posEnd = {pos: finalPosX};
			
			var tween = new TWEEN.Tween(posStart);
			coneCount++;
			tween.name = 'move earth closer ' + coneCount;
			
			tween.to(posEnd, clickConeAnimateTime);
			tween.onUpdate(function () {
				earthMesh.parent.position.z = posStart.pos;
			});
			return tween;
		}
		
		// Rotate earth mesh around Y-axis CCW
		function resumeConeTween(earthMesh, atmosphereMesh) {
			var startY = earthMesh.rotation.y;
			var posStart = {y: startY};
			// var endY = yHistory + (- controlParameter / 180 * Math.PI);
			var endY = yHistory;
			var posEnd = {y: endY};
			
			var tween = new TWEEN.Tween(posStart);
			coneCount++;
			tween.name = 'resume cone ' + coneCount;
			
			tween.to(posEnd, clickConeAnimateTime);
			tween.onUpdate(function () {
				// console.log('resuming cone+++++');
				earthMesh.rotation.y = posStart.y;
				atmosphereMesh.rotation.y = posStart.y;
			});
			return tween;
		}
		
		// Rotate earthAggregation around its Z-axis CW
		function resumeEarthTween(earthMesh) {
			var initObliquity = 0;
			var finalObliquity = -obliquity / 180 * Math.PI;
			var obliquityStart = {obliquity: initObliquity};
			var obliquityEnd = {obliquity: finalObliquity};
			
			var tween = new TWEEN.Tween(obliquityStart)
				.to(obliquityEnd, clickConeAnimateTime);
			coneCount++;
			tween.name = 'resume earth ' + coneCount;
			
			tween.onUpdate(function () {
				// console.log('resuming earth******');
				earthMesh.parent.rotation.z = obliquityStart.obliquity;
			});
			
			return tween;
		}
		
		// Move the earth aggregation to the right
		function translateBackTween(earthMesh) {
			
			var initPosX = earthMesh.parent.position.x;
			var finalPosX = 0;
			var posStart = {pos: initPosX};
			var posEnd = {pos: finalPosX};
			
			var tween = new TWEEN.Tween(posStart);
			coneCount++;
			tween.name = 'translate back ' + coneCount;
			
			tween.to(posEnd, clickConeAnimateTime);
			
			tween.onUpdate(function () {
				// console.log('translate back======');
				earthMesh.parent.position.x = posStart.pos;
				earthMesh.parent.children[2].position.x = posStart.pos * 0.3;
				earthMesh.parent.children[3].position.x = posStart.pos * 0.3;
			});
			// tween.onComplete(function() {
			//    posStart.pos = initPosX;
			//
			// });
			//
			
			return tween;
		}
		
		// Move the earth closer
		function moveEarthFurtherTween(earthMesh) {
			var initPosX = earthMesh.parent.position.z;
			var finalPosX = 0;
			var posStart = {pos: initPosX};
			var posEnd = {pos: finalPosX};
			
			var tween = new TWEEN.Tween(posStart);
			coneCount++;
			tween.name = 'move earth further ' + coneCount;
			
			tween.to(posEnd, clickConeAnimateTime);
			tween.onUpdate(function () {
				earthMesh.parent.position.z = posStart.pos;
			});
			return tween;
		}
		
		// function sceneFadeInTween() {
		// 	activateScene();
		// 	var moveCloserTween = TweenUtils.createEarthMoveCloserTween(earthAggregation);
		// 	var fogInTween = TweenUtils.createPlanetFogInTween(earthScene);
		// 	moveCloserTween.start();
		// 	fogInTween.start();
		// }
		//
		// function sceneFadeOutTween() {
		// 	var fogOutTween = TweenUtils.createPlanetFogOutTween(earthScene);
		// 	var easeVolumeTween = TweenUtils.createEaseVolumeTween(audio);
		// 	fogOutTween.start();
		// 	easeVolumeTween.start();
		// }
	
		/** EarthSceneController End**/
		

    /** Solar scene tween **/
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

    this.getChangeSolarSceneTween = getChangeSolarSceneTween;

    this.createEarthMoveCloserTween = createEarthMoveCloserTween;

    //tween for planet fade in and out in fog level
    this.createPlanetFogInTween = createPlanetFogInTween;
    this.createPlanetFogOutTween = createPlanetFogOutTween;

    //tween for fade in and out for solar in fog level
    this.createSolarFogOutTween = createSolarFogOutTween;
    this.createSolarFogInTween = createSolarFogInTween;

    //tween for ease and magnify volume in all scenes
    this.createEaseVolumeTween = createEaseVolumeTween;
    this.createMagnifyVolumeTween = createMagnifyVolumeTween;

    /** EarthSceneController **/
    this.createConeGrowTween = createConeGrowTween;
    this.clickedConeGrowUpTween = clickedConeGrowUpTween;
    this.clickedConeGrowDownTween = clickedConeGrowDownTween;
    this.createClickedConeTween = createClickedConeTween;
    this.adjustEarthTween = adjustEarthTween;
    this.adjustConeTween = adjustConeTween;
    this.translateTween = translateTween;
    this.moveEarthCloserTween = moveEarthCloserTween;
    this.resumeConeTween = resumeConeTween;
    this.resumeEarthTween =resumeEarthTween;
    this.translateBackTween = translateBackTween;
    this.moveEarthFurtherTween = moveEarthFurtherTween;
    // this.sceneFadeInTween = sceneFadeInTween;
    // this.sceneFadeOutTween = sceneFadeOutTween;
    /** EarthSceneController End **/
    
    return this;

})();