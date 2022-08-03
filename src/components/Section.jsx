import React, { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BsArrowDownCircleFill } from "react-icons/bs";
import AnchorLink from 'react-anchor-link-smooth-scroll'

import * as THREE from "three"

function Section() {
  useEffect(() => {
    const scene = new THREE.Scene()
    var clock = new THREE.Clock();




    const canvas = document.getElementById("myCanvas")

    const renderer = new THREE.WebGLRenderer({
      canvas, antialias: true
    })

    renderer.setSize(window.innerWidth * 0.4, window.innerHeight * 0.5)

    renderer.setClearColor(0xffffff, 0);



    const camera = new THREE.PerspectiveCamera(
      50, (window.innerWidth * 0.4) / (window.innerHeight * 0.5), 1, 1000
    )


    camera.aspect = (window.innerWidth * 0.4) / (window.innerHeight * 0.5);

    const ambientLight = new THREE.AmbientLight(0x000000, 5)

    ambientLight.castShadow = true
    scene.add(ambientLight)
    const spotLight = new THREE.SpotLight(0x8b0000, 12)
    spotLight.position.set(45, 0, 0);

    spotLight.castShadow = true
    scene.add(spotLight)
    const spotLight2 = new THREE.SpotLight(0x0000FF, 12)
    spotLight2.position.set(-45, 0, 0);

    spotLight2.castShadow = true
    scene.add(spotLight2)

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window); // optional

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 2.3;
    controls.maxDistance = 5;

    controls.maxPolarAngle = Math.PI / 2;


    camera.position.z = 2.3
    controls.update();


    let obj;
    const loader = new GLTFLoader()
    console.log(loader)
    loader.load('/ball.glb', gltf => {
      obj = gltf.scene
      obj.name = "ball"
      obj.position.x = 0
      obj.position.y = 0
      obj.receiveShadow = true
      obj.castShadow = true
      scene.add(obj)
      obj.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })

      console.log("Syuccess");

    }, undefined, function (error) {
      console.log(error);
    })


    window.addEventListener("mousemove", onDocumentMove);
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    const windowHalfX = window.innerWidth / 2
    const windowHalfY = window.innerHeight / 2

    function onDocumentMove(event) {

      mouseX = (event.clientX - windowHalfX)
      mouseY = (event.clientY - windowHalfY)


    }

    const animate = () => {
      targetX = mouseX * 0.001
      targetY = mouseY * 0.001
      const elapsedTime = clock.getElapsedTime()

      if (obj) {


        obj.rotation.y += 0.5 * elapsedTime;
        obj.rotation.y += 0.5 * (targetX - obj.rotation.y)
        obj.rotation.x += 0.5 * (targetY - obj.rotation.x)
        obj.rotation.z += 0.5 * (targetY - obj.rotation.x)



      }
      requestAnimationFrame(animate);
      controls.update();

      renderer.render(scene, camera);



    };
    animate();


    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('load', onWindowResize, false);



    function onWindowResize() {



      camera.aspect = (window.innerWidth * 0.4) / (window.innerHeight * 0.5);
      camera.zoom = window.innerWidth * 0.0007

      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth * 0.4, window.innerHeight * 0.5);

    }

    // const animate=()=>{
    //   boxMesh.rotation.x+=0.01
    //   boxMesh.rotation.y+=0.01
    //   renderer.render(scene,camera)
    //   window.requestAnimationFrame(animate)

    // }
    // animate()

  }, [])


  return (
    <div className="introsection">
      <div className="introdiv">

        <h1 className="introText2"> Analyse The Most <span className="spanText">"Trendy"</span> Stocks Now!</h1>
        <canvas id="myCanvas" />
      </div>

      <AnchorLink href="#analysis" className="icon" style={{
        padding: "10px",
        fontSize: "2rem",
        color: "#48644c",
        marginTop: "3rem",

      }}><BsArrowDownCircleFill /></AnchorLink>

    </div>
  )
}

export default Section