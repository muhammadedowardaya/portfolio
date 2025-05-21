// audio.ts
export const audioCtx =
	typeof window !== 'undefined' ? new AudioContext() : null;
export const buffers: Record<'walking' | 'running' | 'flying', AudioBuffer> = {
	walking: null!,
	running: null!,
	flying: null!,
};

export async function loadBuffer(name: keyof typeof buffers, url: string) {
	const resp = await fetch(url);
	const arrayBuf = await resp.arrayBuffer();
	if (audioCtx) {
		buffers[name] = await audioCtx.decodeAudioData(arrayBuf);
	}
}

let currentSource: AudioBufferSourceNode | null = null;

export function playLoop(name: keyof typeof buffers | null, rate = 1) {
	// Stop loop sebelumnya
	if (currentSource) {
		currentSource.stop();
		currentSource.disconnect();
		currentSource = null;
	}

	if (!name) return; // kalau null, berarti mute

	// Buat node baru setiap play
	if (audioCtx) {
		const src = audioCtx.createBufferSource();
		src.buffer = buffers[name];
		src.loop = true;
		src.playbackRate.value = rate;
		src.connect(audioCtx.destination);
		src.start(0);

		currentSource = src;
	}
}
