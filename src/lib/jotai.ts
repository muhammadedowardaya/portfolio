import { atom } from 'jotai';
import { Vector3, type Vector3Tuple } from 'three';

export const showMenuAtom = atom<boolean>(false);
export const selectedMenuAtom = atom<
	'tentang_saya' | 'telusuri_jalan_ini' | 'kontak'
>('tentang_saya');

export const directionAtom = atom<string | null>(null);
export const worldOffsetAtom = atom<number>(0);

export const leftHandPositionAtom = atom<Vector3Tuple>([0, 0, 0]);
export const rightHandPositionAtom = atom<Vector3Tuple>([0, 0, 0]);

export const characterPositionAtom = atom<[number, number, number]>([0, 1, 0]);
export const characterActionAtom = atom<
	| 'walking'
	| 'running'
	| 'idle'
	| 'neutral_idle'
	| 'offensive_idle'
	| 'flying'
	| 'floating'
	| 'carrying'
	| 'salute'
	| 'standing_greeting'
	| 'hip_hop_dancing'
	| 'wave_hip_hop_dance'
	| 'sitting_idle'
	| 'sitting_drinking'
	| 'sitting'
	| 'sit_to_stand'
	| 'stand_to_sit'
	| 'looking'
>('walking');

export const characterModeAtom = atom<'walking' | 'running' | 'flying'>(
	'walking'
);

export const isLookingAtom = atom<boolean>(false);

export const currentIntroIndexAtom = atom<number>(1);

export const groundXAtom = atom(0); // default sementara
export const groundYAtom = atom(0); // default sementara
export const groundZAtom = atom(0); // default sementara
