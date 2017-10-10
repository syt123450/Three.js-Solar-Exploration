/**
 * 10/9/2017
 * Bo
 *
 * This creates a demo that when user clicks on the earth,
 * it stops rotating.
 *
 * @param renderer Default renderer
 * @constructor
 */

MouseClickController = function (renderer) {
	
	var universeUtils = new UniverseUtils();
	var light = new THREE.AmbientLight(0xffffff);
	var camera = universeUtils.createDefaultCamera();
	
	var universeMesh = universeUtils.createDefaultUniverse();
	universeMesh.name = 'universe mesh'
	var earthMesh = universeUtils.createDefaultEarthMesh();
	earthMesh.name = 'earth mesh'
	var atmosphereMesh = universeUtils.createDefaultAtmosphere();
	atmosphereMesh.name = 'atmosphere mesh';
	
	var earthRenderer = renderer;
	var earthScene = init();
	
	this.animate = earthAnimate;
	
	function earthAnimate() {
		
		requestAnimationFrame(earthAnimate);
		
		if (isRotating) {
			rotateEarth();
		}
		
		earthRenderer.render(earthScene, camera);
		
	}
	
	//The init function is used to put object into the scene
	function init() {
		
		var scene = new THREE.Scene();
		scene.add(light);
		scene.add(camera);
		scene.add(universeMesh);
		scene.add(initEarthAggregation());
		
		// register mouse click event listener
		addEventListener();
		
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
		
		earthMesh.rotation.y += 0.001;
		atmosphereMesh.rotation.y += 0.001;
	}
	
	/********************************
	 *
	 ********************************/
	var mouse = new THREE.Vector2();
	var raycaster = new THREE.Raycaster();
	var isRotating = true;
	
	// register mouse down event
	function addEventListener() {
		document.addEventListener('mousedown', onMouseDown, false);
	}
	
	// mouse down event handler
	function onMouseDown() {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
		
		if (isEarthClicked()) {
			isRotating = !isRotating;
		}
	}
	
	function isEarthClicked() {
		// Cast ray
		raycaster.setFromCamera(mouse, camera);
		
		// Get intersections
		var intersects = raycaster.intersectObjects(earthScene.children, true);
		
		// Check if atmosphere is clicked
		if (intersects !== null && intersects.length > 0 && atmosphereMesh === intersects[0].object) {
			return true;
		} else {
			return false;
		}
	}
};

