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
	var innerGlowMesh;
	var INNER_GLOW_MESH_COLOR = '#0000ff';
	var INNER_GLOW_MESH_OPACITY = 0.2;
	var INNER_GLOW_MESH_RADIUS = 0.504;
	var ENABLE_INNER_GLOW_MESH = true;
	var innerFragmentShaderIntensity = 'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 10.0 );';
	
	var outerGlowMesh;
	// var OUTER_SHADER_SCALE = 1.2;
	var OUTER_GLOW_MESH_COLOR = '#ff0000';
	var OUTER_GLOW_MESH_OPACITY = 0.2;
	var OUTER_GLOW_MESH_RADIUS = 0.504;
	var ENABLE_OUTER_GLOW_MESH = true;
	var outerFragmentShaderIntensity = 'float intensity = pow( 0.6 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 1.1 );';
	
	/***************************
	 * Halo settings
	 ***************************/
	var HALO_COLOR = 0x00ff00;
	var HALO_OPACITY = 0.5;
	var IS_HALO_TRANSPARENT = true;
	var ENABLE_HALO = false;
	
	
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
		
		if (ENABLE_INNER_GLOW_MESH) {
			_initInnerGlowMesh(INNER_GLOW_MESH_COLOR, INNER_GLOW_MESH_OPACITY, INNER_GLOW_MESH_RADIUS);
		}
		
		if (ENABLE_OUTER_GLOW_MESH) {
			_initOuterGlowMesh(OUTER_GLOW_MESH_COLOR, OUTER_GLOW_MESH_OPACITY, OUTER_GLOW_MESH_RADIUS);
		}
		
		_initEarthAggregation();
		
		if (ENABLE_HALO) {
			_addHalo(earthMesh);
		}
		
		_initScene();
		
	}
	
	//The init function is used to put object into the scene
	function _initInnerGlowMesh(glowMeshColor, opacity, glowMeshRadius) {
		innerGlowMesh = new THREE.Mesh();
		innerGlowMesh.geometry = new THREE.SphereGeometry(glowMeshRadius, 32, 32);
		innerGlowMesh.material = _getShaderMaterial(glowMeshColor, opacity, innerFragmentShaderIntensity);
		innerGlowMesh.scale.set(1.2, 1.2, 1.2);
	}
	
	function _initOuterGlowMesh(glowMeshColor, opacity, glowMeshRadius) {
		outerGlowMesh = new THREE.Mesh();
		outerGlowMesh.geometry = new THREE.SphereGeometry(glowMeshRadius, 32, 32);
		outerGlowMesh.material = _getShaderMaterial(glowMeshColor, opacity, outerFragmentShaderIntensity);
		outerGlowMesh.scale.set(1.2, 1.2, 1.2);
	}
	
	function _getShaderMaterial(glowMeshColor, opacity, intensityFunc) {
		var shaders = getShader(new THREE.Color(glowMeshColor), intensityFunc);
		shader = shaders['atmosphere'];
		return new THREE.ShaderMaterial({
			uniforms: THREE.UniformsUtils.clone(shader.uniforms),
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader,
			side: THREE.BackSide,
			blending: THREE.AdditiveBlending,
			transparent: true,
			opacity: opacity
		});
	}
	
	function _initEarthAggregation() {
		earthMesh = universeUtils.createDefaultEarthMesh();
		atmosphereMesh = universeUtils.createDefaultAtmosphere();
		
		earthAggregation = new THREE.Object3D();
		earthAggregation.add(earthMesh);
		earthAggregation.add(atmosphereMesh);
		
		if (ENABLE_INNER_GLOW_MESH) {
			earthAggregation.add(innerGlowMesh);
		}
		
		if (ENABLE_OUTER_GLOW_MESH) {
			earthAggregation.add(outerGlowMesh);
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

function getShader(color, intensityFunc) {
	var colorR = color.r;
	var colorG = color.g;
	var colorB = color.b;
	return Shaders = {
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
				intensityFunc,
				'gl_FragColor = vec4(' + colorR + ', ' + colorG + ', ' + colorB + ', 1.0 ) * intensity;',
				'}'
			].join('\n')
		}
	};
}