/**
 * Created by ss on 2017/9/29.
 */
var coneCount = 0;

EarthSceneController = function (renderer) {

    var obliquity = 23.5;
    var clickConeAnimateTime = 3000;
    var controlParameter = -40;
    var audioSource = "../music/Earth.mp3";

    // var conesTweenSize = {size: 1};
    var conesLastTweenSize = {size: 1};

    var clickedConeTweenSize = {size: 1};
    var clickedConeLastTweenSize = {size: 1};

    var tweenUtils = new TweenUtils();
    var lights = lightsInit();
    var camera = UniverseUtils.createDefaultCamera();
    var universeMesh = UniverseUtils.createDefaultUniverse();
    var stars = UniverseUtils.createDefaultStars();
    var meteors = UniverseUtils.createDefaultMeteors();
    var earthMesh = UniverseUtils.createDefaultEarthMesh();
    var atmosphereMesh = UniverseUtils.createDefaultAtmosphere();
    var moonMesh = UniverseUtils.createDefaultMoon();
    var audio = UniverseUtils.loadAudio(audioSource);

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

    var yHistory;

    var speed;

    var inertiaControls = {
        isInertia: false
    };

    var isInfoBoard;
    var isStoppedRotation = false;
    var isClickEarth = false;
    // var xHistory = {x: initPosX};

    this.activateScene = activateScene;
    this.deactivateScene = deactivateScene;

    this.addCones = function (conesParameter) {
        coneList.forEach(function (cone) {
            earthMesh.remove(cone);
        });
        conesParameter.forEach(function (coneParameter) {
            addOneCone(coneParameter);
        });
        if (tweenManager.singleMap.conesAnimation != null) {
            tweenManager.singleMap.conesAnimation.stop();
            TWEEN.remove(tweenManager.singleMap.conesAnimation);
        }
        tweenManager.singleMap.conesAnimation = createConeGrowTween(coneList);
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
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        addEvent();
        animate();
        activateTween();
    }

    function deactivateScene() {
        audio.pause();
        deactivateTween();
        EventManager.removeEvents();
    }

    function animate() {

        SolarEPUtils.animationFrame = requestAnimationFrame(animate);

        TWEEN.update();

        earthRenderer.render(earthScene, camera);
    }

    function init() {

        var scene = new THREE.Scene();
        lights.forEach(function addLight(light) {
            scene.add(light);
        });
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

    function lightsInit() {
        var lights = [];

        // Lights Combination
        lights[0] = new THREE.HemisphereLight(0xffffff, 0x000000, 1.3);

        lights[1] = new THREE.DirectionalLight(0xf9f9f9, 0.45);
        // lights[1] = new THREE.SpotLight( 0xf7f7f7 );
        // lights[1] = new THREE.PointLight(0xf7f7f7);
        lights[1].position.set(-25, 0, -1);
        // lights[1].target = planetAggregation;
        lights[1].castShadow = true;            // default is false

        return lights;
    }

    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();
        var sphereAxis = new THREE.AxisHelper(0.8);
        earthMesh.add(sphereAxis);
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * obliquity / 180);
        UniverseUtils.addDoubleHalos(aggregation, "#A6C8DA", "#0C6097");
        console.log('earth aggregation:', aggregation);
        moonMesh.rotateZ(Math.PI * obliquity / 180);
        aggregation.add(moonMesh);

        return aggregation;
    }

    function addOneCone(coneParameter) {
        console.log("add one cone");
        var coneObject = UniverseUtils.createOneCone(coneParameter);
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
                processBeforeMove(cone);
            }
        });

        if (intersects !== null && intersects.length !== 0 && intersects[0].object === atmosphereMesh) {
            isClickEarth = true;
        }
    }

    function onMouseUp() {

        if (isClickEarth) {
            isClickEarth = false;
            inertiaControls.isInertia = true;
            tweenManager.inertia = tweenUtils.createEarthInertiaTween(earthMesh, atmosphereMesh, speed, inertiaControls);
            tweenManager.inertia.start();
        }
    }

    function onMouseMove(event) {

        var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        speed = 1.5 * (mouseX - SolarEPUtils.mouse.x);

        SolarEPUtils.mouse.x = mouseX;
        SolarEPUtils.mouse.y = mouseY;

        SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);
        var intersects = SolarEPUtils.raycaster.intersectObjects(earthScene.children, true);

        if (!isInfoBoard) {

            if (isClickEarth) {
                rotateWithSpeed(speed);
            } else if (inertiaControls.isInertia) {

            } else {
                if (intersects !== null && intersects.length !== 0 && intersects[0].object === atmosphereMesh) {
                    if (!isStoppedRotation) {
                        isStoppedRotation = true;
                        tweenManager.singleMap.meshRotation.stop();
                        tweenManager.singleMap.atmosphereRotation.stop();
                        tweenManager.singleMap.moonRotation.stop();
                    }
                } else {
                    if (isStoppedRotation) {
                        isStoppedRotation = false;
                        tweenManager.singleMap.meshRotation.start();
                        tweenManager.singleMap.atmosphereRotation.start();
                        tweenManager.singleMap.moonRotation.start();
                    }
                }
            }
        }
    }

    function rotateWithSpeed(speed) {

        earthMesh.rotation.y += speed;
        atmosphereMesh.rotation.y += speed;
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
        tweenManager.singleMap.meshRotation = tweenUtils.createEarthMeshRotationTween(earthMesh);
        tweenManager.singleMap.starsFlashing = stars.createFlashTween();
        tweenManager.singleMap.meteorsSweep = meteors.createSweepTween();
        tweenManager.singleMap.atmosphereRotation = tweenUtils.createAtmosphereRotationTween(atmosphereMesh);
        tweenManager.singleMap.moonRotation = tweenUtils.createMoonRotationTween(moonMesh);
    }

    function activateTween() {
        tweenManager.singleMap.meshRotation.start();
        tweenManager.singleMap.starsFlashing.start();
        tweenManager.singleMap.meteorsSweep.start();
        tweenManager.singleMap.atmosphereRotation.start();
        tweenManager.singleMap.moonRotation.start();
    }

    function deactivateTween() {
        tweenManager.singleMap.meshRotation.stop();
        tweenManager.singleMap.starsFlashing.stop();
        tweenManager.singleMap.meteorsSweep.stop();
        tweenManager.singleMap.atmosphereRotation.stop();
        tweenManager.singleMap.moonRotation.stop();
    }

    function processBeforeMove(cone) {
        clickedCone = cone;
        isInfoBoard = true;

        tweenManager.singleMap.conesAnimation.stop();
        TWEEN.remove(tweenManager.singleMap.conesAnimation);

        tweenManager.singleMap.meshRotation.stop();
        tweenManager.singleMap.moonRotation.stop();

        coneList.forEach(function (coneMesh) {
            coneMesh.setConeInitPos();
            coneMesh.scale.set(1, 1, 1);
        });
        clickedConeTweenSize.size = 1;

        tweenManager.singleMap.clickedConeAnimation = createClickedConeTween();
        tweenManager.singleMap.clickedConeAnimation.start();

        addTextToBoard(cone.parameters);
        showInfo(cone.parameters.latitude, cone.parameters.longitude);
    }

    function processAfterResume() {

        tweenManager.singleMap.clickedConeAnimation.stop();
        TWEEN.remove(tweenManager.singleMap.clickedConeAnimation);

        console.log(111);

        tweenManager.singleMap.meshRotation.start();
        tweenManager.singleMap.moonRotation.start();

        coneList.forEach(function (coneMesh) {
            coneMesh.setConeInitPos();
            coneMesh.scale.set(1, 1, 1);
        });
        conesLastTweenSize.size = 1;

        tweenManager.singleMap.conesAnimation = createConeGrowTween(coneList);
        tweenManager.singleMap.conesAnimation.start();
    }

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

                console.log(initPos);
                console.log(endPos);
                console.log("start " + name);
            });

        return tween;
    }

    function createClickedConeTween() {

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

        var tween = clickedConeGrowUpTween();
        var backTween = clickedConeGrowDownTween();
        tween.chain(backTween);
        backTween.chain(tween);
        return tween;
    }

    function clickedConeGrowUpTween() {

        var initPos = clickedConeTweenSize;
        var endPos = {size: 1.5};

        var tween = new TWEEN.Tween(initPos)
            .to(endPos, 1000);
        coneCount++;
        tween.name = 'Single cone up ' + coneCount;

        tween.onUpdate(function () {
            console.log(this.size);
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

    function clickedConeGrowDownTween() {

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

    function moveEarthAggregation(coneLongitude) {
        tweenManager.groupMap.resumeScene.forEach(function (tween) {
            if (tween && typeof tween !== 'undefined') {
                TWEEN.remove(tween);
            }
        });
        tweenManager.groupMap.resumeScene = [];

        var adjustEarth = adjustEarthTween();
        var adjustCone = adjustConeTween(coneLongitude);
        var translate = translateTween();
        var moveCloser = moveEarthCloserTween();

        tweenManager.groupMap.moveEarthAggregation.push(adjustEarth);
        tweenManager.groupMap.moveEarthAggregation.push(adjustCone);
        tweenManager.groupMap.moveEarthAggregation.push(translate);
        // tweenManager.groupMap.moveEarthAggregation.push(moveCloser);

        tweenManager.groupMap.moveEarthAggregation.forEach(function (tween) {
            tween.start();
        });
    }

    /**************
     * Resume
     **************/
    function resumeScene() {
        console.log('before remove:', tweenManager.groupMap.moveEarthAggregation);
        tweenManager.groupMap.moveEarthAggregation.forEach(function (tween) {
            if (tween && typeof tween !== 'undefined') {
                tween.stop();
                TWEEN.remove(tween);
            }
        });
        tweenManager.groupMap.moveEarthAggregation = [];
        console.log('after remove:', tweenManager.groupMap.moveEarthAggregation);

        var translateBack = translateBackTween();
        var resumeCone = resumeConeTween();
        var resumeEarth = resumeEarthTween();
        var moveFurther = moveEarthFurtherTween();

        tweenManager.groupMap.resumeScene.push(translateBack);
        tweenManager.groupMap.resumeScene.push(resumeCone);
        tweenManager.groupMap.resumeScene.push(resumeEarth);
        // tweenManager.groupMap.resumeScene.push(moveFurther);

        tweenManager.groupMap.resumeScene.forEach(function (tween) {
            tween.start();
        });

        console.log(333);
        translateBack.onComplete(function () {
            console.log(222);
            processAfterResume();
        });
    }

    // Rotate earthAggregation around its Z-axis CCW
    function adjustEarthTween() {
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
    function translateTween() {
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
    function moveEarthCloserTween() {
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
    function resumeConeTween() {
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
    function resumeEarthTween() {

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
    function translateBackTween() {

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
    function moveEarthFurtherTween() {
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
};