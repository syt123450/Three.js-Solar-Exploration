/**
 * Created by ss on 2017/10/1.
 */

MoonSceneController = function (renderer) {

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();

    var moonMesh = universeUtils.createDefaultMoon();
    var moonRenderer = renderer;
    var moonScene = init();

    this.animate = animateMoon;

    function init() {

        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        scene.add(moonMesh);

        return scene;
    }

    function animateMoon() {

        requestAnimationFrame(animateMoon);
        rotateMoon();
        moonRenderer.render(moonScene, camera);
    }

    function rotateMoon() {

        moonMesh.rotation.y += 0.001;
    }
};