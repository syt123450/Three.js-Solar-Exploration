/**
 * Created by ss on 2017/11/9.
 */
var earthCounter = 0;

var TweenUtils = (function () {
    var clickedConeTweenSize = {size: 1};
    var conesLastTweenSize = {size: 1};
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
            planetMesh.rotation.y += startSpeed.speed;

        }).onComplete(function () {
            inertiaControls.isInertia = false;

        });

        return inertiaTween;
    }

    function createEarthInertiaTween(earthMesh, atmosphereMesh, speed, inertiaControls) {

        var startSpeed = {speed: speed};
        var endSpeed = {speed: 0};
        var inertiaTween = new TWEEN.Tween(startSpeed).to(endSpeed, 500);
        inertiaTween.easing(TWEEN.Easing.Linear.None);

        inertiaTween.onUpdate(function () {
            earthMesh.rotation.y += startSpeed.speed;
            atmosphereMesh.rotation.y += startSpeed.speed;

        }).onComplete(function () {
            inertiaControls.isInertia = false;
        });

        return inertiaTween;
    }

    function createEarthMeshRotationTween(earthMesh) {
        var rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);
        rotateTween.onUpdate(function () {
            earthMesh.rotation.y += 0.003;
        }).onStart(function () {
            earthCounter++;
        });
        rotateTween.onStop(function () {
            earthCounter--;
        });
        rotateTween.repeat(Infinity);

        return rotateTween;
    }

    function createAtmosphereRotationTween(atmosphereMesh) {
        var rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);
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
        var initX = planetAggregation.position.x;
        var startPos = {x: initX};
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
            x = startPos_2.r * Math.sin(startPos_2.theta) * Math.sin(startPos_2.phi);
            z = startPos_2.r * Math.sin(startPos_2.theta) * Math.cos(startPos_2.phi);
            y = startPos_2.r * Math.cos(startPos_2.theta);
            camera.position.set(x, y, z);
            camera.lookAt(solarAggregation.position);
        });

        tween_1.onComplete(function () {
            tween_2.start();
        });

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
            .to(endPos, animationTime);

        tween.onUpdate(function () {
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
            .easing(TWEEN.Easing.Quintic.In)
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
            .to(endPos, animationTime);

        tween.onStart(function () {
        }).onUpdate(function () {
            earthAggregation.position.set(0, 0, startPos.z);
        });
        return tween;
    }

    /** Solar scene tween **/
    function getChangeSolarSceneTween(planetMesh, camera, planetName) {
        var distanceStart = {val: camera.position.distanceTo(planetMesh.position)};

        // https://threejs.org/docs/#api/cameras/PerspectiveCamera
        // To get a full view of the planet, the minimum value of finalDistance must be greater or equal to
        // NF + R
        // NF = camera frustum near plane (default 0.1)
        // R: radius of the planet
        var finalDistance = typeof planetMesh.ring === 'undefined' ?
            Math.max(6 * planetMesh.geometry.parameters.radius, camera.near + 1.05 * planetMesh.geometry.parameters.radius) :
            Math.max(12 * planetMesh.geometry.parameters.radius, camera.near + 1.05 * planetMesh.geometry.parameters.radius);

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

                // Set camera position
                camera.position.set(
                    planetMesh.position.x - cameraDirection.x * distance,
                    planetMesh.position.y - cameraDirection.y * distance,
                    planetMesh.position.z - cameraDirection.z * distance
                );
            })
            .onStart(function () {
                // TODO: save the initial position of the camera to a global variable
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
            }).onStart(function () {
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
        }).onComplete(function () {
            sound.pause();
        });

        return easeTween;
    }

    function createMagnifyVolumeTween(sound) {

        var startVolume = {volume: 0};

        var magnifyTween = new TWEEN.Tween(startVolume).to({volume: 0.5}, 5000);
        magnifyTween.easing(TWEEN.Easing.Linear.None);

        magnifyTween.onUpdate(function () {
            sound.setVolume(startVolume.volume);
        }).onStart(function () {
            sound.setVolume(startVolume.volume);
            sound.play();
        });

        return magnifyTween;
    }

    /** EarthSceneController **/
    function createConeGrowTween(coneList) {

        var initPos = {size: 1};
        var endPos = {size: 1.2};

        var tween = new TWEEN.Tween(initPos)
            .to(endPos, 1000);
        var name = tween.name;
        tween.repeat(Infinity)
            .yoyo(true)
            .onUpdate(function () {
                coneList.forEach(function (coneMesh) {
                    coneMesh.scale.set(initPos.size, initPos.size, initPos.size);
                    coneMesh.translateY(((initPos.size - conesLastTweenSize.size) >= 0 ? -1 : 1) * coneMesh.initSize / 30);
                    coneMesh.rotateY(0.05);
                });
                conesLastTweenSize.size = initPos.size;
            })
            .onStart(function () {
                coneList.forEach(function (coneMesh) {
                    coneMesh.setConeInitPos();
                    coneMesh.scale.set(1, 1, 1);
                });
                conesLastTweenSize.size = 1;
            });
        tween.name = 'All cone down tween';
        return tween;
    }

    function clickedConeGrowUpTween(clickedCone) {
        var initPos = clickedConeTweenSize;
        var endPos = {size: 1.5};

        var tween = new TWEEN.Tween(initPos)
            .to(endPos, 1000);

        tween.onUpdate(function () {
            clickedCone.scale.set(initPos.size, initPos.size, initPos.size);
            clickedCone.translateY(-clickedCone.initSize / 30);
            clickedCone.rotateY(0.05);
        }).onStart(function () {
            clickedCone.setConeInitPos();
        });
        tween.name = 'clicked cone grow tween';
        return tween;
    }

    function clickedConeGrowDownTween(clickedCone) {

        var initPos = clickedConeTweenSize;
        var endPos = {size: 1};

        var tween = new TWEEN.Tween(initPos)
            .to(endPos, 1000);

        tween.onUpdate(function () {
            clickedCone.scale.set(initPos.size, initPos.size, initPos.size);
            clickedCone.translateY(clickedCone.initSize / 30);
            clickedCone.rotateY(0.05);
        });
        tween.name = 'clicked cone down tween';
        return tween;
    }

    // function createClickedConeTween(clickedCone) {
    // 	var tween = clickedConeGrowUpTween(clickedCone);
    // 	var backTween = clickedConeGrowDownTween(clickedCone);
    // 	tween.chain(backTween);
    // 	backTween.chain(tween);
    // 	return tween;
    // }

    // Rotate earthAggregation around its Z-axis CCW
    function adjustEarthTween(earthMesh) {
        var initObliquity = earthMesh.parent.rotation.z;

        var finalObliquity = 0;
        var obliquityStart = {obliquity: initObliquity};
        var obliquityEnd = {obliquity: finalObliquity};

        var tween = new TWEEN.Tween(obliquityStart);
        tween.to(obliquityEnd, clickConeAnimateTime);
        tween.onUpdate(function () {
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
        tween.to(posEnd, clickConeAnimateTime);
        tween.onUpdate(function () {
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
        tween.to(posEnd, clickConeAnimateTime);
        tween.onUpdate(function () {
            earthMesh.parent.position.x = posStart.pos;
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
        var endY = yHistory;
        var posEnd = {y: endY};

        var tween = new TWEEN.Tween(posStart);
        tween.to(posEnd, clickConeAnimateTime);
        tween.onUpdate(function () {
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
        tween.onUpdate(function () {
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
        tween.to(posEnd, clickConeAnimateTime);

        tween.onUpdate(function () {
            earthMesh.parent.position.x = posStart.pos;
            earthMesh.parent.children[2].position.x = posStart.pos * 0.3;
            earthMesh.parent.children[3].position.x = posStart.pos * 0.3;
        });

        return tween;
    }

    // Move the earth closer
    function moveEarthFurtherTween(earthMesh) {
        var initPosX = earthMesh.parent.position.z;
        var finalPosX = 0;
        var posStart = {pos: initPosX};
        var posEnd = {pos: finalPosX};

        var tween = new TWEEN.Tween(posStart);
        tween.to(posEnd, clickConeAnimateTime);
        tween.onUpdate(function () {
            earthMesh.parent.position.z = posStart.pos;
        });
        return tween;
    }


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
    // this.createClickedConeTween = createClickedConeTween;
    this.adjustEarthTween = adjustEarthTween;
    this.adjustConeTween = adjustConeTween;
    this.translateTween = translateTween;
    this.moveEarthCloserTween = moveEarthCloserTween;
    this.resumeConeTween = resumeConeTween;
    this.resumeEarthTween = resumeEarthTween;
    this.translateBackTween = translateBackTween;
    this.moveEarthFurtherTween = moveEarthFurtherTween;
    /** EarthSceneController End **/

    return this;

})();