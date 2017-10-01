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
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var earthRenderer = renderer;
    var earthScene = init();

    this.animate = earthAnimate;

    function earthAnimate() {

        requestAnimationFrame(earthAnimate);
        flashStars();
        sweepMeteors();
        rotateEarthWithStop();
        rotateMoon();
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

    function flashStars() {

        for (var i = 0; i < stars.length; i++) {
            stars[i].count += Math.random() > 0.5 ? 2 : 3;
            if (stars[i].count > 40) {
                stars[i].material.color.set(stars[i].material.color.getHex() == 0xd3d3d3 ? 0xffffff : 0xd3d3d3);
                stars[i].count = 0;
            }
        }
    }

    function sweepMeteors() {

        for (var i = 0; i < meteors.length; i++) {
            sweepOneMeteor(meteors[i]);
        }
    }

    function sweepOneMeteor(meteor) {

        if (meteor.position.x <= -4) {
            meteor.position.x = 3 * Math.random();
            meteor.position.y = 3 * Math.random();
        }

        meteor.position.x -= 0.01;
        meteor.position.y -= 0.01;
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

    function addEvent() {
        document.addEventListener('mousemove', onMouseMove, false);
    }

    function onMouseMove() {

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
};