/**
 * Created by Bo
 * 10/24/2017
 * This demo id to show how to add
 * double halos
 */
// "use strict";

DoubleHaloController = function (renderer) {
	
	var universeUtils = new UniverseUtils();
	
	/******************************
	 * Initialized in _initScene()
	 *****************************/
	var camera;
	var universeMesh;
	var light;
	var earthRenderer;
	var earthScene;
	
	/*****************************************
	 * Initialized in _initEarthAggregation()
	 ****************************************/
	var earthMesh;
	var atmosphereMesh;
	var earthAggregation;
	
	/***************************
	 * Initialized in _initShader()
	 ***************************/
	var earthShaderMaterial;
	var atmosphereShaderMaterial;
	var glowMesh;
	var SHADER_SCALE = 1.2;
	var SHADER_COLOR = '#0000ff';
	var SHADER_RADIUS = 0.504;
	var ENABLE_SHADER = true;
	
	/***************************
	 * Halo settings
	 ***************************/
	var HALO_COLOR = 0x00ff00;
	var HALO_OPACITY = 0.5;
	var IS_HALO_TRANSPARENT = true;
	var ENABLE_HALO = true;
	
	
	_initController();
	
	// Public: will be called from outside
	this.animate = function earthAnimate() {
		requestAnimationFrame(earthAnimate);
		earthRenderer.render(earthScene, camera);
	};
	
	
	
	/******************************
	 * Private functions
	 *****************************/
	function _initController() {
		
		if (ENABLE_SHADER) {
			_initShader(SHADER_COLOR, SHADER_SCALE, SHADER_RADIUS);
		}
		
		_initEarthAggregation();
		
		if (ENABLE_HALO) {
			_addHalo(earthMesh);
		}
		
		_initScene();
		
	}
	
	//The init function is used to put object into the scene
	function _initShader(shaderColor, shaderScale, shaderRadius) {
		var shaders = getShader(new THREE.Color(shaderColor));
		
		// shader = shaders['earth'];
		// earthShaderMaterial = new THREE.ShaderMaterial({
		// 	uniforms: THREE.UniformsUtils.clone(shader.uniforms),
		// 	vertexShader: shader.vertexShader,
		// 	fragmentShader: shader.fragmentShader,
		// 	transparent: true
		// });
		//
		shader = shaders['atmosphere'];
		atmosphereShaderMaterial = new THREE.ShaderMaterial({
			uniforms: THREE.UniformsUtils.clone(shader.uniforms),
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader,
			side: THREE.BackSide,
			blending: THREE.AdditiveBlending,
			transparent: true
		});
		
		glowMesh = new THREE.Mesh();
		glowMesh.geometry = new THREE.SphereGeometry(shaderRadius, 32, 32);
		glowMesh.material = atmosphereShaderMaterial;
		glowMesh.scale.set(shaderScale, shaderScale, shaderScale);
		
	}
	
	function _initEarthAggregation() {
		earthMesh = universeUtils.createDefaultEarthMesh();
		atmosphereMesh = universeUtils.createDefaultAtmosphere();
		
		earthAggregation = new THREE.Object3D();
		earthAggregation.add(earthMesh);
		earthAggregation.add(atmosphereMesh);
		
		if (glowMesh !== undefined) {
			earthAggregation.add(glowMesh);
		}
		
		earthAggregation.rotateZ(-Math.PI * 23.5 / 180);
	}
	
	function _initScene() {
		earthRenderer = renderer;
		camera = universeUtils.createDefaultCamera();
		universeMesh = universeUtils.createDefaultUniverse();
		light = new THREE.AmbientLight(0xffffff);
		earthScene = new THREE.Scene();
		
		earthScene.add(light);
		earthScene.add(camera);
		earthScene.add(universeMesh);
		earthScene.add(earthAggregation);
		
		console.log("test");
	}
	
	function _addHalo(aggregation) {
		
		var spriteMaterial = new THREE.SpriteMaterial(
			{
				map: new THREE.TextureLoader().load('../images/glow.png'),
				useScreenCoordinates: false,
				color: HALO_COLOR,
				transparent: IS_HALO_TRANSPARENT,
				opacity: HALO_OPACITY
			});
		var sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(2, 2, 1);
		aggregation.add(sprite);
	}
	
};

function getShader(color) {
	var colorR = color.r;
	var colorG = color.g;
	var colorB = color.b;
	return Shaders = {
		// 'earth' : {
		// 	uniforms: {
		// 		'texture': { type: 't', value: null }
		// 	},
		// 	vertexShader: [
		// 		'varying vec3 vNormal;',
		// 		'varying vec2 vUv;',
		// 		'void main() {',
		// 		'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
		// 		'vNormal = normalize( normalMatrix * normal );',
		// 		'vUv = uv;',
		// 		'}'
		// 	].join('\n'),
		// 	fragmentShader: [
		// 		'uniform sampler2D texture;',
		// 		'varying vec3 vNormal;',
		// 		'varying vec2 vUv;',
		// 		'void main() {',
		// 		'vec3 diffuse = texture2D( texture, vUv ).xyz;',
		// 		'float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );',
		// 		'vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );',
		// 		'gl_FragColor = vec4( diffuse + atmosphere, 1.0 );',
		// 		'}'
		// 	].join('\n')
		// },
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
				'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 10.0 );',
				// 'float intensity = 1.005 - dot( vNormal, vec3( 0, 0, 1.0 ) );',
				'gl_FragColor = vec4(' + colorR + ', ' + colorG + ', ' + colorB + ', 20 ) * intensity;',
				'}'
			].join('\n')
		}
	};
}