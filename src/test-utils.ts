import { OccupationsAndStates, ProfileFormBody, State } from "./app/fetch-http.service/fetch-http.service";

export function anyAlphaString(len: number): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let ans = '';
    for (let i = len; i > 0; i--) {
        ans += letters[Math.floor(Math.random() *  letters.length)];
    }
    return ans;
}

export function anyInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function anyBool(): boolean {
    return Math.random() < 0.5;
}

export function getState(vals?: Partial<State>): State {
    const state: State = { name: '', abbreviation: '' }
    if (vals) {
        Object.keys(vals).forEach(key => (state as any)[key] = (vals as any)[key]);
    }
    return state;
}

export function getOccupationsAndStates(vals?: Partial<OccupationsAndStates>): OccupationsAndStates {
    const obj: OccupationsAndStates = { occupations: [], states: [] }
    if (vals) {
        Object.keys(vals).forEach(key => (obj as any)[key] = (vals as any)[key]);
    }
    return obj;
}

export function getProfileFormBody(vals?: Partial<ProfileFormBody>): ProfileFormBody {
    const formBody: ProfileFormBody = {
        name: anyAlphaString(anyInteger(1, 100)),
        password: anyAlphaString(anyInteger(1, 100)),
        email:anyAlphaString(anyInteger(1, 100)),
        occupation: anyAlphaString(anyInteger(1, 100)),
        state: anyAlphaString(anyInteger(1, 100)),
    }
    if (vals) {
        Object.keys(vals).forEach(key => (formBody as any)[key] = (vals as any)[key]);
    }
    return formBody;
}