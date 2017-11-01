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
		
		// if (count++ % 60 === 0) {
		// 	console.log('earth.z: ', earthAggregation.rotation.z / Math.PI * 180);
		// }
		
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

	/*******************************
	 * Method declarations
	 ******************************/
	var isConeClicked;
	var yRotationHistory;
	
	/**
	 * @param coneInitialLatitude: in degree
	 * @param coneInitialLongitude: in degree
	 * @returns {number} In radius. How much the earth have rotated around Y axis when cone is clicked
	 */
	function onConeClicked(coneInitialLatitude, coneInitialLongitude) {
		console.log('cone clicked');
		/************************
		 * CONSTANTS
		 ************************/
		var ANIMATION_DURATION = 3000;
		var OBLIUITY = 23.5;
	
		var slideLeftDistance = 0.8;
		var yRotationAdjustmentInDegree = 0;
		slideLeftDistance = slideLeftDistance || 0.8;
		yRotationAdjustmentInDegree = yRotationAdjustmentInDegree || 0;
		_yAxisRotationHistory = earthMesh.rotation.y;
		
		TWEEN.removeAll(); // In case cone is clicked before last animation completes
		
		/***********************************************
		 * Rotate around Z-axis of the earthAggregation
		 **********************************************/
		var _initialZAxisRotation = - OBLIUITY / 180 * Math.PI;
		var _finalZAxisRotation = 0;
		var _zAxisStart = {z: _initialZAxisRotation};
		var _zAxisFinal = {z: _finalZAxisRotation};
		var _tweenRotateZ = new TWEEN.Tween(_zAxisStart)
			.to(_zAxisFinal, ANIMATION_DURATION)
			.onStart(function () {
				// set global variable
				// Earth will stop rotating
				enableEarthRotation = false;
			})
			.start();
		_tweenRotateZ.onUpdate(function () {
			earthMesh.parent.rotation.z = _zAxisStart.z;
		});
		
		/***********************************************
		 * Rotate around Y-axis of earthMesh
		 **********************************************/
		var _initialYAxisRotation = _yAxisRotationHistory;
		var _finalYAxisRotation = - (90 + coneInitialLongitude + yRotationAdjustmentInDegree) / 180 * Math.PI;
		while (_initialYAxisRotation - _finalYAxisRotation >= Math.PI * 2) {
			_finalYAxisRotation += Math.PI * 2;
		}
		var _yAxisStart = {y: _initialYAxisRotation};
		var _yAxisFinal = {y: _finalYAxisRotation};
		var _tweenRotateY = new TWEEN.Tween(_yAxisStart)
			.to(_yAxisFinal, ANIMATION_DURATION)
			.start();
		_tweenRotateY.onUpdate(function() {
			earthMesh.rotation.y = _yAxisStart.y;
			atmosphereMesh.rotation.y = _yAxisStart.y;
		});
		
		/***********************************************
		 * Rotate around Y-axis of earthMesh
		 **********************************************/
		var _initialTranslation = 0;
		var _finalTranslation = - slideLeftDistance;
		var _translationStart = {t: _initialTranslation};
		var _translationFinal = {t: _finalTranslation};
		var tweenTranslation = new TWEEN.Tween(_translationStart)
			.to(_translationFinal, ANIMATION_DURATION)
			.start();
		tweenTranslation
			.onUpdate(function() {
				earthMesh.parent.position.x = _translationStart.t;
			});
		
		_tweenRotateZ.chain(
			_tweenRotateY.chain(
				tweenTranslation
			)
		);
		
		isConeClicked = true;
		return _yAxisRotationHistory;
	}
	
	/**
	 * @param yRotationHistoryInRadian: How much the Earth have rotated when the cone is clicked
	 */
	function resumeFromOnConeClicked(yRotationHistoryInRadian) {
		
		/************************
		 * CONSTANTS
		 ************************/
		var ANIMATION_DURATION = 3000;
		var OBLIUITY = 23.5;
		
		var yRotationAdjustmentInDegree = 0;
		TWEEN.removeAll(); // In case cone is clicked before last animation completes
		
		
		/***********************************************
		 * Rotate around Y-axis of earthMesh
		 **********************************************/
		var _initialYAxisRotation = earthMesh.rotation.y;
		var _finalYAxisRotation = yRotationHistoryInRadian + (yRotationAdjustmentInDegree / 180 * Math.PI);
		var _yAxisStart = {y: _initialYAxisRotation};
		var _yAxisFinal = {y: _finalYAxisRotation};
		var _tweenRotateY = new TWEEN.Tween(_yAxisStart)
			.to(_yAxisFinal, ANIMATION_DURATION)
			.start();
		_tweenRotateY.onUpdate(function() {
			earthMesh.rotation.y = _yAxisStart.y;
			atmosphereMesh.rotation.y = _yAxisStart.y;
		});
		
		/***********************************************
		 * Rotate around Z-axis of the earthAggregation
		 **********************************************/
		var _initialZAxisRotation = 0;
		var _finalZAxisRotation = - OBLIUITY / 180 * Math.PI;
		var _zAxisStart = {z: _initialZAxisRotation};
		var _zAxisFinal = {z: _finalZAxisRotation};
		var _tweenRotateZ = new TWEEN.Tween(_zAxisStart)
			.to(_zAxisFinal, ANIMATION_DURATION)
			.start();
		_tweenRotateZ.onUpdate(function () {
			earthMesh.parent.rotation.z = _zAxisStart.z;
		});
		
		/***********************************************
		 * Rotate around Y-axis of earthMesh
		 **********************************************/
		var _initialTranslation = earthAggregation.position.x;
		var _finalTranslation = 0;
		var _translationStart = {t: _initialTranslation};
		var _translationFinal = {t: _finalTranslation};
		var _tweenTranslation = new TWEEN.Tween(_translationStart)
			.to(_translationFinal, ANIMATION_DURATION)
			.start();
		_tweenTranslation.onUpdate(function() {
			earthMesh.parent.position.x = _translationStart.t;
		});
		_tweenTranslation.onComplete(function() {
			// Set the global variable "enableEarthRotation"
			// Earth will resume rotation
			enableEarthRotation = true;
		});
		
		_tweenRotateY.chain(
			_tweenRotateZ.chain(
				_tweenTranslation
			)
		);
		
		isConeClicked = false;
	}
	
	// Init cone to specified latitude and longitude
	function _initCone(latitude, longitude) {
		var coneMesh = new THREE.Mesh(
			new THREE.ConeGeometry( 0.05, 0.2, 12 ),
			new THREE.MeshBasicMaterial ()
		);
		coneMesh.name = 'coneMesh';
		_setObjectPosition(
			coneMesh,
			_getCartesianCoordinates(latitude, longitude)
		);
		
		coneMesh.lookAt(earthMesh.position);
		coneMesh.rotateX(Math.PI / 2);
		cone = coneMesh;
	}
	
	function _initRaycaster() {
		raycaster = SolarEPUtils.raycaster;
		mouse = SolarEPUtils.mouse;
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
						break;
					case 'ROTATE_EARTH':
						if (!isConeClicked) {
							yRotationHistory = onConeClicked(CONE_INIT_LATITUDE, CONE_INIT_LONGITUDE)
						} else {
							resumeFromOnConeClicked(yRotationHistory)
						}
						break;
					default:
						break;
				}
				
				// enableEarthRotation = !enableEarthRotation;
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
	
};