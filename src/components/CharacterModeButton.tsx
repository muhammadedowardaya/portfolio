import { characterModeAtom } from '@/lib/jotai';
import { useAtom } from 'jotai';

import { Icon } from '@iconify/react';

const CharacterModeButton = ({ className }: { className?: string }) => {
	const [characterMode, setCharacterMode] = useAtom(characterModeAtom);

	return (
		<div
			className={`${className} grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-[max-content] gap-8`}
		>
			<button
				onClick={() => setCharacterMode('walking')}
				className={`${
					characterMode === 'walking' ? 'border-white' : 'border-[#666]'
				} rounded-full hover:border-white border-2 bg-black`}
			>
				{characterMode === 'walking' ? (
					<img
						src={`${import.meta.env.BASE_URL}/icons/walking-active.svg`}
						alt="walking icon"
						className="w-[40px] pointer-events-none"
					/>
				) : (
					<img
						src={`${import.meta.env.BASE_URL}/icons/walking.svg`}
						alt="walking icon"
						className="w-[40px] pointer-events-none"
					/>
				)}
			</button>
			<button
				onClick={() => setCharacterMode('running')}
				className={`${
					characterMode === 'running' ? 'border-white' : 'border-[#666]'
				} rounded-full hover:border-white border-2 bg-black`}
			>
				{characterMode === 'running' ? (
					<img
						src={`${import.meta.env.BASE_URL}/icons/running-active.svg`}
						alt="running icon"
						className="w-[40px] pointer-events-none"
					/>
				) : (
					<img
						src={`${import.meta.env.BASE_URL}/icons/running.svg`}
						alt="running icon"
						className="w-[40px] pointer-events-none"
					/>
				)}
			</button>
			<button
				onClick={() => setCharacterMode('flying')}
				className={`${
					characterMode === 'flying' ? 'border-white' : 'border-[#666]'
				} rounded-full hover:border-white border-2 bg-black`}
			>
				{characterMode === 'flying' ? (
					<img
						src={`${import.meta.env.BASE_URL}/icons/flying-active.svg`}
						width={47}
						alt="flying icon"
						className="w-[40px] pointer-events-none"
					/>
				) : (
					<img
						src={`${import.meta.env.BASE_URL}/icons/flying.svg`}
						width={47}
						alt="flying icon"
						className="w-[40px] pointer-events-none"
					/>
				)}
			</button>
		</div>
	);
};

export default CharacterModeButton;
