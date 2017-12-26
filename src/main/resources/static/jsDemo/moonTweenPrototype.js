function getMoonTweenPrototype(moonMesh) {
	console.log('moon tween created');
	var MOON_ORBITING_RADIUS = 0.7;
	var ANIMATION_TIME = 10 * 1000;
	var alpha = 23.5 / 180 * Math.PI;
	
	var rotationStart = {degree: moonMesh.rotationHistory};
	var rotationEnd = {degree: moonMesh.rotationHistory + Math.PI * 2};
	
	var tween = new TWEEN.Tween(rotationStart);
	tween.to(rotationEnd, ANIMATION_TIME);
	
	tween.onUpdate(function() {
		// console.log('rotationStart.degree: ', rotationStart.degree);
		moonMesh.rotationHistory = rotationStart.degree;
		
		moonMesh.position.x = MOON_ORBITING_RADIUS * Math.sin(rotationStart.degree);
		// moonMesh.position.y = MOON_ORBITING_RADIUS * Math.sin(rotationStart.degree) * Math.cos(alpha);
		moonMesh.position.z = MOON_ORBITING_RADIUS * Math.cos(rotationStart.degree);
		
		// console.log('moon x: ' + moonMesh.position.x + ', moon z: ' + moonMesh.position.z);
	});
	
	tween.repeat(Infinity);
	
	return tween;
}