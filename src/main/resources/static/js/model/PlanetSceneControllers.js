/**
 * Created by ss on 2017/10/26.
 */

// PlanetSceneController
PlanetSceneController = function (renderer, config) {
    // Renderer
	var counter = 0;
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

    // Camera and Lights
    var camera = UniverseUtils.createDefaultCamera();
    var lights = lightsInit();
    // Init. Scene
    var scene = init();

    var speed;

    var inertiaControls = {
        isInertia: false
    };

    var isStoppedRotation = false;
    var isPlanetClicked = false;

    // Interfaces
    this.activateScene = activateScene;
    this.deactivateScene = deactivateScene;
    this.name = config.planetName + "Controller";

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
        audio.play();
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

        return scene;
    }

    // function startTween() {
    //     tweenManager.meteorsSweep.start();
    //     tweenManager.starsFlashing.start();
    //     tweenManager.rotationTween.start();
    // }

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

    function lightsInit() {
        var lights = [];

        // Lights Combination
        lights[0] = new THREE.HemisphereLight(0xf3f3f3, 0x1e1e1e, 0.75);

        lights[1] = new THREE.DirectionalLight(0xf7f7f7, 0.6);
        lights[1].position.set(30, 12, 3);
        lights[1].target = planetAggregation;
        lights[1].castShadow = true;            // default is false
        //Set up shadow properties for the light
        // lights[1].shadow.mapSize.width = 1024;  // default
        // lights[1].shadow.mapSize.height = 1024; // default
        // lights[1].shadow.camera.near = 0.5;    // default
        // lights[1].shadow.camera.far = 500;     // default

        // Legacy setting
        // lights[1] = new THREE.SpotLight( 0xf7f7f7, 0.8, 95, Math.PI/4, 1, 1);
        // lights[1].position.set(30, 30, -6);
        // lights[1].lookAt(planetAggregation.position);

        return lights;
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
        var intersects = SolarEPUtils.raycaster.intersectObjects(scene.children, true);

        if (intersects !== null && intersects.length !== 0 && intersects[0].object === mesh) {
            isPlanetClicked = true;
            console.log('planet: ', planetAggregation);
            if (counter % 2 === 0) {
            	if (tweenManager.moveRight)
		            tweenManager.moveRight.stop();
            	
	            TWEEN.remove(tweenManager.moveRight);
	            tweenManager.moveRight = null;
	            
	            tweenManager.moveLeft = TweenUtils.createPlanetMoveLeftTween(planetAggregation);
	            tweenManager.moveLeft.start();
	            
            } else {
	            if (tweenManager.moveLeft)
		            tweenManager.moveLeft.stop();
	
	            TWEEN.remove(tweenManager.moveLeft);
	            tweenManager.moveLeft = null;
	
	            tweenManager.moveRight = TweenUtils.createPlanetMoveRightTween(planetAggregation);
	            tweenManager.moveRight.start();
            }
            counter++;
        }
    }

    function onMouseUp() {

        if (isPlanetClicked) {
            isPlanetClicked = false;
            inertiaControls.isInertia = true;
            tweenManager.inertia = TweenUtils.createPlanetInertiaTween(planetAggregation, speed, inertiaControls);
            tweenManager.inertia.start();
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

        planetAggregation.rotation.y += step;
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
};