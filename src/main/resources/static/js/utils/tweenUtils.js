/**
 * Created by ss on 2017/11/9.
 */

TweenUtils = function () {

    function createRotationTween(planetMesh, planetAggregation) {
        var rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);

        rotateTween.onUpdate(function () {

            planetMesh.rotation.y += 0.0005;
            planetAggregation.rotation.y += 0.001;
        });

        rotateTween.repeat(Infinity);

        return rotateTween;
    }

    function createInertiaTween(planetAggregation, speed, inertiaControls) {

        var startSpeed = {speed: speed};
        var endSpeed = {speed: 0};

        var inertiaTween = new TWEEN.Tween(startSpeed).to(endSpeed, 500);
        inertiaTween.easing(TWEEN.Easing.Linear.None);
        inertiaTween.onUpdate(function () {
            planetAggregation.rotation.y += this.speed;
        }).onComplete(function () {
            inertiaControls.isInertia = false;
        });

        return inertiaTween;
    }

    function createEarthInertiaTween(earthMesh, atmosphereMesh, speed, inertiaControls) {

        var startSpeed = {speed: speed};
        var endSpeed = {speed: 0};

        var inertiaTween = new TWEEN.Tween(startSpeed).to(endSpeed, 500);
        coneCount++;
        inertiaTween.name = 'inertia ' + coneCount;
        inertiaTween.easing(TWEEN.Easing.Linear.None);
        inertiaTween.onUpdate(function () {
            earthMesh.rotation.y += this.speed;
            atmosphereMesh.rotation.y += this.speed;
        }).onComplete(function () {
            inertiaControls.isInertia = false;
        });

        return inertiaTween;
    }

    function createEarthMeshRotationTween(earthMesh) {
        var rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);
        coneCount++;
        rotateTween.name = 'Earth ' + coneCount;
        rotateTween.onUpdate(function () {

            earthMesh.rotation.y += 0.003;
        }).onStart(function () {
            console.log("start mesh rotation tween.");
        });

        rotateTween.repeat(Infinity);

        return rotateTween;
    }

    function createAtmosphereRotationTween(atmosphereMesh) {
        var rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);
        coneCount++;
        rotateTween.name = 'atmosphere ' + coneCount;
        rotateTween.onUpdate(function () {

            atmosphereMesh.rotation.y += 0.004;
        });

        rotateTween.repeat(Infinity);

        return rotateTween;
    }

    function createMoonRotationTween(moonMesh) {

        var moonRotateRadius = 0.7;
        var rotateTween = new TWEEN.Tween({x: 0})
            .to({x: 1}, 6000);
        coneCount++;
        rotateTween.name = 'moon ' + coneCount;
        rotateTween.onUpdate(function () {

            // Moon Rotation
            moonMesh.rotateY(0.01);

            // Moon Revolution
            var timer = Date.now() * 0.0001;
            moonMesh.position.x = Math.cos(-timer) * moonRotateRadius;
            moonMesh.position.z = Math.sin(-timer) * moonRotateRadius;

            moonMesh.position.x = (Math.sin(-timer) * moonRotateRadius) * Math.cos(Math.PI * 23.5/180);
            moonMesh.position.y = (Math.sin(-timer) * moonRotateRadius) * Math.sin(Math.PI * 23.5/180);
            moonMesh.position.z = -Math.sqrt(Math.pow(moonRotateRadius, 2) - Math.pow(moonMesh.position.x, 2) - Math.pow(moonMesh.position.y, 2));

            if (timer % (2 * Math.PI) >= (Math.PI / 2) && timer % (2 * Math.PI) <= (3 * Math.PI /2)){
                moonMesh.position.z = -moonMesh.position.z;
            }
        });

        rotateTween.repeat(Infinity);

        return rotateTween;
    }

    this.createPlanetRotationTween = createRotationTween;
    this.createPlanetInertiaTween = createInertiaTween;
    this.createEarthInertiaTween = createEarthInertiaTween;
    this.createEarthMeshRotationTween = createEarthMeshRotationTween;
    this.createAtmosphereRotationTween = createAtmosphereRotationTween;
    this.createMoonRotationTween = createMoonRotationTween;
};

