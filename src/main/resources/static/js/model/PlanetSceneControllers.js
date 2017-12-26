/**
 * Created by ss on 2017/10/26.
 */

// PlanetSceneController
PlanetSceneController = function (renderer, config) {
    // Renderer
	var isPlanetAtLeftSide = false;
    var renderer = renderer;
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    // Universe, stars and meteors
    var universeMesh = UniverseUtils.createDefaultUniverse();
    var stars = UniverseUtils.createDefaultStars();
    var meteors = UniverseUtils.createDefaultMeteors();

    // Mesh and Aggregation
    var mesh = UniverseUtils.createPlanetMesh(config);
    var planetAggregation = aggregationInit();
    var audio = UniverseUtils.loadAudio(config.audio);

    var tweenManager = {
        rotationTween: null,
        meteorsSweep: null,
        starsFlashing: null,
        inertia: null,
        moveLeft: null,
        moveRight: null
    };

    var easeTween;
    var magnifyVolumeTween;

    // Camera and Lights
    var camera = UniverseUtils.createDefaultCamera();
    var lights = UniverseUtils.createPlanetLights(planetAggregation);
    // Init. Scene
    var scene = init();

    var speed;

    var inertiaControls = {
        isInertia: false
    };

    var isStoppedRotation = false;
    var isPlanetClicked = false;

    var name = config.planetName + "Controller";

    function hideInfo() {
        console.log("hide info.");
        movePlanetRight();
        hideInfoBoard();
    }

    /* Action Functions */
    function animate() {
        SolarEPUtils.animationFrame = requestAnimationFrame(animate);

        TWEEN.update();

        renderer.render(scene, camera);
    }

    function initTween() {

        tweenManager.meteorsSweep = meteors.createSweepTween();
        tweenManager.starsFlashing = stars.createFlashTween();
        tweenManager.rotationTween = TweenUtils.createPlanetRotationTween(mesh, planetAggregation);
    }

    function activateScene() {
        console.log('scene activated');
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        addEvent();
        animate();
        activateTween();
    }

    function deactivateScene() {

        console.log("deactivate planet scene");

        resetPlanetPos();
        hideInfoBoard();
        // audio.pause();
        deactivateTween();
        EventManager.removeEvents();
    }

    function activateTween() {
        tweenManager.rotationTween.start();
        tweenManager.starsFlashing.start();
        tweenManager.meteorsSweep.start();
    }

    function deactivateTween() {
        tweenManager.rotationTween.stop();
        tweenManager.starsFlashing.stop();
        tweenManager.meteorsSweep.stop();
    }

    /* Initialization Functions */
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
        scene.add(planetAggregation);

        initTween();

        scene.fog = new THREE.Fog(0x000000, -500, 500);

        return scene;
    }

    function aggregationInit() {
        var aggregation = new THREE.Object3D();

        aggregation.name = config.planetName + "Aggregation";
        aggregation.add(mesh);
        if (config.planetName === 'Saturn' || config.planetName === 'Uranus') {
            aggregation.add(UniverseUtils.createRing(config));
        }
        UniverseUtils.addDoubleHalos(aggregation, config.innerGlowColor, config.outerGlowColor);

        // Coordinate inclination
        aggregation.rotateZ(config.inclination * Math.PI /180);

        // Coordinate axis angle for camera
        aggregation.rotateX(0.105 * Math.PI);

        return aggregation;
    }

    function addEvent() {

        EventManager.registerEvent('mousemove', onMouseMove);
        EventManager.registerEvent('mousedown', onMouseDown);
        EventManager.registerEvent('mousewheel', onMouseWheel);
        EventManager.registerEvent('mouseup', onMouseUp);
        EventManager.registerEvent('dblclick', onDoubleClick);
    }

    function onMouseDown() {
        SolarEPUtils.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        SolarEPUtils.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);
        var intersects = SolarEPUtils.raycaster.intersectObjects(scene.children, true);
		console.log('down intersects===', intersects);
	    if (intersects !== null
		    && intersects.length > 1 && intersects[1].object !== undefined
		    && ( intersects[1].object.name === 'inner glow mesh' || intersects[1].object.name === 'outer glow mesh')
	    ) {
            isPlanetClicked = true;
        }
    }

    function onMouseUp() {

        if (isPlanetClicked) {
            isPlanetClicked = false;
            inertiaControls.isInertia = true;
            tweenManager.inertia = TweenUtils.createPlanetInertiaTween(mesh, speed, inertiaControls);
            // tweenManager.inertia.start();
        }
    }

    function onMouseMove(event) {

        var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        speed = mouseX - SolarEPUtils.mouse.x;

        SolarEPUtils.mouse.x = mouseX;
        SolarEPUtils.mouse.y = mouseY;

        SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);
        var intersects = SolarEPUtils.raycaster.intersectObjects(scene.children, true);

        if (isPlanetClicked) {

            var step = 1.5 * speed;
            rotateWithStep(step);

        } else if (inertiaControls.isInertia) {

        } else {

            if (intersects !== null && intersects.length !== 0 && intersects[0].object === mesh) {
                if (!isStoppedRotation) {
                    isStoppedRotation = true;
                    tweenManager.rotationTween.stop();
                }
            } else {
                if (isStoppedRotation) {
                    isStoppedRotation = false;
                    tweenManager.rotationTween.start();
                }
            }
        }
    }

    function rotateWithStep(step) {

        mesh.rotation.y += step;
    }

    function onMouseWheel() {

        var minScale = 1.3;
        var maxScale = 3;
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
	
	/**
	 * move planet to left side when double clicked
	 * @param event
	 */
	function onDoubleClick(event) {
		console.log('double clicked----');
	    SolarEPUtils.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	    SolarEPUtils.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	    SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);
	    var intersects = SolarEPUtils.raycaster.intersectObjects(scene.children, true);
	    if (intersects !== null
		    && intersects.length !== 0
		    && ( intersects[1].object.name === 'inner glow mesh' || intersects[1].object.name === 'outer glow mesh')
	    ) {
	    	// for (var intersect in intersects) {
	    	// 	if (intersect.object !== undefined && intersect.object.name === 'inner glow mesh') {
				//     if (!isPlanetAtLeftSide) {
				// 	    movePlanetLeft();
				// 	    showInfoBoard();
				//     } else {
				// 	    movePlanetRight();
				// 	    hideInfoBoard();
				//     }
				//     break;
			 //    }
		    // }
		
		    if (!isPlanetAtLeftSide) {
			    movePlanetLeft();
			    showInfoBoard();
		    } else {
			    movePlanetRight();
			    hideInfoBoard();
		    }
	    }
    }
	
	/**
	 * Move planet to left side with tween
	 */
	function movePlanetLeft() {
		
	    if (tweenManager.moveRight) {
		    tweenManager.moveRight.stop();
		    TWEEN.remove(tweenManager.moveRight);
		    tweenManager.moveRight = null;
	    }
		
	    tweenManager.moveLeft = TweenUtils.createPlanetMoveLeftTween(planetAggregation);
	    tweenManager.moveLeft.start();
    }
	
	/**
	 * MOve planet to the right side with tween
	 */
	function movePlanetRight() {
	    if (tweenManager.moveLeft) {
		    tweenManager.moveLeft.stop();
		    TWEEN.remove(tweenManager.moveLeft);
		    tweenManager.moveLeft = null;
	    }
		
	    tweenManager.moveRight = TweenUtils.createPlanetMoveRightTween(planetAggregation);
	    tweenManager.moveRight.start();
    }
	/**
	 * Stop and remove moveRight and moveLeft tweens
	 * Reset planet position to (0, 0, 0)
	 * @param planetAggregation
	 */
	function resetPlanetPos() {
	    if (tweenManager.moveRight) {
		    tweenManager.moveRight.stop();
		    TWEEN.remove(tweenManager.moveRight);
		    tweenManager.moveRight = null;
	    }
	    
		
		if (tweenManager.moveLeft) {
			tweenManager.moveLeft.stop();
			TWEEN.remove(tweenManager.moveLeft);
			tweenManager.moveLeft = null;
		}
		
		
	    planetAggregation.position.x = 0;
		
		// Make sure halo is also reset to (0, 0, 0)
		if (planetAggregation.children.length === 3) {
			planetAggregation.children[1].position.x = 0;
			planetAggregation.children[2].position.x = 0;
		}
		
		if (planetAggregation.children.length === 4) {
			planetAggregation.children[2].position.x = 0;
			planetAggregation.children[3].position.x = 0;
		}
	    
	    isPlanetAtLeftSide = 0;
    }
	
	// // For testing
	// document.addEventListener('keydown',function(event) {
	// 	if (event.keyCode === 38) {
	// 		resetPlanetPos();
	// 	}
	// },false);

    function showInfoBoard() {
	    isPlanetAtLeftSide = true;
	    $(config.infoBoard).fadeIn(1000);
    }

    function hideInfoBoard() {
	    isPlanetAtLeftSide = false;
	    $(config.infoBoard).fadeOut(1000);
    }

    function getPlanetAggregation() {
		return planetAggregation;
    }

    function playAudio() {

	    console.log("start planet audio.");

        magnifyVolumeTween = TweenUtils.createMagnifyVolumeTween(audio);
        magnifyVolumeTween.start();
    }

    function fadeSceneIn() {
	    activateScene();
        var moveCloserTween = TweenUtils.createPlanetMoveCloserTween(planetAggregation);
        var fogInTween = TweenUtils.createPlanetFogInTween(scene);
        moveCloserTween.start();
        fogInTween.start();
    }

    function fadeSceneOut() {
	    console.log("In fade out.");
        var fogOutTween = TweenUtils.createPlanetFogOutTween(scene);
        easeTween = TweenUtils.createEaseVolumeTween(audio);
        fogOutTween.start();
        easeTween.start();
        easeTween.onComplete(onFadeSceneOutComplete);
    }

    function onFadeSceneOutComplete() {
        TWEEN.remove(easeTween);
        deactivateScene();
        solarSystemSceneController.fadeSceneIn();
    }

    // Interfaces
    this.name = name;

    this.playAudio = playAudio;
    this.hideInfo = hideInfo;

    //API for fade in and out
    this.fadeSceneIn = fadeSceneIn;
    this.fadeSceneOut = fadeSceneOut;
};