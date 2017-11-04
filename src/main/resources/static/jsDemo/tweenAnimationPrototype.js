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
		yHistory = earthMesh.rotation.y;
		
		TWEEN.removeAll(); // In case cone is clicked before last animation completes
		
		// Rotate around Z-axis of the earthAggregation
		var tweenRotateZ = getOnConeClickRotateZaxisTween();

		//  Rotate around Y-axis of earthMesh
		var tweenRotateY = getConeClickRotateYaxisTween(coneInitialLongitude);
		console.log(new TWEEN.Tween());
		// var yAxisStart = {y: earthMesh.rotation.y};
		// // tweenRotateY._valuesEnd = tweenRotateY._object.concat(tweenRotateY._valuesEnd);
		// tweenRotateY._valuesStart = yAxisStart;
		
		// Rotate around Y-axis of earthMesh
		var tweenTranslation = getConeClickTranslationTween();
		
		tweenRotateZ.chain(
			tweenRotateY.chain(
				tweenTranslation
			)
		);
		tweenRotateZ.start();
		tweenRotateY.start();
		tweenTranslation.start();
		
		isConeClicked = true;
		return yHistory;
	}
	
	/**
	 * @param yRotationHistoryInRadian: How much the Earth have rotated when the cone is clicked
	 */
	function resumeFromOnConeClicked(yRotationHistoryInRadian) {
		
		TWEEN.removeAll(); // In case cone is clicked before last animation completes
		
		var tweenRotateY = getResumeFromConeClickYaxisTween();
		var yRotationAdjustmentInDegree = 0;
		var finalYAxisRotation = yRotationHistoryInRadian + (yRotationAdjustmentInDegree / 180 * Math.PI);
		var yAxisFinal = {y: finalYAxisRotation};
		tweenRotateY.to(yAxisFinal, 3000);
		
		var tweenRotateZ = getResumeFromConeClickZaxisTween();
		
		var tweenTranslation = getResumeFromConeClickTranslationTween();
		
		tweenRotateY.chain(
			tweenRotateZ.chain(
				tweenTranslation
			)
		);
		tweenRotateY.start();
		tweenRotateZ.start();
		tweenTranslation.start();
		
		isConeClicked = false;
	}
	
	function getOnConeClickRotateZaxisTween() {
		var OBLIQUITY = 23.5;
		var initialZAxisRotation = - OBLIQUITY / 180 * Math.PI;
		var finalZAxisRotation = 0;
		var zAxisStart = {z: initialZAxisRotation};
		var zAxisFinal = {z: finalZAxisRotation};
		var tween = getTween(zAxisStart, zAxisFinal, function() {
			earthMesh.parent.rotation.z = zAxisStart.z;
		});
		tween.onStart(function() {
			// GLOBAL VARIABLE
			enableEarthRotation = false;
		});
		return tween;
	}
	
	function getConeClickRotateYaxisTween(coneInitialLongitude) {
<<<<<<< HEAD
		var yRotationAdjustmentInDegree = 0;
		var initialYAxisRotation = 0;
=======
		var yRotationAdjustmentInDegree = yRotationAdjustmentInDegree || 0;
		var initialYAxisRotation = yHistory;
>>>>>>> 395f884954153f5886d8192ad6afa98e8dd55168
		var finalYAxisRotation = - (90 + coneInitialLongitude + yRotationAdjustmentInDegree) / 180 * Math.PI;
		while (initialYAxisRotation - finalYAxisRotation >= Math.PI * 2) {
			finalYAxisRotation += Math.PI * 2;
		}
		var yAxisStart = {y: initialYAxisRotation};
		var yAxisFinal = {y: finalYAxisRotation};
		var tween = getTween(yAxisStart, yAxisFinal, function() {
			earthMesh.rotation.y = yAxisStart.y;
			atmosphereMesh.rotation.y = yAxisStart.y;
		});
		return tween;
	}
	
	function getConeClickTranslationTween() {
		var slideLeftDistance = 0.8;
		slideLeftDistance = slideLeftDistance || 0.8;
		var initialTranslation = 0;
		var finalTranslation = - slideLeftDistance;
		var translationStart = {t: initialTranslation};
		var translationFinal = {t: finalTranslation};
		var tween = getTween(translationStart, translationFinal, function() {
			earthMesh.parent.position.x = translationStart.t;
		});
		return tween;
	}
	
	function getResumeFromConeClickYaxisTween() {
		var initialYAxisRotation = earthMesh.rotation.y;
		var yAxisStart = {y: initialYAxisRotation};
		var tweenRotateY = getTween(yAxisStart, null, function() {
			earthMesh.rotation.y = yAxisStart.y;
			atmosphereMesh.rotation.y = yAxisStart.y;
		});
		return tweenRotateY;
	}
	
	function getResumeFromConeClickZaxisTween() {
		var OBLIUITY = 23.5;
		var initialZAxisRotation = 0;
		var finalZAxisRotation = - OBLIUITY / 180 * Math.PI;
		var zAxisStart = {z: initialZAxisRotation};
		var zAxisFinal = {z: finalZAxisRotation};
		var tweenRotateZ = getTween(zAxisStart, zAxisFinal, function () {
			earthMesh.parent.rotation.z = zAxisStart.z;
		});
		return tweenRotateZ;
	}
	
	function getResumeFromConeClickTranslationTween() {
		var initialTranslation = earthAggregation.position.x;
		var finalTranslation = 0;
		var translationStart = {t: initialTranslation};
		var translationFinal = {t: finalTranslation};
		var tweenTranslation = getTween(translationStart, translationFinal, function() {
			earthMesh.parent.position.x = translationStart.t;
		});
		tweenTranslation.onComplete(function() {
			// GLOBAL VARIABLE
			enableEarthRotation = true;
		});
		return tweenTranslation;
	}
	
	function getTween(from, to, onUpdate) {
		const ANIMATION_DURATION = 3000;
		const tween = new TWEEN.Tween(from);
		if (to) {
			tween.to(to, ANIMATION_DURATION);
		}
		tween.onUpdate(onUpdate);
		return tween;
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