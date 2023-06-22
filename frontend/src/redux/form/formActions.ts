import {Form} from "./formReducer";

export const formUpdate = (profile: Form) => {
    return {
        type: 'FORM_UPDATE',
        status: profile.status,
        name: profile.name,
        about: profile.about,
        goal: profile.goal,
        program_language: profile.program_language,
        no_valid: profile.no_valid,
    };
};