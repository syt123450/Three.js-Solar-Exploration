/**
 * Created by ss on 2017/11/15.
 */

EarthSceneController = function (renderer) {

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();

    var earthRenderer = renderer;
    var earthScene = init();

    this.animate = earthAnimate;

    function earthAnimate() {

        requestAnimationFrame(earthAnimate);
        rotateEarth();
        earthRenderer.render(earthScene, camera);
    }

    function init() {

        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        scene.add(initEarthAggregation());
        // scene.add(createFilter());

        // scene.fog(0xffffff, 1, 100);

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

        earthMesh.rotation.y += 0.01;
        atmosphereMesh.rotation.y += 0.013;
    }

    // function createFilter() {
    //
    //     var filter = new THREE.Mesh();
    //     filter.geometry = new THREE.SphereGeometry(90, 0.01, 0.01);
    //     filter.material = new THREE.MeshBasicMaterial({
    //         map: new THREE.TextureLoader().load(
    //             '../images/galaxy_starfield.png'
    //         ),
    //         side: THREE.BackSide
    //     });
    //
    //     filter.position.set(0, 0, 1.5);
    //
    //     return filter;
    // }
};