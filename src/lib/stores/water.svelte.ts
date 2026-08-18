import { browser } from '$app/environment';

const STORAGE_KEY = 'fitspark:water';
const DEFAULT_GOAL_OZ = 64;

function todayKey() {
	const d = new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function loadStored() {
	if (!browser) return { ozToday: 0, goalOz: DEFAULT_GOAL_OZ };
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return { ozToday: 0, goalOz: DEFAULT_GOAL_OZ };
		const data = JSON.parse(raw);
		const goalOz = typeof data.goalOz === 'number' ? data.goalOz : DEFAULT_GOAL_OZ;
		if (data.date !== todayKey()) return { ozToday: 0, goalOz };
		return { ozToday: typeof data.ozToday === 'number' ? data.ozToday : 0, goalOz };
	} catch {
		return { ozToday: 0, goalOz: DEFAULT_GOAL_OZ };
	}
}

const initial = loadStored();

export const waterState = $state({ ozToday: initial.ozToday, goalOz: initial.goalOz });

function persist() {
	if (!browser) return;
	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({ date: todayKey(), ozToday: waterState.ozToday, goalOz: waterState.goalOz })
	);
}

export function addWater(oz: number) {
	waterState.ozToday = Math.max(0, Math.round((waterState.ozToday + oz) * 10) / 10);
	persist();
}

export function setWaterGoal(oz: number) {
	waterState.goalOz = Math.max(1, oz);
	persist();
}

export function resetWaterToday() {
	waterState.ozToday = 0;
	persist();
}
