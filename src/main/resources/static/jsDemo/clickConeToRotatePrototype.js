/**
 * 10/17/2017
 * Bo
 * @param renderer
 * @constructor
 */
PinController = function (renderer) {
	// Create earth scene
	var RADIUS = 0.55;
	var universeUtils = new UniverseUtils();
	var light = new THREE.AmbientLight(0xffffff);
	var camera = universeUtils.createDefaultCamera();
	var universeMesh = universeUtils.createDefaultUniverse();
	var earthMesh = universeUtils.createDefaultEarthMesh();
	var atmosphereMesh = universeUtils.createDefaultAtmosphere();
	var pinRenderer = renderer;
	
	
	/**
	 * dirty code
	 */
	var X_AXIS = new THREE.Vector3(1, 0, 0);
	var Y_AXIS = new THREE.Vector3(0, 1, 0);
	var Z_AXIS = new THREE.Vector3(0, 0, 1);
	
	var earthIntegration = initEarthAggregation();
	
	var pinScene = init();
	
	var count = 0;
	var enableEarthRotation = true;
	
	var earthYRotationHistory = 0;
	
	var SPEED = 0.01;
	
	/**
	 * dirty code
	 */
	
	this.animate = pinAnimate;
	
	function pinAnimate() {
		
		requestAnimationFrame(pinAnimate);
		
		if (enableEarthRotation) {
			rotateEarth();
		}
		
		rotateCone();
		pinRenderer.render(pinScene, camera);
		
		if (count++ % 60 === 0) {
			console.log(earthMesh.rotation.y / Math.PI * 180);
		}
	}
	
	function init() {
		var scene = new THREE.Scene();
		scene.add(light);
		scene.add(camera);
		scene.add(universeMesh);
		scene.add(earthIntegration);
		return scene;
	}
	
	function initEarthAggregation() {
		
		var aggregation = new THREE.Object3D();
		aggregation.add(earthMesh);
		aggregation.add(atmosphereMesh);
		aggregation.rotateZ(-Math.PI * 23.5 / 180);
		
		return aggregation;
	}
	
	function rotateEarth() {
		// // earthYRotationHistory += 0.003;
		// earthMesh.rotateOnAxis(Y_AXIS, 0.003); //TODO: changeback to 0.003
		// atmosphereMesh.rotateOnAxis(Y_AXIS, 0.003);
		//
		earthMesh.rotation.y += SPEED;
		atmosphereMesh.rotation.y += SPEED;
		
		// if (earthMesh.rotation.y >= 2 * Math.PI) {
		// 	earthMesh.rotation.y -= 2 * Math.PI;
		// 	atmosphereMesh.rotation.y -= 2 * Math.PI;
		// }
		// yRotation += 0.003;
		// earthIntegration.rotateOnAxis(Y_AXIS, yRotation);
	}
	
	/********************
	 * Custom code
	 ********************/
	var raycaster = new THREE.Raycaster();
	
	var mouse = new THREE.Vector2();
	
	var INIT_LATITUDE = 20, INIT_LONGITUDE = -80;
	
	var INIT_LOOK_AT_DIRECTION = camera.getWorldDirection();
	
	var CAMERA_INIT_POSITION = new THREE.Vector3(0, 0, 2);
	
	
	
	
	
	
	var cone = initCone(INIT_LATITUDE, INIT_LONGITUDE);
	
	// var flag = initFlag(cone);
	
	addAxisHelperToEarth();
	
	addConeAndFlagToEarth();
	
	registerMouseDownListener(onMouseDown('ROTATE_EARTH'));
	
	/*******************************
	 * Private functions
	 ******************************/
	function addAxisHelperToEarth() {
		setObjectPosition(camera, CAMERA_INIT_POSITION);
		var sphereAxis = new THREE.AxisHelper(0.8);
		earthMesh.add(sphereAxis);
	}
	
	// Init cone to specified latitude and longitude
	function initCone(latitude, longitude) {
		var coneMesh = new THREE.Mesh(
			new THREE.ConeGeometry( 0.05, 0.2, 12 ),
			new THREE.MeshBasicMaterial ()
		);
		coneMesh.name = 'coneMesh';
		console.log('cone init position: ', getCartesianCoordinates(latitude, longitude));
		setObjectPosition(
			coneMesh,
			getCartesianCoordinates(latitude, longitude)
		);
		
		coneMesh.lookAt(earthMesh.position);
		coneMesh.rotateX(Math.PI / 2);
		return coneMesh;
	}
	
	// Initialize flag according to cone's position
	function initFlag(cone) {
		
		var flagMesh = new THREE.Mesh(
			new THREE.BoxGeometry( 0.12, 0.052, 0.012 ),
			new THREE.MeshBasicMaterial({
					map: new THREE.TextureLoader().load(
						'../images/californiaFlag.png'
					),
					side: THREE.BackSide
				}
			)
		);

		flagMesh.name = 'flagMesh';
		
		setObjectPosition(
			flagMesh,
			cone.position,
			new THREE.Vector3(0.02, 0.04, 0.14)
		);
		
		return flagMesh;
	}
	
	// Add cone and flag to earth
	function addConeAndFlagToEarth() {
		earthMesh.add(cone);
		// earthMesh.add(flag);
	}
	
	function getCartesianCoordinates(latitude, longitude) {
		var phi = (90 - latitude) * (Math.PI / 180);
		var theta = (longitude + 180) * (Math.PI / 180);
		
		return new THREE.Vector3(
			- RADIUS * Math.sin(phi) * Math.cos(theta),
			RADIUS * Math.cos(phi),
			RADIUS * Math.sin(phi) * Math.sin(theta)
		);
	}
	
	function setObjectPosition(obj, position, offset) {
		offset = offset || new THREE.Vector3(0, 0, 0);
		obj.position.set(
			position.x + offset.x,
			position.y + offset.y,
			position.z + offset.z
		);
	}
	
	function rotateCone() {
		// cone.rotateY(0.05);
	}
	
	// mouse down event handler
	function onMouseDown(strategy) {
		return function () {
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
			
			if (isConeClicked()) {
				
				switch (strategy) {
					case 'ROTATE_CAMERA':
						_rotationStrategyOne();
						break;
					case 'ROTATE_EARTH':
						_rotationStrategyTwo();
						break;
					default:
						_rotationStrategyTwo();
						break;
				}
				
				enableEarthRotation = !enableEarthRotation;
			}
		}
	}
	
	// TODO: Sometime click will miss
	function isConeClicked() {
		raycaster.setFromCamera(mouse, camera);
		var intersects = raycaster.intersectObjects(earthMesh.children, true);
		console.log(intersects);
		//
		if (intersects === null || intersects.length === 0) {
			return false;
		}
		
		for (var i = 0; i < intersects.length; i++) {
			if (cone === intersects[i].object) {
				return true;
			}
		}
		return false;
	}
	
	function registerMouseDownListener(callback) {
		document.addEventListener('mousedown', callback);
	}
	
	/**
	 * Rotation strategy one:
	 * rotate the camera
	 */
	function _rotationStrategyOne() {
		if (!enableEarthRotation) {
			// if is rotating, set camera back to initial position
			// and direction
			setObjectPosition(camera, CAMERA_INIT_POSITION);
			camera.lookAt(INIT_LOOK_AT_DIRECTION);
			
		} else {
			// if cone is clicked, earth stops
			// and ....
			var vector = new THREE.Vector3();
			vector.setFromMatrixPosition(cone.matrixWorld);
			camera.position.set(
				vector.x * 2,
				vector.y * 2,
				vector.z * 2
			);
			camera.lookAt(earthMesh.position);
		}
	}
	
	/**
	 * Rotation strategy two:
	 * rotate the earth
	 * center the cone in the screen
	 */
	function _rotationStrategyTwo() {
		if (!enableEarthRotation) {
			console.log('resume rotation');
			// if is rotating, set camera back to initial position
			// and direction
			// setObjectPosition(camera, CAMERA_INIT_POSITION);
			// camera.lookAt(INIT_LOOK_AT_DIRECTION);
			var origin = getCartesianCoordinates(INIT_LATITUDE, INIT_LONGITUDE);
			
			var rotationAixs = (new THREE.Vector3())
				.crossVectors(Y_AXIS, origin)
				.normalize();
			
			earthMesh.rotateOnAxis(rotationAixs, -INIT_LATITUDE / 180 * Math.PI);
			
			var temp = earthYRotationHistory + (90 + INIT_LONGITUDE) / 180 * Math.PI;
			
			// if (temp - earthMesh.rotation.y >= Math.PI) {
			// 	earthMesh.rotateOnAxis(Y_AXIS, Math.PI + earthMesh.rotation.y - 0.001);
			// 	earthMesh.rotateOnAxis(Y_AXIS, temp - earthMesh.rotation.y - Math.PI);
			// } else {
			// 	earthMesh.rotateOnAxis(Y_AXIS, temp);
			// }
			console.log('resume, temp: ', (temp - earthMesh.rotation.y) / Math.PI * 180);
			earthMesh.rotation.y += temp;
			earthIntegration.rotateOnAxis(Z_AXIS, -Math.PI * 23.5 / 180);
			
		} else {
			earthYRotationHistory = earthMesh.rotation.y;
			
			console.log('click history', earthYRotationHistory / Math.PI * 180);
			
			var origin = getCartesianCoordinates(INIT_LATITUDE, INIT_LONGITUDE);
			
			earthIntegration.rotateOnAxis(Z_AXIS, Math.PI * 23.5 / 180);
			
			var temp = -earthMesh.rotation.y - (90 + INIT_LONGITUDE) / 180 * Math.PI;
			
			earthMesh.rotateOnAxis(Y_AXIS, temp);

			var rotationAixs = (new THREE.Vector3())
				.crossVectors(Y_AXIS, origin)
				.normalize();

			earthMesh.rotateOnAxis(rotationAixs, INIT_LATITUDE / 180 * Math.PI);
			
		}
	}
};
