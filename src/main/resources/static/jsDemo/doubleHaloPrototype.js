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
					fragmentShader: webgl
				}
			};
		}
		
	}
	
};


var webgl =
`
varying vec3 vNormal;
void main() {
	intensityFunc
	gl_FragColor = vec4( 2.0, 1.0, 1.0, 1.0 ) * intensity;
}
`;

// var test = `
// \`Shader Inputs
// uniform vec3      iResolution;           // viewport resolution (in pixels)
// uniform float     iTime;                 // shader playback time (in seconds)
// uniform float     iTimeDelta;            // render time (in seconds)
// uniform int       iFrame;                // shader playback frame
// uniform float     iChannelTime[4];       // channel playback time (in seconds)
// uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
// uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
// uniform samplerXX iChannel0..3;          // input channel. XX = 2D/Cube
// uniform vec4      iDate;                 // (year, month, day, time in seconds)
// uniform float     iSampleRate;           // sound sample rate (i.e., 44100)
//
// // based on https://www.shadertoy.com/view/lsf3RH by
// // trisomie21 (THANKS!)
// // My apologies for the ugly code.
//
// float snoise(vec3 uv, float res)	// by trisomie21
// {
// 	const vec3 s = vec3(1e0, 1e2, 1e4);
//
// 	uv *= res;
//
// 	vec3 uv0 = floor(mod(uv, res))*s;
// 	vec3 uv1 = floor(mod(uv+vec3(1.), res))*s;
//
// 	vec3 f = fract(uv); f = f*f*(3.0-2.0*f);
//
// 	vec4 v = vec4(uv0.x+uv0.y+uv0.z, uv1.x+uv0.y+uv0.z,
// 		      	  uv0.x+uv1.y+uv0.z, uv1.x+uv1.y+uv0.z);
//
// 	vec4 r = fract(sin(v*1e-3)*1e5);
// 	float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
//
// 	r = fract(sin((v + uv1.z - uv0.z)*1e-3)*1e5);
// 	float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
//
// 	return mix(r0, r1, f.z)*2.-1.;
// }
//
// float freqs[4];
//
// void mainImage( out vec4 fragColor, in vec2 fragCoord )
// {
// 	freqs[0] = texture( iChannel1, vec2( 0.01, 0.25 ) ).x;
// 	freqs[1] = texture( iChannel1, vec2( 0.07, 0.25 ) ).x;
// 	freqs[2] = texture( iChannel1, vec2( 0.15, 0.25 ) ).x;
// 	freqs[3] = texture( iChannel1, vec2( 0.30, 0.25 ) ).x;
//
// 	float brightness	= freqs[1] * 0.25 + freqs[2] * 0.25;
// 	float radius		= 0.24 + brightness * 0.2;
// 	float invRadius 	= 1.0/radius;
//
// 	vec3 orange			= vec3( 0.8, 0.65, 0.3 );
// 	vec3 orangeRed		= vec3( 0.8, 0.35, 0.1 );
// 	float time		= iTime * 0.1;
// 	float aspect	= iResolution.x/iResolution.y;
// 	vec2 uv			= fragCoord.xy / iResolution.xy;
// 	vec2 p 			= -0.5 + uv;
// 	p.x *= aspect;
//
// 	float fade		= pow( length( 2.0 * p ), 0.5 );
// 	float fVal1		= 1.0 - fade;
// 	float fVal2		= 1.0 - fade;
//
// 	float angle		= atan( p.x, p.y )/6.2832;
// 	float dist		= length(p);
// 	vec3 coord		= vec3( angle, dist, time * 0.1 );
//
// 	float newTime1	= abs( snoise( coord + vec3( 0.0, -time * ( 0.35 + brightness * 0.001 ), time * 0.015 ), 15.0 ) );
// 	float newTime2	= abs( snoise( coord + vec3( 0.0, -time * ( 0.15 + brightness * 0.001 ), time * 0.015 ), 45.0 ) );
// 	for( int i=1; i<=7; i++ ){
// 		float power = pow( 2.0, float(i + 1) );
// 		fVal1 += ( 0.5 / power ) * snoise( coord + vec3( 0.0, -time, time * 0.2 ), ( power * ( 10.0 ) * ( newTime1 + 1.0 ) ) );
// 		fVal2 += ( 0.5 / power ) * snoise( coord + vec3( 0.0, -time, time * 0.2 ), ( power * ( 25.0 ) * ( newTime2 + 1.0 ) ) );
// 	}
//
// 	float corona		= pow( fVal1 * max( 1.1 - fade, 0.0 ), 2.0 ) * 50.0;
// 	corona				+= pow( fVal2 * max( 1.1 - fade, 0.0 ), 2.0 ) * 50.0;
// 	corona				*= 1.2 - newTime1;
// 	vec3 sphereNormal 	= vec3( 0.0, 0.0, 1.0 );
// 	vec3 dir 			= vec3( 0.0 );
// 	vec3 center			= vec3( 0.5, 0.5, 1.0 );
// 	vec3 starSphere		= vec3( 0.0 );
//
// 	vec2 sp = -1.0 + 2.0 * uv;
// 	sp.x *= aspect;
// 	sp *= ( 2.0 - brightness );
//   	float r = dot(sp,sp);
// 	float f = (1.0-sqrt(abs(1.0-r)))/(r) + brightness * 0.5;
// 	if( dist < radius ){
// 		corona			*= pow( dist * invRadius, 24.0 );
//   		vec2 newUv;
//  		newUv.x = sp.x*f;
//   		newUv.y = sp.y*f;
// 		newUv += vec2( time, 0.0 );
//
// 		vec3 texSample 	= texture( iChannel0, newUv ).rgb;
// 		float uOff		= ( texSample.g * brightness * 4.5 + time );
// 		vec2 starUV		= newUv + vec2( uOff, 0.0 );
// 		starSphere		= texture( iChannel0, starUV ).rgb;
// 	}
//
// 	float starGlow	= min( max( 1.0 - dist * ( 1.0 - brightness ), 0.0 ), 1.0 );
// 	//fragColor.rgb	= vec3( r );
// 	fragColor.rgb	= vec3( f * ( 0.75 + brightness * 0.3 ) * orange ) + starSphere + corona * orange + starGlow * orangeRed;
// 	fragColor.a		= 1.0;
// }
//
// `;
