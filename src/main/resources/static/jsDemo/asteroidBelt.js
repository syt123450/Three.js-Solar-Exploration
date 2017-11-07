
var renderer = SolarEPUtils.getDefaultRenderer();
var scene = new THREE.Scene();
var universeUtils = new UniverseUtils();
var light = new THREE.PointLight(0xffffff, 1.2, 0);
// Lights
scene.add(new THREE.AmbientLight(0x222222));
scene.add(light);
light.position.set(0, 0, 0);

var camera = universeUtils.createDefaultCamera();
camera.position.set(0, 60, 0);
camera.lookAt(light.position);

var universeMesh = universeUtils.createSolarUniverse();

scene.add(camera);
scene.add(universeMesh);

var material = new THREE.PointCloudMaterial({
    color: 0xffffcc,
    size: 0.1
});
var pointClouds = [];
var i, j, r, theta, x, y, z;
for (j =0; j <10; j++){
    var geometry = new THREE.Geometry();
    for (i =0; i <500; i++){
        r = SolarConfig["asteroidBelt"].orbitRadius + (Math.random() *  SolarConfig["asteroidBelt"].orbitRadiusWidth);
        theta =  (Math.random() * 2 * Math.PI);
        x = Math.cos(theta) * r;
        y = ( -1 * Math.random() +0.5) * SolarConfig["asteroidBelt"].orbitRadiusThickness;
        z = Math.sin(theta) * r;

        geometry.vertices.push(new THREE.Vector3(x, y, z));
    }
    var pointCloud = new THREE.PointCloud(geometry, material);
    pointClouds[j] = pointCloud;
}

pointClouds.forEach(function addLight(pc) {
    scene.add(pc);
});

function rotateBelts(){
    var k;
    for (k=0; k <pointClouds.length; k++){
        pointClouds[k].rotateY(0.00003*(k+1));
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    rotateBelts();
    renderer.render(scene, camera);
}
