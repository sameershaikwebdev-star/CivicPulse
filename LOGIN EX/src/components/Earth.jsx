import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Sphere, Torus, Points, PointMaterial } from '@react-three/drei';

function EarthScene() {
  const earthRef = useRef();
  const ringRef = useRef();
  const pointRef = useRef();

  useFrame(({ clock, mouse }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      earthRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.12) * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.15;
      ringRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.18) * 0.1;
    }
    if (pointRef.current) {
      pointRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    if (mouse) {
      const x = (mouse.x * 0.5) / 2;
      const y = (mouse.y * 0.5) / 2;
      earthRef.current.position.x = x;
      earthRef.current.position.y = y;
      ringRef.current.position.x = x;
      ringRef.current.position.y = y;
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight color="#92c5ff" position={[4, 3, 5]} intensity={1.1} />
      <pointLight color="#a78bfa" position={[-3, 1, -4]} intensity={1.2} />
      <group>
        <Sphere ref={earthRef} args={[1.12, 64, 64]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#0f172a"
            emissive="#2f7be2"
            emissiveIntensity={0.4}
            metalness={0.3}
            roughness={0.2}
          />
        </Sphere>
        <mesh position={[0, 0, 0]}> 
          <sphereGeometry args={[1.14, 64, 64]} />
          <meshStandardMaterial
            color="transparent"
            opacity={0.28}
            transparent
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
        <Torus ref={ringRef} args={[1.6, 0.08, 24, 120]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.35} metalness={0.8} roughness={0.1} />
        </Torus>
        <Points ref={pointRef} positions={new Array(150).fill().flatMap((_, index) => [Math.sin(index) * 1.8, Math.cos(index * 0.5) * 1.4, Math.sin(index * 0.4) * 1.5])}>
          <PointMaterial transparent size={0.02} sizeAttenuation depthWrite={false} color="#7dd3fc" />
        </Points>
      </group>
    </>
  );
}

export default EarthScene;
