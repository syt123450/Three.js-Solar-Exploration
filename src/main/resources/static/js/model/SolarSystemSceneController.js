/**
 * Created by ss on 2017/10/26.
 */

SolarSystemSceneController = function(renderer) {

    var camera = UniverseUtils.createDefaultCamera();

    var universeMesh = UniverseUtils.createSolarUniverse();
    var solarAggregation = UniverseUtils.createSolarAggregation();
    var asteroidBeltPoints = UniverseUtils.createAsteroidBelt();
    var planetsList = UniverseUtils.createPlanetsList();
    var audio = UniverseUtils.loadSolarAudio(SolarConfig.audio);

    var solarSystemRenderer = renderer;
    var solarSystemScene = init();

    var changeSceneTween = null;
    var fogTween = null;
    
    this.setPlanetScene = function (planetName, controller) {
        planetsList[planetName].controller = controller;
    };

    this.activateScene = activateScene;
    this.deactivateScene = deactivateScene;
    this.name = "SolarSystemSceneController";

    this.initStartTween = initStartTween;
    // Camera position settings (NOT COMPLETE, N/A)
    // this.upForwardView = updateCameraPosition(-1);
    // this.topView = updateCameraPosition(1);
    // this.sideView = updateCameraPosition(2);


    this.playAudio = function() {
        audio.play();
    };

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

        // Lights
        var lights = [];

        // lights for university environment
        lights[0] = new THREE.PointLight(0xffffff, 0.9, 0);
        lights[0].position.set(0, 0, 0);
        lights[1] = new THREE.AmbientLight(0xf7f7f7, 0.45);

        // lights for lightening the sun
        var density = 1;
        lights[2] = new THREE.SpotLight(0xffffff, density, SolarConfig.sunRadius, Math.PI/2, 1);
        lights[2].position.set(0, (SolarConfig.sunRadius * Math.sqrt(2)), 0);
        lights[2].target = solarAggregation;
        lights[3] = new THREE.SpotLight(0xffffff, density, SolarConfig.sunRadius, Math.PI/2, 1);
        lights[3].position.set(0, -(SolarConfig.sunRadius * Math.sqrt(2)), 0);
        lights[3].target = solarAggregation;
        lights[4] = new THREE.SpotLight(0xffffff, density, SolarConfig.sunRadius, Math.PI/2, 0);
        lights[4].position.set(0, 0, (SolarConfig.sunRadius * Math.sqrt(2)));
        lights[4].target = solarAggregation;
        lights[5] = new THREE.SpotLight(0xffffff, density, SolarConfig.sunRadius, Math.PI/2, 0);
        lights[5].position.set(0, 0, -(SolarConfig.sunRadius * Math.sqrt(2)));
        lights[5].target = solarAggregation;
        lights[6] = new THREE.SpotLight(0xffffff, density, SolarConfig.sunRadius, Math.PI/2, 0);
        lights[6].position.set((SolarConfig.sunRadius * Math.sqrt(2)), 0, 0);
        lights[6].target = solarAggregation;
        lights[7] = new THREE.SpotLight(0xffffff, density, SolarConfig.sunRadius, Math.PI/2, 0);
        lights[7].position.set(-(SolarConfig.sunRadius * Math.sqrt(2)), 0, 0);
        lights[7].target = solarAggregation;


        lights.forEach(function addLight(light) {
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
        asteroidBeltPoints.forEach(function addPoints(points) {
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
	                    // TWEEN.remove(changeSceneTween);
	                    // enableBackLogo();
	                    // activatedScene = planetsList[planet].controller;
                        // deactivateScene();
	                    // planetsList[planet].controller.activateScene();
	                    
	                    changeSceneTween = getChangeSceneTween(planetsList[planet].mesh, camera);
	                    fogTween = getFogTween(solarSystemScene);
	                    changeSceneTween.onComplete(function() {
                        	TWEEN.remove(changeSceneTween);
		                    enableBackLogo();
		                    activatedScene = planetsList[planet].controller;
                            deactivateScene();
		                    planetsList[planet].controller.activateScene();
                            planetsList[planet].controller.workAround();
		                    camera.position.set(
			                    camera.positionHistory.x,
			                    camera.positionHistory.y,
			                    camera.positionHistory.z
		                    );
	                        camera.lookAt(new THREE.Vector3(0, 0, 0));
	                        
	                        var movePlanetCloserTween = TweenUtils.createPlanetMoveCloserTween(
		                        planetsList[planet].controller.getPlanetAggregation()
	                        );
		                    movePlanetCloserTween.start();
	                    });
	                    changeSceneTween.start();
	                    fogTween.start();


	                    break; // break is very important because of closure!!!
                    }
                }
            }
        }
    }
};

function getChangeSceneTween(planetMesh, camera, audio) {
	console.log('planetMesh ===', planetMesh);
	
    var distanceStart = { val: camera.position.distanceTo(planetMesh.position) };
    
    // https://threejs.org/docs/#api/cameras/PerspectiveCamera
	// To get a full view of the planet, the minimum value of finalDistance must be greater or equal to
	// NF + R
	// NF = camera frustum near plane (default 0.1)
	// R: radius of the planet
	var finalDistance = typeof planetMesh.ring === 'undefined' ?
		Math.max(6 * planetMesh.geometry.parameters.radius, camera.near +  1.05 * planetMesh.geometry.parameters.radius) :
		Math.max(12 * planetMesh.geometry.parameters.radius, camera.near + 1.05 *  planetMesh.geometry.parameters.radius);

	console.log('final distance ===', finalDistance);
	var distanceEnd = { val: finalDistance };
	
	var animationDuration = 5000;
	
	var tween = new TWEEN.Tween(distanceStart);
	tween.to(distanceEnd, animationDuration)
		.easing(TWEEN.Easing.Quadratic.Out)
		.onUpdate(function() {
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
		.onStart(function() {
			// TODO: save the initial position of the camera to a global variable
			camera.positionHistory = Object.assign({}, camera.position);
			camera.directionHistory = Object.assign({}, camera.getWorldDirection());
		});
    return tween;
}

function getFogTween(solarSystemScene) {

    var initFog = {density: 0};
    var finalDensity = {density: -500};

    var tween = new TWEEN.Tween(initFog).to(finalDensity, 5000)
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate(function() {
            solarSystemScene.fog.near = initFog.density;
        })
        .onComplete(function() {
            solarSystemScene.fog.near = 0;
        });

    return tween;
}