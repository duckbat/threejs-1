import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const gui = new GUI();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// control camera
const controls = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(50);
// camera position
camera.position.set(0, 20, 100);
controls.update();

//objects
// object1
const geometry = new THREE.CapsuleGeometry(15, 5, 1, 10);
const material = new THREE.MeshBasicMaterial({
  color: 0x00efff,
  wireframe: true,
});
const capsule = new THREE.Mesh(geometry, material);

// object2 (sphere)
const geometry2 = new THREE.SphereGeometry(5, 10, 10);
const material2 = new THREE.MeshStandardMaterial({ color: 0xffac00 });
const sphere = new THREE.Mesh(geometry2, material2);

// object 3 (cylinder)
const geometry3 = new THREE.CylinderGeometry(10, 10, 10, 32);
const material3 = new THREE.MeshStandardMaterial({ color: 0x793502 });
const cylinder = new THREE.Mesh(geometry3, material3);

cylinder.translateY(-30);

scene.add(capsule, sphere, cylinder, axesHelper);

// Lights
// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(20, 20, 20);
const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalLight, dlHelper);

// GUI for Ambient Light
const alFolder = gui.addFolder("Ambient Light");
const alSetting = {
  color: ambientLight.color.getHex(),
};
alFolder.add(ambientLight, "visible");
alFolder.add(ambientLight, "intensity", 0, 2);
alFolder
  .addColor(alSetting, "color")
  .onChange((value) => ambientLight.color.set(value));
alFolder.open();

// GUI for Directional Light
const dlFolder = gui.addFolder("Directional Light");
dlFolder.add(directionalLight, "visible");
dlFolder.add(directionalLight, "intensity", 0, 2);
dlFolder.open();

//Render animation
function animate() {
  capsule.rotation.x += 0.00001;
  capsule.rotation.y += 0.00001;

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
