'use client';

import React from 'react';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
	characterPositionAtom,
	showMenuAtom,
	selectedMenuAtom,
	isLookingAtom,
} from '@/lib/jotai';

import { Environment, OrbitControls, useProgress } from '@react-three/drei';

import { Physics } from '@react-three/rapier';
import { YBOT } from './YBOT';
import { Lamp } from './Lamp';

import { AnimatePresence, motion } from 'motion/react';
import TextYBOTController from './TextYBOTController';
import { SkillBoard } from './SkillBoard';
import Contact from './ContactMenu';
import { Street } from './Street';
import { NatureForStreet } from './NatureForStreet';
import CharacterMovementButton from './CharacterMovementButton';
import CharacterModeButton from './CharacterModeButton';
import { SkillBoardOnStreet } from './SkillBoardOnStreet';
import TextForYBOT from './TextForYBOT';
import GlowingRing from './GlowingRing';
import LookingButton from './LookingButton';
import { Billboard } from './Billboard';
import { Trees } from './Trees';
import { Wall } from './Wall';
import useWindowSize from '@/hooks/useWindowSize';

import '@/styles/welcome-section.css';

export default function My3DPortfolio() {
	const [showMenu, setShowMenu] = useAtom(showMenuAtom);
	const [selectedMenu, setSelectedMenu] = useAtom(selectedMenuAtom);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const isLooking = useAtomValue(isLookingAtom);

	const { width } = useWindowSize();

	const audioRef = useRef<HTMLAudioElement | null>(null);

	const fadeOutAudio = () => {
		const audio = audioRef.current;
		if (!audio) return;

		let volume = audio.volume;

		const fade = setInterval(() => {
			if (volume > 0.05) {
				volume -= 0.05;
				audio.volume = volume;
			} else {
				clearInterval(fade);
				audio.pause();
				audio.currentTime = 0;
				audio.volume = 1; // reset untuk pemutaran berikutnya
			}
		}, 100); // setiap 100ms
	};

	useEffect(() => {
		audioRef.current = new Audio(`/sfx/loading.mp3`);
	}, []);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		if (isOpen && !isLoaded) {
			audio.pause();
			audio.currentTime = 0;
			audio.volume = 1;
			audio.play().catch((err) => console.error('Audio play error:', err));
		}

		if (isLoaded) {
			fadeOutAudio();
		}
	}, [isOpen, isLoaded]);

	if (!isOpen) {
		return (
			<div
				id="welcome-section"
				className={`relative z-10 bg-cover bg-top w-svw h-svh flex justify-center items-center`}
				style={{
					backgroundImage:
						width !== null && width >= 1000
							? `url(/photo/bg-desktop.png)`
							: `url(/photo/bg-mobile.png)`,
				}}
			>
				<div className="bg-[#171717] w-[90%] md:w-[500px]  border-2 text-white border-white z-30 p-8 rounded-md flex flex-col gap-4 justy-center items-center ">
					<h1 className="text-xl md:text-2xl font-bold text-center">
						<span className="text-white/50">Selamat Datang di</span> <br />
						<span>Portfolio 3D</span> <br />
						<span>Muhammad Edo Wardaya</span>
					</h1>
					<p className="text-center text-base p-4 text-white/50">
						Website ini menampilkan{' '}
						<b className="text-white">karakter robot 3D</b> yang dapat menyapa,
						berjalan menelusuri jalan dan menari
					</p>
					<button onClick={() => setIsOpen(true)} type="button" className="btn">
						<strong className="text-xl">START</strong>
						<div id="container-stars">
							<div id="stars"></div>
						</div>

						<div id="glow">
							<div className="circle"></div>
							<div className="circle"></div>
						</div>
					</button>
				</div>
				<div className="absolute z-20 backdrop-blur-xs bg-black/10 inset-0"></div>
			</div>
		);
	}

	return (
		<div className="relative w-svw h-svh overflow-hidden">
			<Canvas
				shadows
				camera={{
					position: [-145, 2, 2],
					rotation: [0, 0, 0],
					frustumCulled: true,
				}}
			>
				{/* <OrbitControls /> */}
				{/* <orthographicCamera
					position={[-145, 0, 10]} // z-nya tetap diperlukan agar bisa lihat ke arah objek
					zoom={100} // Semakin besar, semakin "zoom in"
					left={-5}
					right={5}
					top={5}
					bottom={-5}
					near={0.1}
					far={1000}
				/> */}
				<Suspense fallback={null}>
					<Physics>
						<SceneWrapper onLoaded={() => setIsLoaded(true)} />
					</Physics>
				</Suspense>
				<Environment
					files={`/textures/DaySkyHDRI055B_2K-HDR.exr`}
					// background
					ground={{
						height: 0, // Atur tinggi sphere HDRI dari ground ke atas
						radius: 900, // Radius sphere (semakin besar, semakin jauh dari karakter)
						scale: 900, // Skala global sphere, juga memengaruhi jarak
					}}
				/>
			</Canvas>

			{!isLoaded ? (
				// ---------------------  show loading   -----------------
				<GlowingRing />
			) : (
				<>
					{/* --------------- Telusuri Jalan Ini Menu -------- */}
					{selectedMenu === 'telusuri_jalan_ini' && !showMenu && (
						<>
							{!isLooking && (
								<>
									<CharacterMovementButton className="absolute left-1/2 -translate-x-1/2 bottom-12 min-[360px]:bottom-16 min-[700px]:bottom-20 min-[800px]:bottom-24 min-[1024px]:bottom-14" />
									<CharacterModeButton className="absolute top-1/2 -translate-y-1/2 left-4 min-[400px]:left-6 sm:hidden" />
								</>
							)}
							<LookingButton className="absolute top-1/2 -translate-y-1/2 right-4 min-[400px]:right-6 min-[600px]:right-8 lg:right-20" />
						</>
					)}

					{/* --------------- Kontak Menu ------------ */}
					{selectedMenu === 'kontak' && !showMenu && <Contact />}

					{/* ------------------------------ Menu -------------- */}
					<AnimatePresence>
						{showMenu && (
							<motion.div
								key="menu"
								initial={{ opacity: 0, y: '-50%' }}
								animate={{ opacity: 1, y: '0%' }}
								exit={{ opacity: 0, y: '-50%' }}
								className="border-1 border-white absolute z-100 top-[20%] left-1/2 -translate-x-1/2 flex justify-center items-center "
							>
								<div className="flex flex-col gap-4 pt-4 pb-6 px-6 w-[250px] min-[360px]:w-[300px] min-[400px]:w-[350px] h-max backdrop-blur-md bg-black/10 rounded-md">
									<h2 className="text-center text-xl font-bold text-slate-100">
										Menu
									</h2>
									<ul className="flex flex-col gap-4 text-sm">
										<li className="relative group">
											<button
												onClick={() => {
													setSelectedMenu('tentang_saya');
													setShowMenu(false);
												}}
												className={`${
													selectedMenu === 'tentang_saya' && 'active'
												} menu-item rounded-sm flex items-center gap-4 w-full p-2`}
											>
												<img
													src={`/icons/info.svg`}
													width={20}
													className="pointer-events-none"
													alt="info icon"
												/>
												<b>Tentang Saya</b>
											</button>
											<ArrowRight
												className={`opacity-0 group-hover:opacity-100`}
											/>
										</li>
										<li className="relative group">
											<button
												onClick={() => {
													setSelectedMenu('telusuri_jalan_ini');
													setShowMenu(false);
												}}
												className={`${
													selectedMenu === 'telusuri_jalan_ini' && 'active'
												} menu-item rounded-sm flex items-center gap-4 w-full p-2`}
											>
												<img
													src={`/icons/road.svg`}
													width={20}
													height={20}
													alt="road icon"
													className="pointer-events-none"
												/>
												<b>Telusuri Jalan Ini</b>
											</button>
											<ArrowRight
												className={`opacity-0 group-hover:opacity-100`}
											/>
										</li>
										<li className="relative group">
											<button
												onClick={() => {
													setSelectedMenu('kontak');
													setShowMenu(false);
												}}
												className={`${
													selectedMenu === 'kontak' && 'active'
												} menu-item rounded-sm flex items-center gap-4 w-full p-2`}
											>
												<img
													src={`/icons/contact-calendar.svg`}
													width={20}
													height={20}
													alt="contact icon"
													className="pointer-events-none"
												/>
												<b>Kontak Saya</b>
											</button>
											<ArrowRight
												className={`opacity-0 group-hover:opacity-100`}
											/>
										</li>
									</ul>
								</div>
								<button
									className="absolute -top-3 -right-3 bg-destructive"
									onClick={() => setShowMenu(false)}
								>
									<img
										src={`/icons/baseline-close.svg`}
										width={24}
										className="pointer-events-none"
										alt="close icon"
									/>
								</button>
							</motion.div>
						)}
					</AnimatePresence>

					{/* --------------- burger menu button--------------- */}
					<AnimatePresence>
						{!showMenu && (
							<motion.button
								onClick={() => setShowMenu(true)}
								className="absolute top-4 right-4 min-[400px]:top-6 min-[400px]:right-6 min-[700px]:top-10 min-[700px]:right-10 bg-[#171717] text-white p-2 border-2 border-white rounded-full"
								key="burger-menu-button"
								initial={{ opacity: 0, y: '-50%' }}
								animate={{ opacity: 1, y: '0%' }}
								exit={{ opacity: 0, y: '-50%' }}
							>
								<img
									src={`/icons/baseline-menu.svg`}
									width={24}
									className="pointer-events-none"
									alt="menu icon"
								/>
							</motion.button>
						)}
					</AnimatePresence>

					{/* --------------- text for YBOT (tentang_saya menu) ------- */}
					{selectedMenu === 'tentang_saya' && !showMenu && (
						<>
							<TextYBOTController />
							<TextForYBOT />
						</>
					)}
				</>
			)}
		</div>
	);
}

