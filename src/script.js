import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";

// // Debug
// const gui = new dat.GUI()

//Loading
const textureLoader = new THREE.TextureLoader();

//Texture
const planetTexture = textureLoader.load("/Textures/normalMap2.jpg");

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

//Mouse
const mouse = {
  x: 0,
  y: 0,
};

//Event Listeners

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
//
class Cube {
  constructor(scene, color) {
    this.color = color;
    this.scene = scene;

    this.cubeGeometry = new THREE.BoxGeometry();
    this.cubeMaterial = new THREE.MeshBasicMaterial({ color: this.color });
    this.cube = new THREE.Mesh(this.cubeGeometry, this.cubeMaterial);
    this.cube.position.set(1, 1, 1);
    this.scene.add(this.cube);
  }

  rotate(x = 0, y = 0, z = 0) {
    this.cube.rotation.x += x;
    this.cube.rotation.y += y;
    this.cube.rotation.z += z;
  }

  interact(mouse, time) {
    this.cube.rotation.y +=
      (mouse.x - window.innerWidth / 2) * 0.001 - this.cube.rotation.y;
    this.cube.rotation.x +=
      (mouse.y - window.innerHeight / 2) * 0.001 - this.cube.rotation.x;
    this.cube.position.z =
      15 * ((mouse.y - window.innerHeight / 2) * 0.001 - this.cube.rotation.x);
  }
}

class Planet {
  constructor(scene, color, texture) {
    this.color = color;
    this.scene = scene;
    this.texture = texture;
    this.geometry = new THREE.SphereBufferGeometry(2, 64, 64);

    this.material = new THREE.MeshStandardMaterial();
    this.material.metalness = 0.1;
    this.material.roughness = 0.9;
    this.material.normalMap = this.texture;
    this.material.color = new THREE.Color(this.color);

    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.sphere.position.set(1.5, 0);

    this.scene.add(this.sphere);
  }
  rotate(x = 0, y = 0, z = 0) {
    this.sphere.rotation.x += x;
    this.sphere.rotation.y += y;
    this.sphere.rotation.z += z;
  }
  interact(mouse) {
    this.sphere.rotation.y +=
      (mouse.x - window.innerWidth / 2) * 0.005 - this.sphere.rotation.y;
    this.sphere.rotation.x +=
      (mouse.y - window.innerHeight / 2) * 0.005 - this.sphere.rotation.x;
    // this.sphere.position.z =
    //   0.5 *
    //   ((mouse.y - window.innerHeight / 2) * 0.001 - this.sphere.rotation.x);
  }
}

//const cube = new Cube(scene, 0xff0000);
const planet = new Planet(scene, 0xff7f50, planetTexture);

//Lights
const light = new THREE.PointLight(0xffffff, 1.5, 100, 2);
light.position.set(-15, 0, 10);
scene.add(light);

//Animate

const animate = () => {
  renderer.render(scene, camera);
  //cube.rotate(0.01, 0.01, 0.01);
  planet.rotate(0.005, 0.005, 0.005);
  planet.interact(mouse);
  requestAnimationFrame(animate);
};

animate();
