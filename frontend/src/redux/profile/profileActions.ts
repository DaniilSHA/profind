import {Profile} from "./profileReducer";

export const profileUpdate = (profile: any) => {
    return {
        type: 'PROFILE_UPDATE',
        profile: {
            status: profile.status,
            name: profile.name,
            about: profile.about,
            goal: profile.goal,
            program_language: profile.program_language,
            no_valid: profile.no_valid,
        },
    };
};

export const metaUpdate = (meta: number) => {
    return {
        type: 'META_UPDATE',
        meta: {
            error: meta,
        }
    };
};