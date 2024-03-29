import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  OrbitControls,
  useBounds,
  useGLTF,
  Html,
  Loader,
} from "@react-three/drei";

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

  const Zoom = ({ children }) => {
  const bounds = useBounds();
  /* const { rotation, position } = useControls({ 
    rotation:{
      value:{
        x:0,
        y:0,
        z:0
      },
      step: 0.001
    },
    position:{
      value:{
        x:0,
        y:0,
        z:0
      },
      step: 0.01
    },
  }) */
  return (
    <group
      onClick={(e) => bounds.to({position: [.6, 1.3, -1.4], target:[2.56, .8, 1]})}
      onPointerMissed={(e) =>
        e.button === 0 && bounds.to({ position: [-8, 2, -10] })
      }
    >
      {children}
    </group>
  );
};

const Menu = () => {


  return (
    <div className="container">
      <Canvas camera={{ position: [-8, 2, -10], fov: 55 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <directionalLight
            color={"#fff"}
            intensity={1.5}
            position={[1, 2, -2]}
          />
          <Bounds /* fit clip observe damping={6} margin={1.2} */>
            <Zoom>
              <group position={[1.1, 1.1, -.8]}>
              <Model name="menu" />
              <Html position={[-0.018, .385, 0]} rotation={[.15, 3.83, .1]} transform wrapperClass="embeddedMenu" distanceFactor={.19}>
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
            <group position={[0, .5, -1]}>
              <Model name="bar_1"/>
              <Model name="bar_2" />
              <Model name="bar_3" />
            </group>
            </Zoom>
          </Bounds>
        </Suspense>
        <OrbitControls makeDefault minPolarAngle={0} />
      </Canvas>
      <Loader />
    </div>
  );
};

export default Menu;
