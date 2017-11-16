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

    function createInertiaTween(planetAggregation, speed, tweenControls) {

        var startSpeed = {speed: speed};
        var endSpeed = {speed: 0};

        var inertiaTween = new TWEEN.Tween(startSpeed).to(endSpeed, 500);
        inertiaTween.easing(TWEEN.Easing.Linear.None);
        inertiaTween.onUpdate(function () {
            planetAggregation.rotation.y += this.speed;
        }).onComplete(function () {
            tweenControls.isInertia = false;
        });

        return inertiaTween;
    }

    this.createPlanetRotationTween = createRotationTween;
    this.createPlanetInertiaTween = createInertiaTween;
};

