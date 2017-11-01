/**
 * Created by ss on 2017/10/31.
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
        TWEEN.update();
        earthRenderer.render(earthScene, camera);
    }

    function init() {

        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        scene.add(initEarthAggregation());
        initTween();

        return scene;
    }

    function initTween() {

        var startAngle = {yAngle: 0};
        var endAngle = {yAngle: 2 * Math.PI};

        var rotateTween = new TWEEN.Tween(startAngle).to(endAngle, 5000);
        rotateTween.easing(TWEEN.Easing.Linear.None);
        rotateTween.onUpdate(function() {
            if (earthMesh.rotation.y > 2 * Math.PI) {
                earthMesh.rotation.y = 0;
                atmosphereMesh.rotation.y = 0;
            }
            earthMesh.rotation.y = this.yAngle;
            atmosphereMesh.rotation.y = this.yAngle;
            console.log(earthMesh.rotation.y);
        });
        
        rotateTween.repeat(Infinity);
        rotateTween.start();
    }

    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }
};