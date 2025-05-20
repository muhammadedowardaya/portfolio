import React, { useEffect } from 'react';

import '@/styles/glowing-ring.css';

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

const GlowingRing = () => {
	useEffect(() => {
		gsap.registerPlugin(SplitText);

		const split = SplitText.create('.dot-loader', { type: 'chars' });

		const tl = gsap.timeline({ repeat: -1 });

		tl.from(split.chars, {
			opacity: 0,
			stagger: 1,
			duration: 1,
		});

		return () => {
			tl.kill();
		};
	}, []);

	return (
		<div className="loader-wrapper">
			<p className="loader-text text-center text-lg md:text-xl font-bold">
				<span>Tunggu sebentar 😁</span>
				<br />
				<span className="dot-loader text-2xl">. . . . .</span>
			</p>
			<div className="loader">
				<div className="circle">
					<span></span>
				</div>
				<div className="circle">
					<span></span>
				</div>
				<div className="circle">
					<span></span>
				</div>
				<div className="circle">
					<i></i>
				</div>
				<div className="circle">
					<i></i>
				</div>
				<div className="circle">
					<i></i>
				</div>

				<img
					src={`${import.meta.env.BASE_URL}/photo/aku-resized.jpg`}
					alt="my image"
				/>
			</div>
		</div>
	);
};

export default GlowingRing;
