/**
 * Created by ss on 2017/9/26.
 */

var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('sceneArea'), antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
camera.position.set(0, 0, 1.5);

var scene = new THREE.Scene();
scene.add(new THREE.AmbientLight(0xffffff));

var textureLoader = new THREE.TextureLoader();

var earthMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshPhongMaterial({
            map: textureLoader.load(
                '../images/2_no_clouds_4k.jpg'
            ),
            bumpScale: 0.05,
            bumpMap: textureLoader.load(
                '../images/earthbump1k.jpg'
            ),
            specular: new THREE.Color('grey'),
            specularMap: textureLoader.load(
                '../images/water_4k.png'
            )
        }
    )
);

var atmosphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.504, 32, 32),
    new THREE.MeshPhongMaterial({
            map: textureLoader.load(
                '../images/fair_clouds_4k.png'
            ),
            transparent: true
        }
    )
);

var starMesh = new THREE.Mesh(
    new THREE.SphereGeometry(90, 64, 64),
    new THREE.MeshBasicMaterial({
            map: textureLoader.load(
                '../images/galaxy_starfield.png'
            ),
            side: THREE.BackSide
        }
    )
);

//create a tilt container with 23.5 angle
var aggregation = new THREE.Object3D();
aggregation.add(earthMesh);
aggregation.add(atmosphereMesh);
aggregation.rotateZ(-Math.PI * 23.5 / 180);

scene.add(aggregation);
scene.add(starMesh);

var animate = function () {

    requestAnimationFrame(animate);

    //rotate the object in the container
    earthMesh.rotation.y += 0.001;
    atmosphereMesh.rotation.y += 0.001;

    renderer.render(scene, camera);

};

animate();