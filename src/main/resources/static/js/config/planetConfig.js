/**
 * Created by ss on 2017/10/30.
 */

var PlanetConfig = {
    mercury: {
        planetName: 'Mercury',
        map: '../images/planets/mercurymap.jpg',
        bumpMap: '../images/planets/mercurybump.jpg',
        radius: 0.5,
        innerGlowColor: "#F8D6B3",
        outerGlowColor: "#AE8045",
        audio: "../music/Mercury.mp3"
    },

    venus: {
        planetName: 'Venus',
        map: '../images/planets/venusmap.jpg',
        bumpMap: '../images/planets/venusbump.jpg',
        radius: 0.5,
	    innerGlowColor: "#FBCA64",
	    outerGlowColor: "#C68424",
        audio: "../music/Venus.mp3"
    },
    
    mars: {
        planetName: 'Mars',
        map: '../images/planets/marsmap1k.jpg',
        bumpMap: '../images/planets/marsbump1k.jpg',
        radius: 0.5,
	    innerGlowColor: "#F29339",
	    outerGlowColor: "#C06536",
        audio: "../music/Mars.mp3"
    },

    jupiter: {
        planetName: 'Jupiter',
        map: '../images/planets/jupitermap.jpg',
        radius: 0.5,
	    innerGlowColor: "#F5D8B6",
	    outerGlowColor: "#C2976D",
        audio: "../music/Jupiter.mp3"
    },
    
    saturn: {
        planetName: 'Saturn',
        map: '../images/planets/saturnmap.jpg',
        radius: 0.5,
        ringMap: '../images/planets/saturnringcolortransRing.png',
        ringInnerRadius: 0.6,
        ringOuterRadius: 1.2,
	    innerGlowColor: "#F8D6B3",
	    outerGlowColor: "#A18778",
        audio: "../music/Saturn.mp3"
    },
    
    uranus: {
        planetName: 'Uranus',
        map: '../images/planets/uranusmap.jpg',
        radius: 0.5,
        ringMap: '../images/planets/uranusringcolortransRing.png',
        ringInnerRadius: 0.65,
        ringOuterRadius: 1,
	    innerGlowColor: "#8EAFBD",
	    outerGlowColor: "#7795A2",
        audio: "../music/Uranus.mp3"
    },
    
    neptune: {
        planetName: 'Neptune',
        map: '../images/planets/neptunemap.jpg',
        radius: 0.5,
        innerGlowColor: "#83C4FC",
	    outerGlowColor: "#5C6FBE",
        audio: "../music/Neptune.mp3"
    },

    pluto: {
        planetName: 'Pluto',
        map: '../images/planets/plutomap1k.jpg',
        bumpMap: '../images/planets/plutobump1k.jpg',
        radius: 0.5,
	    innerGlowColor: "#D0D9E0",
	    outerGlowColor: "#93A0A7",
        audio: "../music/Pluto.mp3"
    }
	
	// addHaloToTarget(planetAggregation, "#D0D9E0", "#93A0A7"); // PLUTO
};