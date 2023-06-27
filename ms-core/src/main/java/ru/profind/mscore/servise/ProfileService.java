package ru.profind.mscore.servise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.profind.mscore.domain.Profile;
import ru.profind.mscore.domain.ProfileStatus;
import ru.profind.mscore.dto.response.ContactResponse;
import ru.profind.mscore.dto.response.ProfileResponse;
import ru.profind.mscore.repository.ProfileRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProfileService
{
    @Autowired private ProfileRepository repository;

    public List<ProfileResponse> getProfiles() {
        return repository.findAll().stream().map(this::toProfileResponse).collect(Collectors.toList());
    }

    public List<ProfileResponse> getProfilesByStatus(ProfileStatus profileStatus) {
        return repository.findAllByProfileStatus(profileStatus).stream().map(this::toProfileResponse).collect(Collectors.toList());
    }

    public ProfileResponse getProfileResponse(String username) {
        Optional<Profile> profileByUsername = repository.findProfileByUsername(username);

        if (profileByUsername.isPresent()){
            Profile profile = profileByUsername.get();
            return toProfileResponse(profile);
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

    private ProfileResponse toProfileResponse(Profile profile) {
        ContactResponse contactResponse = new ContactResponse(
                profile.getVk(),
                profile.getTelegram(),
                profile.getPhone(),
                profile.getEmail()
        );

        return new ProfileResponse(
                profile.getUsername(),
                profile.getProfileStatus().toString(),
                profile.getName(),
                profile.getAbout(),
                profile.getProfileGoal().toString(),
                profile.getProfileProgramLang().toString(),
                profile.getNoValidMsg(),
                contactResponse
        );
    }
}
