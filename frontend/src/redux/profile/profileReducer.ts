export type Profile = {
    status: 'NEW' | 'VALID' | 'NO_VALID',
    name: string,
    about: string,
    goal: 'STUDENT' | 'TEACHER' | 'STARTUP_PLAYER' | 'STARTUP_BOSS' | 'INVESTOR' | null,
    program_language: 'JAVA' | 'JS' | 'PYTHON' | null,
    no_valid: string,
}

export type ProfileState = {
    profile: Profile,
    meta: {
        error: number | null,
    }
}

const initialState: ProfileState = {
    profile: {
        status: 'NEW',
        name: '',
        about: '',
        goal: null,
        program_language: null,
        no_valid: '',
    },
    meta: {
        error: null,
    }
}

const PROFILE_UPDATE: string = "PROFILE_UPDATE";
const META_UPDATE: string = "META_UPDATE";

export const profileReducer = (state: ProfileState = initialState, action: any) => {
    switch (action.type) {

        case PROFILE_UPDATE:
            return {
                ...state,
                profile: {
                    status: action.profile.status,
                    name: action.profile.name,
                    about: action.profile.about,
                    goal: action.profile.goal,
                    program_language: action.profile.program_language,
                    no_valid: action.profile.no_valid,
                },
            }

        case META_UPDATE:
            return {
                ...state,
                profile: {
                    ...state.profile
                },
                meta: {
                    error: action.meta.error,
                }
            }


        default:
            return state;
    }
}