import { useAtom } from 'jotai';
import { isLookingAtom } from '@/lib/jotai';
import { useRef } from 'react';

const LookingButton = ({ className }: { className?: string }) => {
	const [isLooking, setIsLooking] = useAtom(isLookingAtom);
	const audioRef = useRef<HTMLAudioElement>(new Audio('/sfx/zoom-up-2.mp3'));

	const handleClick = () => {
		if (audioRef.current && !isLooking) {
			audioRef.current.pause();
			audioRef.current.volume = 0.3;
			audioRef.current.currentTime = 0;
			audioRef.current.playbackRate = 0.5;
			audioRef.current.play();
		}
		setIsLooking(!isLooking);
	};

	return (
		<div className={className}>
			{isLooking ? (
				<button
					onClick={handleClick}
					className={`w-[45px] h-[45px] rounded-full bg-black p-1 border-2 border-white`}
				>
					<img
						src={`/icons/zoom-out-active.svg`}
						alt="look up icon"
						className="w-full h-full pointer-events-none"
					/>
				</button>
			) : (
				<button
					onClick={handleClick}
					className={`group w-[45px] h-[45px] rounded-full bg-black p-1 border-2 border-white`}
				>
					<img
						src={`/icons/zoom-in-active.svg`}
						alt="look up icon"
						className="w-full h-full pointer-events-none"
					/>
				</button>
			)}
		</div>
	);
};

export default LookingButton;
