import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { Lamp } from './Lamp';

const ModelTest = () => {
	return (
		<div className="h-screen w-full border-4 border-slate-900">
			<Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }}>
				<OrbitControls />
				<Suspense fallback={null}>
					<ambientLight intensity={0.2} />
					<Lamp showSpotlight />
					<mesh
						receiveShadow
						rotation={[-Math.PI / 2, 0, 0]}
						position={[0, 0, 0]}
					>
						<planeGeometry args={[50, 50]} />
						<meshStandardMaterial color="gray" />
					</mesh>
				</Suspense>
			</Canvas>
		</div>
	);
};

export default ModelTest;
