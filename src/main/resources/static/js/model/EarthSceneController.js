/**
 * Created by ss on 2017/9/29.
 */

EarthSceneController = function (renderer) {

    var moonRotateRadius = 0.7;

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();
    var moonMesh = universeUtils.createDefaultMoon();

    var coneList = [];

    var earthRenderer = renderer;
    var earthScene = init();

    var enableNormalAnimate = true;
    var yHistory;

    this.activateScene = activateScene;

    function activateScene() {

        $("#timeLine").show();
        EventManager.removeEvents();
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        addEvent();
        animate();
    }

    this.addCones = function (conesParameter) {
        coneList.forEach(function(cone) {
            earthMesh.remove(cone);
        });
        conesParameter.forEach(function (coneParameter) {
            addOneCone(coneParameter);
        });
    };

    this.clearCones = function () {
        coneList.forEach(function (cone) {
            earthMesh.remove(cone);
        });
        coneList = [];
    };

    function animate() {

        SolarEPUtils.animationFrame = requestAnimationFrame(animate);

        if (enableNormalAnimate) {
            stars.flashStars();
            meteors.sweepMeteors();
            rotateEarthWithStop();
            rotateMoon();
            animateCones();
        }

        TWEEN.update();

        earthRenderer.render(earthScene, camera);
    }

    function init() {

        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        stars.forEach(function addStar(star) {
            scene.add(star);
        });
        meteors.forEach(function addMeteor(meteor) {
            scene.add(meteor);
        });
        scene.add(initEarthAggregation());
        scene.add(moonMesh);

        return scene;
    }

    function initEarthAggregation() {

        var aggregation = new THREE.Object3D();
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }

    function rotateEarthWithStop() {

        SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);
        var intersects = SolarEPUtils.raycaster.intersectObjects(earthScene.children, true);

        if (intersects === null || intersects.length === 0 || intersects[0].object !== atmosphereMesh) {
            rotateEarth();
        }
    }

    function rotateEarth() {

        earthMesh.rotation.y += 0.001;
        atmosphereMesh.rotation.y += 0.001;
    }

    function rotateMoon() {

        moonMesh.rotateY(0.01);
        var timer = Date.now() * 0.0001;
        moonMesh.position.x = Math.cos(-timer) * moonRotateRadius;
        moonMesh.position.z = Math.sin(-timer) * moonRotateRadius;
    }

    function addOneCone(coneParameter) {
        var coneObject = universeUtils.createOneCone(coneParameter);
        coneObject.lookAt(earthMesh.position);
        coneObject.rotateX(Math.PI / 2);
        coneList.push(coneObject);
        earthMesh.add(coneObject);
    }

    function animateCones() {

        coneList.forEach(function (cone) {
            cone.rotate();
            cone.grow();
        });
    }

    function addEvent() {

        EventManager.registerEvent('mousemove', onMouseMove);
        EventManager.registerEvent('mousedown', onMouseDown);
    }

    function onMouseMove() {

        SolarEPUtils.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        SolarEPUtils.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function onMouseDown() {
        SolarEPUtils.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        SolarEPUtils.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);
        var intersects = SolarEPUtils.raycaster.intersectObjects(earthScene.children, true);

        coneList.forEach(function (cone) {
            if (intersects[0].object === cone) {
                console.log("find a clicked cone.");
                enableNormalAnimate = false;
                addTextToBoard(cone.parameters);
                showInfo(cone.parameters.latitude, cone.parameters.longitude);
            }
        });
    }

    function addTextToBoard(coneParameters) {

        console.log(coneParameters);
        $("#flag").attr("src", coneParameters.flagPath);
        $("#latitude").text("Latitude: " + coneParameters.latitude);
        $("#longitude").text("Longitude: " + coneParameters.longitude);
        $("#total").text("Total Amount: " + coneParameters.amount);
        $("#coal").text("Coal Amount: " + coneParameters.coalAmount);
        $("#oil").text("Oil Amount: " + coneParameters.oilAmount);
        $("#gas").text("Gas Amount: " + coneParameters.gasAmount);
    }

    function showInfo(latitude, longitude) {
        $("#infoBoard").animate({width:'toggle'},350);
        infoBoard = true;
        moveEarth(latitude, longitude);
    }

    this.restoreEarth = function () {
        resumeFromOnConeClicked(yHistory);
    };

    function moveEarth(latitude, longitude) {
        console.log(latitude + "," + longitude);
        yHistory = onConeClicked(latitude, longitude);
    }

    function onConeClicked(coneInitialLatitude, coneInitialLongitude) {
        console.log('cone clicked');
        /************************
         * CONSTANTS
         ************************/
        var ANIMATION_DURATION = 3000;
        var OBLIUITY = 23.5;

        var slideLeftDistance = 0.8;
        var yRotationAdjustmentInDegree = 0;
        slideLeftDistance = slideLeftDistance || 0.8;
        yRotationAdjustmentInDegree = yRotationAdjustmentInDegree || 0;
        var _yAxisRotationHistory = earthMesh.rotation.y;

        TWEEN.removeAll(); // In case cone is clicked before last animation completes

        /***********************************************
         * Rotate around Z-axis of the earthAggregation
         **********************************************/
        var _initialZAxisRotation = - OBLIUITY / 180 * Math.PI;
        var _finalZAxisRotation = 0;
        var _zAxisStart = {z: _initialZAxisRotation};
        var _zAxisFinal = {z: _finalZAxisRotation};
        var _tweenRotateZ = new TWEEN.Tween(_zAxisStart)
            .to(_zAxisFinal, ANIMATION_DURATION)
            .start();
        _tweenRotateZ.onUpdate(function () {
            earthMesh.parent.rotation.z = _zAxisStart.z;
        });

        /***********************************************
         * Rotate around Y-axis of earthMesh
         **********************************************/
        var _initialYAxisRotation = _yAxisRotationHistory;
        var _finalYAxisRotation = - (90 + coneInitialLongitude + yRotationAdjustmentInDegree) / 180 * Math.PI;
        while (_initialYAxisRotation - _finalYAxisRotation >= Math.PI * 2) {
            _finalYAxisRotation += Math.PI * 2;
        }
        var _yAxisStart = {y: _initialYAxisRotation};
        var _yAxisFinal = {y: _finalYAxisRotation};
        var _tweenRotateY = new TWEEN.Tween(_yAxisStart)
            .to(_yAxisFinal, ANIMATION_DURATION)
            .start();
        _tweenRotateY.onUpdate(function() {
            earthMesh.rotation.y = _yAxisStart.y;
            atmosphereMesh.rotation.y = _yAxisStart.y;
        });

        /***********************************************
         * Rotate around Y-axis of earthMesh
         **********************************************/
        var _initialTranslation = 0;
        var _finalTranslation = - slideLeftDistance;
        var _translationStart = {t: _initialTranslation};
        var _translationFinal = {t: _finalTranslation};
        var tweenTranslation = new TWEEN.Tween(_translationStart)
            .to(_translationFinal, ANIMATION_DURATION)
            .start();
        tweenTranslation
            .onUpdate(function() {
                earthMesh.parent.position.x = _translationStart.t;
            });

        _tweenRotateZ.chain(
            _tweenRotateY.chain(
                tweenTranslation
            )
        );

        return _yAxisRotationHistory;
    }

    /**
     * @param yRotationHistoryInRadian: How much the Earth have rotated when the cone is clicked
     */
    function resumeFromOnConeClicked(yRotationHistoryInRadian) {

        /************************
         * CONSTANTS
         ************************/
        var ANIMATION_DURATION = 3000;
        var OBLIUITY = 23.5;

        var yRotationAdjustmentInDegree = 0;
        TWEEN.removeAll(); // In case cone is clicked before last animation completes


        /***********************************************
         * Rotate around Y-axis of earthMesh
         **********************************************/
        var _initialYAxisRotation = earthMesh.rotation.y;
        var _finalYAxisRotation = yRotationHistoryInRadian + (yRotationAdjustmentInDegree / 180 * Math.PI);
        var _yAxisStart = {y: _initialYAxisRotation};
        var _yAxisFinal = {y: _finalYAxisRotation};
        var _tweenRotateY = new TWEEN.Tween(_yAxisStart)
            .to(_yAxisFinal, ANIMATION_DURATION)
            .start();
        _tweenRotateY.onUpdate(function() {
            earthMesh.rotation.y = _yAxisStart.y;
            atmosphereMesh.rotation.y = _yAxisStart.y;
        });

        /***********************************************
         * Rotate around Z-axis of the earthAggregation
         **********************************************/
        var _initialZAxisRotation = 0;
        var _finalZAxisRotation = - OBLIUITY / 180 * Math.PI;
        var _zAxisStart = {z: _initialZAxisRotation};
        var _zAxisFinal = {z: _finalZAxisRotation};
        var _tweenRotateZ = new TWEEN.Tween(_zAxisStart)
            .to(_zAxisFinal, ANIMATION_DURATION)
            .start();
        _tweenRotateZ.onUpdate(function () {
            earthMesh.parent.rotation.z = _zAxisStart.z;
        });

        /***********************************************
         * Rotate around Y-axis of earthMesh
         **********************************************/
        var _initialTranslation = earthMesh.parent.position.x;
        var _finalTranslation = 0;
        var _translationStart = {t: _initialTranslation};
        var _translationFinal = {t: _finalTranslation};
        var _tweenTranslation = new TWEEN.Tween(_translationStart)
            .to(_translationFinal, ANIMATION_DURATION)
            .start();
        _tweenTranslation.onUpdate(function() {
            earthMesh.parent.position.x = _translationStart.t;
        });

        _tweenRotateY.chain(
            _tweenRotateZ.chain(
                _tweenTranslation
            )
        );
    }
};