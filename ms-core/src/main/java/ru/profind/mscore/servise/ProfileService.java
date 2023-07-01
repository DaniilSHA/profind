package ru.profind.mscore.servise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.profind.mscore.domain.Moderation;
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
        Optional<Moderation> profileByUsername = repository.findProfileByUsername(username);

        if (profileByUsername.isPresent()){
            Moderation profile = profileByUsername.get();
            return toProfileResponse(profile);
        } else {
            return null;
        }
    }

    public void save(Moderation profile)
    {
        repository.saveAndFlush(profile);
    }

    public Moderation getProfile(String username) {
        Optional<Moderation> profileByUsername = repository.findProfileByUsername(username);
        return profileByUsername.orElse(null);
    }

    private ProfileResponse toProfileResponse(Moderation profile) {
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