function Scene() {
	const [characterPosition] = useAtom(characterPositionAtom);
	const [x] = characterPosition;
	const { width } = useWindowSize();

	const lampCount = 16;
	const startX = -160;
	const gap = width > 768 ? 30 : 20;

	const lampPositions = Array.from({ length: lampCount }, (_, i) => [
		startX + i * gap,
		-0.2,
		-1.8,
	]) as [number, number, number][];

	// const { positionX, positionY, positionZ } = useControls('position', {
	// 	positionX: 0,
	// 	positionY: 0,
	// 	positionZ: 0,
	// });

	return (
		<group>
			{/* <ambientLight intensity={0.3} /> */}
			{/*<directionalLight
				position={[0, 30, 35]}
				intensity={0.5}
				castShadow
				shadow-bias={-0.0001}
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
				shadow-camera-near={1}
				shadow-camera-far={100}
				shadow-camera-left={-50}
				shadow-camera-right={50}
				shadow-camera-top={50}
				shadow-camera-bottom={-50}
			/> */}

			{lampPositions.map((pos, i) => {
				const isVisible = Math.abs(x - pos[0]) < gap / 2;

				return (
					<Lamp
						key={i}
						position={pos}
						scale={1.2}
						rotation={[0, 3, 0]}
						showSpotlight={isVisible}
					/>
				);
			})}

			<Trees />
			<Wall />
			<NatureForStreet />
			<SkillBoardOnStreet />
			<SkillBoard />
			<Billboard />
			<YBOT scale={1.8} />
			<Street />
		</group>
	);
}

export function SceneWrapper({ onLoaded }: { onLoaded: () => void }) {
	const { loaded, total, active } = useProgress();

	useEffect(() => {
		if (loaded === total && !active) {
			onLoaded();
		}
	}, [loaded, total, active]);

	return <Scene />;
}

function ArrowRight({ className }: { className?: string }) {
	return (
		<img
			src={`/icons/arrow-right.svg`}
			width={20}
			alt="penunjuk menu"
			className={`${className} absolute -left-6 top-1/2 -translate-y-1/2 pointer-events-none`}
		/>
	);
}
