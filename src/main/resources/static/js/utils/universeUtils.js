/**
 * Created by ss on 2017/9/30.
 */

UniverseUtils = function () {

    var coneRadius = 0.55;
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

    this.createDefaultUniverse = function () {

        var universeMesh = new THREE.Mesh();
        universeMesh.geometry = new THREE.SphereGeometry(90, 64, 64);
        universeMesh.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(
                '../images/galaxy_starfield.png'
            ),
            side: THREE.BackSide
        });
        universeMesh.name = 'universeMesh';
        return universeMesh;
    };

    this.createDefaultCamera = function () {

        var camera = new THREE.PerspectiveCamera();
        camera.fov = 45;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.near = 0.1;
        camera.far = 1500;
        camera.position.set(0, 0, 1.5);
        camera.updateProjectionMatrix();
        camera.name = 'defaultCamera';
        return camera;
    };

    this.createDefaultEarthMesh = function () {

        var earthMesh = new THREE.Mesh();
        earthMesh.geometry = new THREE.SphereGeometry(0.5, 32, 32);
        earthMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                '../images/2_no_clouds_4k.jpg'
            ),
            bumpScale: 0.05,
            bumpMap: new THREE.TextureLoader().load(
                '../images/earthbump1k.jpg'
            ),
            specular: new THREE.Color('grey'),
            specularMap: new THREE.TextureLoader().load(
                '../images/water_4k.png'
            )
        });
	    earthMesh.name = 'defaultEarthMesh';
        return earthMesh;
    };

    this.createDefaultAtmosphere = function () {

        var atmosphereMesh = new THREE.Mesh();
        atmosphereMesh.geometry = new THREE.SphereGeometry(0.504, 32, 32);
        atmosphereMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                '../images/fair_clouds_4k.png'
            ),
            transparent: true
        });
        atmosphereMesh.name = 'atmosphereMesh';
        return atmosphereMesh;
    };

    this.createDefaultMoon = function () {

        var moonMesh = new THREE.Mesh();
        moonMesh.geometry = new THREE.SphereGeometry(0.05, 32, 32);
        moonMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(
                '../images/moonmap2k.jpg'
            ),
            bumpScale: 0.005,
            bumpMap: new THREE.TextureLoader().load(
                '../images/elev_bump_4k.jpg'
            )
        });
	    moonMesh.name = 'moonMesh';
        return moonMesh;
    };

    this.createDefaultMeteors = function () {

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
        meteors.name = 'meteors';
        return meteors;
    };

    this.createDefaultStars = function () {

        var stars = [];
        for (var i = 0; i < starPositions.length; i++) {
            stars[i] = createOneStar();
            stars[i].position.x = starPositions[i][0];
            stars[i].position.y = starPositions[i][1];
            stars[i].position.z = starPositions[i][2];
        }

        stars.flashStars = function () {
            this.forEach(function (star) {
                star.count += Math.random() > 0.5 ? 2 : 3;
                if (star.count > 40) {
                    star.material.color.set(star.material.color.getHex() == 0x727272 ? 0xffffff : 0x727272);
                    star.count = 0;
                }
            });
        };
        return stars;
    };

    this.createOneCone = function (coneParameters) {

        var position = calculatePosition(coneParameters.latitude, coneParameters.longitude);

        var coneMesh = new THREE.Mesh(
            new THREE.ConeGeometry(0.03, 0.1, 0.09, 12),
            new THREE.MeshPhongMaterial({color: 0x085093})
        );

        coneMesh.position.set(position.x, position.y, position.z);

        return coneMesh;
    };

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

    function createOneStar() {

        var star = new THREE.Mesh();
        star.geometry = new THREE.SphereGeometry(0.03, 32, 32);
        star.material = new THREE.MeshBasicMaterial({color: 0x727272});
        star.count = 0;
        addHaloToStar(star);
        return star;
    }

    function createOneMeteor() {

        var meteor = new THREE.Mesh();

        meteor.geometry = new THREE.BoxGeometry(0.4, 0.4, 0.001);
        meteor.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('../images/meteor.png'),
            opacity: 0.9,
            transparent: true
        });

        meteor.position.x = 3 * Math.random();
        meteor.position.y = 3 * Math.random();
        meteor.position.z = -3;

        return meteor;
    }

    function addHaloToStar(star) {

        var spriteMaterial = new THREE.SpriteMaterial(
            {
                map: new THREE.TextureLoader().load('../images/glow.png'),
                useScreenCoordinates: false,
                color: 0xffffff,
                transparent: true,
                opacity: 0.5
            });
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.25, 0.25, 1);
        star.add(sprite);
    }
};