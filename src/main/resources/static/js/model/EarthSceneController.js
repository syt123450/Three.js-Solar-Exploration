/**
 * Created by ss on 2017/9/29.
 */

EarthSceneController = function (renderer) {

    var radius = 0.55;
    var moonRotateRadius = 0.7;

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();
    var moonMesh = universeUtils.createDefaultMoon();
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    var coneList = [];

    var earthRenderer = renderer;
    var earthScene = init();

    this.animate = earthAnimate;

    this.addCones = function (cones) {
        cones.forEach(function (cone) {
            addOneCone(cone);
        });
    };

    this.clearCones = function () {
        coneList.forEach(function (cone) {
            earthMesh.remove(cone);
        });
        coneList = [];
    };

    function earthAnimate() {

        requestAnimationFrame(earthAnimate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotateEarthWithStop();
        rotateMoon();
        rotateCones();
        earthRenderer.render(earthScene, camera);
    }

    function init() {

        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        stars.forEach(function addStar(star) {
            scene.add(star);
        });
        meteors.forEach(function addMeteor(meteor) {
            scene.add(meteor);
        });
        scene.add(initEarthAggregation());
        scene.add(moonMesh);
        addEvent();

        return scene;
    }

    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }

    function rotateEarthWithStop() {

        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(earthScene.children, true);

        if (intersects === null || intersects.length === 0 || intersects[0].object !== atmosphereMesh) {
            rotateEarth();
        }
    }

    function rotateEarth() {

        earthMesh.rotation.y += 0.001;
        atmosphereMesh.rotation.y += 0.001;
    }

    function rotateMoon() {

        moonMesh.rotateY(0.01);
        var timer = Date.now() * 0.0001;
        moonMesh.position.x = Math.cos(-timer) * moonRotateRadius;
        moonMesh.position.z = Math.sin(-timer) * moonRotateRadius;
    }

    function addOneCone(cone) {
        var coneObject = initOneCone(cone);
        coneList.push(coneObject);
        earthMesh.add(coneObject);
    }

    function initOneCone(coneParameters) {

        var position = calculatePosition(coneParameters.latitude, coneParameters.longitude);

        var coneMesh = new THREE.Mesh(
            new THREE.ConeGeometry(0.03, 0.1, 0.09, 12),
            new THREE.MeshPhongMaterial({color: 0x085093})
        );

        coneMesh.position.set(position.x, position.y, position.z);
        coneMesh.lookAt(earthMesh.position);

        coneMesh.rotateX(Math.PI / 2);

        return coneMesh;
    }

    function calculatePosition(latitude, longitude) {
        var phi = (90 - latitude) * (Math.PI / 180);
        var theta = (longitude + 180) * (Math.PI / 180);

        var pointX = -((radius) * Math.sin(phi) * Math.cos(theta));
        var pointY = ((radius) * Math.cos(phi));
        var pointZ = ((radius) * Math.sin(phi) * Math.sin(theta));

        var position = new THREE.Vector3();
        position.x = pointX;
        position.y = pointY;
        position.z = pointZ;

        return position;
    }

    function rotateCones() {

        coneList.forEach(function (cone) {
            cone.rotateY(0.05);
        });
    }

    function addEvent() {
        document.addEventListener('mousemove', onMouseMove, false);
    }

    function onMouseMove() {

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
};