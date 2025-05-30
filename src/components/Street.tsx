/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import type { SkinnedMesh } from 'three';
import type { JSX } from 'astro/jsx-runtime';
import { RigidBody } from '@react-three/rapier';

type MeshProps = JSX.IntrinsicElements['group'];

export function Street(props: MeshProps) {
	const { nodes, materials } = useGLTF(`/models/street.glb`);

	useEffect(() => {
		const mat = materials.jalan_utama_material as MeshStandardMaterial;
		mat.roughness = 0.6; // permukaan agak kasar
		mat.metalness = 0.1; // bukan logam
		mat.envMapIntensity = 0.4; // efek pencahayaan lingkungan
		mat.needsUpdate = true;
	}, []);

	return (
		<group {...props} dispose={null}>
			<mesh
				geometry={nodes.tanah.geometry}
				material={materials.tanah_material}
				position={[-118.029, 0.089, -8.669]}
				scale={[1.097, 1.04, 2.754]}
			>
				<mesh
					geometry={nodes.tanah001.geometry}
					material={materials.tanah_material}
					position={[-0.373, 0.063, -1.608]}
				/>
			</mesh>
			<RigidBody type="fixed" colliders="cuboid">
				<mesh
					geometry={nodes.trotoar_utama.geometry}
					material={nodes.trotoar_utama.material}
					scale={[1.1, 1, 1]}
					receiveShadow
				/>
				<mesh
					geometry={nodes.trotoar_utama_atas.geometry}
					material={materials.trotoar_utama_atas}
					receiveShadow
				/>
				<mesh
					geometry={nodes.trotoar_utama_sisi.geometry}
					material={materials.pembatas_kanan_trotoar}
					receiveShadow
				/>
				<mesh
					geometry={nodes.pembatas_kiri_trotoar.geometry}
					material={materials.pembatas_kanan_trotoar}
					receiveShadow
					scale={[1.1, 1, 1]}
				/>
				<mesh
					geometry={nodes.pembatas_kanan_trotoar.geometry}
					material={materials.pembatas_kanan_trotoar}
					receiveShadow
					scale={[1.1, 1, 1]}
				/>
			</RigidBody>
			<mesh
				geometry={nodes.jalan_utama.geometry}
				material={nodes.jalan_utama.material}
				scale={[1.1, 1, 1]}
			>
				<mesh
					geometry={nodes.jalan_utama001.geometry}
					material={materials.jalan_utama_material}
				/>
			</mesh>
		</group>
	);
}

useGLTF.preload(`/models/street.glb`);
