/**
 * Created by ss on 2017/10/26.
 */

var SolarConfig = {

    sunRadius: 0.25,
    revolutionSpeed: -1,
    audio: "../music/Epic.mp3",

    ConfigHelper: {
        sun: function (sunRadius) {
            return {
                rotateSpeed: 0.001,
                map: '../images/fire2.jpg',
                radius: sunRadius
            }
        },

        mercury: function (sunRadius, revolutionSpeed) {
            return {
                orbitRadius: sunRadius + 0.125,
                orbitAngle: 0,
                // orbitSpeed: (365/88) * revolutionSpeed,
                // orbitSpeed: 4.148 * revolutionSpeed,
                orbitSpeed: 3 * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/planets/mercurymap.jpg',
                bumpMap: '../images/planets/mercurybump.jpg',
                radius: 0.025
            }
        },

        venus: function (sunRadius, revolutionSpeed) {
            return {
                orbitRadius: sunRadius + 0.22,
                orbitAngle: 0,
                // orbitSpeed: (365/224.7) * revolutionSpeed,
                orbitSpeed: 1.624 * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/planets/venusmap.jpg',
                bumpMap: '../images/planets/venusbump.jpg',
                radius: 0.04
            }
        },

        earth: function (sunRadius, revolutionSpeed) {
            return {
                orbitRadius: sunRadius + 0.365,
                orbitAngle: 0,
                orbitSpeed: 1.0 * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/earthmap1k.jpg',
                bumpMap: '../images/earthbump1k.jpg',
                radius: 0.045
            }
        },

        mars: function (sunRadius, revolutionSpeed) {
            return {
                orbitRadius: sunRadius + 0.4625,
                orbitAngle: 0,
                // orbitSpeed: (365/687) * revolutionSpeed,
                orbitSpeed: 0.531 * revolutionSpeed,
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

        jupiter: function (sunRadius, revolutionSpeed) {
            return {
                orbitRadius: sunRadius + 1,
                orbitAngle: 0,
                // orbitSpeed: (365/4332) * revolutionSpeed,
                // orbitSpeed: 0.0843 * revolutionSpeed,
                orbitSpeed: 0.125 * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/planets/jupitermap.jpg',
                radius: 0.1
            }
        },

        saturn: function (sunRadius, revolutionSpeed) {
            return {
                orbitRadius: sunRadius + 1.375,
                orbitAngle: 0,
                // orbitSpeed: (365/10760) * revolutionSpeed,
                // orbitSpeed: 0.0339 * revolutionSpeed,
                orbitSpeed: 0.085 * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/planets/saturnmap.jpg',
                radius: 0.09,
                ringMap: '../images/planets/saturnringcolortransRing.png',
                ringInnerRadius: 0.108,
                ringOuterRadius: 0.216
            }
        },

        uranus: function (sunRadius, revolutionSpeed) {
            return {
                orbitRadius: sunRadius + 1.75,
                orbitAngle: 0,
                // orbitSpeed: (365/30700) * revolutionSpeed,
                // orbitSpeed: 0.0119 * revolutionSpeed,
                orbitSpeed: 0.05 * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/planets/uranusmap.jpg',
                radius: 0.06,
                ringMap: '../images/planets/uranusringcolortransRing.png',
                ringInnerRadius: 0.078,
                ringOuterRadius: 0.12
            }
        },

        neptune: function (sunRadius, revolutionSpeed) {

            return {
                orbitRadius: sunRadius + 2.075,
                orbitAngle: 0,
                // orbitSpeed: (365/60200) * revolutionSpeed,
                // orbitSpeed: 0.00606 * revolutionSpeed,
                orbitSpeed: 0.03 * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/planets/neptunemap.jpg',
                radius: 0.06
            }
        },

        pluto: function (sunRadius, revolutionSpeed) {

            return {
                orbitRadius: sunRadius + 2.3,
                orbitAngle: 0,
                // orbitSpeed: (365/90600) * revolutionSpeed,
                // orbitSpeed: (0.00403) * revolutionSpeed,
                orbitSpeed: (0.01) * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/planets/plutomap1k.jpg',
                bumpMap: '../images/planets/plutobump1k.jpg',
                radius: 0.015
            }
        }
    },

    init: function() {
        this.sun = this.ConfigHelper.sun(this.sunRadius);
        this.mercury = this.ConfigHelper.mercury(this.sunRadius, this.revolutionSpeed);
        this.venus = this.ConfigHelper.venus(this.sunRadius, this.revolutionSpeed);
        this.earth = this.ConfigHelper.earth(this.sunRadius, this.revolutionSpeed);
        this.mars = this.ConfigHelper.mars(this.sunRadius, this.revolutionSpeed);
        this.asteroidBelt = this.ConfigHelper.asteroidBelt(this.sunRadius);
        this.jupiter = this.ConfigHelper.jupiter(this.sunRadius, this.revolutionSpeed);
        this.saturn = this.ConfigHelper.saturn(this.sunRadius, this.revolutionSpeed);
        this.uranus = this.ConfigHelper.uranus(this.sunRadius, this.revolutionSpeed);
        this.neptune = this.ConfigHelper.neptune(this.sunRadius, this.revolutionSpeed);
        this.pluto = this.ConfigHelper.pluto(this.sunRadius, this.revolutionSpeed);
    }
};

SolarConfig.init();