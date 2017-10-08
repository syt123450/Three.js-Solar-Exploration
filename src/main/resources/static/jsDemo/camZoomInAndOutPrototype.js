//
//
// // let TrackballControls = require('three-trackballcontrols');
//
// let earthOrbitRadius = 8,
//     earthOrbitAngle = 0,
//     earthOrbitSpeed = - 0.2,
//
//     moonOrbitRadius = 2.5,
//     moonOrbitAngle = 0,
//     moonOrbitSpeed = -2;
//
// // Renderer
// let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true});
// renderer.setClearColor(0xffffe0);
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
//
// // Camera
// let aspect = window.innerWidth / window.innerHeight;
// let camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500 );
// // camera.position.set(0, 0, 12);
// camera.position.set(0, 0, 30);
// // camera.rotation.x = - Math.PI / 8;
// // let cameraRotation =0;
// // let cameraRotationSpeed =0.1;
// // let cameraAutoRotation =true;
// // let orbitControls = new THREE.OrbitControls(camera);
//
// // Scene
// let scene = new THREE.Scene();
//
// // Lights
// scene.add(new THREE.AmbientLight(0x222222));
//
// // let light = new THREE.SpotLight(0xffffff, 1, 10000, 10, 0.5, 1);
// // let light = new THREE.DirectionalLight(0xffffff, 0.6);
// let light = new THREE.PointLight(0xffffff, 0.75, 0);
// light.position.set(0, 0, 0);
//
// // Init. TextureLoader
// let textureLoader = new THREE.TextureLoader();
//
// // Earth
// let earthMesh = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshPhongMaterial({
//             map: textureLoader.load(
//                 '../images/2_no_clouds_4k.jpg'
//                 // '../images/earthmap1k.jpg'
//             ),
//             bumpScale: 0.05,
//             bumpMap : textureLoader.load(
//                 '../images/earthbump1k.jpg'
//                 // '../images/elev_bump_4k.jpg'
//             ),
//             specular: new THREE.Color('grey'),
//             specularMap : textureLoader.load(
//                 // '../images/earthspec1k.jpg'
//                 '../images/water_4k.png'
//             )
//         }
//     )
// );
//
// // Earth_Atmosphere
// let atmosphereMesh = new THREE.Mesh(
//     new THREE.SphereGeometry(1.008, 32, 32),
//     new THREE.MeshPhongMaterial({
//             map: textureLoader.load(
//                 '../images/fair_clouds_4k.png'
//             ),
//             transparent: true
//         }
//     )
// );
//
// // Moon
// let moonMesh = new THREE.Mesh(
//     new THREE.SphereGeometry(0.25, 32, 32),
//     new THREE.MeshPhongMaterial({
//             map: textureLoader.load(
//                 '../images/moonmap2k.jpg'
//                 // '../images/earthmap1k.jpg'
//             ),
//             bumpScale: 0.05,
//             bumpMap : textureLoader.load(
//                 '../images/moonmap2k.jpg'
//                 // '../images/elev_bump_4k.jpg'
//             )
//         }
//     )
// );
//
// // Sun
// let sunMesh = new THREE.Mesh(
//     new THREE.SphereGeometry(0.1, 32, 32),
//     // new THREE.MeshPhongMaterial({
//     //         // map: textureLoader.load(
//     //         //     '../images/sunmap.jpg'
//     //         //     // '../images/earthmap1k.jpg'
//     //         // ),
//     //         color: 0xffffe0
//     //     }
//     // )
//     new THREE.MeshBasicMaterial({
//         color: 'yellow'
//     })
// );
//
//
//
// // Star field
// let starMesh = new THREE.Mesh(
//     new THREE.SphereGeometry(90, 64, 64),
//     new THREE.MeshBasicMaterial({
//             map: textureLoader.load(
//                 '../images/galaxy_starfield.png'
//             ),
//             side: THREE.BackSide
//         }
//     )
// );
//
// // Pivots
// let pivot_sun_to_earth = new THREE.Object3D();
// let pivot_earth_self = new THREE.Object3D();
// let pivot_earth_to_moon = new THREE.Object3D();
// let pivot_moon = new THREE.Object3D();
//
// // pivot_earth_self.add(pivot_moon);
// pivot_earth_to_moon.add(pivot_moon);
// pivot_sun_to_earth.add(pivot_earth_self);
// pivot_sun_to_earth.add(pivot_earth_to_moon);
//
// // Axis helper, used to visualize axis
// let sunAxes = new THREE.AxisHelper(0.5);
// let earthAxes = new THREE.AxisHelper(2);
// let moonAxes = new THREE.AxisHelper(0.5);
// pivot_earth_self.add(earthAxes);
// pivot_moon.add(moonAxes);
// pivot_sun_to_earth.add(sunAxes);
//
// // Apply mesh to pivot
// pivot_sun_to_earth.add(sunMesh);
//
// pivot_earth_self.add(earthMesh);
// pivot_earth_self.add(atmosphereMesh);
// pivot_earth_self.position.x = 8;
// pivot_earth_to_moon.position.x = 8;
// // Earth axial tilt
// pivot_earth_self.rotateZ(2 * Math.PI / 15);
//
// pivot_moon.add(moonMesh);
// pivot_moon.position.x = 2.5;
// // pivot_moon.position.y = - 1.2;
//
//
//
// // Apply to the scene
// scene.add(starMesh);
// scene.add(light);
// scene.add(pivot_sun_to_earth);
// // scene.add(camera);
//
// // let controls = new THREE.TrackballControls(camera);
//
// /**
//  * Variables added for camera control
//  */
// let CAM_TO_EARTH, distance;
// CAM_TO_EARTH = camera.position.distanceTo(pivot_earth_self.position);
// distance = CAM_TO_EARTH;
// let cameraDirection = new THREE.Vector3();
// let sign = -1;
//
// let animate = function () {
//
//     requestAnimationFrame( animate );
//     // Rotations
//     // earthMesh.rotation.y += 0.02;
//     // atmosphereMesh.rotation.y += 0.0035;
//     // moonMesh.rotation.y +=0.06;
//     earthMesh.rotateY(0.02);
//     atmosphereMesh.rotateY(0.0035);
//     moonMesh.rotateY(0.06);
//
//     // Revolutions
//     // pivot_moon.rotation.y +=0.05;
//     // pivot_earth_self.rotation.y +=0.0055;
//     // pivot_sun_to_earth.rotation.y += 0.0015;
//     pivot_moon.rotateY(0.05);
//     pivot_earth_self.rotateY(0.0055);
//     pivot_earth_to_moon.rotateY(0.0055);
//     // pivot_sun_to_earth.rotateY(0.0015);
//
//     earthOrbitAngle += earthOrbitSpeed;
//     let radians = earthOrbitAngle * Math.PI / 180;
//     pivot_earth_self.position.x = Math.cos(radians) * earthOrbitRadius;
//     pivot_earth_to_moon.position.x = Math.cos(radians) * earthOrbitRadius;
//     pivot_earth_self.position.z = Math.sin(radians) * earthOrbitRadius;
//     pivot_earth_to_moon.position.z = Math.sin(radians) * earthOrbitRadius;
//     //
//     // moonOrbitAngle += moonOrbitSpeed;
//     // let moonRadians = moonOrbitAngle * Math.PI / 180;
//     // pivot_moon.position.x = Math.cos(moonRadians) * moonOrbitRadius;
//     // pivot_moon.position.z = Math.sin(moonRadians) * moonOrbitRadius;
//
//     // Background
//     // starMesh.rotation.y += 0.0002;
//     // var worldCoords = pivot_earth_self.localToWorld(pivot_earth_self.position);
//
//
//     /**
//      * Keep the earth in the center of the screen,
//      * zoom in and zoom out alternately
//      */
//     camera.lookAt(pivot_earth_self.position);
//     camera.getWorldDirection(cameraDirection); // get the direction camera is looking at
//
//     // If camera is too close to the earth, increase distance; vise versa
//     if (Math.abs(distance - 4) < 0.05 || Math.abs(distance - CAM_TO_EARTH) < 0.05) {
//         sign *= -1;
//     }
//
//     // The speed that the camera is approaching or escaping from the earth
//     var speed = 0.1;
//     distance -= sign * speed;
//
//     let newCamPosition = new THREE.Vector3(0, 0, 0);
//     newCamPosition.x = pivot_earth_self.position.x - cameraDirection.x * distance;
//     newCamPosition.y = pivot_earth_self.position.y - cameraDirection.y * distance;
//     newCamPosition.z = pivot_earth_self.position.z - cameraDirection.z * distance;
//
//     camera.position.set(newCamPosition.x, newCamPosition.y, newCamPosition.z);
//
//     renderer.render(scene, camera);
//
// };
//
// animate();


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
	
	this.topView = updateCameaPosition(1);
	this.sideView = updateCameaPosition(2);
	this.upForwardView = updateCameaPosition(-1);
	
	
	function solarSystemAnimate() {
		requestAnimationFrame(solarSystemAnimate);
		
		rotationAndRevolution();
		
		zoomInCamera();
		
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
		updateCameaPosition(-1);
		
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
	
	function updateCameaPosition(mode) {
		
		// From the top of the system
		if (mode == 1) {
			camera.position.set(0, 600, 0);
		}
		// From the horizontal position
		else if (mode == 2) {
			camera.position.set(0, 0, 600);
		}
		// From the up-forward position
		else {
			camera.position.set(0, 300, 600);
		}
		
		camera.lookAt(sunAggregation.position);
		
	}
	
	/**
	 * Added function to keep the earth in the center of the scene
	 */
	var cameraDirection = new THREE.Vector3();
	var init_distance = camera.position.distanceTo(earthAggregation.position);
	var current_distance = init_distance;
	var approachingSpeed = 5;
	var direction = -1; // direction == 1, approaching; direction == -1, getting away
	var minDistance = 50; // make speed non-linear
	var maxDistance = init_distance;
	
	function zoomInCamera() {
		// Make the camera look at the earth
		camera.lookAt(earthAggregation.position);
        camera.getWorldDirection(cameraDirection);

        // Change directions
		if (direction === 1 && Math.abs(current_distance) <= minDistance) {
			direction = -1;
		}
		
		if (direction === -1 && Math.abs(current_distance) >= maxDistance) {
			direction = 1;
		}
		
		// Update current distance
		current_distance -= approachingSpeed * direction;
		
		// Calculate the position of the camera
		var newCamPosition = new THREE.Vector3(0, 0, 0);
	    newCamPosition.x = earthAggregation.position.x - cameraDirection.x * current_distance;
	    newCamPosition.y = earthAggregation.position.y - cameraDirection.y * current_distance;
	    newCamPosition.z = earthAggregation.position.z - cameraDirection.z * current_distance;
	
	    // Reset camera position
	    camera.position.set(newCamPosition.x, newCamPosition.y, newCamPosition.z);
	}
};
