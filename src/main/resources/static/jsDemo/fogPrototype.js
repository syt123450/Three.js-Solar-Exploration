/**
 * Created by ss on 2017/11/30.
 */

EarthSceneController = function (renderer) {
    var light = new THREE.AmbientLight(0xffffff);
    var camera = UniverseUtils.createDefaultCamera();
    var universeMesh = UniverseUtils.createDefaultUniverse();
    var earthMesh = UniverseUtils.createDefaultEarthMesh();
    var atmosphereMesh = UniverseUtils.createDefaultAtmosphere();
    var earthRenderer = renderer;
    var earthScene = init();

    this.animate = earthAnimate;

    function earthAnimate() {

        requestAnimationFrame(earthAnimate);

        TWEEN.update();
        rotateEarth();

        earthRenderer.render(earthScene, camera);
    }

    function init() {

        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        //add stars to the scene

        scene.add(initEarthAggregation());

        scene.fog = new THREE.Fog(0x000000, -500, 100);

        // scene.fog.near = 0;

        return scene;
    }

    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }

    function rotateEarth(){
        earthMesh.rotation.y += 0.0055;
        atmosphereMesh.rotation.y += 0.0045;
        universeMesh.rotation.y += 0.0002;
    }
};