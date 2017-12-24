/**
 * Created by ss on 2017/10/26.
 */

SolarSystemSceneController = function(renderer) {

    var camera = UniverseUtils.createDefaultCamera();

    var universeMesh = UniverseUtils.createSolarUniverse();
    var solarAggregation = UniverseUtils.createSolarAggregation();
    var lights = UniverseUtils.createSolarLights(solarAggregation);
    var asteroidBeltPoints = UniverseUtils.createAsteroidBelt();
    var planetsList = UniverseUtils.createPlanetsList();
    var audio = UniverseUtils.loadSolarAudio(SolarConfig.audio);

    var solarSystemRenderer = renderer;
    var solarSystemScene = init();

    var changeSceneTween = null;
    var fogTween = null;
    var easingVolumeTween = null;

    var name = "SolarSystemSceneController";

    var clickedPlanet;

    function setPlanetScene(planetName, controller) {
        planetsList[planetName].controller = controller;
    }

    function playAudio() {
        var magnifyVolumeTween = TweenUtils.createMagnifyVolumeTween(audio);
        magnifyVolumeTween.start();
    }

    function animate() {
        
        SolarEPUtils.animationFrame = requestAnimationFrame(animate);
        TWEEN.update();
        rotationAndRevolution();
    
        solarSystemRenderer.render(solarSystemScene, camera);
    }

    function activateScene(){
        // audio.play();
        EventManager.removeEvents();
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        addEvent();
        animate();
    }

    function deactivateScene() {
        audio.pause();
        EventManager.removeEvents();
    }

    function init() {
        var scene = new THREE.Scene();

        lights.forEach(function(light) {
            scene.add(light);
        });

        // Camera
        scene.add(camera);
        updateCameraPosition(1);
		
        // Background
        scene.add(universeMesh);

        // Apply the Sun
        initSystemPositions();
        scene.add(solarAggregation);

        // Apply Asteroid Belt
        asteroidBeltPoints.forEach(function(points) {
            scene.add(points);
        });

        scene.fog = new THREE.Fog(0x000000, 0, 100);

        return scene;
    }



    function initStartTween() {
	    var tween = TweenUtils.createEnterSolarSceneTween(camera, solarAggregation);
	    tween.start();
    }
    
    function initSystemPositions() {

        // Tilt Pluto orbit
        planetsList["pluto"].orbit.rotateY(Math.PI * 17 / 180);
        for (var planet in planetsList) {
            // Add planet to the sun
            solarAggregation.add(planetsList[planet].mesh);
            // Add orbits
            solarAggregation.add(planetsList[planet].orbit);
        }
    }

    function rotationAndRevolution() {

        // Sun Rotations
        solarAggregation.mesh.rotation.x += SolarConfig['sun'].rotateSpeed;
        solarAggregation.mesh.rotation.y += SolarConfig['sun'].rotateSpeed;
        solarAggregation.mesh.rotation.z += SolarConfig['sun'].rotateSpeed;

        for (var planet in planetsList) {
            // Rotations
            planetsList[planet].mesh.rotateY(SolarConfig[planet].rotateSpeed);

            // Revolutions
            SolarConfig[planet].orbitAngle += SolarConfig[planet].orbitSpeed;
            var radians = SolarConfig[planet].orbitAngle * Math.PI / 180;
            planetsList[planet].mesh.position.x = Math.cos(radians) * SolarConfig[planet].orbitRadius;
            planetsList[planet].mesh.position.z = Math.sin(radians) * SolarConfig[planet].orbitRadius;

            if (SolarConfig[planet].name == 'pluto'){
                planetsList[planet].mesh.position.x = (Math.sin(radians) * SolarConfig[planet].orbitRadius) * Math.cos(Math.PI * 17/180);
                planetsList[planet].mesh.position.y = (Math.sin(radians) * SolarConfig[planet].orbitRadius) * Math.sin(Math.PI * 17/180);
                planetsList[planet].mesh.position.z = -Math.sqrt(Math.pow(SolarConfig[planet].orbitRadius, 2) - Math.pow(planetsList[planet].mesh.position.x, 2) - Math.pow(planetsList[planet].mesh.position.y, 2));

                if (SolarConfig[planet].orbitAngle % 360 <= -90 && SolarConfig[planet].orbitAngle % 360 >= -270){
                    planetsList[planet].mesh.position.z = -planetsList[planet].mesh.position.z;
                }
            }


        }

        // Asteroid Belt revolutions
        var k;
        for (k=0; k <asteroidBeltPoints.length; k++){
            asteroidBeltPoints[k].rotateY(SolarConfig["asteroidBelt"].orbitSpeed * (k+1));
        }
    }

    function updateCameraPosition(mode) {

        // From the top of the system
        if (mode == 1) {
            camera.position.set(0, 0.9, 0);
        }
        // From the horizontal position
        else if (mode == 2) {
            camera.position.set(0, 0, 0.9);
        }
        // From the up-forward position
        else {
            camera.position.set(0, 0.3, 0.9);
        }

        camera.lookAt(solarAggregation.position);

    }

    function addEvent() {

        EventManager.registerEvent('mousedown', onMouseDown);
    }

    // mouse down event handler
    function onMouseDown() {

        console.log("mouse down");

        SolarEPUtils.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        SolarEPUtils.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        checkAndChangeScene();
    }

    function checkAndChangeScene() {
        
        SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);

        var intersects = SolarEPUtils.raycaster.intersectObjects(solarAggregation.children, true);

        for (var i =0; i < intersects.length; i++) {
            if (intersects !== null && intersects.length > 0 && intersects[i].object.type === "Mesh") {

                for (var planet in planetsList) {
                    if (intersects[i].object === planetsList[planet].mesh) {
	                    console.log(planet + " clicked!");

                        clickedPlanet = planetsList[planet].controller;
                        activatedScene = planetsList[planet].controller;
                        // console.log('camera 2', camera);
	                    changeSceneTween = TweenUtils.getChangeSolarSceneTween(planetsList[planet].mesh, camera, SolarConfig[planet].name);
	                    fogTween = TweenUtils.getFogTween(solarSystemScene);
                        easingVolumeTween = TweenUtils.createEaseVolumeTween(audio);
	                    // changeSceneTween.onStart(function () {
	                    //     // console.log()
                         //    setTransitionImage(TransitionConfig[SolarConfig[planet].name]);
	                    // });
	                    changeSceneTween.onComplete(function() {

		                    onCompleteCleanup(changeSceneTween);
                            planetsList[planet].controller.playAudio();

                            showTransition(SolarConfig[planet].name);

		                    // onCompleteSetup(planetsList[planet].controller, camera);
	                    });
	                    // console.log('==========');
	                    changeSceneTween.start();
	                    fogTween.start();
                        easingVolumeTween.start();

	                    break; // break is very important because of closure!!!
                    }
                }
            }
        }
    }
    
    function onCompleteCleanup(changeSceneTween) {
	    TWEEN.remove(changeSceneTween);
	    deactivateScene();
    }

    //can do some change to onCompleteSetup to let simplify the function call
    this.onCompleteSetup = function() {
        // console.log(camera);
        onCompleteSetup(clickedPlanet, camera);
    };

    function onCompleteSetup(planetSceneController, camera) {
	    planetSceneController.activateScene();
	    camera.position.set(
		    camera.positionHistory.x,
		    camera.positionHistory.y,
		    camera.positionHistory.z
	    );
	    solarSystemScene.fog.near = 0;
	    camera.lookAt(new THREE.Vector3(0, 0, 0));
	    planetSceneController.fadeSceneIn();
	    enableBackLogo();
    }

    function fadeSceneIn() {

    }

    function fadeSceneOut() {

    }

    function onFadeSceneInComplete() {

    }

    function onFadeSceneOutComplete() {

    }

    //interface

    this.setPlanetScene = setPlanetScene;
    this.activateScene = activateScene;
    this.deactivateScene = deactivateScene;
    this.initStartTween = initStartTween;
    this.playAudio = playAudio;

    this.name = name;

    //API for fade in and out the solar scene
    this.fadeSceneIn = fadeSceneIn;
    this.fadeSceneOut = fadeSceneOut;
};
