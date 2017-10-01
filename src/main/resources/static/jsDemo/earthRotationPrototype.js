/**
 * Created by ss on 2017/9/26.
 */

var scene, renderer, camera, earthMesh, atmosphereMesh;

scene = new THREE.Scene();
init();
animate();

function init() {

    initLight();
    initRenderer();
    initCamera();
    initUniverse();
    initEarth();
}

function initLight() {

    scene.add(new THREE.AmbientLight(0xffffff));
}

function initCamera() {

    var aspect = window.innerWidth / window.innerHeight;
    // camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
    // camera.position.set(0, 0, 1.5);

    camera = new THREE.PerspectiveCamera();
    camera.fov = 45;
    camera.aspect = aspect;
    camera.near = 0.1;
    camera.far = 1500;
    camera.position.set(0, 0, 1.5);
    camera.updateProjectionMatrix();


}

function initRenderer() {

    renderer = new THREE.WebGLRenderer({canvas: document.getElementById('sceneArea'), antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function initUniverse() {

    var starMesh = new THREE.Mesh(
        new THREE.SphereGeometry(90, 64, 64),
        new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/galaxy_starfield.png'
                ),
                side: THREE.BackSide
            }
        )
    );
    scene.add(starMesh);
}

function initEarth() {

    earthMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/2_no_clouds_4k.jpg'
                ),
                bumpScale: 0.05,
                bumpMap: new THREE.TextureLoader().load(
                    '../images/earthbump1k.jpg'
                ),
                specular: new THREE.Color('grey'),
                specularMap: new THREE.TextureLoader().load(
                    '../images/water_4k.png'
                )
            }
        )
    );

    atmosphereMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.504, 32, 32),
        new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/fair_clouds_4k.png'
                ),
                transparent: true
            }
        )
    );

    //create a tilt container with 23.5 angle
    var aggregation = new THREE.Object3D();
    aggregation.add(earthMesh);
    aggregation.add(atmosphereMesh);
    aggregation.rotateZ(-Math.PI * 23.5 / 180);

    scene.add(aggregation);
}

function animate() {

    requestAnimationFrame(animate);

    animateEarth();

    renderer.render(scene, camera);
}

function animateEarth() {

    //rotate the object in the container
    earthMesh.rotation.y += 0.001;
    atmosphereMesh.rotation.y += 0.001;
}