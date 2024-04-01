/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  OrbitControls,
  useBounds,
  useGLTF,
  Html,
  Loader,
} from "@react-three/drei";
import { useControls } from "leva";

function Model({ name, ...props }) {
  const { nodes } = useGLTF("./assets/bar4.glb");
  return (
    <mesh
      geometry={nodes[name].geometry}
      material={nodes[name].material}
      material-roughness={1}
      {...props}
      dispose={null}
    />
  );
}

const Menu = () => {
  /* const { posX, posY, posZ, rotX, rotY, rotZ } = useControls({
    posX: { value: -0.065, min: -10, max: 10, step: 0.01 },
    posY: { value: 0.065, min: -10, max: 10, step: 0.01 },
    posZ: { value: -0.05, min: -10, max: 10, step: 0.01 },
    rotX: { value: 0.185, min: -Math.PI, max: Math.PI, step: 0.001 },
    rotY: { value: -2.43, min: -Math.PI, max: Math.PI, step: 0.001 },
    rotZ: { value: 0.125, min: -Math.PI, max: Math.PI, step: 0.001 },
}); */

  return (
    <div className="container">
      <Canvas camera={{ position: [-8, 2, -10], fov: 55 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <directionalLight
            color={"#fff"}
            intensity={1.5}
            position={[1, 2, -2]}
          />

          <group position={[1.1, 1.1, -0.8]}>
            <Model name="menu" />
            <Html
              wrapperClass="embeddedMenu"
              transform
              distanceFactor={0.16}
              position={[-0.062, 0.06, -0.05]}
              rotation={[0.19, -2.455, 0.12]}
            >
              <iframe title="menu" src="categories"></iframe>
            </Html>
          </group>

          <Model name="coffre" />
          <Model name="chaise1" />
          <Model name="chaise2" />
          <Model name="chaise3" />
          <Model name="tonneau1" />
          <Model name="tonneau2" />
          <Model name="tonneau3" />
          <Model name="mur" />
          <Model name="structure" />
          <group position={[0, 0.5, -1]}>
            <Model name="bar_1" />
            <Model name="bar_2" />
            <Model name="bar_3" />
          </group>
        </Suspense>
        <OrbitControls makeDefault minPolarAngle={0} />
      </Canvas>
      <Loader />
    </div>
  );
};

export default Menu;
