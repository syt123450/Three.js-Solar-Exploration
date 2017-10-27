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
		
		_initEarthAggregation();
		
		addHaloToTarget(earthMesh, '#0000ff', '#ff0000');
		
		_initScene();
		
	}
	
	function _initEarthAggregation() {
		earthMesh = universeUtils.createDefaultEarthMesh();
		atmosphereMesh = universeUtils.createDefaultAtmosphere();

		earthAggregation = new THREE.Object3D();
		earthAggregation.add(earthMesh);
		earthAggregation.add(atmosphereMesh);
		
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
	
	/**
	 *
	 * @param target
	 * @param innerColor String: in hex eg. 0xffffff
	 * @param outerColor String: in hex eg. 0xffffff
	 */
	function addHaloToTarget(target, innerColor, outerColor) {
		// innerGlowMesh settings
		var _innerGlowMesh;
		var INNER_GLOW_MESH_COLOR = innerColor;
		var INNER_GLOW_MESH_OPACITY = 0.2;
		var INNER_GLOW_MESH_RADIUS = 0.504;
		var innerFragmentShaderIntensity = 'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 10.0 );';
		
		var _outerGlowMesh;
		var OUTER_GLOW_MESH_COLOR = outerColor;
		var OUTER_GLOW_MESH_OPACITY = 0.2;
		var OUTER_GLOW_MESH_RADIUS = 0.504;
		var outerFragmentShaderIntensity = 'float intensity = pow( 0.6 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 1.1 );';
		
		_init();
		
		/*************************
		 * @private
		 ************************/
		function _init() {
			if (innerColor !== '') {
				_initInnerGlowMesh(INNER_GLOW_MESH_COLOR, INNER_GLOW_MESH_OPACITY, INNER_GLOW_MESH_RADIUS);
				target.add(_innerGlowMesh);
			}
			
			if (outerColor !== '') {
				_initOuterGlowMesh(OUTER_GLOW_MESH_COLOR, OUTER_GLOW_MESH_OPACITY, OUTER_GLOW_MESH_RADIUS);
				target.add(_outerGlowMesh);
			}
		}
		
		//The init function is used to put object into the scene
		function _initInnerGlowMesh(glowMeshColor, opacity, glowMeshRadius) {
			_innerGlowMesh = new THREE.Mesh();
			_innerGlowMesh.geometry = new THREE.SphereGeometry(glowMeshRadius, 32, 32);
			_innerGlowMesh.material = _getShaderMaterial(glowMeshColor, opacity, innerFragmentShaderIntensity);
			_innerGlowMesh.scale.set(1.2, 1.2, 1.2);
		}
		
		function _initOuterGlowMesh(glowMeshColor, opacity, glowMeshRadius) {
			_outerGlowMesh = new THREE.Mesh();
			_outerGlowMesh.geometry = new THREE.SphereGeometry(glowMeshRadius, 32, 32);
			_outerGlowMesh.material = _getShaderMaterial(glowMeshColor, opacity, outerFragmentShaderIntensity);
			_outerGlowMesh.scale.set(1.2, 1.2, 1.2);
		}
		
		function _getShaderMaterial(glowMeshColor, opacity, intensityFunc) {
			var shaders = _getShader(new THREE.Color(glowMeshColor), intensityFunc);
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
		
		function _getShader(color, intensityFunc) {
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
		
	}
	
};