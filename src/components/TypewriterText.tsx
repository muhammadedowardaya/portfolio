import useWindowSize from '@/hooks/useWindowSize';
import { characterPositionAtom, currentIntroIndexAtom } from '@/lib/jotai';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Group, MeshStandardMaterial, Vector3, type Mesh } from 'three';

interface TypewriterTextProps {
	fullText: string;
	speed?: number; // milliseconds per character
	delayBeforeReverse?: number;
	reverse?: boolean; // <- tambahkan
	loop?: boolean;
	fontSize?: number;
	scale?: number;
	maxWidth?: number;
	lineHeight?: number;
	resetKey?: any; // <- tambahkan ini
}

export function TypewriterText({
	fullText,
	speed = 100,
	delayBeforeReverse = 1000,
	reverse = false,
	loop = true,
	fontSize = 1,
	scale = 1,
	maxWidth,
	lineHeight = 1.5,
	resetKey,
}: TypewriterTextProps) {
	const groupRef = useRef<Group>(null);
	const textRef = useRef<any>(null);

	const bgRef = useRef<Mesh | null>(null);
	const [bounds, setBounds] = useState({ width: 1, height: 1 });

	const [len, setLen] = useState<number>(0);
	const [reversing, setReversing] = useState<boolean>(false);
	const [done, setDone] = useState<boolean>(false);

	const characterPosition = useAtomValue(characterPositionAtom);
	const [x, y, z] = characterPosition;

	const currentIntroIndex = useAtomValue(currentIntroIndexAtom);

	const { width } = useWindowSize();

	useEffect(() => {
		if (done) return;

		let timeoutId: ReturnType<typeof setTimeout>;

		if (!reversing && len < fullText.length) {
			timeoutId = setTimeout(() => setLen((prev) => prev + 1), speed);
		} else if (!reversing && len === fullText.length) {
			if (reverse) {
				timeoutId = setTimeout(() => setReversing(true), delayBeforeReverse);
			} else {
				setDone(true);
			}
		} else if (reversing && len > 0) {
			timeoutId = setTimeout(() => setLen((prev) => prev - 1), speed);
		} else if (reversing && len === 0) {
			if (loop) {
				setReversing(false);
			} else {
				setDone(true);
			}
		}

		return () => clearTimeout(timeoutId);
	}, [
		len,
		reversing,
		speed,
		fullText.length,
		delayBeforeReverse,
		reverse,
		loop,
		done,
	]);

	useEffect(() => {
		setLen(0);
		setReversing(false);
		setDone(false);
	}, [resetKey]);

	useFrame(() => {
		const offset = new Vector3(0, currentIntroIndex === 3 ? 3.7 : 4.5, -0.3);

		const target = new Vector3(x, y, z);
		groupRef.current?.position.lerp(target.add(offset), 0.1);

		if (textRef.current) {
			if (textRef.current.geometry) {
				const box = textRef.current.geometry.boundingBox;
				if (box) {
					const w = box.max.x - box.min.x;
					const h = box.max.y - box.min.y;
					setBounds({ width: w, height: h });
				}
				textRef.current.sync(); // ensure geometry is up to date
			}
			// console.info(textRef.current);
		}
	});

	// useEffect(() => {
	// 	if (textRef.current) {
	// 		textRef.current.sync(); // ensure geometry is up to date
	// 		// const box = textRef.current.geometry.boundingBox;
	// 		// if (box) {
	// 		// 	const w = box.max.x - box.min.x;
	// 		// 	const h = box.max.y - box.min.y;
	// 		// 	setBounds({ width: w, height: h });
	// 		// }

	// 		// textRef.current?.position.set(new Vector3(0, 0, 1), 0.1);
	// 	}
	// }, []);

	return (
		<group ref={groupRef} position={[-145, 10, -4]}>
			<mesh
				ref={bgRef}
				position={[0, 0, -0.03]} // sedikit di belakang teks
			>
				<planeGeometry args={[bounds.width + 0.3, bounds.height + 0.1]} />
				{/* tambahkan padding */}
				<meshBasicMaterial
					color="black"
					// transparent opacity={0.5}
				/>
			</mesh>
			<Text
				ref={textRef}
				font="/fonts/Lato-Regular.ttf"
				position={[0, 0, 0]}
				fontSize={fontSize}
				color="white"
				anchorX={width <= 400 ? 'center' : 'center'}
				anchorY="middle"
				scale={scale}
				maxWidth={maxWidth} // optional
				lineHeight={lineHeight}
			>
				{fullText.slice(0, len)}
			</Text>
		</group>
	);
}
