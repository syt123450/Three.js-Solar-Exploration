/**
 * Created by ss on 2017/11/7.
 */

EarthSceneController = function (renderer) {

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();

    var speed;
    var isInertia = false;
    var selfRotate = true;
    var isPlanetClicked = false;

    var earthRenderer = renderer;
    var earthScene = init();

    this.animate = earthAnimate;

    function earthAnimate() {

        requestAnimationFrame(earthAnimate);
        if (selfRotate && !isInertia) {
            rotateEarth();
        }
        TWEEN.update();
        earthRenderer.render(earthScene, camera);
    }

    function init() {

        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        scene.add(initEarthAggregation());

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

    function rotateEarth() {

        earthMesh.rotation.y += 0.001;
        atmosphereMesh.rotation.y += 0.001;
    }

    function addEvent() {

        EventManager.registerEvent('mousemove', onMouseMove);
        EventManager.registerEvent('mousedown', onMouseDown);
        EventManager.registerEvent('mousewheel', onMouseWheel);
        EventManager.registerEvent('mouseup', onMouseUp);
    }

    function onMouseDown() {
        SolarEPUtils.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        SolarEPUtils.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);
        var intersects = SolarEPUtils.raycaster.intersectObjects(earthScene.children, true);

        if (intersects !== null && intersects.length !== 0 && intersects[0].object === atmosphereMesh) {
            isPlanetClicked = true;
        }
    }

    function onMouseUp() {
        if (isPlanetClicked) {
            isPlanetClicked = false;
            inertia();
        }
    }

    function onMouseMove(event) {

        var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        if (isPlanetClicked) {
            speed = 1.5 * (mouseX - SolarEPUtils.mouse.x);
            rotateWithSpeed(speed);
        }

        SolarEPUtils.mouse.x = mouseX;
        SolarEPUtils.mouse.y = mouseY;

        SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);
        var intersects = SolarEPUtils.raycaster.intersectObjects(earthScene.children, true);

        if (intersects === null || intersects.length === 0 || intersects[0].object !== atmosphereMesh) {
            selfRotate = true;
        } else {
            selfRotate = false;
        }
    }


    function rotateWithSpeed(speed) {

        atmosphereMesh.rotation.y += speed;
        earthMesh.rotation.y += speed;
    }

    function inertia() {

        isInertia = true;

        var startSpeed = {speed: speed};
        var endSpeed = {speed: 0};

        var inertiaTween = new TWEEN.Tween(startSpeed).to(endSpeed, 500);
        inertiaTween.easing(TWEEN.Easing.Linear.None);
        inertiaTween.onUpdate(function() {
            atmosphereMesh.rotation.y += this.speed;
            earthMesh.rotation.y += this.speed;
        }).onComplete(function () {
            isInertia = false;
        });

        inertiaTween.start();
    }

    function onMouseWheel() {

        var minScale = 1.3;
        var maxScale = 3;
        var speed = 0.3;
        var delta;

        if (event.wheelDelta) {
            delta = event.wheelDelta / 40;
        } else if (event.detail) {
            delta = -event.detail / 3;
        }

        if (delta > 0 && camera.position.z < maxScale) {
            camera.position.z = Math.min(maxScale, camera.position.z + delta * speed);
        }

        if (delta < 0 && camera.position.z > minScale) {
            camera.position.z = Math.max(minScale, camera.position.z + delta * speed);
        }
    }
};