/**
 * Created by ss on 2017/9/27.
 */

var scene, renderer, camera, earthMesh, atmosphereMesh, meteors = [];

scene = new THREE.Scene();
init();
animate();

function init() {

    initLight();
    initRenderer();
    initCamera();
    initUniverse();
    initEarth();
    initMeteor();
}

function initLight() {

    scene.add(new THREE.AmbientLight(0xffffff));
}

function initRenderer() {

    renderer = new THREE.WebGLRenderer({canvas: document.getElementById('sceneArea'), antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function initCamera() {

    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
    camera.position.set(0, 0, 1.5);
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

    var aggregation = new THREE.Object3D();
    aggregation.add(earthMesh);
    aggregation.add(atmosphereMesh);
    aggregation.rotateZ(-Math.PI * 23.5 / 180);

    scene.add(aggregation);
}

function initMeteor() {

    var meteor0 = createMeteor();
    var meteor1 = createMeteor();
    meteors[0] = meteor0;
    meteors[1] = meteor1;
    scene.add(meteor0);
    scene.add(meteor1);
}

function animate() {

    requestAnimationFrame(animate);

    animateEarth();
    animateMeteor();

    renderer.render(scene, camera);

}

function animateEarth() {

    earthMesh.rotation.y += 0.001;
    atmosphereMesh.rotation.y += 0.001;
}

function animateMeteor() {

    for(var i = 0; i < meteors.length; i++) {
        sweepMeteor(meteors[i]);
    }
}

function createMeteor() {

    var geometry = new THREE.BoxGeometry(0.2, 0.2, 0.001);
    var material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/meteor.png')
    });

    var meteor = new THREE.Mesh(geometry, material);

    meteor.position.x = 3 * Math.random();
    meteor.position.y = 3 * Math.random();
    meteor.position.z = -3;

    return meteor;
}

function sweepMeteor(meteor) {

    if (meteor.position.x <= -4) {
        meteor.position.x = 3 * Math.random();
        meteor.position.y = 3 * Math.random();
    }

    meteor.position.x -= 0.01;
    meteor.position.y -= 0.01;
}


