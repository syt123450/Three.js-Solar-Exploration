/**
 * Created by ss on 2017/11/3.
 */

EventUtils = function() {

    this.defaultOnMouseWheel = function () {

        var minScale = 1.3;
        var maxScale = 2;
        var speed = 0.3;
        var delta;

        if ( event.wheelDelta ) {
            delta = event.wheelDelta / 40;
        } else if ( event.detail ) {
            delta = - event.detail / 3;
        }

        if (delta > 0 && camera.position.z < maxScale) {
            camera.position.z = Math.min(maxScale, camera.position.z + delta * speed);
        }

        if (delta < 0 && camera.position.z > minScale) {
            camera.position.z = Math.max(minScale, camera.position.z + delta * speed);
        }
    }


};