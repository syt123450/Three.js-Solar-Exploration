/**
 * Created by ss on 2017/9/29.
 */

EarthSceneController = function (renderer) {

    var moonRotateRadius = 0.7;
    var obliquity = 23.5;
    var clickConeAnimateTime = 3000;
    var controlParameter = 0;
    var audioSource = "../music/Earth.mp3";

    var conesTweenSize = {size: 1};
    var coneLastTweenSize = {size: 1};

    var clickedConeTweenSize = {size: 1};
    var clickedConeLastTweenSize = {size: 1};

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();
    var moonMesh = universeUtils.createDefaultMoon();
    var audio = universeUtils.loadAudio(audioSource);

    var coneList = [];
    var tweenManager = {
        groupMap: {
            moveEarthAggregation: [],
            resumeScene: []
        },
        singleMap: {
            conesAnimation: null,
            meteorsSweep: null,
            starsFlashing: null,
            clickedConeAnimation: null,
            meshRotation: null,
            atmosphereRotation: null,
            moonRotation: null,
            inertia: null
        }
    };

    var clickedCone;

    var earthRenderer = renderer;
    var earthScene = init();

    var enableNormalAnimate = true;
    var selfRotate = true;

    var yHistory;

    var speed;

    var isInfoBoard;
    var isStoppedRotation = false;
    var isClickEarth = false;
    var isInertia = false;
    // var xHistory = {x: initPosX};

    this.activateScene = activateScene;
    this.pauseAudio = function () {
        audio.pause();
    };

    this.addCones = function (conesParameter) {
        coneList.forEach(function (cone) {
            earthMesh.remove(cone);
        });
        conesParameter.forEach(function (coneParameter) {
            addOneCone(coneParameter);
        });
        if (tweenManager.singleMap.conesAnimation != null) {
            tweenManager.singleMap.conesAnimation.stop();
        }
        tweenManager.singleMap.conesAnimation = createConeGrowTween();
        tweenManager.singleMap.conesAnimation.start();
    };

    this.clearCones = function () {
        coneList.forEach(function (cone) {
            earthMesh.remove(cone);
        });
        coneList = [];
    };

    this.restoreScene = function () {
        resumeScene();
    };

    function activateScene() {

        audio.play();
        $("#timeLine").show();
        EventManager.removeEvents();
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        addEvent();
        animate();
    }

    function animate() {

        SolarEPUtils.animationFrame = requestAnimationFrame(animate);

        // if (enableNormalAnimate) {
        //     // stars.flashStars();
        //     if (selfRotate) {
        //         rotateEarth();
        //     }
        //     // rotateEarthWithStop();
        //     rotateMoon();
        //     // animateCones();
        // }

        TWEEN.update();

        earthRenderer.render(earthScene, camera);
    }

    function init() {

        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        stars.forEach(function addStar(star) {
            scene.add(star);
        });
        meteors.forEach(function addMeteor(meteor) {
            scene.add(meteor);
        });
        scene.add(initEarthAggregation());
        // scene.add(moonMesh);
        initTween();

        return scene;
    }

    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();
        var sphereAxis = new THREE.AxisHelper(0.8);
        earthMesh.add(sphereAxis);
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * obliquity / 180);
        universeUtils.addDoubleHalos(aggregation, "#A6C8DA", "#0C6097");
        console.log('earth aggregation:', aggregation);

        aggregation.add(moonMesh);

        return aggregation;
    }

    function rotateEarth() {

        // console.log("rotate earth.");

        earthMesh.rotation.y += 0.003;
        atmosphereMesh.rotation.y += 0.003;
    }

    function rotateMoon() {

        moonMesh.rotateY(0.01);
        var timer = Date.now() * 0.0001;
        moonMesh.position.x = Math.cos(-timer) * moonRotateRadius;
        moonMesh.position.z = Math.sin(-timer) * moonRotateRadius;
    }

    function addOneCone(coneParameter) {
        console.log("add one cone");
        var coneObject = universeUtils.createOneCone(coneParameter);
        coneObject.lookAt(earthMesh.position);
        coneObject.rotateX(Math.PI / 2);
        coneList.push(coneObject);
        earthMesh.add(coneObject);
    }

    function addEvent() {

        EventManager.registerEvent('mousemove', onMouseMove);
        EventManager.registerEvent('mousedown', onMouseDown);
        EventManager.registerEvent('mousewheel', onMouseWheel);
        EventManager.registerEvent('mouseup', onMouseUp);
    }

    function onMouseDown() {
        SolarEPUtils.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        SolarEPUtils.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);
        var intersects = SolarEPUtils.raycaster.intersectObjects(earthScene.children, true);

        // console.log('all===', intersects);
        // console.log('0====', intersects[0].object);

        coneList.forEach(function (cone) {
            // console.log("in");
            // console.log('earth x=====', earthMesh.parent.position.x);
            if (intersects[0].object === cone) {
                console.log("find a clicked cone.");
                clickedCone = cone;
                enableNormalAnimate = false;
                tweenManager.singleMap.conesAnimation.stop();
                addTextToBoard(cone.parameters);
                showInfo(cone.parameters.latitude, cone.parameters.longitude);
            }
        });

        if (intersects !== null && intersects.length !== 0 && intersects[0].object === atmosphereMesh) {
            isClickEarth = true;
        }
    }

    function onMouseUp() {
        if (isClickEarth) {
            isClickEarth = false;
            inertia();
        }
    }

    function onMouseMove(event) {

        var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        if (isClickEarth) {
            speed = 1.5 * (mouseX - SolarEPUtils.mouse.x);
            rotateWithSpeed(speed);
        }

        SolarEPUtils.mouse.x = mouseX;
        SolarEPUtils.mouse.y = mouseY;

        SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);
        var intersects = SolarEPUtils.raycaster.intersectObjects(earthScene.children, true);

        if (intersects === null || intersects.length === 0 || intersects[0].object !== atmosphereMesh) {
            selfRotate = true;
        } else {
            selfRotate = false;
        }
    }

    function rotateWithSpeed(speed) {

        earthMesh.rotation.y += speed;
        atmosphereMesh.rotation.y += speed;
    }

    function inertia() {

        var startSpeed = {speed: speed};
        var endSpeed = {speed: 0};

        var inertiaTween = new TWEEN.Tween(startSpeed).to(endSpeed, 500);
        inertiaTween.easing(TWEEN.Easing.Linear.None);
        inertiaTween.onUpdate(function () {
            console.log('inertia executing===========');
            earthMesh.rotation.y += this.speed;
            atmosphereMesh.rotation.y += this.speed;
        });
        console.log('inertia starts===========');
        inertiaTween.start();
    }

    function onMouseWheel() {

        var minScale = 1.3;
        var maxScale = 2;
        var speed = 0.3;
        var delta;

        if (event.wheelDelta) {
            delta = event.wheelDelta / 40;
        } else if (event.detail) {
            delta = -event.detail / 3;
        }

        if (delta > 0 && camera.position.z < maxScale) {
            camera.position.z = Math.min(maxScale, camera.position.z + delta * speed);
        }

        if (delta < 0 && camera.position.z > minScale) {
            camera.position.z = Math.max(minScale, camera.position.z + delta * speed);
        }
    }

    function addTextToBoard(coneParameters) {

        console.log(coneParameters);
        $("#infoTitle").text(coneParameters.areaName);
        $("#flag img").attr("src", coneParameters.flagPath);
        $("#latitude").text("Latitude: " + coneParameters.latitude);
        $("#longitude").text("Longitude: " + coneParameters.longitude);
        $("#total").text("Total Amount: " + coneParameters.amount);
        $("#coal").text("Coal Amount: " + coneParameters.coalAmount);
        $("#oil").text("Oil Amount: " + coneParameters.oilAmount);
        $("#gas").text("Gas Amount: " + coneParameters.gasAmount);
    }

    function showInfo(latitude, longitude) {
        $("#timeLine").hide();
        $("#infoBoard").animate({width: 'toggle'}, 350);
        $("#curtain").show();
        infoBoard = true;
        moveEarth(latitude, longitude);
    }

    function moveEarth(latitude, longitude) {
        console.log(latitude + "," + longitude);
        moveEarthAggregation(longitude);
    }

    function initTween() {
        tweenManager.singleMap.meteorsSweep = meteors.createSweepTween();
        tweenManager.singleMap.meteorsSweep.start();
        tweenManager.singleMap.starsFlashing = stars.createFlashTween();
        tweenManager.singleMap.starsFlashing.start();
        tweenManager.singleMap.clickedConeAnimation = createClickedConeTween();
        tweenManager.singleMap.meshRotation = createMeshRotationTween();
        tweenManager.singleMap.meshRotation.start();
        tweenManager.singleMap.atmosphereRotation = createAtmosphereRotationTween();
        tweenManager.singleMap.atmosphereRotation.start();
        tweenManager.singleMap.moonRotation = createMoonRotationTween();
        tweenManager.singleMap.moonRotation.start();
    }

    function createMeshRotationTween() {
        var rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);

        rotateTween.onUpdate(function () {

            earthMesh.rotation.y += 0.003;
        });

        rotateTween.repeat(Infinity);

        return rotateTween;
    }

    function createAtmosphereRotationTween() {
        var rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);

        rotateTween.onUpdate(function () {

            atmosphereMesh.rotation.y += 0.004;
        });

        rotateTween.repeat(Infinity);

        return rotateTween;
    }

    function createMoonRotationTween() {
        var rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);

        rotateTween.onUpdate(function () {

            moonMesh.rotateY(0.01);
            var timer = Date.now() * 0.0001;
            moonMesh.position.x = Math.cos(-timer) * moonRotateRadius;
            moonMesh.position.z = Math.sin(-timer) * moonRotateRadius;
        });

        rotateTween.repeat(Infinity);

        return rotateTween;
    }

    function createConeGrowTween() {

        var initPos = conesTweenSize;
        var endPos = {size: 1.2};

        var tween = new TWEEN.Tween(initPos)
            .to(endPos, 1000);

        tween.repeat(Infinity)
            .yoyo(true)
            .onUpdate(function () {
                coneList.forEach(function (coneMesh) {
                    coneMesh.scale.set(conesTweenSize.size, conesTweenSize.size, conesTweenSize.size);
                    coneMesh.translateY(((conesTweenSize.size - coneLastTweenSize.size) > 0 ? -1 : 1) * coneMesh.initSize / 30);
                    coneMesh.rotateY(0.05);
                });
                coneLastTweenSize.size = conesTweenSize.size;
            })
            .onStart(function () {
                coneList.forEach(function (coneMesh) {
                    coneMesh.setConeInitPos();
                    coneMesh.translateY(-0.01);
                    conesTweenSize.size = 1;
                });
            });

        return tween;
    }

    function createClickedConeTween() {

        // var initPos = clickedConeTweenSize;
        // var endPos = {size: 1.5};
        //
        // var tween = new TWEEN.Tween(initPos)
        //     .to(endPos, 1000);
        //
        // tween.repeat(Infinity)
        //     .yoyo(true)
        //     .onUpdate(function () {
        //         clickedCone.scale.set(this.size, this.size, this.size);
        //         clickedCone.translateY(((clickedConeTweenSize.size - clickedConeLastTweenSize.size) > 0 ? -1 : 1) * clickedCone.initSize / 30);
        //         clickedConeTweenSize.size = clickedConeLastTweenSize.size;
        //         clickedCone.rotateY(0.05);
        //     })
        //     .onStart(function () {
        //         clickedCone.setConeInitPos();
        //         clickedCone.translateY(0.01);
        //     });

        var tween = clickedConeGrowUpTween();
        var backTween = clickedConeGrowDownTween();
        tween.chain(backTween);
        backTween.chain(tween);

        return tween;
    }

    function clickedConeGrowUpTween() {

        var initPos = conesTweenSize;
        var endPos = {size: 1.5};

        var tween = new TWEEN.Tween(initPos)
            .to(endPos, 1000);

        tween.onUpdate(function () {
            clickedCone.scale.set(this.size, this.size, this.size);
            clickedCone.translateY(-clickedCone.initSize / 30);
            clickedCone.rotateY(0.05);
        });

        return tween;
    }

    function clickedConeGrowDownTween() {

        var initPos = conesTweenSize;
        var endPos = {size: 1};

        var tween = new TWEEN.Tween(initPos)
            .to(endPos, 1000);

        tween.onUpdate(function () {
            clickedCone.scale.set(this.size, this.size, this.size);
            clickedCone.translateY(clickedCone.initSize / 30);
            clickedCone.rotateY(0.05);
        });

        return tween;
    }

    function moveEarthAggregation(coneLongitude) {
        tweenManager.groupMap.resumeScene.forEach(function (tween) {
            if (tween && typeof tween !== 'undefined') {
                TWEEN.remove(tween);
            }
        });

        var adjustEarth = adjustEarthTween();
        var adjustCone = adjustConeTween(coneLongitude);
        var translate = translateTween();

        translate.onComplete(function () {
            tweenManager.singleMap.clickedConeAnimation.start();
        });

        tweenManager.groupMap.moveEarthAggregation.push(adjustEarth);
        tweenManager.groupMap.moveEarthAggregation.push(adjustCone);
        tweenManager.groupMap.moveEarthAggregation.push(translate);

        tweenManager.groupMap.moveEarthAggregation.forEach(function (tween) {
            tween.start();
        })
    }

    // Rotate earthAggregation around its Z-axis CCW
    function adjustEarthTween() {
        var initObliquity = earthMesh.parent.rotation.z;

        var finalObliquity = 0;
        var obliquityStart = {obliquity: initObliquity};
        var obliquityEnd = {obliquity: finalObliquity};

        var tween = new TWEEN.Tween(obliquityStart);
        tween.to(obliquityEnd, clickConeAnimateTime);

        tween.onStart(function () {
            enableNormalAnimate = false;
        });

        tween.onUpdate(function () {
            console.log('adjust earth******');
            earthMesh.parent.rotation.z = obliquityStart.obliquity;
        });

        return tween;
    }

    // Rotate earth mesh around Y-axis CW
    function adjustConeTween(coneLongitude) {
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
            console.log('adjust cone++++++');
            earthMesh.rotation.y = posStart.pos;
            atmosphereMesh.rotation.y = posStart.pos;
        });

        return tween;
    }

    // Move the earth aggregation to the left
    function translateTween() {
        var translationDis = 0.8;
        translationDis = translationDis || 0.8;
        var initPosX = earthMesh.parent.position.x;
        var finalPosX = -translationDis;
        var posStart = {pos: initPosX};
        var posEnd = {pos: finalPosX};

        var tween = new TWEEN.Tween(posStart);
        tween.to(posEnd, clickConeAnimateTime);

        tween.onUpdate(function () {
            earthMesh.parent.position.x = posStart.pos;
            console.log('move left=====');
            earthMesh.parent.children[2].position.x = posStart.pos * 0.3;
            earthMesh.parent.children[3].position.x = posStart.pos * 0.3;
        });
        return tween;
    }


    /**************
     * Resume
     **************/
    function resumeScene() {
        tweenManager.groupMap.moveEarthAggregation.forEach(function (tween) {
            if (tween && typeof tween !== 'undefined') {
                TWEEN.remove(tween);
            }
        });

        var translateBack = translateBackTween();
        var resumeCone = resumeConeTween();
        var resumeEarth = resumeEarthTween();

        translateBack.onComplete(function () {
            tweenManager.singleMap.clickedConeAnimation.stop();
            enableNormalAnimate = true;
            tweenManager.singleMap.conesAnimation.start();
        });

        tweenManager.groupMap.resumeScene.push(translateBack);
        tweenManager.groupMap.resumeScene.push(resumeCone);
        tweenManager.groupMap.resumeScene.push(resumeEarth);

        tweenManager.groupMap.resumeScene.forEach(function (tween) {
            tween.start();
        });
    }

    // Rotate earth mesh around Y-axis CCW
    function resumeConeTween() {
        var startY = earthMesh.rotation.y;
        var posStart = {y: startY};
        var endY = yHistory + (controlParameter / 180 * Math.PI);
        var posEnd = {y: endY};

        var tween = new TWEEN.Tween(posStart);
        tween.to(posEnd, clickConeAnimateTime);

        tween.onUpdate(function () {
            console.log('resuming cone+++++');
            earthMesh.rotation.y = posStart.y;
            atmosphereMesh.rotation.y = posStart.y;
        });
        return tween;
    }

    // Rotate earthAggregation around its Z-axis CW
    function resumeEarthTween() {

        var initObliquity = 0;
        var finalObliquity = -obliquity / 180 * Math.PI;
        var obliquityStart = {obliquity: initObliquity};
        var obliquityEnd = {obliquity: finalObliquity};

        var tween = new TWEEN.Tween(obliquityStart)
            .to(obliquityEnd, clickConeAnimateTime);

        tween.onUpdate(function () {
            console.log('resuming earth******');
            earthMesh.parent.rotation.z = obliquityStart.obliquity;
        });

        return tween;
    }

    // Move the earth aggregation to the right
    function translateBackTween() {

        var initPosX = earthMesh.parent.position.x;
        var finalPosX = 0;
        var posStart = {pos: initPosX};
        var posEnd = {pos: finalPosX};

        var tween = new TWEEN.Tween(posStart);

        tween.to(posEnd, clickConeAnimateTime);

        tween.onUpdate(function () {
            console.log('translate back======');
            earthMesh.parent.position.x = posStart.pos;
            earthMesh.parent.children[2].position.x = posStart.pos * 0.3;
            earthMesh.parent.children[3].position.x = posStart.pos * 0.3;
        });
        // tween.onComplete(function() {
        //    posStart.pos = initPosX;
        //
        // });
        //
        tween.onComplete(function () {
            enableNormalAnimate = true;
        });
        return tween;
    }
};