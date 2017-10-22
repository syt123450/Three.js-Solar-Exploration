
OrbitDemoController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.PointLight(0xffffff, 0.75, 0);
    var camera = universeUtils.createDefaultCamera();

    var universeMesh = universeUtils.createDefaultUniverse();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();
    var moonMesh = universeUtils.createDefaultMoon();
    var sunMesh = createSunMesh();

    var sunAggregation = initSunAggregation();
    var earthAggregation = initEarthAggregation();
    var moonAggregation = initMoonAggregation();
    var earthToMoon = new THREE.Object3D();

    var CAM_TO_EARTH = camera.position.distanceTo(earthAggregation.position);
    var distance = CAM_TO_EARTH;
    var cameraDirection = new THREE.Vector3();
    var sign = -1;

    var earthOrbitRadius = 3,
        earthOrbitAngle = 0,
        earthOrbitSpeed = - 0.1,

        moonOrbitRadius = 1.3,
        moonOrbitAngle = 0,
        moonOrbitSpeed = -1;

    var orbitRenderer = renderer;
    var orbitScene = init();

    this.animate = orbitAnimate;

    function orbitAnimate() {

        requestAnimationFrame(orbitAnimate);

        rotationAndRevolution();
        // updateCamera();

        orbitRenderer.render(orbitScene, camera);
    }

    function init() {

        var scene = new THREE.Scene();
        scene.add(light);
        light.position.set(0, 0, 0);
        scene.add(new THREE.AmbientLight(0x222222));
        scene.add(camera);
        camera.position.set(0, 0, 5);

        scene.add(universeMesh);
        initOrbits();
        scene.add(sunAggregation);

        return scene;
    }

    function createSunMesh(){
        return new THREE.Mesh(
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
    }

    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * 23.5 / 180);
        aggregation.add(new THREE.AxisHelper(1));

        return aggregation;
    }

    function initMoonAggregation() {
        var aggregation = new THREE.Object3D();
        aggregation.add(moonMesh);
        aggregation.add(new THREE.AxisHelper(0.25));

        return aggregation;
    }

    function initSunAggregation() {
        var aggregation = new THREE.Object3D();
        aggregation.add(sunMesh);
        aggregation.add(new THREE.AxisHelper(0.25));

        return aggregation;
    }

    function initOrbits(){
        earthToMoon.add(moonAggregation);
        sunAggregation.add(earthAggregation);
        sunAggregation.add(earthToMoon);

        moonAggregation.position.x = 1.3;
        earthAggregation.position.x = 3;
        earthToMoon.position.x = 3;
    }

    function rotationAndRevolution(){
        // Rotations
        earthMesh.rotateY(0.02);
        atmosphereMesh.rotateY(0.0035);
        moonMesh.rotateY(0.06);

        // Revolutions
        earthToMoon.rotateY(0.0055);

        earthOrbitAngle += earthOrbitSpeed;
        var radians = earthOrbitAngle * Math.PI / 180;
        earthAggregation.position.x = Math.cos(radians) * earthOrbitRadius;
        earthToMoon.position.x = Math.cos(radians) * earthOrbitRadius;
        earthAggregation.position.z = Math.sin(radians) * earthOrbitRadius;
        earthToMoon.position.z = Math.sin(radians) * earthOrbitRadius;

        // moonOrbitAngle += moonOrbitSpeed;
        // var moonRadians = moonOrbitAngle * Math.PI / 180;
        // moonAggregation.position.x = Math.cos(moonRadians) * moonOrbitRadius;
        // moonAggregation.position.z = Math.sin(moonRadians) * moonOrbitRadius;
    }

    function updateCamera(){
        camera.lookAt(earthAggregation.position);
        camera.getWorldDirection(cameraDirection);

        if (Math.abs(distance - 4) < 0.05 || Math.abs(distance - CAM_TO_EARTH) < 0.05) {
            sign *= -1;
        }

        distance -= sign * 0.1;

        let newCamPosition = new THREE.Vector3(0, 0, 0);
        newCamPosition.x = earthAggregation.position.x - cameraDirection.x * distance;
        newCamPosition.y = earthAggregation.position.y - cameraDirection.y * distance;
        newCamPosition.z = earthAggregation.position.z - cameraDirection.z * distance;
        camera.position.set(newCamPosition.x, newCamPosition.y, newCamPosition.z);
        console.log(cameraDirection.x);
    }

    function getDistance(point1, point2) {
        let distance = 0;
        distance += Math.pow(point1.x - point2.x, 2);
        distance += Math.pow(point1.y - point2.y, 2);
        distance += Math.pow(point1.z - point2.z, 2);
        distance = Math.sqrt(distance);
        return distance;
    }
}