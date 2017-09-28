
// let TrackballControls = require('three-trackballcontrols');

let earthOrbitRadius = 8,
    earthOrbitAngle = 0,
    earthOrbitSpeed = - 0.2,

    moonOrbitRadius = 2.5,
    moonOrbitAngle = 0,
    moonOrbitSpeed = -2;

// Renderer
let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true});
renderer.setClearColor(0xffffe0);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera
let aspect = window.innerWidth / window.innerHeight;
let camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500 );
// camera.position.set(0, 0, 12);
camera.position.set(0, 0, 18);
// camera.rotation.x = - Math.PI / 8;
// let cameraRotation =0;
// let cameraRotationSpeed =0.1;
// let cameraAutoRotation =true;
// let orbitControls = new THREE.OrbitControls(camera);

// Scene
let scene = new THREE.Scene();

// Lights
scene.add(new THREE.AmbientLight(0x222222));

// let light = new THREE.SpotLight(0xffffff, 1, 10000, 10, 0.5, 1);
// let light = new THREE.DirectionalLight(0xffffff, 0.6);
let light = new THREE.PointLight(0xffffff, 0.75, 0);
light.position.set(0, 0, 0);

// Init. TextureLoader
let textureLoader = new THREE.TextureLoader();

// Earth
let earthMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshPhongMaterial({
            map: textureLoader.load(
                '../images/2_no_clouds_4k.jpg'
                // '../images/earthmap1k.jpg'
            ),
            bumpScale: 0.05,
            bumpMap : textureLoader.load(
                '../images/earthbump1k.jpg'
                // '../images/elev_bump_4k.jpg'
            ),
            specular: new THREE.Color('grey'),
            specularMap : textureLoader.load(
                // '../images/earthspec1k.jpg'
                '../images/water_4k.png'
            )
        }
    )
);

// Earth_Atmosphere
let atmosphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1.008, 32, 32),
    new THREE.MeshPhongMaterial({
            map: textureLoader.load(
                '../images/fair_clouds_4k.png'
            ),
            transparent: true
        }
    )
);

// Moon
let moonMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 32, 32),
    new THREE.MeshPhongMaterial({
            map: textureLoader.load(
                '../images/moonmap2k.jpg'
                // '../images/earthmap1k.jpg'
            ),
            bumpScale: 0.05,
            bumpMap : textureLoader.load(
                '../images/moonmap2k.jpg'
                // '../images/elev_bump_4k.jpg'
            )
        }
    )
);

// Sun
let sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 32, 32),
    // new THREE.MeshPhongMaterial({
    //         // map: textureLoader.load(
    //         //     '../images/sunmap.jpg'
    //         //     // '../images/earthmap1k.jpg'
    //         // ),
    //         color: 0xffffe0
    //     }
    // )
    new THREE.MeshBasicMaterial({
        color: 'yellow'
    })
);



// Star field
let starMesh = new THREE.Mesh(
    new THREE.SphereGeometry(90, 64, 64),
    new THREE.MeshBasicMaterial({
            map: textureLoader.load(
                '../images/galaxy_starfield.png'
            ),
            side: THREE.BackSide
        }
    )
);

// Pivots
let pivot_sun = new THREE.Object3D();
let pivot_earth = new THREE.Object3D();
let pivot_earth_to_moon = new THREE.Object3D();
let pivot_moon = new THREE.Object3D();

// pivot_earth.add(pivot_moon);
pivot_earth_to_moon.add(pivot_moon);
pivot_sun.add(pivot_earth);
pivot_sun.add(pivot_earth_to_moon);

// Axis helper, used to visualize axis
let sunAxes = new THREE.AxisHelper(0.5);
let earthAxes = new THREE.AxisHelper(2);
let moonAxes = new THREE.AxisHelper(0.5);
pivot_earth.add(earthAxes);
pivot_moon.add(moonAxes);
pivot_sun.add(sunAxes);

// Apply mesh to pivot
pivot_sun.add(sunMesh);

pivot_earth.add(earthMesh);
pivot_earth.add(atmosphereMesh);
pivot_earth.position.x = 8;
pivot_earth_to_moon.position.x = 8;
// Earth axial tilt
pivot_earth.rotateZ(2 * Math.PI / 15);

pivot_moon.add(moonMesh);
pivot_moon.position.x = 2.5;
// pivot_moon.position.y = - 1.2;



// Apply to the scene
scene.add(starMesh);
scene.add(light);
scene.add(pivot_sun);
// scene.add(camera);

// let controls = new THREE.TrackballControls(camera);

let animate = function () {

    requestAnimationFrame( animate );
    // Rotations
    // earthMesh.rotation.y += 0.02;
    // atmosphereMesh.rotation.y += 0.0035;
    // moonMesh.rotation.y +=0.06;
    earthMesh.rotateY(0.02);
    atmosphereMesh.rotateY(0.0035);
    moonMesh.rotateY(0.06);

    // Revolutions
    // pivot_moon.rotation.y +=0.05;
    // pivot_earth.rotation.y +=0.0055;
    // pivot_sun.rotation.y += 0.0015;
    pivot_moon.rotateY(0.05);
    pivot_earth.rotateY(0.0055);
    pivot_earth_to_moon.rotateY(0.0055);
    pivot_sun.rotateY(0.0015);

    // earthOrbitAngle += earthOrbitSpeed;
    // let radians = earthOrbitAngle * Math.PI / 180;
    // pivot_earth.position.x = Math.cos(radians) * earthOrbitRadius;
    // pivot_earth.position.z = Math.sin(radians) * earthOrbitRadius;
    //
    // moonOrbitAngle += moonOrbitSpeed;
    // let moonRadians = moonOrbitAngle * Math.PI / 180;
    // pivot_moon.position.x = Math.cos(moonRadians) * moonOrbitRadius;
    // pivot_moon.position.z = Math.sin(moonRadians) * moonOrbitRadius;

    // Background
    // starMesh.rotation.y += 0.0002;

    renderer.render(scene, camera);

};
animate();