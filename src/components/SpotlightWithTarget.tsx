import { useHelper, type SpotLightProps } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { SpotLight, Object3D, SpotLightHelper } from 'three';

type SpotWithTargetProps = SpotLightProps & {
	targetPosition: [number, number, number];
};

export function SpotlightWithTarget({
	position,
	targetPosition,
	...rest
}: SpotWithTargetProps) {
	const spotRef = useRef<SpotLight>(null!);
	const targetRef = useRef<Object3D>(new Object3D());

	// useHelper(spotRef, SpotLightHelper, 'teal');

	useEffect(() => {
		if (spotRef.current && targetRef.current) {
			spotRef.current.target = targetRef.current;
		}
	}, []);

	return (
		<>
			<spotLight ref={spotRef} position={position} {...rest} castShadow />
			<primitive object={targetRef.current} position={targetPosition} />
		</>
	);
}
