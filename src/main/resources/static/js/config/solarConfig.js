/**
 * Created by ss on 2017/10/26.
 */

var SolarConfig = {

    sunRadius: 5,
    audio: "../music/Epic.mp3",

    ConfigHelper: {
        sun: function (sunRadius) {
            return {
                rotateSpeed: 0.05,
                map: '../images/fire2.jpg',
                radius: sunRadius
            }
        },

        mercury: function (sunRadius) {
            return {
                orbitRadius: sunRadius + 2.45,
                orbitAngle: 0,
                orbitSpeed: -1.5,
                rotateSpeed: 0.05,
                map: '../images/planets/mercurymap.jpg',
                bumpMap: '../images/planets/mercurybump.jpg',
                radius: 0.5
            }
        },

        venus: function (sunRadius) {
            return {
                orbitRadius: sunRadius + 4.4,
                orbitAngle: 0,
                orbitSpeed: -0.9,
                rotateSpeed: 0.05,
                map: '../images/planets/venusmap.jpg',
                bumpMap: '../images/planets/venusbump.jpg',
                radius: 0.8
            }
        },

        earth: function (sunRadius) {
            return {
                orbitRadius: sunRadius + 7.3,
                orbitAngle: 0,
                orbitSpeed: -0.45,
                rotateSpeed: 0.05,
                map: '../images/earthmap1k.jpg',
                bumpMap: '../images/earthbump1k.jpg',
                radius: 0.9
            }
        },

        mars: function (sunRadius) {
            return {
                orbitRadius: sunRadius + 9.25,
                orbitAngle: 0,
                orbitSpeed: -0.25,
                rotateSpeed: 0.05,
                map: '../images/planets/marsmap1k.jpg',
                bumpMap: '../images/planets/marsbump1k.jpg',
                radius: 0.55
            }
        },

        asteroidBelt: function (sunRadius) {
            return {
                color: 0xffffcc,
                size: 0.1,
                cloudNumber: 9,
                cloudSize: 500,
                orbitRadius: sunRadius + 12,
                orbitRadiusWidth: 4,
                orbitRadiusThickness: 0.2,
                orbitSpeed: 0.00001
            }
        },

        jupiter: function (sunRadius) {
            return {
                orbitRadius: sunRadius + 20,
                orbitAngle: 0,
                orbitSpeed: -0.15,
                rotateSpeed: 0.05,
                map: '../images/planets/jupitermap.jpg',
                radius: 2
            }
        },

        saturn: function (sunRadius) {
            return {
                orbitRadius: sunRadius + 27.5,
                orbitAngle: 0,
                orbitSpeed: -0.09,
                rotateSpeed: 0.05,
                map: '../images/planets/saturnmap.jpg',
                radius: 1.8,
                ringMap: '../images/planets/saturnringcolortransRing.png',
                ringInnerRadius: 2.16,
                ringOuterRadius: 4.32
            }
        },

        uranus: function (sunRadius) {
            return {
                orbitRadius: sunRadius + 35,
                orbitAngle: 0,
                orbitSpeed: -0.06,
                rotateSpeed: 0.05,
                map: '../images/planets/uranusmap.jpg',
                radius: 1.2,
                ringMap: '../images/planets/uranusringcolortransRing.png',
                ringInnerRadius: 1.56,
                ringOuterRadius: 2.4
            }
        },

        neptune: function (sunRadius) {

            return {
                orbitRadius: sunRadius + 41.5,
                orbitAngle: 0,
                orbitSpeed: -0.04,
                rotateSpeed: 0.05,
                map: '../images/planets/neptunemap.jpg',
                radius: 1.2
            }
        },

        pluto: function (sunRadius) {

            return {
                orbitRadius: sunRadius + 46,
                orbitAngle: 0,
                orbitSpeed: -0.02,
                rotateSpeed: 0.05,
                map: '../images/planets/plutomap1k.jpg',
                bumpMap: '../images/planets/plutobump1k.jpg',
                radius: 0.3
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