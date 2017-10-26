/**
 * 10/17/2017
 * Bo
 * @param renderer
 * @constructor
 */
TweenAnimationController = function (renderer) {
	
	/** CONSTANTS **/
	var RADIUS = 0.55;
	var OBLIUITY = 23.5; // degrees
	var X_AXIS = new THREE.Vector3(1, 0, 0),
		Y_AXIS = new THREE.Vector3(0, 1, 0),
		Z_AXIS = new THREE.Vector3(0, 0, 1);
	var EARTH_ROTATION_SPEED = 0.01;
	var CONE_INIT_LATITUDE = 20,
		CONE_INIT_LONGITUDE = -80;
	var CAMERA_INIT_POSITION = new THREE.Vector3(0, 0, 2);
	/** CONSTANTS **/
	
	/** Create earth scene **/
	var universeUtils = new UniverseUtils();
	var light = new THREE.AmbientLight(0xffffff);
	var camera = universeUtils.createDefaultCamera();
	var INIT_LOOK_AT_DIRECTION = camera.getWorldDirection();
	var universeMesh = universeUtils.createDefaultUniverse();
	var earthMesh = universeUtils.createDefaultEarthMesh();
	var atmosphereMesh = universeUtils.createDefaultAtmosphere();
	var pinRenderer = renderer;
	var earthAggregation = initEarthAggregation();
	var pinScene = init();
	/** Create earth scene **/
	
	/**
	 * dirty code
	 */
	
	var count = 0;
	var enableEarthRotation = true;
	var earthYRotationHistory = 0;
	
	/**
	 * dirty code
	 */
	
	this.animate = pinAnimate;
	
	function init() {
		var scene = new THREE.Scene();
		scene.add(light);
		scene.add(camera);
		scene.add(universeMesh);
		scene.add(earthAggregation);
		return scene;
	}
	
	function initEarthAggregation() {
		var aggregation = new THREE.Object3D();
		aggregation.add(earthMesh);
		aggregation.add(atmosphereMesh);
		aggregation.rotateZ(-Math.PI * OBLIUITY / 180);
		
		return aggregation;
	}
	
	function pinAnimate() {
		
		requestAnimationFrame(pinAnimate);
		
		if (enableEarthRotation) {
			rotateEarth();
		}
		
		_rotateCone();
		
		pinRenderer.render(pinScene, camera);
		
		if (count++ % 60 === 0) {
			console.log('earth.z: ', earthAggregation.rotation.z / Math.PI * 180);
		}
		
		TWEEN.update();
	}
	
	function rotateEarth() {
		earthMesh.rotation.y += EARTH_ROTATION_SPEED;
		atmosphereMesh.rotation.y += EARTH_ROTATION_SPEED;
	}
	
	/****************************
	 * **************************
	 * Custom code
	 * **************************
	 ***************************/
	var raycaster, mouse;
	
	var cone;
	
	_initCone(CONE_INIT_LATITUDE, CONE_INIT_LONGITUDE);
	
	_initRaycaster();
	
	_addAxisHelperTo(earthMesh);
	
	_addConeAndFlagTo(earthMesh);
	
	_registerMouseDownListener(_onMouseDown('ROTATE_EARTH'));
	
	_initTweenAnimation();
	/*******************************
	 * Method declarations
	 ******************************/
	
	// Init cone to specified latitude and longitude
	function _initCone(latitude, longitude) {
		var coneMesh = new THREE.Mesh(
			new THREE.ConeGeometry( 0.05, 0.2, 12 ),
			new THREE.MeshBasicMaterial ()
		);
		coneMesh.name = 'coneMesh';
		console.log('cone init position: ', _getCartesianCoordinates(latitude, longitude));
		_setObjectPosition(
			coneMesh,
			_getCartesianCoordinates(latitude, longitude)
		);
		
		coneMesh.lookAt(earthMesh.position);
		coneMesh.rotateX(Math.PI / 2);
		cone = coneMesh;
	}
	
	function _initRaycaster() {
		raycaster = new THREE.Raycaster();
		mouse = new THREE.Vector2();
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
		
		_setObjectPosition(
			flagMesh,
			cone.position,
			new THREE.Vector3(0.02, 0.04, 0.14)
		);
		
		return flagMesh;
	}
	
	// Add cone and flag to earth
	function _addConeAndFlagTo(target) {
		target.add(cone);
		// earthMesh.add(flag);
	}
	
	function _addAxisHelperTo(target) {
		_setObjectPosition(camera, CAMERA_INIT_POSITION);
		var sphereAxis = new THREE.AxisHelper(0.8);
		target.add(sphereAxis);
	}
	
	function _getCartesianCoordinates(latitude, longitude) {
		var phi = (90 - latitude) * (Math.PI / 180);
		var theta = (longitude + 180) * (Math.PI / 180);
		
		return new THREE.Vector3(
			- RADIUS * Math.sin(phi) * Math.cos(theta),
			RADIUS * Math.cos(phi),
			RADIUS * Math.sin(phi) * Math.sin(theta)
		);
	}
	
	function _setObjectPosition(obj, position, offset) {
		offset = offset || new THREE.Vector3(0, 0, 0);
		obj.position.set(
			position.x + offset.x,
			position.y + offset.y,
			position.z + offset.z
		);
	}
	
	function _rotateCone() {
		// cone.rotateY(0.05);
	}
	
	// mouse down event handler
	function _onMouseDown(strategy) {
		
		return function () {
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
			
			if (_isTargetClicked(cone)) {
				
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
	
	function _isTargetClicked(target) {
		
		raycaster.setFromCamera(mouse, camera);
		
		var intersects = raycaster.intersectObjects(earthMesh.children, true);
		
		console.log(intersects);
		
		if (intersects === null || intersects.length === 0) {
			return false;
		}
		
		for (var i = 0; i < intersects.length; i++) {
			if (target === intersects[i].object) {
				return true;
			}
		}
		return false;
	}
	
	function _registerMouseDownListener(callback) {
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
			_setObjectPosition(camera, CAMERA_INIT_POSITION);
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
		
		var initXyz = _getCartesianCoordinates(CONE_INIT_LATITUDE, CONE_INIT_LONGITUDE);
		
		var rotationAxis = (new THREE.Vector3())
			.crossVectors(Y_AXIS, initXyz)
			.normalize();
		
		if (enableEarthRotation) { // bring cone to the front
			
			earthYRotationHistory = earthMesh.rotation.y;
			
			// console.log('click history', earthYRotationHistory / Math.PI * 180);
			
			var initARotation = 0;
			var initYRotation = earthMesh.rotation.y;
			var initZRotation = earthAggregation.rotation.z;
			console.log('initial earth.y: ', initYRotation);
			
			var finalARotation = CONE_INIT_LATITUDE / 180 * Math.PI;
			var finalYRotation = - (90 + CONE_INIT_LONGITUDE) / 180 * Math.PI;
			var finalZRotation = 0;
			
			var animationDuration = 2000; // mili-seconds
			
			var zRotation = {z: initZRotation};
			var zTarget = {z: finalZRotation};
			var tweenRotateZ = new TWEEN.Tween(zRotation)
				.to(zTarget, animationDuration)
				.start();
			tweenRotateZ.onUpdate(function () {
				// console.log('on update z rotation: ', rotation);
				earthAggregation.rotation.z = zRotation.z;
			});

			var yRotation = {y: initYRotation};
			var yTarget = {y: finalYRotation};
			var tweenRotateY = new TWEEN.Tween(yRotation)
				.to(yTarget, animationDuration)
				.start();
			tweenRotateY.onUpdate(function() {
				earthMesh.rotation.y = yRotation.y;
			});
			
			var aRotation = {a: initARotation};
			var aTarget = {a: finalARotation};
			var tweenRotateAxis = new TWEEN.Tween(aRotation)
				.to(aTarget, animationDuration)
				.start();
			tweenRotateAxis.onUpdate(function() {
				earthAggregation.rotation.x = aRotation.a;
			});
			
			tweenRotateZ.chain(tweenRotateY.chain(tweenRotateAxis));
			
		} else { // resume cone location
			
			earthMesh.rotateOnAxis(
				rotationAxis,
				- CONE_INIT_LATITUDE / 180 * Math.PI
			);
			
			var rotationOnY = earthYRotationHistory + (90 + CONE_INIT_LONGITUDE) / 180 * Math.PI;
			
			// TODO: convert to rotateOnAxis()
			
			earthMesh.rotation.y += rotationOnY;
			
			earthAggregation.rotateOnAxis(
				Z_AXIS,
				-Math.PI * OBLIUITY / 180);
		}
	}
	
	function _initTweenAnimation() {
	
	}
};