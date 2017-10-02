/**
 * Created by ss on 2017/9/28.
 */

EarthSceneController = function (renderer) {

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();
    var earthRenderer = renderer;
    var earthScene = init();

    this.animate = earthAnimate;

    function earthAnimate() {

        requestAnimationFrame(earthAnimate);
        //let stars to flash
        stars.flashStars();
        earthRenderer.render(earthScene, camera);
    }

    function init() {

        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        //add stars to the scene
        stars.forEach(function addStar(star) {
            scene.add(star);
        });
        scene.add(initEarthAggregation());

        return scene;
    }

    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }
};