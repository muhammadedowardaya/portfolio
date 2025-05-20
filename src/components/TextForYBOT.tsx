import { currentIntroIndexAtom, selectedMenuAtom } from '@/lib/jotai';
import { useAtomValue } from 'jotai';
import React, { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

import '@/styles/text-for-ybot.css';

export default function TextForYBOT() {
	const selectedMenu = useAtomValue(selectedMenuAtom);
	const currentIntroIndex = useAtomValue(currentIntroIndexAtom);

	const timelineRef = useRef<gsap.core.Timeline | null>(null);
	const splitRef = useRef<any>(null);

	// refs untuk wrapper & cursor
	const wrapperRef = useRef<HTMLDivElement>(null);
	const cursorRef = useRef<HTMLSpanElement>(null);
	const backgroundTextRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (selectedMenu !== 'tentang_saya') return;

		// Tentukan ID teks yang aktif
		let id = '';
		let delayBefore = currentIntroIndex === 1 ? 2.5 : 0;
		if (currentIntroIndex === 1) {
			id = 'text1';
			delayBefore = 2;
		} else if (currentIntroIndex === 2) {
			id = 'text2';
		} else if (currentIntroIndex === 3) {
			id = 'text3';
		} else return;

		const el = document.getElementById(id);
		const wrap = wrapperRef.current;
		const cursor = cursorRef.current;
		const background = backgroundTextRef.current;
		if (!el || !wrap || !cursor || !background) return;

		gsap.registerPlugin(SplitText);
		// bersihkan animasi & split sebelumnya
		timelineRef.current?.kill();
		splitRef.current?.revert();

		// split teks ke chars
		const split = SplitText.create(el, { type: 'words, chars' });
		splitRef.current = split;

		// atur cursor awal
		cursor.style.transform = 'translate(0,0)';

		// buat timeline
		const tl = gsap.timeline();
		tl.from(split.chars, {
			duration: 1,
			display: 'none',
			stagger: 0.05,
			delay: delayBefore,
			onUpdate: () => {
				const visible = split.chars.filter(
					(c) => getComputedStyle(c).display !== 'none'
				);
				const first = visible[0];
				const last = visible[visible.length - 1];
				if (first && last && wrap && background && cursor) {
					const firstRect = first.getBoundingClientRect();
					const lastRect = last.getBoundingClientRect();
					const wrapRect = wrap.getBoundingClientRect();

					// Posisi relatif terhadap wrapper
					const xStart = firstRect.left - wrapRect.left;
					const yStart = firstRect.top - wrapRect.top;
					const yEnd = lastRect.bottom - wrapRect.top;

					// Cursor di akhir baris terakhir
					cursor.style.transform = `translate(${
						lastRect.right - wrapRect.left
					}px, ${lastRect.top - wrapRect.top}px)`;

					// Background bergerak vertikal dan full lebar
					background.style.transform = `translate(-10px, -5px)`;
					background.style.width = `${wrapRect.width + 20}px`; // atau wrapRect.width + 'px'
					background.style.height = `${yEnd - yStart + 10}px`;
				}
			},

			onComplete: () => {
				cursor.classList.add('blink');
			},
		});

		timelineRef.current = tl;

		return () => {
			tl.kill();
			split.revert();
		};
	}, [selectedMenu, currentIntroIndex]);

	// teks sesuai index
	const texts = {
		1: 'Halo Gaes!',
		2: 'Saya Muhammad Edo Wardaya, seorang Front-End Web Developer yang memiliki passion dalam membangun antarmuka website yang interaktif, responsif, dan memikat.',
		3: 'Berikut ini beberapa keahlian yang saya miliki dalam membangun sebuah website :<br><br>HTML, CSS, TailwindCSS, Sass, Javascript, Typescript, Vite, Astro, NextJS, Zod, Shadcn/ui, Socket.io, Prisma, Figma, Framer Motion, GSAP, Jotai, PWA (Progressive Web App), Tanstack Router, MySQL, RestApi, Blender, Threejs.',
	};

	return (
		<div id={`text-for-ybot`}>
			{currentIntroIndex >= 1 && currentIntroIndex <= 3 && (
				<div ref={wrapperRef} id="wrapper" className="relative">
					<p
						key={currentIntroIndex}
						id={`text${currentIntroIndex}`}
						className="whitespace-pre-wrap z-20 relative"
						dangerouslySetInnerHTML={{
							__html: texts[currentIntroIndex as 1 | 2 | 3],
						}}
					></p>
					<span
						ref={cursorRef}
						className="cursor absolute top-0 left-0 pointer-events-none z-30"
					>
						|
					</span>
					<div
						ref={backgroundTextRef}
						className="z-10 absolute top-0 left-0 pointer-events-none bg-black"
					></div>
				</div>
			)}
		</div>
	);
}
