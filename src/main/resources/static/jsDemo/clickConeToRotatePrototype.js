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
	var pinScene = init();
	
	var enableEarthRotation = true;
	
	this.animate = pinAnimate;
	
	function pinAnimate() {
		
		requestAnimationFrame(pinAnimate);
		
		if (enableEarthRotation) {
			rotateEarth();
		}
		
		rotateCone();
		pinRenderer.render(pinScene, camera);
		
	}
	
	function init() {
		var scene = new THREE.Scene();
		scene.add(light);
		scene.add(camera);
		scene.add(universeMesh);
		scene.add(initEarthAggregation());
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
		
		earthMesh.rotation.y += 0.003; //TODO: changeback to 0.003
		atmosphereMesh.rotation.y += 0.003;
	}
	
	/********************
	 * Custom code
	 ********************/
	var INIT_LATITUDE = 37.3382, INIT_LONGITUDE = -121.8863;
	var cone = initCone(INIT_LATITUDE, INIT_LONGITUDE);
	var flag = initFlag(cone);
	
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	
	addConeAndFlagToEarth();
	
	document.addEventListener('mousedown', onMouseDown);
	
	
	// Init cone to specified latitude and longitude
	function initCone(latitude, longitude) {
		var coneMesh = new THREE.Mesh(
			new THREE.ConeGeometry( 0.03, 0.1, 0.09, 12 ),
			new THREE.MeshBasicMaterial ({
				wireframe: true
			})
		);
		
		coneMesh.name = 'coneMesh';
		
		setObjectPosition(
			coneMesh,
			getConeInitPosition(latitude, longitude),
			new THREE.Vector3(0, 0, 0)
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
	
	function getConeInitPosition(latitude, longitude) {
		var phi = (90 - latitude) * (Math.PI / 180);
		var theta = (longitude + 180) * (Math.PI / 180);
		
		return new THREE.Vector3(
			- RADIUS * Math.sin(phi) * Math.cos(theta), // x
			RADIUS * Math.cos(phi), // y
			RADIUS * Math.sin(phi) * Math.sin(theta) // z
		);
	}
	
	function setObjectPosition(obj, position, offset) {
		obj.position.set(
			position.x + offset.x,
			position.y + offset.y,
			position.z + offset.z
		);
	}
	
	function rotateCone() {
		cone.rotateY(0.05);
	}
	
	// mouse down event handler
	function onMouseDown() {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
		
		if (isConeClicked()) {
			enableEarthRotation = !enableEarthRotation;
		}
	}
	
	function isConeClicked() {
		raycaster.setFromCamera(mouse, camera);
		var intersects = raycaster.intersectObjects(earthMesh.children, true);
		console.log(intersects);
		return intersects !== null && intersects.length > 0 && cone === intersects[0].object;
	}
	
};
