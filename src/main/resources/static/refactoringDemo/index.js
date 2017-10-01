/**
 * Created by ss on 2017/10/1.
 */

var utils = new Utils();
renderer = utils.createDefaultRenderer();

var earthSceneController = new EarthSceneController(renderer);
var moonSceneController = new MoonSceneController(renderer);
earthSceneController.animate();
setTimeout(moonSceneController.animate, 5000);