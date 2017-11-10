/**
 * Created by ss on 2017/9/29.
 */

EarthSceneController = function (renderer) {

    var moonRotateRadius = 0.7;
    var obliquity = 23.5;
    var clickConeAnimateTime = 3000;
    var controlParameter = 0;
    var audioSource = "../music/Earth.mp3";


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
        groupMap: {},
        singleMap: {
            rotateConesTween: null
        }
    };

    var earthRenderer = renderer;
    var earthScene = init();

    var enableNormalAnimate = true;
    var isClickEarth = false;
    var selfRotate = true;
    var speed;
    var yHistory;
    // var xHistory = {x: initPosX};

    this.activateScene = activateScene;
    this.pauseAudio = function() {
        audio.pause();
    };

    this.addCones = function (conesParameter) {
        coneList.forEach(function (cone) {
            earthMesh.remove(cone);
        });
        conesParameter.forEach(function (coneParameter) {
            addOneCone(coneParameter);
        });

    };

    this.clearCones = function () {
        coneList.forEach(function (cone) {
            earthMesh.remove(cone);
        });
        coneList = [];
    };

    // function animateCones() {
    //
    //     coneList.forEach(function (cone) {
    //         cone.rotate();
    //         cone.grow();
    //     });
    // }

    function createConesTween() {

        var rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);

        rotateTween.onUpdate(function() {

            coneList.forEach(function(cone) {
                cone.rotate();
                cone.grow();
            });
        });

        rotateTween.repeat(Infinity);

        return rotateTween;
    }

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

        if (enableNormalAnimate) {
            // stars.flashStars();
            if (selfRotate) {
                rotateEarth();
            }
            // rotateEarthWithStop();
            rotateMoon();
            // animateCones();
        }

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
        scene.add(moonMesh);
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
        return aggregation;
    }

    // function rotateEarthWithStop() {
    //
    //     SolarEPUtils.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //     SolarEPUtils.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //
    //     SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);
    //     var intersects = SolarEPUtils.raycaster.intersectObjects(earthScene.children, true);
    //
    //     // console.log("work");
    //     // console.log(intersects[0].object);
    //
    //     if (intersects === null || intersects.length === 0 || intersects[0].object !== atmosphereMesh) {
    //         rotateEarth();
    //     }
    // }

    function rotateEarth() {

        // console.log("rotate earth.");

        earthMesh.rotation.y += 0.003;
        atmosphereMesh.rotation.y += 0.003;
    }

    function createEarthRotationTween() {


    }

    function rotateMoon() {

        moonMesh.rotateY(0.01);
        var timer = Date.now() * 0.0001;
        moonMesh.position.x = Math.cos(-timer) * moonRotateRadius;
        moonMesh.position.z = Math.sin(-timer) * moonRotateRadius;
    }

    function addOneCone(coneParameter) {
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
        var intersects = SolarEPUtils.raycaster.intersectObjects(earthScene.children, false);
	
	    console.log('all===', intersects);
        console.log('0====', intersects[0].object);

        coneList.forEach(function (cone) {
            console.log("in");
            if (intersects[0].object === cone) {
                console.log("find a clicked cone.");
                enableNormalAnimate = false;
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
        inertiaTween.onUpdate(function() {
            earthMesh.rotation.y += this.speed;
            atmosphereMesh.rotation.y += this.speed;
        });

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

    this.restoreScene = function () {
        resumeScene();
    };

    function moveEarth(latitude, longitude) {
        console.log(latitude + "," + longitude);
        moveEarthAggregation(longitude);
    }

    function initTween() {

        meteors.createSweepTween().start();
        stars.createFlashTween().start();
        createConesTween().start();
    }

    function moveEarthAggregation(coneLongitude) {
        // TWEEN.removeAll();
        // tweenMap.adjustEarth = adjustEarthTween();
        // tweenMap.adjustCone = adjustConeTween(coneLongitude);
        // tweenMap.translate = translateTween();
        //
        // tweenMap.adjustEarth.start();
        // tweenMap.adjustCone.start();
        // tweenMap.translate.start();
    }

    function resumeScene() {

        // TWEEN.removeAll();
        
        // tweenMap.translateBack = translateBackTween();
        // tweenMap.resumeCone = resumeConeTween();
        // tweenMap.resumeEarth = resumeEarthTween();
        //
        // tweenMap.resumeCone.start();
        // tweenMap.resumeEarth.start();
        // tweenMap.translateBack.start();
    }

    // Rotate earthAggregation around its Z-axis CCW
    function adjustEarthTween() {
        var initObliquity = earthMesh.parent.rotation.z;

        var finalObliquity = 0;
        var obliquityStart = {obliquity: initObliquity};
        var obliquityEnd = {obliquity: finalObliquity};

        var tween = new TWEEN.Tween(obliquityStart)
            .to(obliquityEnd, clickConeAnimateTime);
	
	    tween.onStart(function() {
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

        var tween = new TWEEN.Tween(posStart)
            .to(posEnd, clickConeAnimateTime);
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
        var posStart = { pos: initPosX };
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
	// Rotate earth mesh around Y-axis CCW
    function resumeConeTween() {
        var startY = earthMesh.rotation.y;
        var posStart = { y: startY };
        var endY = yHistory + (controlParameter / 180 * Math.PI);
	    var posEnd = { y: endY };
	    
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
	    tween.onComplete(function() {
		    enableNormalAnimate = true;
	    });
        return tween;
    }
};