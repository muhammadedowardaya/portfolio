import { directionAtom } from '@/lib/jotai';
import { useAtom, useSetAtom } from 'jotai';

import { Icon } from '@iconify/react';
import CharacterModeButton from './CharacterModeButton';

const CharacterMovementButton = ({ className }: { className?: string }) => {
	const [direction, setDirection] = useAtom(directionAtom);

	return (
		<div className={`${className} flex  justify-center items-center gap-14`}>
			<button
				onMouseDown={() => setDirection('left')}
				onMouseUp={() => setDirection(null)}
				onTouchStart={() => setDirection('left')}
				onTouchEnd={() => setDirection(null)}
				className={`shrink-0  text-white p-3 rounded-full hover:outline-white outline-2 ${
					direction === 'left' ? 'outline-white' : 'outline-[#666]'
				} active:scale-95 transition bg-black`}
			>
				{direction === 'left' ? (
					<img
						src={`/icons/arrow-active.svg`}
						className="rotate-90 pointer-events-none w-[24px]"
						alt="arrow icon"
					/>
				) : (
					<img
						src={`/icons/arrow.svg`}
						className="rotate-90 pointer-events-none w-[24px]"
						alt="arrow icon"
					/>
				)}
			</button>

			<CharacterModeButton className="hidden sm:flex shrink-0" />

			<button
				onMouseDown={() => setDirection('right')}
				onMouseUp={() => setDirection(null)}
				onTouchStart={() => setDirection('right')}
				onTouchEnd={() => setDirection(null)}
				className={`shrink-0  text-white p-3 rounded-full hover:outline-white outline-2 ${
					direction === 'right' ? 'outline-white' : 'outline-[#666]'
				} active:scale-95 transition bg-black`}
			>
				{direction === 'right' ? (
					<img
						src={`/icons/arrow-active.svg`}
						className="-rotate-90 pointer-events-none w-[24px]"
						alt="arrow icon"
					/>
				) : (
					<img
						src={`/icons/arrow.svg`}
						className="-rotate-90 pointer-events-none w-[24px]"
						alt="arrow icon"
					/>
				)}
			</button>
		</div>
	);
};

export default CharacterMovementButton;
