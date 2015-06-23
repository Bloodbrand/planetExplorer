var container, camera, scene, renderer, keyboard, frameID;
var width = window.innerWidth, height = window.innerHeight;
var camNear = 0.1, camFar = 1000;

Init();

function Init() {
	container = document.getElementById( 'container' );
	scoreBoard = $('#score');
	
	scene = new THREE.Scene();

	addRenderer();
	addCamera();
	addLight();

	addRaycasters();
	initKeyboard();
	startGame();
	window.addEventListener( 'mousemove', onMouseMove, false );
	animate();
}

/*scene functions*/
function addRenderer() {
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( width, height ); 
	container.appendChild( renderer.domElement );
}

function addLight () {
	var ambientLight = new THREE.AmbientLight( 0x808080 );
	scene.add( ambientLight );

	var directionalLight = new THREE.DirectionalLight( 0xffffff );
	directionalLight.position.set( 0, 1, 0 );
	scene.add( directionalLight );
}

function addCamera() {
	camera = new THREE.PerspectiveCamera( 45, width / height, camNear, camFar ); 
	camera.position.set(0, 250, 1);
	camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
	scene.add( camera );
}

function animate() {
	frameID = requestAnimationFrame(animate);
	renderer.render(scene, camera);
	manageMouseInput();
} 

/*game functions*/
function addRaycasters () {

}

function initKeyboard () {
	keyboard = new THREEx.KeyboardState();
}