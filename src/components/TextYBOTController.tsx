import { currentIntroIndexAtom } from '@/lib/jotai';
import { useAtom } from 'jotai';
import { Icon } from '@iconify/react';

const TextYBOTController = () => {
	const [currentIntroIndex, setCurrentIntroIndex] = useAtom(
		currentIntroIndexAtom
	);

	return (
		<div className="absolute left-1/2 -translate-x-1/2 bottom-20 min-[600px]:bottom-28 flex items-center justify-center gap-x-12 min-[600px]:gap-x-14">
			<button
				onClick={() => {
					if (currentIntroIndex > 1) {
						setCurrentIntroIndex(currentIntroIndex - 1);
					}
				}}
				className={`p-1 rounded-full border-2 ${
					currentIntroIndex === 1 ? 'border-[#666]' : 'border-white'
				}  bg-[#171717]/80 w-14 h-14 min-[1024px]:w-12 h-12 min-[1024px]:h-12 scale-90 flex justify-center items-center`}
			>
				{currentIntroIndex === 1 ? (
					<img
						src={`/icons/chevron-left.svg`}
						className="w-full pointer-events-none"
						alt="left button icon"
					/>
				) : (
					<img
						src={`/icons/chevron-left-active.svg`}
						className="w-full pointer-events-none"
						alt="left button active icon"
					/>
				)}
			</button>
			<button
				onClick={() => {
					if (currentIntroIndex < 3) {
						setCurrentIntroIndex(currentIntroIndex + 1);
					}
				}}
				className={`${
					currentIntroIndex === 3 ? 'border-[#666]' : 'border-white'
				} p-1 rounded-full border-2 bg-[#171717]/80 w-14 h-14 min-[1024px]:w-12 h-12 min-[1024px]:h-12 scale-90 flex justify-center items-center`}
			>
				{currentIntroIndex === 3 ? (
					<img
						src={`/icons/chevron-right.svg`}
						className="w-full pointer-events-none"
						alt="right button icon"
					/>
				) : (
					<img
						src={`/icons/chevron-right-active.svg`}
						className="w-full pointer-events-none"
						alt="right button active icon"
					/>
				)}
			</button>
		</div>
	);
};

export default TextYBOTController;
