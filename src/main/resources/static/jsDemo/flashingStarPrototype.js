/**
 * Created by ss on 2017/9/28.
 */

EarthSceneController = function (renderer) {

    var starPositions = [
        [-7, 3, -15], [-8, 4, -16],
        [-9, 2, -14], [-10, 3, -15], [-8, 4, -10],
        [-9, 5, -15],
        [-6, -3, -15], [-6, -4, -15], [-7, -2, -15],
        [-10, 0, -15], [-8, -4, -13],
        [7, 3, -15], [8, 4, -16], [9, 2, -14],
        [12, 3, -15], [3, 4, -11], [9, 5, -15],
        [8, -4, -15], [7, -2, -15], [10, 0, -15],
        [8, -4, -13], [6, -3, -15]];

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = createDefaultStars();
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
        // add stars to the scene
        stars.forEach(function addStar(star) {
            scene.add(star);
        });
        scene.add(initEarthAggregation());
        // scene.add(createStars());

        console.log(stars);

        return scene;
    }

    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }

    // function createStars() {
    //     var star = new THREE.Sprite();
    //
    //     star.material = new THREE.SpriteMaterial({
    //         color: 0xAAAAAA,
    //         opacity: 0.9,
    //         transparent: true,
    //         map: new THREE.TextureLoader().load('../images/glow.png')
    //     });
    //
    //     star.scale.set(0.5, 0.5, 0.001);
    //     star.position.set(0, 0, 0);
    //
    //     return star;
    // }

    function createDefaultStars () {

        var stars = [];
        for (var i = 0; i < starPositions.length; i++) {
            stars[i] = createOneStar();
            stars[i].position.set(starPositions[i][0], starPositions[i][1], starPositions[i][2]);
        }

        stars.flashStars = function () {

            this.forEach(function (star) {
                star.count += Math.random() > 0.5 ? 2 : 3;
                if (star.count > 30) {
                    star.material.color.set(Math.round(Math.random() * 256) * 0x010101);
                    star.count = 0;
                }
            });
        };

        return stars;
    }

    function createOneStar() {

        var star = new THREE.Sprite();

        star.material = new THREE.SpriteMaterial({
            color: 0xffffff,
            opacity: 0.9,
            transparent: true,
            map: new THREE.TextureLoader().load('../images/glow.png')
        });

        star.scale.set(0.15, 0.15, 0.0001);
        star.count = 0;

        return star;
    }
};