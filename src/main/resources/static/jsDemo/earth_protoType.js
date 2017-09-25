
// let TrackballControls = require('three-trackballcontrols');

// Renderer
let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true});
renderer.setClearColor(0xffffe0);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera
let aspect = window.innerWidth / window.innerHeight;
let camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500 );
camera.position.set(0, 0, 1.5);
// let cameraRotation =0;
// let cameraRotationSpeed =0.1;
// let cameraAutoRotation =true;
// let orbitControls = new THREE.OrbitControls(camera);

// Scene
let scene = new THREE.Scene();

// Lights
scene.add(new THREE.AmbientLight(0x333333));

let light = new THREE.SpotLight(0xffffff, 1, 10000, 10, 0.5, 1);
// let light = new THREE.DirectionalLight(0xffffff, 0.6);
light.position.set(5, 3, 5);

// Init. TextureLoader
let textureLoader = new THREE.TextureLoader();


// Earth
let earthMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
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
// let geometry = new THREE.SphereGeometry(0.5, 32, 32);
// let material = new THREE.MeshPhongMaterial({
//         map: textureLoader.load(
//             '../images/2_no_clouds_4k.jpg'
//             // '../images/earthmap1k.jpg'
//         ),
//         bumpScale: 0.05,
//         bumpMap : textureLoader.load(
//             // '../images/earthbump1k.jpg'
//             '../images/elev_bump_4k.jpg'
//         ),
//         specular: new THREE.Color('grey'),
//         specularMap : textureLoader.load(
//             // '../images/earthspec1k.jpg'
//             '../images/water_4k.png'
//         )
//     }
// );
// let earthMesh = new THREE.Mesh(geometry, material);


// Atmosphere
let atmosphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.504, 32, 32),
    new THREE.MeshPhongMaterial({
            map: textureLoader.load(
                '../images/fair_clouds_4k.png'
            ),
            transparent: true
        }
    )
);
// let atmosphereGeometry = new THREE.SphereGeometry(0.504, 32, 32);
// let atmosphereMaterial = new THREE.MeshPhongMaterial({
//         map: textureLoader.load(
//             '../images/fair_clouds_4k.png'
//         ),
//         transparent: true
//     }
// );
// let atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);


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
// let starGeometry = new THREE.SphereGeometry(90, 64, 64);
// let starMaterial = new THREE.MeshBasicMaterial({
//         map: textureLoader.load(
//             '../images/galaxy_starfield.png'
//         ),
//         side: THREE.BackSide
//     }
// );
// let starMesh = new THREE.Mesh(starGeometry, starMaterial);


// Apply to the scene
scene.add(earthMesh);
scene.add(atmosphereMesh);
scene.add(starMesh);
scene.add(light);
// scene.add(camera);

// let controls = new THREE.TrackballControls(camera);


let animate = function () {

    requestAnimationFrame( animate );

    // earthMesh.rotation.x += 0.01;
    earthMesh.rotation.y += 0.0055;
    atmosphereMesh.rotation.y += 0.0045;
    starMesh.rotation.y += 0.0002;

    renderer.render(scene, camera);

};
animate();