/**
 * Created by ss on 2017/11/3.
 */

EarthSceneController = function (renderer) {

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var meteors = universeUtils.createDefaultMeteors();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = createDefaultMeteors();

    var earthRenderer = renderer;
    var earthScene = init();

    this.animate = earthAnimate;

    function earthAnimate() {

        requestAnimationFrame(earthAnimate);

        TWEEN.update();

        // meteors.sweepMeteors();
        earthRenderer.render(earthScene, camera);
    }

    function init() {

        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        //add meteors to the scene
        meteors.forEach(function addMeteor(meteor) {
            scene.add(meteor);
        });
        scene.add(initEarthAggregation());

        initTween();

        return scene;
    }

    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }

    function initTween() {

        var startPos = {xPos: 0};
        var endPos = {xPos: 2 * Math.PI};

        rotateTween = new TWEEN.Tween(startPos).to(endPos, 2000);
        rotateTween.easing(TWEEN.Easing.Linear.None);
        rotateTween.onUpdate(function() {
            earthMesh.rotation.y = this.xPos;
            atmosphereMesh.rotation.y = this.xPos;
        });

        rotateTween.repeat(Infinity);
        rotateTween.start();

        rotateTween.onStart(function() {

        });
    }

    function createDefaultMeteors () {

        var meteors = [];
        meteors[0] = createOneMeteor();
        meteors[1] = createOneMeteor();

        meteors.sweepMeteors = function () {

            this.forEach(function (meteor) {
                if (meteor.position.x <= -4) {
                    meteor.position.x = 3 * Math.random();
                    meteor.position.y = 3 * Math.random();
                }

                meteor.position.x -= 0.01;
                meteor.position.y -= 0.01;
            });
        };

        return meteors;
    }

    function createOneMeteor() {

        var meteor = new THREE.Mesh();

        meteor.geometry = new THREE.BoxGeometry(0.4, 0.4, 0.001);
        meteor.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('../images/meteor.png'),
            opacity: 0.9,
            transparent: true
        });

        meteor.position.x = -4;
        meteor.position.y = -4;
        meteor.position.z = -3;

        return meteor;
    }
};