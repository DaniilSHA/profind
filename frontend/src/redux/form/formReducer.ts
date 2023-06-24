export type Profile = {
    status: 'NEW'|'VALID'|'NO_VALID',
    name: string,
    about: string,
    goal: 'STUDENT'| 'TEACHER'| 'STARTUP_PLAYER'|'STARTUP_BOSS'|'INVESTOR'|null,
    program_language: 'JAVA'|'JS'|'PYTHON'|null,
    no_valid: string,
}

const initialState: Profile  = {
    status: 'NEW',
    name: '',
    about: '',
    goal: null,
    program_language: null,
    no_valid: '',
}

const PROFILE_UPDATE: string = "PROFILE_UPDATE";

export const formReducer = (state: Profile = initialState, action: any) => {
    switch (action.type) {

        case PROFILE_UPDATE:
            return {
                ...state,
                status: action.status,
                name: action.name,
                about: action.about,
                goal: action.goal,
                program_language: action.program_language,
                no_valid: action.no_valid,
            }

        default:
            return state;
    }
}