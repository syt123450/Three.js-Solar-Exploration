/**
 * Created by ss on 2017/10/26.
 */

var SolarConfig = {

    sunRadius: 0.25,
    audio: "../music/Epic.mp3",

    ConfigHelper: {
        sun: function (sunRadius) {
            return {
                rotateSpeed: 0.001,
                map: '../images/fire2.jpg',
                radius: sunRadius
            }
        },

        mercury: function (sunRadius) {
            return {
                orbitRadius: sunRadius + 0.125,
                orbitAngle: 0,
                orbitSpeed: -1.5,
                rotateSpeed: 0.05,
                map: '../images/planets/mercurymap.jpg',
                bumpMap: '../images/planets/mercurybump.jpg',
                radius: 0.025
            }
        },

        venus: function (sunRadius) {
            return {
                orbitRadius: sunRadius + 0.22,
                orbitAngle: 0,
                orbitSpeed: -0.9,
                rotateSpeed: 0.05,
                map: '../images/planets/venusmap.jpg',
                bumpMap: '../images/planets/venusbump.jpg',
                radius: 0.04
            }
        },

        earth: function (sunRadius) {
            return {
                orbitRadius: sunRadius + 0.365,
                orbitAngle: 0,
                orbitSpeed: -0.45,
                rotateSpeed: 0.05,
                map: '../images/earthmap1k.jpg',
                bumpMap: '../images/earthbump1k.jpg',
                radius: 0.045
            }
        },

        mars: function (sunRadius) {
            return {
                orbitRadius: sunRadius + 0.4625,
                orbitAngle: 0,
                orbitSpeed: -0.25,
                rotateSpeed: 0.05,
                map: '../images/planets/marsmap1k.jpg',
                bumpMap: '../images/planets/marsbump1k.jpg',
                radius: 0.0275
            }
        },

        asteroidBelt: function (sunRadius) {
            return {
                color: 0xffffcc,
                size: 0.01,
                cloudNumber: 9,
                cloudSize: 500,
                orbitRadius: sunRadius + 0.6,
                orbitRadiusWidth: 0.2,
                orbitRadiusThickness: 0.01,
                orbitSpeed: 0.00001
            }
        },

        jupiter: function (sunRadius) {
            return {
                orbitRadius: sunRadius + 1,
                orbitAngle: 0,
                orbitSpeed: -0.15,
                rotateSpeed: 0.05,
                map: '../images/planets/jupitermap.jpg',
                radius: 0.1
            }
        },

        saturn: function (sunRadius) {
            return {
                orbitRadius: sunRadius + 1.375,
                orbitAngle: 0,
                orbitSpeed: -0.09,
                rotateSpeed: 0.05,
                map: '../images/planets/saturnmap.jpg',
                radius: 0.09,
                ringMap: '../images/planets/saturnringcolortransRing.png',
                ringInnerRadius: 0.108,
                ringOuterRadius: 0.216
            }
        },

        uranus: function (sunRadius) {
            return {
                orbitRadius: sunRadius + 1.75,
                orbitAngle: 0,
                orbitSpeed: -0.06,
                rotateSpeed: 0.05,
                map: '../images/planets/uranusmap.jpg',
                radius: 0.06,
                ringMap: '../images/planets/uranusringcolortransRing.png',
                ringInnerRadius: 0.078,
                ringOuterRadius: 0.12
            }
        },

        neptune: function (sunRadius) {

            return {
                orbitRadius: sunRadius + 2.075,
                orbitAngle: 0,
                orbitSpeed: -0.04,
                rotateSpeed: 0.05,
                map: '../images/planets/neptunemap.jpg',
                radius: 0.06
            }
        },

        pluto: function (sunRadius) {

            return {
                orbitRadius: sunRadius + 2.3,
                orbitAngle: 0,
                orbitSpeed: -0.02,
                rotateSpeed: 0.05,
                map: '../images/planets/plutomap1k.jpg',
                bumpMap: '../images/planets/plutobump1k.jpg',
                radius: 0.015
            }
        }
    },

    init: function() {
        this.sun = this.ConfigHelper.sun(this.sunRadius);
        this.mercury = this.ConfigHelper.mercury(this.sunRadius);
        this.venus = this.ConfigHelper.venus(this.sunRadius);
        this.earth = this.ConfigHelper.earth(this.sunRadius);
        this.mars = this.ConfigHelper.mars(this.sunRadius);
        this.asteroidBelt = this.ConfigHelper.asteroidBelt(this.sunRadius);
        this.jupiter = this.ConfigHelper.jupiter(this.sunRadius);
        this.saturn = this.ConfigHelper.saturn(this.sunRadius);
        this.uranus = this.ConfigHelper.uranus(this.sunRadius);
        this.neptune = this.ConfigHelper.neptune(this.sunRadius);
        this.pluto = this.ConfigHelper.pluto(this.sunRadius);
    }
};

SolarConfig.init();