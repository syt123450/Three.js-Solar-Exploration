/**
 * Created by ss on 2017/10/26.
 */

var SolarConfig = {

    sunRadius: 0.05,
    revolutionSpeed: -0.5,
    rotationSpeed: 0.025,
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

        mercury: function (sunRadius, revolutionSpeed, rotationSpeed) {
            return {
                name: 'mercury',
                orbitRadius: sunRadius + 0.025,
                orbitAngle: 18,
                // orbitSpeed: (365/88) * revolutionSpeed,
                // orbitSpeed: 4.148 * revolutionSpeed,
                orbitSpeed: 1.2 * revolutionSpeed,
                rotateSpeed: 2 * rotationSpeed,
                inclination: 0.0,
                map: '../images/planets-min/mercurymap.jpg',
                bumpMap: '../images/planets-min/mercurybump.jpg',
                radius: 0.006
            }
        },

        venus: function (sunRadius, revolutionSpeed, rotationSpeed) {
            return {
                name: 'venus',
                orbitRadius: sunRadius + 0.044,
                orbitAngle: 183,
                // orbitSpeed: (365/224.7) * revolutionSpeed,
                orbitSpeed: 0.8 * revolutionSpeed,
                rotateSpeed: -3 * rotationSpeed,
                inclination: -12.6,
                map: '../images/planets-min/venusmap.jpg',
                bumpMap: '../images/planets-min/venusbump.jpg',
                radius: 0.0085
            }
        },

        earth: function (sunRadius, revolutionSpeed, rotationSpeed) {
            return {
                name: 'earth',
                orbitRadius: sunRadius + 0.073,
                orbitAngle: 72,
                orbitSpeed: 0.6 * revolutionSpeed,
                rotateSpeed: rotationSpeed,
                inclination: 23.5,
                map: '../images/earthmap1k.jpg',
                bumpMap: '../images/earthbump1k.jpg',
                radius: 0.0095
            }
        },

        mars: function (sunRadius, revolutionSpeed, rotationSpeed) {
            return {
                name: 'mars',
                orbitRadius: sunRadius + 0.0925,
                orbitAngle: 291,
                // orbitSpeed: (365/687) * revolutionSpeed,
                orbitSpeed: 0.531 * revolutionSpeed,
                rotateSpeed: 1.03 * rotationSpeed,
                inclination: 23.98,
                map: '../images/planets-min/marsmap1k.jpg',
                bumpMap: '../images/planets-min/marsbump1k.jpg',
                radius: 0.006
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
                orbitSpeed: 0.00002
            }
        },

        jupiter: function (sunRadius, revolutionSpeed, rotationSpeed) {
            return {
                name: 'jupiter',
                orbitRadius: sunRadius + 0.2,
                orbitAngle: 233,
                // orbitSpeed: (365/4332) * revolutionSpeed,
                // orbitSpeed: 0.0843 * revolutionSpeed,
                orbitSpeed: 0.125 * revolutionSpeed,
                rotateSpeed: 0.4 * rotationSpeed,
                inclination: 3.8,
                map: '../images/planets-min/jupitermap.jpg',
                radius: 0.02
            }
        },

        saturn: function (sunRadius, revolutionSpeed, rotationSpeed) {
            return {
                name: 'saturn',
                orbitRadius: sunRadius + 0.275,
                orbitAngle: 355,
                // orbitSpeed: (365/10760) * revolutionSpeed,
                // orbitSpeed: 0.0339 * revolutionSpeed,
                orbitSpeed: 0.105 * revolutionSpeed,
                rotateSpeed: 0.44 * rotationSpeed,
                inclination: 26.73,
                map: '../images/planets-min/saturnmap.jpg',
                radius: 0.018,
                ringMap: '../images/planets-min/saturnringcolortransRing.png',
                ringInnerRadius: 0.0216,
                ringOuterRadius: 0.0432
            }
        },

        uranus: function (sunRadius, revolutionSpeed, rotationSpeed) {
            return {
                name: 'uranus',
                orbitRadius: sunRadius + 0.35,
                orbitAngle: 102,
                // orbitSpeed: (365/30700) * revolutionSpeed,
                // orbitSpeed: 0.0119 * revolutionSpeed,
                orbitSpeed: 0.080 * revolutionSpeed,
                rotateSpeed: -0.72 * rotationSpeed,
                inclination: -7.92,
                map: '../images/planets-min/uranusmap.jpg',
                radius: 0.012,
                ringMap: '../images/planets-min/uranusringcolortransRing.png',
                ringInnerRadius: 0.0156,
                ringOuterRadius: 0.024
            }
        },

        neptune: function (sunRadius, revolutionSpeed, rotationSpeed) {

            return {
                name: 'neptune',
                orbitRadius: sunRadius + 0.415,
                orbitAngle: 47,
                // orbitSpeed: (365/60200) * revolutionSpeed,
                // orbitSpeed: 0.00606 * revolutionSpeed,
                orbitSpeed: 0.070 * revolutionSpeed,
                rotateSpeed: 0.72 * rotationSpeed,
                inclination: 28.8,
                map: '../images/planets-min/neptunemap.jpg',
                radius: 0.012
            }
        },

        pluto: function (sunRadius, revolutionSpeed, rotationSpeed) {

            return {
                name: 'pluto',
                orbitRadius: sunRadius + 0.46,
                orbitAngle: 89,
                // orbitSpeed: (365/90600) * revolutionSpeed,
                // orbitSpeed: (0.00403) * revolutionSpeed,
                orbitSpeed: 0.08 * revolutionSpeed,
                rotateSpeed: -2 * rotationSpeed,
                inclination: 58,
                map: '../images/planets-min/plutomap1k.jpg',
                bumpMap: '../images/planets-min/plutobump1k.jpg',
                radius: 0.01
            }
        }
    },

    init: function() {
        this.sun = this.ConfigHelper.sun(this.sunRadius);
        this.mercury = this.ConfigHelper.mercury(this.sunRadius, this.revolutionSpeed, this.rotationSpeed);
        this.venus = this.ConfigHelper.venus(this.sunRadius, this.revolutionSpeed, this.rotationSpeed);
        this.earth = this.ConfigHelper.earth(this.sunRadius, this.revolutionSpeed, this.rotationSpeed);
        this.mars = this.ConfigHelper.mars(this.sunRadius, this.revolutionSpeed, this.rotationSpeed);
        this.asteroidBelt = this.ConfigHelper.asteroidBelt(this.sunRadius);
        this.jupiter = this.ConfigHelper.jupiter(this.sunRadius, this.revolutionSpeed, this.rotationSpeed);
        this.saturn = this.ConfigHelper.saturn(this.sunRadius, this.revolutionSpeed, this.rotationSpeed);
        this.uranus = this.ConfigHelper.uranus(this.sunRadius, this.revolutionSpeed, this.rotationSpeed);
        this.neptune = this.ConfigHelper.neptune(this.sunRadius, this.revolutionSpeed, this.rotationSpeed);
        this.pluto = this.ConfigHelper.pluto(this.sunRadius, this.revolutionSpeed, this.rotationSpeed);
    }
};

SolarConfig.init();