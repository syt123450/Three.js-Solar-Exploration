/**
 * Bo
 * Updated on Oct 25, 2017
 * @param renderer
 * @constructor
 */

CamZoomInController = function(renderer) {
	var sunRadius = 50,
		
		mercuryOrbitRadius = sunRadius +20,
		mercuryOrbitAngle = 0,
		mercuryOrbitSpeed = - 3,
		mercuryRotateSpeed = 0.05,
		
		venusOrbitRadius = sunRadius +45,
		venusOrbitAngle = 0,
		venusOrbitSpeed = - 1.9,
		venusRotateSpeed = 0.05,
		
		earthOrbitRadius = sunRadius +75,
		earthOrbitAngle = 0,
		earthOrbitSpeed = - 1,
		earthRotateSpeed = 0.05,
		
		marsOrbitRadius = sunRadius +110,
		marsOrbitAngle = 0,
		marsOrbitSpeed = - 0.5,
		marsRotateSpeed = 0.05,
		
		jupiterOrbitRadius = sunRadius +160,
		jupiterOrbitAngle = 0,
		jupiterOrbitSpeed = - 0.3,
		jupiterRotateSpeed = 0.05,
		
		saturnOrbitRadius = sunRadius +210,
		saturnOrbitAngle = 0,
		saturnOrbitSpeed = - 0.17,
		saturnRotateSpeed = 0.05,
		
		uranusOrbitRadius = sunRadius +255,
		uranusOrbitAngle = 0,
		uranusOrbitSpeed = - 0.12,
		uranusRotateSpeed = 0.05,
		
		neptuneOrbitRadius = sunRadius +300,
		neptuneOrbitAngle = 0,
		neptuneOrbitSpeed = - 0.08,
		neptuneRotateSpeed = 0.05,
		
		plutoOrbitRadius = sunRadius +335,
		plutoOrbitAngle = 0,
		plutoOrbitSpeed = - 0.04,
		plutoRotateSpeed = 0.05;
	
	var universeUtils = new UniverseUtils();
	var light = new THREE.PointLight(0xffffff, 1.2, 0);
	var camera = universeUtils.createDefaultCamera();
	
	var universeMesh = createUniverseMesh();
	
	var sunAggregation = createAggregation(
		new THREE.Mesh(
			new THREE.SphereGeometry(sunRadius, 32, 32),
			new THREE.MeshBasicMaterial({
				color: 'yellow'
			}))
	);
	
	var mercuryAggregation = createAggregation(
		createBumpSphereMesh('../images/planets/mercurymap.jpg', '../images/planets/mercurybump.jpg', 5)
	);
	var venusAggregation = createAggregation(
		createBumpSphereMesh('../images/planets/venusmap.jpg', '../images/planets/venusbump.jpg', 8)
	);
	var earthAggregation = createAggregation(
		createBumpSphereMesh('../images/earthmap1k.jpg', '../images/earthbump1k.jpg', 9)
	);
	var marsAggregation = createAggregation(
		createBumpSphereMesh('../images/planets/marsmap1k.jpg', '../images/planets/marsbump1k.jpg', 5.5)
	);
	var jupiterAggregation = createAggregation(
		createSphereMesh('../images/planets/jupitermap.jpg' , 20)
	);
	var saturnAggregation = createAggregation(
		createSphereMesh('../images/planets/saturnmap.jpg' , 18)
	);
	var uranusAggregation = createAggregation(
		createSphereMesh('../images/planets/uranusmap.jpg' , 12)
	);
	var neptuneAggregation = createAggregation(
		createSphereMesh('../images/planets/neptunemap.jpg' , 12)
	);
	var plutoAggregation = createAggregation(
		createBumpSphereMesh('../images/planets/plutomap1k.jpg', '../images/planets/plutobump1k.jpg', 3)
	);
	
	var solarSystemRenderer = renderer;
	var solarSystemScene = init();
	
	this.animate = solarSystemAnimate;
	
	this.topView = updateCameraPosition(1);
	this.sideView = updateCameraPosition(2);
	this.upForwardView = updateCameraPosition(-1);
	
	
	function solarSystemAnimate() {
		requestAnimationFrame(solarSystemAnimate);
		
		rotationAndRevolution();
		
		TWEEN.update();
		
		solarSystemRenderer.render(solarSystemScene, camera);
	}
	
	function init() {
		var scene = new THREE.Scene();
		
		// Lights
		scene.add(new THREE.AmbientLight(0x222222));
		scene.add(light);
		light.position.set(0, 0, 0);
		
		// Camera
		scene.add(camera);
		updateCameraPosition(-1);
		
		// Background
		scene.add(universeMesh);
		
		// Apply the Sun
		initSystemPositions();
		scene.add(sunAggregation);
		
		return scene;
	}
	
	function initSystemPositions() {
		// Add planets to the sun
		sunAggregation.add(mercuryAggregation);
		sunAggregation.add(venusAggregation);
		sunAggregation.add(earthAggregation);
		sunAggregation.add(marsAggregation);
		sunAggregation.add(jupiterAggregation);
		sunAggregation.add(saturnAggregation);
		sunAggregation.add(uranusAggregation);
		sunAggregation.add(neptuneAggregation);
		sunAggregation.add(plutoAggregation);
		
		// Init. positions
		mercuryAggregation.position.x = (mercuryOrbitRadius);
		venusAggregation.position.x = (venusOrbitRadius);
		earthAggregation.position.x = (earthOrbitRadius);
		marsAggregation.position.x = (marsOrbitRadius);
		jupiterAggregation.position.x = (jupiterOrbitRadius);
		saturnAggregation.position.x = (saturnOrbitRadius);
		uranusAggregation.position.x = (uranusOrbitRadius);
		neptuneAggregation.position.x = (neptuneOrbitRadius);
		plutoAggregation.position.x = (plutoOrbitRadius);
		
		// Add orbits
		sunAggregation.add(createOrbit(mercuryOrbitRadius));
		sunAggregation.add(createOrbit(venusOrbitRadius));
		sunAggregation.add(createOrbit(earthOrbitRadius));
		sunAggregation.add(createOrbit(marsOrbitRadius));
		sunAggregation.add(createOrbit(jupiterOrbitRadius));
		sunAggregation.add(createOrbit(saturnOrbitRadius));
		sunAggregation.add(createOrbit(uranusOrbitRadius));
		sunAggregation.add(createOrbit(neptuneOrbitRadius));
		sunAggregation.add(createOrbit(plutoOrbitRadius));
	}
	
	function rotationAndRevolution() {
		
		// Rotations
		mercuryAggregation.rotateY(mercuryRotateSpeed);
		venusAggregation.rotateY(venusRotateSpeed);
		earthAggregation.rotateY(earthRotateSpeed);
		marsAggregation.rotateY(marsRotateSpeed);
		jupiterAggregation.rotateY(jupiterRotateSpeed);
		saturnAggregation.rotateY(saturnRotateSpeed);
		uranusAggregation.rotateY(uranusRotateSpeed);
		neptuneAggregation.rotateY(neptuneRotateSpeed);
		plutoAggregation.rotateY(plutoRotateSpeed);
		
		// Revolutions
		var radians = 0;
		mercuryOrbitAngle += mercuryOrbitSpeed;
		venusOrbitAngle += venusOrbitSpeed;
		earthOrbitAngle += earthOrbitSpeed;
		marsOrbitAngle += marsOrbitSpeed;
		jupiterOrbitAngle += jupiterOrbitSpeed;
		saturnOrbitAngle += saturnOrbitSpeed;
		uranusOrbitAngle += uranusOrbitSpeed;
		neptuneOrbitAngle += neptuneOrbitSpeed;
		plutoOrbitAngle += plutoOrbitSpeed;
		
		radians = mercuryOrbitAngle * Math.PI / 180;
		mercuryAggregation.position.x = Math.cos(radians) * mercuryOrbitRadius;
		mercuryAggregation.position.z = Math.sin(radians) * mercuryOrbitRadius;
		
		radians = venusOrbitAngle * Math.PI / 180;
		venusAggregation.position.x = Math.cos(radians) * venusOrbitRadius;
		venusAggregation.position.z = Math.sin(radians) * venusOrbitRadius;
		
		radians = earthOrbitAngle * Math.PI / 180;
		earthAggregation.position.x = Math.cos(radians) * earthOrbitRadius;
		earthAggregation.position.z = Math.sin(radians) * earthOrbitRadius;
		
		radians = marsOrbitAngle * Math.PI / 180;
		marsAggregation.position.x = Math.cos(radians) * marsOrbitRadius;
		marsAggregation.position.z = Math.sin(radians) * marsOrbitRadius;
		
		radians = jupiterOrbitAngle * Math.PI / 180;
		jupiterAggregation.position.x = Math.cos(radians) * jupiterOrbitRadius;
		jupiterAggregation.position.z = Math.sin(radians) * jupiterOrbitRadius;
		
		radians = saturnOrbitAngle * Math.PI / 180;
		saturnAggregation.position.x = Math.cos(radians) * saturnOrbitRadius;
		saturnAggregation.position.z = Math.sin(radians) * saturnOrbitRadius;
		
		radians = uranusOrbitAngle * Math.PI / 180;
		uranusAggregation.position.x = Math.cos(radians) * uranusOrbitRadius;
		uranusAggregation.position.z = Math.sin(radians) * uranusOrbitRadius;
		
		radians = neptuneOrbitAngle * Math.PI / 180;
		neptuneAggregation.position.x = Math.cos(radians) * neptuneOrbitRadius;
		neptuneAggregation.position.z = Math.sin(radians) * neptuneOrbitRadius;
		
		radians = plutoOrbitAngle * Math.PI / 180;
		plutoAggregation.position.x = Math.cos(radians) * plutoOrbitRadius;
		plutoAggregation.position.z = Math.sin(radians) * plutoOrbitRadius;
	}
	
	function createUniverseMesh() {
		
		var universeMesh = new THREE.Mesh();
		universeMesh.geometry = new THREE.SphereGeometry(800, 64, 64);
		universeMesh.material = new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load(
				'../images/galaxy_starfield.png'
			),
			side: THREE.BackSide
		});
		
		return universeMesh;
	}
	
	function createSphereMesh(path, radius) {
		var sphereMesh = new THREE.Mesh();
		sphereMesh.geometry = new THREE.SphereGeometry(radius, 32, 32);
		sphereMesh.material = new THREE.MeshPhongMaterial({
			map: new THREE.TextureLoader().load(path)
		});
		
		return sphereMesh;
	}
	
	function createBumpSphereMesh(path, bumpPath, radius){
		var sphereMesh = new THREE.Mesh();
		sphereMesh.geometry = new THREE.SphereGeometry(radius, 32, 32);
		sphereMesh.material = new THREE.MeshPhongMaterial({
			map: new THREE.TextureLoader().load(path),
			bumpScale: 0.005,
			bumpMap: new THREE.TextureLoader().load(bumpPath)
		});
		
		return sphereMesh;
	}
	
	function createAggregation(sphereMesh) {
		var aggregation = new THREE.Object3D();
		aggregation.add(sphereMesh);
		aggregation.add(new THREE.AxisHelper(0.5));
		
		return aggregation;
	}
	
	function createOrbit(radius){
		var geometry = new THREE.CircleGeometry( radius, 128, 0, 2.1*Math.PI ) ;
		geometry.vertices.shift();
		var orbit = new THREE.Line(
			geometry,
			new THREE.LineBasicMaterial( { color: 0xddddff, linewidth: 0.2 } )
		);
		orbit.rotateX(0.5 * Math.PI);
		return orbit;
	}
	
	function updateCameraPosition(mode) {
		
		// From the top of the system
		if (mode === 1) {
			camera.position.set(0, 600, 0);
		}
		// From the horizontal position
		else if (mode === 2) {
			camera.position.set(0, 0, 600);
		}
		// From the up-forward position
		else {
			camera.position.set(0, 300, 600);
		}
		
		camera.lookAt(sunAggregation.position);
		
	}
	
	/*************************
	 * Zoom in camera
	 *************************/
	zoomCameraToTarget(earthAggregation, camera, 50, 3000);
	
	/**
	 * Usage:
	 * Add TWEEN.update() to animate() function
	 *
	 * @param target: the object to zoom to
	 * @param camera
	 * @param minDistance: minimum distance between target and camera before stop zooming in
	 * @param animationDuration: time in milli-seconds to zoom in to minDistance
	 */
	function zoomCameraToTarget(target, camera, minDistance, animationDuration) {
		var _cameraDirection;
		var _currentTween;
		var _endTween;
		var _zoomCameraTween;
		
		// initialization
		(function init() {
			_cameraDirection = new THREE.Vector3();
			_currentTween = {distance: camera.position.distanceTo(target.position)};
			_endTween = {distance: minDistance};
		})();
		
		// Declare a tween for animation
		_zoomCameraTween = new TWEEN.Tween(_currentTween)
			.to(_endTween, animationDuration)
			.start();
		
		// Define actions during each tween update
		_zoomCameraTween.onUpdate(function () {
			
			// Make the camera look at the earth
			camera.lookAt(target.position);
			
			// get the direction camera is looking at in the world coordinate system
			camera.getWorldDirection(_cameraDirection);
			
			// Set camera position
			camera.position.set(
				target.position.x - _cameraDirection.x * _currentTween.distance,
				target.position.y - _cameraDirection.y * _currentTween.distance,
				target.position.z - _cameraDirection.z * _currentTween.distance
			);
		});
		
	}
};
