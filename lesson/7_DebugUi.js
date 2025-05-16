import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "lil-gui";
// import GUI from 'lil-gui';

//! Debug
const gui = new dat.GUI();
const myObject = {
  myBoolean: true,
  myFunction: function () {},
  myString: "lil-gui",
  myNumber: 1,
  myProperty: "spin",
};

gui.add(myObject, "myBoolean"); // Checkbox
gui.add(myObject, "myFunction"); // Button
gui.add(myObject, "myString"); // Text Field
gui.add(myObject, "myNumber"); // Number Field

// Add sliders to number fields by passing min and max
gui.add(myObject, "myNumber", 0, 1);
gui.add(myObject, "myNumber", 0, 100, 2); // snap to even numbers { means 0,2,4,6,8....,100 }

// Create dropdowns by passing an array or object of named values
gui.add(myObject, "myNumber", [0, 1, 2]);
gui.add(myObject, "myNumber", { Label1: 0, Label2: 1, Label3: 2 });

// Chainable methods
gui
  .add(myObject, "myProperty")
  .name("Custom Name")
  .onChange((value) => {
    console.log(value);
  });

const parameters = {
  color: "green",
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  },
};

//for changing colours
gui
  .addColor(parameters, "color")
  .onChange(() => material.color.set(parameters.color));
//for adding some functions
gui.add(parameters, "spin");

//*resizing
window.addEventListener("resize", () => {
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  //renderer
  renderer.setSize(sizes.width, sizes.height);
  //*handle pixel ratio
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//* Scene
const scene = new THREE.Scene();

//* Object (Red Cube)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: parameters.color,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//! Debug
//for changing the position
// gui.add(mesh.position, "y", -3, 3, 0.1);
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
//it will add a tick btn for visible
gui.add(mesh, "visible");
//it will add a tick btn for wireframe
gui.add(material, "wireframe");

//* Camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
scene.add(camera);

//* Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//* Controls: we only have to deal with OrbitControls...
const controls = new OrbitControls(camera, canvas);
// for enableDamping : means smooth stop after rotation
controls.enableDamping = true;

const animate = () => {
  //*to update object
  //   mesh.rotation.x += 0.01;

  //* Update Controls: basically it can be used above also bou for enabledamping it has to render again and again
  controls.update();

  //*to render
  renderer.render(scene, camera);

  //*call animation again on the next frame
  window.requestAnimationFrame(animate);
};
animate();
