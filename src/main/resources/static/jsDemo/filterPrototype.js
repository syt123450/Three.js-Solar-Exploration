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
        scene.add(createFilter());

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

    function createFilter() {

        var filter = new THREE.Mesh();

        // filter.material = new THREE.SpriteMaterial({
        //     color: 0x000000,
        //     // opacity: 0.9,
        //     // transparent: true,
        //     // map: new THREE.TextureLoader().load('../images/glow.png')
        // });

        filter.geometry = new THREE.BoxGeometry(5, 5, 0.001);
        filter.material = new THREE.MeshBasicMaterial({
            // map: new THREE.TextureLoader().load('../images/meteor.png'),
            color: 0x000000,
            // opacity: 0.9,
            // transparent: true
        });

        // filter.scale.set(100, 100, 1);
        filter.position.x = 0;
        filter.position.x = 0;
        filter.position.x = 1;

        return filter;
    }
};