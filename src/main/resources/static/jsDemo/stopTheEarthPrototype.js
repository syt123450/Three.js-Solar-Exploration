/**
 * Created by ss on 2017/9/26.
 */

StopEarthController = function (renderer) {

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var earthRenderer = renderer;
    var earthScene = init();

    this.animate = earthAnimate;

    function earthAnimate() {

        requestAnimationFrame(earthAnimate);
        rotateEarthWithStop();
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

    function addEvent() {

        document.addEventListener('mousemove', onMouseMove, false);
    }

    function onMouseMove() {

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

};