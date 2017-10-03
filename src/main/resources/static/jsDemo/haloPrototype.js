/**
 * Updated: 10/1/2017
 * Bo
 */
HaloController = function (renderer) {

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

        return scene;
    }

    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * 23.5 / 180);

        addHalo(aggregation);

        return aggregation;
    }

    function addHalo(aggregation) {

        var spriteMaterial = new THREE.SpriteMaterial(
            {
                map: new THREE.TextureLoader().load('../images/glow.png'),
                useScreenCoordinates: false,
                color: 0x0000ff,
                transparent: false,
            });
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(2, 2, 1);
        aggregation.add(sprite);

    }
};