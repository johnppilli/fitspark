import { browser } from '$app/environment';

const STORAGE_KEY = 'fitspark:activity';
const DEFAULT_GOAL_MIN = 45;

function todayKey() {
	const d = new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function loadStored() {
	if (!browser) return { minutesToday: 0, goalMinutes: DEFAULT_GOAL_MIN };
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return { minutesToday: 0, goalMinutes: DEFAULT_GOAL_MIN };
		const data = JSON.parse(raw);
		const goalMinutes = typeof data.goalMinutes === 'number' ? data.goalMinutes : DEFAULT_GOAL_MIN;
		if (data.date !== todayKey()) return { minutesToday: 0, goalMinutes };
		return { minutesToday: typeof data.minutesToday === 'number' ? data.minutesToday : 0, goalMinutes };
	} catch {
		return { minutesToday: 0, goalMinutes: DEFAULT_GOAL_MIN };
	}
}

const initial = loadStored();

export const activityState = $state({ minutesToday: initial.minutesToday, goalMinutes: initial.goalMinutes });

function persist() {
	if (!browser) return;
	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({ date: todayKey(), minutesToday: activityState.minutesToday, goalMinutes: activityState.goalMinutes })
	);
}

export function addActivity(minutes: number) {
	activityState.minutesToday = Math.max(0, Math.round(activityState.minutesToday + minutes));
	persist();
}

export function setActivityGoal(minutes: number) {
	activityState.goalMinutes = Math.max(1, Math.round(minutes));
	persist();
}

export function resetActivityToday() {
	activityState.minutesToday = 0;
	persist();
}
