/**
 * Created by ss on 2017/10/26.
 */

SolarConfig = {

    sunRadius: 5,

    mercury: {
        orbitRadius: this.sunRadius + 2,
        orbitAngle: 0,
        orbitSpeed: - 3,
        rotateSpeed: 0.05
    },

    venus: {
        orbitRadius: this.sunRadius +4.5,
        orbitAngle: 0,
        orbitSpeed: - 1.9,
        rotateSpeed: 0.05
    },

    earth: {
        orbitRadius: this.sunRadius +7.5,
        orbitAngle: 0,
        orbitSpeed: - 1,
        rotateSpeed: 0.05
    },

    mars: {
        orbitRadius: this.sunRadius +11,
        orbitAngle: 0,
        orbitSpeed: - 0.5,
        rotateSpeed: 0.05
    },

    jupiter: {
        orbitRadius: this.sunRadius +16,
        orbitAngle: 0,
        orbitSpeed: - 0.3,
        rotateSpeed: 0.05
    },

    saturn: {
        orbitRadius: this.sunRadius +21,
        orbitAngle: 0,
        orbitSpeed: - 0.17,
        rotateSpeed: 0.05
    },

    uranus: {
        orbitRadius: this.sunRadius +25.5,
        orbitAngle: 0,
        orbitSpeed: - 0.12,
        rotateSpeed: 0.05
    },

    neptune: {
        orbitRadius: this.sunRadius +30,
        orbitAngle: 0,
        orbitSpeed: - 0.08,
        rotateSpeed: 0.05
    },

    pluto: {
        orbitRadius: this.sunRadius +33.5,
        orbitAngle: 0,
        orbitSpeed: - 0.04,
        rotateSpeed: 0.05
    }
};