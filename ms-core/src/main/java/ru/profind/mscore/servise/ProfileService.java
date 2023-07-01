package ru.profind.mscore.servise;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import ru.profind.mscore.domain.*;
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
    @Autowired private PrematchService prematchService;

    public List<ProfileResponse> getPrematchProfiles(
            String targetUsername,
            ProfileGoal profileGoal,
            ProfileProgramLang lang,
            boolean swaipUsers,
            Boolean wasLike
    )
    {
        List<Profile> profiles = repository
                .findAllByProfileStatusAndProfileGoal(ProfileStatus.VALID, profileGoal)
                .stream()
                .filter(profile -> {
                    if (lang != null) {
                        return profile.getProfileProgramLang() == lang;
                    } else return true;
                })
                .toList();


        List<String> swaipUsernames = prematchService
                .findAllWhereTargetUsername(targetUsername)
                .stream()
                .filter(prematch -> {
                    if (wasLike != null) {
                        return prematch.isWasLike() == wasLike;
                    } else return true;
                })
                .map(Prematch::getSwaipUsername)
                .toList();


        if (swaipUsers) {
            return profiles
                    .stream()
                    .filter(profile -> swaipUsernames.contains(profile.getUsername()))
                    .map(this::toProfileResponse)
                    .collect(Collectors.toList());
        } else {
            return profiles
                    .stream()
                    .filter(profile -> !swaipUsernames.contains(profile.getUsername()))
                    .map(this::toProfileResponse)
                    .collect(Collectors.toList());
        }
    }

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
