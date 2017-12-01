/**
 * Created by ss on 2017/10/26.
 */

var SolarConfig = {

    sunRadius: 0.05,
    revolutionSpeed: -1,
    audio: "../music/Epic.mp3",

    ConfigHelper: {
        sun: function (sunRadius) {
            return {
                name: 'sun',
                rotateSpeed: 0.001,
                map: '../images/fire2.jpg',
                radius: sunRadius
            }
        },

        mercury: function (sunRadius, revolutionSpeed) {
            return {
                name: 'mercury',
                orbitRadius: sunRadius + 0.025,
                orbitAngle: 0,
                // orbitSpeed: (365/88) * revolutionSpeed,
                // orbitSpeed: 4.148 * revolutionSpeed,
                orbitSpeed: 3 * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/planets-min/mercurymap.jpg',
                bumpMap: '../images/planets-min/mercurybump.jpg',
                radius: 0.005
            }
        },

        venus: function (sunRadius, revolutionSpeed) {
            return {
                name: 'venus',
                orbitRadius: sunRadius + 0.044,
                orbitAngle: 0,
                // orbitSpeed: (365/224.7) * revolutionSpeed,
                orbitSpeed: 1.624 * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/planets-min/venusmap.jpg',
                bumpMap: '../images/planets-min/venusbump.jpg',
                radius: 0.008
            }
        },

        earth: function (sunRadius, revolutionSpeed) {
            return {
                name: 'earth',
                orbitRadius: sunRadius + 0.073,
                orbitAngle: 0,
                orbitSpeed: 1.0 * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/earthmap1k.jpg',
                bumpMap: '../images/earthbump1k.jpg',
                radius: 0.009
            }
        },

        mars: function (sunRadius, revolutionSpeed) {
            return {
                name: 'mars',
                orbitRadius: sunRadius + 0.0925,
                orbitAngle: 0,
                // orbitSpeed: (365/687) * revolutionSpeed,
                orbitSpeed: 0.531 * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/planets-min/marsmap1k.jpg',
                bumpMap: '../images/planets-min/marsbump1k.jpg',
                radius: 0.0055
            }
        },

        asteroidBelt: function (sunRadius) {
            return {
                name: 'asteroidBelt',
                color: 0xffffcc,
                size: 0.0001,
                cloudNumber: 9,
                cloudSize: 500,
                orbitRadius: sunRadius + 0.12,
                orbitRadiusWidth: 0.04,
                orbitRadiusThickness: 0.002,
                orbitSpeed: 0.00001
            }
        },

        jupiter: function (sunRadius, revolutionSpeed) {
            return {
                name: 'jupiter',
                orbitRadius: sunRadius + 0.2,
                orbitAngle: 0,
                // orbitSpeed: (365/4332) * revolutionSpeed,
                // orbitSpeed: 0.0843 * revolutionSpeed,
                orbitSpeed: 0.125 * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/planets-min/jupitermap.jpg',
                radius: 0.02
            }
        },

        saturn: function (sunRadius, revolutionSpeed) {
            return {
                name: 'saturn',
                orbitRadius: sunRadius + 0.275,
                orbitAngle: 0,
                // orbitSpeed: (365/10760) * revolutionSpeed,
                // orbitSpeed: 0.0339 * revolutionSpeed,
                orbitSpeed: 0.085 * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/planets-min/saturnmap.jpg',
                radius: 0.018,
                ringMap: '../images/planets-min/saturnringcolortransRing.png',
                ringInnerRadius: 0.0216,
                ringOuterRadius: 0.0432
            }
        },

        uranus: function (sunRadius, revolutionSpeed) {
            return {
                name: 'uranus',
                orbitRadius: sunRadius + 0.35,
                orbitAngle: 0,
                // orbitSpeed: (365/30700) * revolutionSpeed,
                // orbitSpeed: 0.0119 * revolutionSpeed,
                orbitSpeed: 0.05 * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/planets-min/uranusmap.jpg',
                radius: 0.012,
                ringMap: '../images/planets-min/uranusringcolortransRing.png',
                ringInnerRadius: 0.0156,
                ringOuterRadius: 0.024
            }
        },

        neptune: function (sunRadius, revolutionSpeed) {

            return {
                name: 'neptune',
                orbitRadius: sunRadius + 0.415,
                orbitAngle: 0,
                // orbitSpeed: (365/60200) * revolutionSpeed,
                // orbitSpeed: 0.00606 * revolutionSpeed,
                orbitSpeed: 0.03 * revolutionSpeed,
                rotateSpeed: 0.01,
                map: '../images/planets-min/neptunemap.jpg',
                radius: 0.012
            }
        },

        pluto: function (sunRadius, revolutionSpeed) {

            return {
                name: 'pluto',
                orbitRadius: sunRadius + 0.46,
                orbitAngle: 0,
                // orbitSpeed: (365/90600) * revolutionSpeed,
                // orbitSpeed: (0.00403) * revolutionSpeed,
                orbitSpeed: (0.01) * revolutionSpeed,
                rotateSpeed: 0.05,
                map: '../images/planets-min/plutomap1k.jpg',
                bumpMap: '../images/planets-min/plutobump1k.jpg',
                radius: 0.003
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