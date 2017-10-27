/**
 * Created by ss on 2017/9/29.
 */

EarthSceneController = function (renderer) {

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

    var coneList = [];

    var earthRenderer = renderer;
    var earthScene = init();

    this.animate = earthAnimate;

    this.addCones = function (conesParameter) {
        conesParameter.forEach(function (coneParameter) {
            addOneCone(coneParameter);
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

        SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);
        var intersects = SolarEPUtils.raycaster.intersectObjects(earthScene.children, true);

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

    function addOneCone(coneParameter) {
        var coneObject = universeUtils.createOneCone(coneParameter);
        coneObject.lookAt(earthMesh.position);
        coneObject.rotateX(Math.PI / 2);
        coneList.push(coneObject);
        earthMesh.add(coneObject);
    }

    function rotateCones() {

        coneList.forEach(function (cone) {
            cone.rotateY(0.05);
        });
    }

    function addEvent() {
        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('mousedown', onMouseDown, false);
    }

    function onMouseMove() {

        SolarEPUtils.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        SolarEPUtils.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function onMouseDown() {
        SolarEPUtils.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        SolarEPUtils.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);
        var intersects = SolarEPUtils.raycaster.intersectObjects(earthScene.children, true);

        coneList.forEach(function (cone) {
            if (intersects[0].object === cone) {
                console.log("find a clicked cone.");
                addTextToBoard(cone.parameters);
                showInfo(cone.parameters.latitude, cone.parameters.longitude);
            }
        });
    }

    function addTextToBoard(coneParameters) {
        console.log(coneParameters);
        $("#infoBoard").empty()
            .append("<div>Latitude: " + coneParameters.latitude + "</div>")
            .append("<div>Longitude: " + coneParameters.longitude + "</div>")
            .append("<div>Total Amount: " + coneParameters.amount+ "</div>")
            .append("<div>Coal Amount: " + coneParameters.coalAmount + "</div>")
            .append("<div>Oil Amount: " + coneParameters.oilAmount + "</div>")
            .append("<div>Gas Amount: " + coneParameters.gasAmount + "</div>")
    }

    function showInfo(latitude, longitude) {
        $("#infoBoard").animate({width:'toggle'},350);
        infoBoard = true;
        moveEarth(latitude, longitude);
    }

    this.restoreEarth = function () {

    };

    function moveEarth(latitude, longitude) {
        console.log(latitude + "," + longitude);
    }
};