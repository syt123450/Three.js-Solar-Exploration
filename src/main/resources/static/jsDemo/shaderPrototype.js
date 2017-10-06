/**
 * Created by Bo
 * 10/4/2017
 */

/**
 * This demo is to show how to user ShaderMaterial
 * to create TRUE halo effect for stars and plantes
 *
 * ref link:
 * https://www.adaptivemobile.com/spamglobe/
 *
 *
 * @param renderer
 * @constructor
 */
ShaderController = function (renderer) {
	var universeUtils = new UniverseUtils();
	var light = new THREE.AmbientLight(0xffffff);
	var camera = universeUtils.createDefaultCamera();
	
	var universeMesh = universeUtils.createDefaultUniverse();
	var earthMesh = universeUtils.createDefaultEarthMesh();
	var atmosphereMesh = universeUtils.createDefaultAtmosphere();
	
	// create shader for glow-sphere
	var Shaders = getShader();
	var shader = Shaders['earth'];
	var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
	var shaderMaterial = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader
	});
	shader = Shaders['atmosphere'];
	uniforms = THREE.UniformsUtils.clone(shader.uniforms);
	shaderMaterial = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader,
		side: THREE.BackSide,
		blending: THREE.AdditiveBlending,
		transparent: true
	});
	var glowMesh = function () {
		var glowMesh = new THREE.Mesh();
		glowMesh.geometry = new THREE.SphereGeometry(0.504, 32, 32);
		glowMesh.material = shaderMaterial;
		return glowMesh;
	}();
	glowMesh.scale.set(1.15, 1.15, 1.15);
	
	var earthRenderer = renderer;
	var earthScene = init();
	
	//the animate function is called by the outer js code, in this demo, I use index.js to call as an example
	this.animate = earthAnimate;
	
	function earthAnimate() {
		
		requestAnimationFrame(earthAnimate);
		earthRenderer.render(earthScene, camera);
		
	}
	
	//The init function is used to put object into the scene
	function init() {
		
		var scene = new THREE.Scene();
		scene.add(light);
		scene.add(camera);
		scene.add(universeMesh);
		scene.add(initEarthAggregation());
		
		return scene;
	}
	
	function getShader() {
		var Shaders = {
			'earth' : {
				uniforms: {
					'texture': { type: 't', value: null }
				},
				vertexShader: [
					'varying vec3 vNormal;',
					'varying vec2 vUv;',
					'void main() {',
					'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
					'vNormal = normalize( normalMatrix * normal );',
					'vUv = uv;',
					'}'
				].join('\n'),
				fragmentShader: [
					'uniform sampler2D texture;',
					'varying vec3 vNormal;',
					'varying vec2 vUv;',
					'void main() {',
					'vec3 diffuse = texture2D( texture, vUv ).xyz;',
					'float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );',
					'vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );',
					'gl_FragColor = vec4( diffuse + atmosphere, 1.0 );',
					'}'
				].join('\n')
			},
			'atmosphere' : {
				uniforms: {},
				vertexShader: [
					'varying vec3 vNormal;',
					'void main() {',
					'vNormal = normalize( normalMatrix * normal );',
					'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
					'}'
				].join('\n'),
				fragmentShader: [
					'varying vec3 vNormal;',
					'void main() {',
					'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );',
					'gl_FragColor = vec4( 2.0, 1.0, 1.0, 1.0 ) * intensity;',
					'}'
				].join('\n')
			}
		};
		return Shaders;
	}
	function initEarthAggregation() {
		
		var aggregation = new THREE.Object3D();
		aggregation.add(earthMesh);
		aggregation.add(atmosphereMesh);
		aggregation.add(glowMesh);
		aggregation.rotateZ(-Math.PI * 23.5 / 180);
		
		return aggregation;
	}
};