/**
 * Created by ss on 2017/9/27.
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

//you can use my addPoint function to add a cube to earth, as we need to add a flag to the earth, I will change the function latter
var addPoint = function(Latidude, Longitude, Radius, earthMesh) {
    var phi = (90 - Latidude) * (Math.PI / 180);
    var theta = (Longitude + 180) * (Math.PI / 180);

    var pointX = -((Radius) * Math.sin(phi) * Math.cos(theta));
    var pointY = ((Radius) * Math.cos(phi));
    var pointZ = -((Radius) * Math.sin(phi) * Math.sin(theta));

    var geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
    var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = pointX;
    cube.position.y = pointY;
    cube.position.z = pointZ;

    earthMesh.add(cube);

    return cube;
};

//base on latitude and longitude, you can call my addPoint function to add a point to the earth
var latitude = 37.3382;
var longitude = 121.8863;
var radius = 0.5;
var cubeObject = addPoint(latitude, longitude, radius, earthMesh);
//this is the demo how to remove the point from the earth, in this demo, the point will be removed in 5 seconds
setTimeout(function () {
    earthMesh.remove(cubeObject);
}, 5000);

var aggregation = new THREE.Object3D();
aggregation.add(earthMesh);
aggregation.add(atmosphereMesh);
aggregation.rotateZ(-Math.PI * 23.5 / 180);

scene.add(aggregation);
scene.add(starMesh);


var animate = function () {

    requestAnimationFrame(animate);
    earthMesh.rotation.y += 0.001;
    atmosphereMesh.rotation.y += 0.001;

    renderer.render(scene, camera);

};

animate();