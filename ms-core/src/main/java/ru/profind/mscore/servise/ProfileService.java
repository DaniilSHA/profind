package ru.profind.mscore.servise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.profind.mscore.domain.Profile;
import ru.profind.mscore.dto.response.ProfileResponse;
import ru.profind.mscore.repository.ProfileRepository;

import java.util.Optional;

@Service
@Transactional
public class ProfileService
{
    @Autowired private ProfileRepository repository;

    public ProfileResponse getProfileResponse(String username) {
        Optional<Profile> profileByUsername = repository.findProfileByUsername(username);

        if (profileByUsername.isPresent()){
            Profile profile = profileByUsername.get();

            return new ProfileResponse(
                    profile.getProfileStatus().toString(),
                    profile.getName(),
                    profile.getAbout(),
                    profile.getProfileGoal().toString(),
                    profile.getProfileProgramLang().toString(),
                    profile.getNoValidMsg()
            );
        } else {
            return null;
        }
    }

    public void save(Profile profile)
    {
        repository.saveAndFlush(profile);
    }

    public Profile getProfile(String username) {
        Optional<Profile> profileByUsername = repository.findProfileByUsername(username);
        return profileByUsername.orElse(null);
    }
}
