export type Form = {
    status: 'NEW'|'VALID'|'NO_VALID',
    name: string,
    about: string,
    goal: 'STUDENT'| 'TEACHER'| 'STARTUP_PLAYER'|'STARTUP_BOSS'|'INVESTOR'|null,
    program_language: 'JAVA'|'JS'|'PYTHON'|null,
    no_valid: string,
}

const initialState: Form  = {
    status: 'NEW',
    name: '',
    about: '',
    goal: null,
    program_language: null,
    no_valid: '',
}

const FORM_UPDATE: string = "FORM_UPDATE";

export const formReducer = (state: Form = initialState, action: any) => {
    switch (action.type) {

        case FORM_UPDATE:
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