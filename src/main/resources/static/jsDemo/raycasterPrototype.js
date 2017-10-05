/**
 * Updated on 10/4/2017
 * Bo
 */

RaycasterController = function (renderer) {
  
	var universeUtils = new UniverseUtils();
	var light = new THREE.AmbientLight(0xffffff);
	var camera = universeUtils.createDefaultCamera();
	var universeMesh = universeUtils.createDefaultUniverse();
	universeMesh.name = 'universe mesh'
	var earthMesh = universeUtils.createDefaultEarthMesh();
	earthMesh.name = 'earth mesh'
	var atmosphereMesh = universeUtils.createDefaultAtmosphere();
	atmosphereMesh.name = 'atmosphere mesh';
	
	/**
	 * Added
	 */
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	var earthAggregation = initEarthAggregation();
	
	var earthRenderer = renderer;
	var earthScene = init();
	
	this.animate = earthAnimate;
  
	function earthAnimate(timestamp) {
		requestAnimationFrame(earthAnimate);
		applyRaycaster();
		earthRenderer.render(earthScene, camera);
	}
  
	function init() {
	
		var scene = new THREE.Scene();
		scene.add(light);
		scene.add(camera);
		scene.add(universeMesh);
		scene.add(earthAggregation);
		
		addMouseListener();
		
		return scene;
	}
  
	function initEarthAggregation() {
		
		var aggregation = new THREE.Object3D();
		aggregation.name = 'earth aggregation';
		aggregation.add(earthMesh);
		aggregation.add(atmosphereMesh);
		aggregation.rotateZ(-Math.PI * 23.5 / 180);
		
		return aggregation;
	}
  
	/**
	 * Added functions
	 * */
	function rotateEarth() {
		earthAggregation.rotation.y += 0.001;
	}
	
	function applyRaycaster() {
		// Set the origin and direction of raycaster
		raycaster.setFromCamera(mouse, camera);
		
		// Get all the intersecting objects
		var intersects = raycaster.intersectObjects(earthScene.children, true);
		
		if (intersects === null || intersects.length === 0 || atmosphereMesh !== intersects[0].object) {
			rotateEarth();
		}
	}
  
    function addMouseListener() {
	    document.addEventListener('mousemove', onMouseMove, false);
    }
    
    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }
};