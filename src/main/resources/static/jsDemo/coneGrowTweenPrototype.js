/**
 * Created by ss on 2017/11/11.
 */
EarthSceneController = function (renderer) {

    var coneRadius = 0.54;
    var coneInitSize = 0.02;

    var coneParameter = {
        areaName: "San Jose",
        latitude: 37.33,
        longitude: -121.88
    };

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();

    var coneMesh;
    var coneInitTweenSize = {size: 1};
    var growUpTween;

    var earthRenderer = renderer;
    var earthScene = init();

    this.animate = earthAnimate;

    // this.increase = increaseConeTween;
    // this.decrease = decreaseConeTween;

    this.startTween = function() {
        growUpTween.start();
    };

    function earthAnimate() {

        requestAnimationFrame(earthAnimate);
        // coneMesh.grow();
        // console.log("=====");
        // console.log(coneMesh.scaleSize);
        // console.log(coneMesh.scale.x);
        // rotateEarth();
        TWEEN.update();
        earthRenderer.render(earthScene, camera);
    }

    function init() {

        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        scene.add(initEarthAggregation());
        addOneCone(coneParameter);

        // growUpTween = coneGrowUpTween();
        // var growDownTween = coneGrowDownTween();
        // growUpTween.chain(growDownTween);
        // growDownTween.chain(growUpTween);


        growUpTween = growUpClickedCone();
        var growDownTween = growDownClickedCone();
        growUpTween.chain(growDownTween);
        growDownTween.chain(growUpTween);

        return scene;
    }

    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }

    // function rotateEarth() {
    //
    //     earthMesh.rotation.y += 0.01;
    //     atmosphereMesh.rotation.y += 0.013;
    //     console.log(earthMesh.rotation.y);
    // }

    function addOneCone(coneParameter) {
        coneMesh = createOneCone(coneParameter);
        coneMesh.lookAt(earthMesh.position);
        coneMesh.rotateX(Math.PI / 2);
        earthMesh.add(coneMesh);
    }

    function coneGrowUpTween() {

        var initPos = coneInitTweenSize;
        var endPos = {size: 1.2};

        var tween = new TWEEN.Tween(initPos)
            .to(endPos, 1000);

        tween.onUpdate(function () {
            coneMesh.scale.set(this.size, this.size, this.size);
            coneMesh.translateY(-coneMesh.initSize / 30);
            coneMesh.rotateY(0.05);
        }).onStart(function() {
            setConeInitPos();
        });

        return tween;
    }

    function coneGrowDownTween() {

        var initPos = coneInitTweenSize;
        var endPos = {size: 1};

        var tween = new TWEEN.Tween(initPos)
            .to(endPos, 1000);

        tween.onUpdate(function () {
            coneMesh.scale.set(this.size, this.size, this.size);
            coneMesh.translateY(coneMesh.initSize / 30);
            coneMesh.rotateY(0.05);
        });

        return tween;
    }

    function growUpClickedCone() {

        var initPos = coneInitTweenSize;
        var endPos = {size: 2};

        var tween = new TWEEN.Tween(initPos)
            .to(endPos, 1000);

        tween.onUpdate(function () {
            coneMesh.scale.set(this.size, this.size, this.size);
            coneMesh.translateY(-coneMesh.initSize / 30);
            coneMesh.rotateY(0.05);
        }).onStart(function() {
            setConeInitPos();
        });

        return tween;
    }

    function growDownClickedCone() {

        var initPos = coneInitTweenSize;
        var endPos = {size: 1};

        var tween = new TWEEN.Tween(initPos)
            .to(endPos, 1000);

        tween.onUpdate(function () {
            coneMesh.scale.set(this.size, this.size, this.size);
            coneMesh.translateY(coneMesh.initSize / 30);
            coneMesh.rotateY(0.05);
        });

        return tween;
    }

    function createOneCone(coneParameters) {

        var texture = new THREE.TextureLoader().load('../images/fadeTest2.jpg');
        texture.flipY = false; //Need to do this to flip texture upside down

        var coneSide = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide
        });
        var green = new THREE.MeshPhongMaterial({color: 0Xff8533});
        var materialsArray = [];
        materialsArray.push(coneSide);
        materialsArray.push(coneSide);
        materialsArray.push(green);

        var coneMesh = new THREE.Mesh(
            new THREE.ConeGeometry(coneInitSize, 3 * coneInitSize, 3 * coneInitSize, 360 * coneInitSize),
            materialsArray
        );

        var position = calculatePosition(coneParameters.latitude, coneParameters.longitude);
        coneMesh.position.set(position.x, position.y, position.z);
        coneMesh.parameters = coneParameters;
        coneMesh.scaleSize = 1.2;

        coneMesh.basicPos = [coneMesh.position.x, coneMesh.position.y, coneMesh.position.z];
        // coneMesh.isGrow = true;
        coneMesh.initSize = coneInitSize;
        // coneMesh.grow = function () {
        //     if (this.scale.x > this.scaleSize) {
        //         this.isGrow = false;
        //     }
        //     if (this.scale.x < 1) {
        //         this.isGrow = true;
        //     }
        //     if (this.isGrow) {
        //         this.scale.set(this.scale.x + 0.005, this.scale.y + 0.005, this.scale.z + 0.005);
        //         this.translateY(-this.initSize / 20);
        //     } else {
        //         this.scale.set(this.scale.x - 0.005, this.scale.y - 0.005, this.scale.z - 0.005);
        //         this.translateY(this.initSize / 20);
        //     }
        // };

        return coneMesh;
    }

    function calculatePosition(latitude, longitude) {
        var phi = (90 - latitude) * (Math.PI / 180);
        var theta = (longitude + 180) * (Math.PI / 180);

        var pointX = -((coneRadius) * Math.sin(phi) * Math.cos(theta));
        var pointY = ((coneRadius) * Math.cos(phi));
        var pointZ = ((coneRadius) * Math.sin(phi) * Math.sin(theta));

        var position = new THREE.Vector3();
        position.x = pointX;
        position.y = pointY;
        position.z = pointZ;

        return position;
    }

    function setConeInitPos() {
        coneMesh.position.x = coneMesh.basicPos[0];
        coneMesh.position.y = coneMesh.basicPos[1];
        coneMesh.position.z = coneMesh.basicPos[2];
    }
};