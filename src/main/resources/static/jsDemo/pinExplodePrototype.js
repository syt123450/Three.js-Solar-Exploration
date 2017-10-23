PinController = function (renderer) {

    var latitude = 37.3382, longitude = -121.8863;
    var radius = 0.55;
    var position = initPosition(latitude, longitude);

    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var earthMesh = universeUtils.createDefaultEarthMesh();
    var atmosphereMesh = universeUtils.createDefaultAtmosphere();
    var cone = initCone();
    var flag = initFlag();

    var pinRenderer = renderer;
    var pinScene = init();
    var grow = true; //Allow the cone to grow when loaded

    var particles = [];
    var clock = new THREE.Clock();
    var timeNow = clock.getElapsedTime();


    this.animate = pinAnimate;

    function pinAnimate() {

        requestAnimationFrame(pinAnimate);
        rotateEarth();
        rotateCone();
        growPin();
        explosion();
        pinRenderer.render(pinScene, camera);
    }

    function init() {

        earthMesh.add(cone);
        earthMesh.add(flag);

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

        return aggregation;
    }

    function initPosition(latitude, longitude) {
        var phi = (90 - latitude) * (Math.PI / 180);
        var theta = (longitude + 180) * (Math.PI / 180);

        var pointX = -((radius) * Math.sin(phi) * Math.cos(theta));
        var pointY = ((radius) * Math.cos(phi));
        var pointZ = ((radius) * Math.sin(phi) * Math.sin(theta));

        var position = new THREE.Vector3();
        position.x = pointX;
        position.y = pointY;
        position.z = pointZ;

        return position;
    }

    function initCone() {

        var coneMesh = new THREE.Mesh(
            new THREE.ConeGeometry( 0.03, 0.1, 0.09, 12 ),
            // new THREE.MeshBasicMaterial ({wireframe: true})
            new THREE.MeshPhongMaterial( { color: 0x085093 } )
        );

        coneMesh.position.set(position.x, position.y, position.z);
        coneMesh.lookAt(earthMesh.position);

        coneMesh.rotateX(Math.PI / 2);

        return coneMesh;
    }

    function initFlag() {

        var flagMesh = new THREE.Mesh(
            new THREE.BoxGeometry( 0.12, 0.052, 0.012 ),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load(
                        '../images/californiaFlag.png'
                    ),
                    side: THREE.BackSide
                }
            )
        );

        var flagPosition = new THREE.Vector3();

        flagPosition.x = position.x + 0.02;
        flagPosition.y = position.y + 0.04;
        flagPosition.z = position.z + 0.14;

        flagMesh.position.set(flagPosition.x, flagPosition.y, flagPosition.z);

        return flagMesh;
    }

    function rotateEarth() {

        earthMesh.rotation.y += 0.003;
        atmosphereMesh.rotation.y += 0.003;
    }

    function rotateCone() {

        cone.rotateY(0.05);
    }

    function growPin() {

        if(cone.scale.x > 2) {
            grow = false;
            explode(cone.position);
        }
        if(cone.scale.x < 1) {
            grow = true;
        }
        if(grow) {
            cone.scale.x += 0.01;
            cone.scale.y += 0.01;
            cone.scale.z += 0.01;
            cone.translateY(-.00055);
        }else{
            cone.scale.x -= 0.01;
            cone.scale.y -= 0.01;
            cone.scale.z -= 0.01;
            cone.translateY(.00055);
        }
    }

    function explode(point){

        for (var i = 0; i < 4; i++) {
            var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
            var material = new THREE.MeshBasicMaterial({
                color: 0x999999
            });
            var part = new THREE.Mesh(geometry, material);
            part.position.x = point.x;
            part.position.y = point.y;
            part.position.z = point.z;
            part.name = "part" + i;
            part.birthDay = timeNow;
            earthMesh.add(part);
            particles.push(part);
            console.log("created", i)
        }
    }

    function explosion(){
        if (particles.length > 0) {
            earthMesh.remove();
            console.log("particles")
            particles.forEach(function(elem, index, array) {
                switch (elem.name) {
                    case "part0":
                        elem.position.x += 0.1;
                        //elem.rotateX(1);
                        elem.rotation.y += 0.1;
                        elem.rotation.z += 0.1;
                        console.log("part0")
                        break;
                    case "part1":
                        elem.position.x -= 3;
                        console.log("part1")
                        break;
                    case "part2":
                        elem.position.y += 3;
                        console.log("part2")
                        break;
                    case "part3":
                        elem.position.y -= 3;
                        console.log("part3")
                        break;
                    default:
                        break;
                }

            if (elem.birthDay - clock.getElapsedTime() < -3) {
                earthMesh.remove(elem);
                particles.splice(index, 1);
            }

        })
    }}



   function Particle(){
        var geom = new THREE.TetrahedronGeometry(3,0);
        var mat = new THREE.MeshPhongMaterial({
            color:0x009999,
            shininess:0,
            specular:0xffffff,
            shading:THREE.FlatShading
        });
        this.mesh = new THREE.Mesh(geom,mat);
    }
    //
    // Particle.prototype.explode = function(pos, color, scale){
    //     var _this = this;
    //     var _p = this.mesh.parent;
    //     this.mesh.material.color = new THREE.Color( color);
    //     this.mesh.material.needsUpdate = true;
    //     this.mesh.scale.set(scale, scale, scale);
    //     var targetX = pos.x + (-1 + Math.random()*2)*50;
    //     var targetY = pos.y + (-1 + Math.random()*2)*50;
    //     var speed = .6+Math.random()*.2;
    //     TweenMax.to(this.mesh.rotation, speed, {x:Math.random()*12, y:Math.random()*12});
    //     TweenMax.to(this.mesh.scale, speed, {x:.1, y:.1, z:.1});
    //     TweenMax.to(this.mesh.position, speed, {x:targetX, y:targetY, delay:Math.random() *.1, ease:Power2.easeOut, onComplete:function(){
    //         if(_p) _p.remove(_this.mesh);
    //         _this.mesh.scale.set(1,1,1);
    //         particlesPool.unshift(_this);
    //     }});
    // }
    //
    // function ParticlesHolder(){
    //     this.mesh = new THREE.Object3D();
    //     this.particlesInUse = [];
    // }




};
