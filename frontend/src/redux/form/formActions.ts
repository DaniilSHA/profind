import {Profile} from "./formReducer";

export const formUpdate = (profile: Profile) => {
    return {
        type: 'PROFILE_UPDATE',
        status: profile.status,
        name: profile.name,
        about: profile.about,
        goal: profile.goal,
        program_language: profile.program_language,
        no_valid: profile.no_valid,
    };
};