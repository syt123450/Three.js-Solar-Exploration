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
	var earthIntegration = initEarthAggregation();
	
	var pinScene = init();
	
	var count = 0;
	var enableEarthRotation = true;
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
			var vector = new THREE.Vector3();
			vector.setFromMatrixPosition( cone.matrixWorld );
			console.log('cone cur pos', vector);
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
		// aggregation.rotateZ(-Math.PI * 23.5 / 180);
		
		return aggregation;
	}
	
	function rotateEarth() {
		
		earthMesh.rotation.y += 0.003; //TODO: changeback to 0.003
		atmosphereMesh.rotation.y += 0.003;
	}
	
	/********************
	 * Custom code
	 ********************/
	var raycaster = new THREE.Raycaster();
	
	var mouse = new THREE.Vector2();
	
	var INIT_LATITUDE = 0, INIT_LONGITUDE = -90;
	
	var INIT_LOOK_AT_DIRECTION = camera.getWorldDirection();
	
	var CAMERA_INIT_POSITION = new THREE.Vector3(0, 0, 2);
	// var cameraLatestPosition = CAMERA_INIT_POSITION;
	
	var cone = initCone(INIT_LATITUDE, INIT_LONGITUDE);
	
	var flag = initFlag(cone);
	
	addAxisHelperToEarth();
	
	addConeAndFlagToEarth();
	
	registerMouseDownListener(onMouseDown);
	
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
		
		console.log('cone init pos', getCartesianCoordinates(latitude, longitude));
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
		earthMesh.add(flag);
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
	function onMouseDown() {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
		
		if (isConeClicked()) {
			
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
			
			// Change rotation status
			enableEarthRotation = !enableEarthRotation;
		}
	}
	
	// TODO: Sometime click will miss
	function isConeClicked() {
		raycaster.setFromCamera(mouse, camera);
		var intersects = raycaster.intersectObjects(earthMesh.children, true);
		console.log(intersects);
		
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
};
