/**
 * Created by ss on 2017/11/9.
 */

EarthSceneController = function (renderer) {

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();
    var listener = new THREE.AudioListener();
    var sound = new THREE.Audio(listener);

    var earthRenderer = renderer;
    var earthScene = init();

    this.animate = earthAnimate;

    function earthAnimate() {

        requestAnimationFrame(earthAnimate);
        earthRenderer.render(earthScene, camera);
    }

    function init() {

        var scene = new THREE.Scene();
        scene.add(light);
        loadAudio();
        camera.add(listener);
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

        return aggregation;
    }

    function loadAudio() {
        sound.setLoop(true);
        var loader = new THREE.AudioLoader();

        loader.load(
            "../music/Finale.mp3",
            function (audioBuffer) {
                sound.setBuffer(audioBuffer);
                sound.play();
            }
        )
    }
};