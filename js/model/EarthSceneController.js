/**
 * Created by ss on 2017/9/29.
 */

EarthSceneController = function (renderer) {

    var obliquity = 23.5;

    var audioSource = "music/Earth.mp3";

    var conesLastTweenSize = {size: 1};
    var clickedConeTweenSize = {size: 1};

    var lights = UniverseUtils.createEarthLights();
    var camera = UniverseUtils.createDefaultCamera();
    var universeMesh = UniverseUtils.createDefaultUniverse();
    var stars = UniverseUtils.createDefaultStars();
    var meteors = UniverseUtils.createDefaultMeteors();
    var earthMesh = UniverseUtils.createDefaultEarthMesh();
    var atmosphereMesh = UniverseUtils.createDefaultAtmosphere();
    var moonMesh = UniverseUtils.createDefaultMoon();
    var earthAggregation = initEarthAggregation();
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

    var easeVolumeTween;

    var clickedCone;

    var earthRenderer = renderer;

    var earthScene = init();

    var speed;

    var inertiaControls = {
        isInertia: false
    };

    var isInfoBoard;
    var isStoppedRotation = false;
    var isClickEarth = false;

    function addCones(conesParameter) {
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
    }

    function clearCones() {
        coneList.forEach(function (cone) {
            earthMesh.remove(cone);
        });
        coneList = [];
    }

    function playAudio() {
        var magnifyVolumeTween = TweenUtils.createMagnifyVolumeTween(audio);
        magnifyVolumeTween.start();
    }

    function activateScene() {

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

    function startScene() {
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        addEvent();
        animate();
        activateTween();
    }

    function stopScene() {
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

        scene.add(earthAggregation);

        initTween();

        scene.fog = new THREE.Fog(0x000000, -500, 500);
        return scene;
    }

    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();

        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * obliquity / 180);
        UniverseUtils.addDoubleHalos(aggregation, "#A6C8DA", "#0C6097");
        moonMesh.rotateZ(Math.PI * obliquity / 180);
        aggregation.add(moonMesh);

        return aggregation;
    }

    function addOneCone(coneParameter) {
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
        coneList.forEach(function (cone) {

            if (intersects[0].object === cone) {
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
            tweenManager.inertia = TweenUtils.createEarthInertiaTween(earthMesh, atmosphereMesh, speed, inertiaControls);
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
        moveEarthAggregation(longitude);
    }

    function initTween() {
        tweenManager.singleMap.meshRotation = TweenUtils.createEarthMeshRotationTween(earthMesh);
        tweenManager.singleMap.starsFlashing = stars.createFlashTween();
        tweenManager.singleMap.meteorsSweep = meteors.createSweepTween();
        tweenManager.singleMap.atmosphereRotation = TweenUtils.createAtmosphereRotationTween(atmosphereMesh);
        tweenManager.singleMap.moonRotation = TweenUtils.createMoonRotationTween(moonMesh);
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
        tweenManager.singleMap.conesAnimation = null;

        tweenManager.singleMap.meshRotation.stop();
        tweenManager.singleMap.moonRotation.stop();

        coneList.forEach(function (coneMesh) {
            coneMesh.setConeInitPos();
            coneMesh.scale.set(1, 1, 1);
        });
        clickedConeTweenSize.size = 1;

        var clickedConeGrowUpTween = TweenUtils.clickedConeGrowUpTween(clickedCone);
        var clickedConeGrowDownTween = TweenUtils.clickedConeGrowDownTween(clickedCone);
        clickedConeGrowUpTween.chain(clickedConeGrowDownTween);
        clickedConeGrowDownTween.chain(clickedConeGrowUpTween);

        tweenManager.singleMap.clickedConeGrowUpTween = clickedConeGrowUpTween;
        tweenManager.singleMap.clickedConeGrowDownTween = clickedConeGrowDownTween;

        tweenManager.singleMap.clickedConeGrowUpTween.start();

        addTextToBoard(cone.parameters);
        showInfo(cone.parameters.latitude, cone.parameters.longitude);
    }

    function processAfterResume() {

        tweenManager.singleMap.clickedConeGrowUpTween.stop();
        tweenManager.singleMap.clickedConeGrowDownTween.stop();
        TWEEN.remove(tweenManager.singleMap.clickedConeGrowUpTween);
        TWEEN.remove(tweenManager.singleMap.clickedConeGrowDownTween);

        tweenManager.singleMap.clickedConeGrowUpTween = null;
        tweenManager.singleMap.clickedConeGrowDownTween = null;

        tweenManager.singleMap.meshRotation.start();
        tweenManager.singleMap.moonRotation.start();

        coneList.forEach(function (coneMesh) {
            coneMesh.setConeInitPos();
            coneMesh.scale.set(1, 1, 1);
        });
        conesLastTweenSize.size = 1;

        tweenManager.singleMap.conesAnimation = TweenUtils.createConeGrowTween(coneList);
        tweenManager.singleMap.conesAnimation.start();
    }

    function moveEarthAggregation(coneLongitude) {
        tweenManager.groupMap.resumeScene.forEach(function (tween) {
            if (tween && typeof tween !== 'undefined') {
                TWEEN.remove(tween);
            }
        });
        tweenManager.groupMap.resumeScene = [];

        var adjustEarth = TweenUtils.adjustEarthTween(earthMesh);
        var adjustCone = TweenUtils.adjustConeTween(coneLongitude, earthMesh, atmosphereMesh);
        var translate = TweenUtils.translateTween(earthMesh);
        var moveCloser = TweenUtils.moveEarthCloserTween(earthMesh);

        tweenManager.groupMap.moveEarthAggregation.push(adjustEarth);
        tweenManager.groupMap.moveEarthAggregation.push(adjustCone);
        tweenManager.groupMap.moveEarthAggregation.push(translate);
        // tweenManager.groupMap.moveEarthAggregation.push(moveCloser);

        tweenManager.groupMap.moveEarthAggregation.forEach(function (tween) {
            tween.start();
        });
    }

    function resumeScene() {

        tweenManager.groupMap.moveEarthAggregation.forEach(function (tween) {
            if (tween && typeof tween !== 'undefined') {
                tween.stop();
                TWEEN.remove(tween);
            }
        });
        tweenManager.groupMap.moveEarthAggregation = [];

        var translateBack = TweenUtils.translateBackTween(earthMesh);
        var resumeCone = TweenUtils.resumeConeTween(earthMesh, atmosphereMesh);
        var resumeEarth = TweenUtils.resumeEarthTween(earthMesh);
        var moveFurther = TweenUtils.moveEarthFurtherTween(earthMesh);

        tweenManager.groupMap.resumeScene.push(translateBack);
        tweenManager.groupMap.resumeScene.push(resumeCone);
        tweenManager.groupMap.resumeScene.push(resumeEarth);
        // tweenManager.groupMap.resumeScene.push(moveFurther);

        tweenManager.groupMap.resumeScene.forEach(function (tween) {
            tween.start();
        });

        translateBack.onComplete(function () {
            processAfterResume();
        });
    }

    function sceneFadeInTween() {
        activateScene();
        var moveCloserTween = TweenUtils.createEarthMoveCloserTween(earthAggregation);
        var fogInTween = TweenUtils.createPlanetFogInTween(earthScene);
        moveCloserTween.start();
        fogInTween.start();
    }

    function sceneFadeOutTween() {
        var fogOutTween = TweenUtils.createPlanetFogOutTween(earthScene);
        easeVolumeTween = TweenUtils.createEaseVolumeTween(audio);
        fogOutTween.start();
        easeVolumeTween.start();
        easeVolumeTween.onComplete(onFadeSceneOutComplete);
    }

    function onFadeSceneOutComplete() {
        TWEEN.remove(easeVolumeTween);
        deactivateScene();
        solarSystemSceneController.fadeSceneIn();
        $("#timeLine").hide();
    }

    //interface

    //used for change between google earth
    this.stopScene = stopScene;
    this.startScene = startScene;

    //used when click the time line to add the cones to the earth
    this.addCones = addCones;
    this.clearCones = clearCones;

    //used for animation when hiding the info board
    this.restoreScene = resumeScene;

    //used when begin the typing board
    this.playAudio = playAudio;

    //API for fade in and out
    this.fadeSceneIn = sceneFadeInTween;
    this.fadeSceneOut = sceneFadeOutTween;
};