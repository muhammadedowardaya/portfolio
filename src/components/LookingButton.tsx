import { useAtom } from 'jotai';
import { isLookingAtom } from '@/lib/jotai';

const LookingButton = ({ className }: { className?: string }) => {
	const [isLooking, setIsLooking] = useAtom(isLookingAtom);

	const handleClick = () => setIsLooking(!isLooking);

	return (
		<div className={className}>
			{isLooking ? (
				<button
					onClick={handleClick}
					className={`w-[45px] h-[45px] rounded-full bg-black p-1 border-2 border-white`}
				>
					<img
						src={`${import.meta.env.BASE_URL}/icons/zoom-out-active.svg`}
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
						src={`${import.meta.env.BASE_URL}/icons/zoom-in-active.svg`}
						alt="look up icon"
						className="w-full h-full pointer-events-none"
					/>
				</button>
			)}
		</div>
	);
};

export default LookingButton;
