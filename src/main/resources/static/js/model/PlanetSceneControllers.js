/**
 * Created by ss on 2017/10/26.
 */

// PlanetSceneController
PlanetSceneController = function (renderer, config) {
    // Renderer

    var renderer = renderer;
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    // Utils
    var universeUtils = new UniverseUtils();

    // Universe, stars and meteors
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();

    // Mesh and Aggregation
    var mesh = universeUtils.createPlanetMesh(config);
    var planetAggregation = aggregationInit();
    var audio = universeUtils.loadAudio(config.audio);

    var tweenManager = {
        rotationTween: null,
        meteorsSweep: null,
        starsFlashing: null,
        inertia: null
    };

    // Camera and Lights
    var camera = universeUtils.createDefaultCamera();
    var lights = lightsInit();
    // Init. Scene
    var scene = init();

    var speed;

    var isStoppedRotation = false;
    var isPlanetClicked = false;
    var isInertia = false;

    // Interfaces
    this.activateScene = activateScene;
    this.name = config.planetName + "Controller";
    this.pauseAudio = function () {
        audio.pause();
    };

    /* Action Functions */
    function animate() {
        SolarEPUtils.animationFrame = requestAnimationFrame(animate);

        TWEEN.update();

        renderer.render(scene, camera);
    }

    function initTween() {

        tweenManager.meteorsSweep = meteors.createSweepTween();
        tweenManager.starsFlashing = stars.createFlashTween();
        tweenManager.rotationTween = createRotationTween();
    }

    function activateScene() {
        audio.play();
        EventManager.removeEvents();
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        addEvent();
        animate();
        startTween();
    }

    function createRotationTween() {
        var rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);

        rotateTween.onUpdate(function () {

            mesh.rotation.y += 0.0005;
            planetAggregation.rotation.y += 0.001;
        });

        rotateTween.repeat(Infinity);

        return rotateTween;
    }

    /* Initialization Functions */
    function init() {
        var scene = new THREE.Scene();

        lights.forEach(function addLight(light) {
            scene.add(light);
        });
        // camera.position.set(0, 0.75, 2.5);
        // camera.lookAt(planetAggregation.position);
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

    function startTween() {
        tweenManager.meteorsSweep.start();
        tweenManager.starsFlashing.start();
        tweenManager.rotationTween.start();
    }

    function aggregationInit() {
        var aggregation = new THREE.Object3D();

        aggregation.name = config.planetName + "Aggregation";
        aggregation.add(mesh);
        if (config.planetName === 'Saturn' || config.planetName === 'Uranus') {
            aggregation.add(universeUtils.createRing(config));
        }
        universeUtils.addDoubleHalos(aggregation, config.innerGlowColor, config.outerGlowColor);
        aggregation.rotateX(0.1 * Math.PI);
        return aggregation;
    }

    function lightsInit() {
        var lights = [];

        // Lights Combination
        lights[0] = new THREE.HemisphereLight(0xf3f3f3, 0x1e1e1e, 0.75);

        lights[1] = new THREE.DirectionalLight(0xf7f7f7, 0.6);
        lights[1].position.set(30, 30, 3);
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
        }
    }

    function onMouseUp() {

        if (isPlanetClicked) {
            isPlanetClicked = false;
            isInertia = true;
            tweenManager.inertia = createInertiaTween();
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

        } else if (isInertia) {

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

    function createInertiaTween() {

        var startSpeed = {speed: speed};
        var endSpeed = {speed: 0};

        var inertiaTween = new TWEEN.Tween(startSpeed).to(endSpeed, 500);
        inertiaTween.easing(TWEEN.Easing.Linear.None);
        inertiaTween.onUpdate(function () {
            planetAggregation.rotation.y += this.speed;
        }).onComplete(function () {
            isInertia = false;
        });

        return inertiaTween;
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