/**
 * Created by ss on 2017/10/1.
 */

Utils = function () {

    this.createDefaultRenderer = function () {

        var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('sceneArea'), antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        return renderer;
    };
};