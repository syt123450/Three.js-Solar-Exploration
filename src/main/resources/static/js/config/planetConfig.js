/**
 * Created by ss on 2017/10/30.
 */

var PlanetConfig = {
    mercury: {
        planetName: 'Mercury',
        map: '../images/planets/mercurymap.jpg',
        bumpMap: '../images/planets/mercurybump.jpg',
        radius: 0.25,
        inclination: 0.0,
        innerGlowColor: "#F8D6B3",
        outerGlowColor: "#AE8045",
        audio: "../music/Mercury.mp3",
        infoBoard: "#mercuryBoard",
        closeInfoId: "#mercuryBoard img",
        closeHoverImg: "../images/closeButton/mercury_hover.png",
        closeNormalImg: "../images/closeButton/mercury.png"
    },

    venus: {
        planetName: 'Venus',
        map: '../images/planets/venusmap.jpg',
        bumpMap: '../images/planets/venusbump.jpg',
        radius: 0.28,
        inclination: -12.6,
        innerGlowColor: "#FBCA64",
        outerGlowColor: "#C68424",
        audio: "../music/Venus.mp3",
        infoBoard: "#venusBoard",
        closeInfoId: "#venusBoard img",
        closeHoverImg: "../images/closeButton/venus_hover.png",
        closeNormalImg: "../images/closeButton/venus.png"
    },

    mars: {
        planetName: 'Mars',
        map: '../images/planets/marsmap1k.jpg',
        bumpMap: '../images/planets/marsbump1k.jpg',
        radius: 0.26,
        inclination: 23.98,
        innerGlowColor: "#F29339",
        outerGlowColor: "#C06536",
        audio: "../music/Mars.mp3",
        infoBoard: "#marsBoard",
        closeInfoId: "#marsBoard img",
        closeHoverImg: "../images/closeButton/mars_hover.png",
        closeNormalImg: "../images/closeButton/mars.png"
    },

    jupiter: {
        planetName: 'Jupiter',
        map: '../images/planets/jupitermap.jpg',
        radius: 0.4,
        inclination: 3.8,
        innerGlowColor: "#F5D8B6",
        outerGlowColor: "#C2976D",
        audio: "../music/Jupiter.mp3",
        infoBoard: "#jupiterBoard",
        closeInfoId: "#jupiterBoard img",
        closeHoverImg: "../images/closeButton/jupiter_hover.png",
        closeNormalImg: "../images/closeButton/jupiter.png"
    },

    saturn: {
        planetName: 'Saturn',
        map: '../images/planets/saturnmap.jpg',
        radius: 0.32,
        inclination: -26.73,
        ringMap: '../images/planets/saturnringcolortransRing.png',
        ringInnerRadius: 0.42,
        ringOuterRadius: 0.84,
        innerGlowColor: "#F8D6B3",
        outerGlowColor: "#A18778",
        audio: "../music/Saturn.mp3",
        infoBoard: "#saturnBoard",
        closeInfoId: "#saturnBoard img",
        closeHoverImg: "../images/closeButton/saturn_hover.png",
        closeNormalImg: "../images/closeButton/saturn.png"
    },

    uranus: {
        planetName: 'Uranus',
        map: '../images/planets/uranusmap.jpg',
        radius: 0.32,
        inclination: -7.92,
        ringMap: '../images/planets/uranusringcolortransRing.png',
        ringInnerRadius: 0.416,
        ringOuterRadius: 0.64,
        innerGlowColor: "#8EAFBD",
        outerGlowColor: "#7795A2",
        audio: "../music/Uranus.mp3",
        infoBoard: "#uranusBoard",
        closeInfoId: "#uranusBoard img",
        closeHoverImg: "../images/closeButton/uranus_hover.png",
        closeNormalImg: "../images/closeButton/uranus.png"
    },

    neptune: {
        planetName: 'Neptune',
        map: '../images/planets/neptunemap.jpg',
        radius: 0.32,
        inclination: 28.8,
        innerGlowColor: "#83C4FC",
        outerGlowColor: "#5C6FBE",
        audio: "../music/Neptune.mp3",
        infoBoard: "#neptuneBoard",
        closeInfoId: "#neptuneBoard img",
        closeHoverImg: "../images/closeButton/neptune_hover.png",
        closeNormalImg: "../images/closeButton/neptune.png"
    },

    pluto: {
        planetName: 'Pluto',
        map: '../images/planets/plutomap1k.jpg',
        bumpMap: '../images/planets/plutobump1k.jpg',
        radius: 0.23,
        inclination: 58,
        innerGlowColor: "#D0D9E0",
        outerGlowColor: "#93A0A7",
        audio: "../music/Pluto.mp3",
        infoBoard: "#plutoBoard",
        closeInfoId: "#plutoBoard img",
        closeHoverImg: "../images/closeButton/pluto_hover.png",
        closeNormalImg: "../images/closeButton/pluto.png"
    }

    // addHaloToTarget(planetAggregation, "#D0D9E0", "#93A0A7"); // PLUTO
};