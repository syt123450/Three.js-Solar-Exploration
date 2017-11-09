/**
 * 10/17/2017
 * Bo
 * @param renderer
 * @constructor
 */
PinController = function (renderer) {
    var coneInitSize = 0.015;
    var grow = true;
    var allowExplode = false;
    var startExplode = false;
    var explodeStageOne = new THREE.TextureLoader().load('../images/explosion/2_no_clouds_4k - explode_stage_one.jpg');
    var explodeStageTwo = new THREE.TextureLoader().load('../images/explosion/2_no_clouds_4k - explode_stage_two.jpg');
    var explodeStageThree = new THREE.TextureLoader().load('../images/explosion/2_no_clouds_4k - explode_stage_three.jpg');
    var explodeStageFour = new THREE.TextureLoader().load('../images/explosion/2_no_clouds_4k - explode_stage_four.jpg');
    /** CONSTANTS **/
    var RADIUS = 0.55;
    var OBLIUITY = 23.5; // degrees
    var EARTH_ROTATION_SPEED = 0.005;
    var CONE_INIT_LATITUDE = 20,
        CONE_INIT_LONGITUDE = -80;
    var CAMERA_INIT_POSITION = new THREE.Vector3(0, 0, 2);
    /** CONSTANTS **/

    /** Create earth scene **/
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();
    var pinRenderer = renderer;
    var earthAggregation = initEarthAggregation();
    var pinScene = init();
    /** Create earth scene **/

    var particles = [];
    var clock = new THREE.Clock();
    var explodeStart = clock;
    var timeNow;

    /**
     * dirty code
     */

    var count = 0;
    var enableEarthRotation = true;

    /**
     * dirty code
     */

    this.animate = pinAnimate;

    function init() {
        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        scene.add(earthAggregation);
        return scene;
    }

    function initEarthAggregation() {
        var aggregation = new THREE.Object3D();
        aggregation.add(earthMesh);
        aggregation.add(atmosphereMesh);
        aggregation.rotateZ(-Math.PI * OBLIUITY / 180);

        return aggregation;
    }

    function pinAnimate() {

        requestAnimationFrame(pinAnimate);

        if (enableEarthRotation) {
            rotateEarth();
        }

        if (startExplode){
            explosion(cone.point);
        }


        growPin();
        _rotateCone();

        pinRenderer.render(pinScene, camera);

    }

    function rotateEarth() {
        earthMesh.rotation.y += EARTH_ROTATION_SPEED;
        atmosphereMesh.rotation.y += EARTH_ROTATION_SPEED;
    }

    /****************************
     * **************************
     * Custom code
     * **************************
     ***************************/
    var raycaster, mouse;

    var cone;

    _initCone(CONE_INIT_LATITUDE, CONE_INIT_LONGITUDE);

    _initRaycaster();

    _addAxisHelperTo(earthMesh);

    _addConeAndFlagTo(earthMesh);

    _registerMouseDownListener(_onMouseDown('ROTATE_EARTH'));

    addExplosion(earthMesh.position, "earth");


    /*******************************
     * Method declarations
     ******************************/

    // Init cone to specified latitude and longitude
    function _initCone(latitude, longitude) {
        var texture = new THREE.TextureLoader().load('../images/fadeTest2.jpg');
        texture.flipY = false; //Need to do this to flip texture upside down
        var coneSide = new THREE.MeshPhongMaterial( { map: texture, side: THREE.DoubleSide } );
        var coneBottom = new THREE.MeshPhongMaterial( { color: 0Xff8533});
        var materialsArray = [];
        materialsArray.push(coneSide);
        materialsArray.push(coneSide);
        materialsArray.push(coneBottom);

        var coneMesh = new THREE.Mesh(
            new THREE.ConeGeometry( coneInitSize, 3 * coneInitSize, 3 * coneInitSize, 360 * coneInitSize ),
            materialsArray
        );

        coneMesh.name = 'coneMesh';
        console.log('cone init position: ', _getCartesianCoordinates(latitude, longitude));
        _setObjectPosition(
            coneMesh,
            _getCartesianCoordinates(latitude, longitude)
        );

        coneMesh.lookAt(earthMesh.position);
        coneMesh.rotateX(Math.PI / 2);
        cone = coneMesh;
    }

    function _initRaycaster() {
        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
    }

    // Add cone and flag to earth
    function _addConeAndFlagTo(target) {
        target.add(cone);
        // earthMesh.add(flag);
    }

    function _addAxisHelperTo(target) {
        _setObjectPosition(camera, CAMERA_INIT_POSITION);
        var sphereAxis = new THREE.AxisHelper(0.8);
        target.add(sphereAxis);
    }

    function _getCartesianCoordinates(latitude, longitude) {
        var phi = (90 - latitude) * (Math.PI / 180);
        var theta = (longitude + 180) * (Math.PI / 180);

        return new THREE.Vector3(
            - RADIUS * Math.sin(phi) * Math.cos(theta),
            RADIUS * Math.cos(phi),
            RADIUS * Math.sin(phi) * Math.sin(theta)
        );
    }

    function _setObjectPosition(obj, position, offset) {
        offset = offset || new THREE.Vector3(0, 0, 0);
        obj.position.set(
            position.x + offset.x,
            position.y + offset.y,
            position.z + offset.z
        );
    }

    function _rotateCone() {
        cone.rotateY(0.05);
    }

    // mouse down event handler
    function _onMouseDown(strategy) {

        return function () {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

            if (_isTargetClicked(cone)) {
                console.log("test");
                console.log(earthMesh);
                earthMesh.material.map = new THREE.TextureLoader().load('../images/explosion/2_no_clouds_4k - explode_stage_one.jpg');    //make red earth image
                earthAggregation.remove(atmosphereMesh);

                console.log("test2");
            }

            if (_isTargetClicked(earthMesh)) {
                startExplode = true;
                explodeStart = clock.getElapsedTime();
                earthAggregation.remove(atmosphereMesh);
                // earthAggregation.remove(earthMesh); //TODO
            }

            // if (_isTargetClicked(cone)) {
            //     addExplosion(cone.position, "cone");
            //     earthMesh.remove(cone);
            // }
        }
    }

    function _isTargetClicked(target) {

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(earthAggregation.children, true); //earthMesh, earthAggregation
        var intersects2 = raycaster.intersectObjects(earthMesh.children, false);

        console.log(intersects);

        if (target === intersects2[1].object) {
            console.log(intersects2[1].object);
            return true;
        }

        for (var i = 0; i < intersects.length; i++) {
            if (intersects[i].object.name === "coneMesh")
            {
                console.log("test");
                return false;
            }else{
                if (target === intersects[i].object) {
                    return true;
                }
            }

        }
        return false;
    }

    function _registerMouseDownListener(callback) {
        document.addEventListener('mousedown', callback);
    }

    function addExplosion(point, blowUp){

        timeNow = clock.getElapsedTime();
        console.log(timeNow);
        var texture = new THREE.TextureLoader().load('../images/boulderTexture.jpg');
        for (var i = 0; i < 47; i++) {
            var geometry = new THREE.OctahedronGeometry(0.05, 1);
            var material = new THREE.MeshPhongMaterial( { map: texture, side: THREE.DoubleSide } );
            var part = new THREE.Mesh(geometry, material);
            part.position.x = point.x;
            part.position.y = point.y;
            part.position.z = point.z;
            part.name = "part" + i;
            part.birthDay = timeNow;
            //Because of raycaster limitation we need the if else statement to identify if the cone is blowing up or the earth is blowing up
            if (blowUp === "cone") {
                earthMesh.add(part);
            }else{
                earthAggregation.add(part);
            }

            particles.push(part);

        }
       }
    function growPin() {

        if(cone.scale.x > 1.2) {
            grow = false;
        }
        if(cone.scale.x < 1) {
            grow = true;
        }
        if(grow) {
            cone.scale.x += 0.005;
            cone.scale.y += 0.005;
            cone.scale.z += 0.005;

            cone.translateY(-coneInitSize/20);
            // cone.translateY(-0.0005);
        }else{
            cone.scale.x -= 0.005;
            cone.scale.y -= 0.005;
            cone.scale.z -= 0.005;
            cone.translateY(coneInitSize/20);
            // cone.translateY(0.0005);
        }
    }

    function explosion(point){

        if (earthMesh.scale.x > 0.15){
            earthMesh.scale.x -= 0.005;
            earthMesh.scale.y -= 0.005;
            earthMesh.scale.z -= 0.005;
        }

        if (earthMesh.scale.x < 1 && earthMesh.scale.x > 0.8)
        {
            earthMesh.material.map = explodeStageOne;
        }

        if (earthMesh.scale.x < 0.8 && earthMesh.scale.x > 0.6)
        {
            earthMesh.material.map = explodeStageTwo;
        }

        if (earthMesh.scale.x < 0.6 && earthMesh.scale.x > 0.3)
        {
            earthMesh.material.map = explodeStageThree;

        }

        if (earthMesh.scale.x < 0.16)
        {
            earthAggregation.remove(earthMesh);
            allowExplode = true;
        }

        if (allowExplode === true){
            var explosionSpeed = 0.02;   //0.02
            if (particles.length > 0) {
                // console.log("particles")
                particles.forEach(function(elem, index, array) {
                    switch (elem.name) {
                        case "part0":
                            elem.position.x += explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part1":
                            elem.position.y += explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part2":
                            elem.position.z -= explosionSpeed; //need to change
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part3":
                            elem.position.x -= explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part4":
                            elem.position.y -= explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part5":
                            elem.position.z -= explosionSpeed; //finished on axis
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part6":
                            elem.position.x += explosionSpeed; //
                            elem.position.y += explosionSpeed;
                            elem.position.z += explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part7":
                            elem.position.x -= explosionSpeed; //
                            elem.position.y += explosionSpeed;
                            elem.position.z += explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part8":
                            elem.position.x -= explosionSpeed; //
                            elem.position.y -= explosionSpeed;
                            elem.position.z += explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part9":
                            elem.position.x -= explosionSpeed; //
                            elem.position.y -= explosionSpeed;
                            elem.position.z -= explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part10":
                            elem.position.x += explosionSpeed; //
                            elem.position.y -= explosionSpeed;
                            elem.position.z += explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part11":
                            elem.position.x += explosionSpeed; //
                            elem.position.y -= explosionSpeed;
                            elem.position.z -= explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part12":
                            elem.position.x += explosionSpeed; //
                            elem.position.y += explosionSpeed;
                            elem.position.z -= explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part13":
                            elem.position.x -= explosionSpeed; //
                            elem.position.y += explosionSpeed;
                            elem.position.z -= explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part14":
                            elem.position.x -= explosionSpeed/2; //////////////////////////////////////////////
                            elem.position.y += explosionSpeed;
                            elem.position.z -= explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part15":
                            elem.position.x -= explosionSpeed; //
                            elem.position.y += explosionSpeed/2;
                            elem.position.z -= explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part16":
                            elem.position.x -= explosionSpeed; //
                            elem.position.y += explosionSpeed;
                            elem.position.z -= explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part17":
                            elem.position.x -= explosionSpeed/2; //
                            elem.position.y += explosionSpeed/2;
                            elem.position.z -= explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part18":
                            elem.position.x -= explosionSpeed; //
                            elem.position.y += explosionSpeed/2;
                            elem.position.z -= explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part19":
                            elem.position.x -= explosionSpeed/2; //
                            elem.position.y += explosionSpeed;
                            elem.position.z -= explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part20":
                            elem.position.x -= explosionSpeed/2; //
                            elem.position.y -= explosionSpeed;
                            elem.position.z -= explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part21":
                            elem.position.x -= explosionSpeed; //
                            elem.position.y -= explosionSpeed/2;
                            elem.position.z -= explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part22":
                            elem.position.x -= explosionSpeed; //
                            elem.position.y -= explosionSpeed;
                            elem.position.z -= explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part23":
                            elem.position.x -= explosionSpeed/2; //
                            elem.position.y -= explosionSpeed/2;
                            elem.position.z -= explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part24":
                            elem.position.x -= explosionSpeed/2; //
                            elem.position.y -= explosionSpeed;
                            elem.position.z -= explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part25":
                            elem.position.x -= explosionSpeed/2; //
                            elem.position.y -= explosionSpeed;
                            elem.position.z += explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part26":
                            elem.position.x -= explosionSpeed; //
                            elem.position.y -= explosionSpeed/2;
                            elem.position.z += explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part27":
                            elem.position.x -= explosionSpeed; //
                            elem.position.y -= explosionSpeed;
                            elem.position.z += explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part28":
                            elem.position.x -= explosionSpeed/2; //
                            elem.position.y -= explosionSpeed/2;
                            elem.position.z += explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part29":
                            elem.position.x -= explosionSpeed/2; //
                            elem.position.y -= explosionSpeed;
                            elem.position.z += explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part30":
                            elem.position.x -= explosionSpeed; //
                            elem.position.y -= explosionSpeed/2;
                            elem.position.z += explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part31":
                            elem.position.x -= explosionSpeed/2; //
                            elem.position.y -= explosionSpeed;
                            elem.position.z += explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part32":
                            elem.position.x -= explosionSpeed; //
                            elem.position.y -= explosionSpeed/2;
                            elem.position.z += explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part33":
                            elem.position.x -= explosionSpeed; //
                            elem.position.y -= explosionSpeed;
                            elem.position.z += explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part34":
                            elem.position.x += explosionSpeed/2; //
                            elem.position.y -= explosionSpeed/2;
                            elem.position.z -= explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part35":
                            elem.position.x += explosionSpeed/2; //
                            elem.position.y -= explosionSpeed;
                            elem.position.z -= explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part36":
                            elem.position.x += explosionSpeed; //
                            elem.position.y -= explosionSpeed/2;
                            elem.position.z -= explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part37":
                            elem.position.x += explosionSpeed/2; ///////////////////////////////
                            elem.position.y += explosionSpeed;
                            elem.position.z += explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part38":
                            elem.position.x += explosionSpeed; //
                            elem.position.y += explosionSpeed/2;
                            elem.position.z += explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part39":
                            elem.position.x += explosionSpeed; //
                            elem.position.y += explosionSpeed;
                            elem.position.z += explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part40":
                            elem.position.x += explosionSpeed/2; //
                            elem.position.y += explosionSpeed/2;
                            elem.position.z += explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part41":
                            elem.position.x += explosionSpeed/2; //
                            elem.position.y += explosionSpeed;
                            elem.position.z += explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part42":
                            elem.position.x += explosionSpeed; //
                            elem.position.y += explosionSpeed/2;
                            elem.position.z += explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part43":
                            elem.position.x += explosionSpeed/2; //
                            elem.position.y += explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part44":
                            elem.position.x += explosionSpeed; //
                            elem.position.y += explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part45":                          ////////////////
                            elem.position.x += explosionSpeed/2; //
                            elem.position.y -= explosionSpeed;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part46":
                            elem.position.x += explosionSpeed; //
                            elem.position.y -= explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;
                        case "part47":
                            elem.position.x += explosionSpeed/2; //
                            elem.position.y -= explosionSpeed/2;
                            elem.rotateX(0.1);
                            elem.rotateY(0.1);
                            break;

                        default:
                            break;
                    }
                    console.log(timeNow);
                    console.log(clock.getElapsedTime());
                    if (explodeStart - clock.getElapsedTime() < -5) {
                        earthAggregation.remove(elem);
                        particles.splice(index, 1);
                    }

                })
            }
        }
    }


};
