package ru.profind.mscore.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.profind.mscore.domain.Profile;
import ru.profind.mscore.domain.ProfileGoal;
import ru.profind.mscore.domain.ProfileProgramLang;
import ru.profind.mscore.domain.ProfileStatus;
import ru.profind.mscore.dto.requset.ProfileRequest;
import ru.profind.mscore.dto.response.ProfileResponse;
import ru.profind.mscore.exception.ConflictException;
import ru.profind.mscore.exception.NoContentException;
import ru.profind.mscore.exception.NotAcceptableException;
import ru.profind.mscore.exception.ServerException;
import ru.profind.mscore.servise.ProfileService;

@RestController
@RequestMapping("/")
public class ProfileController
{
    @Autowired private ProfileService profileService;

    @GetMapping("/profile")
    @ResponseStatus(HttpStatus.OK)
    public ProfileResponse getProfile(HttpServletRequest request)
    {
        Object usernameObj = request.getAttribute("username");
        if (usernameObj == null)
            throw new ServerException();

        String username = (String) usernameObj;

        ProfileResponse profileResponse = profileService.getProfileResponse(username);

        if (profileResponse == null)
            throw new NoContentException();

        return profileResponse;
    }

    @PostMapping("/profile")
    @ResponseStatus(HttpStatus.OK)
    public void createProfile(HttpServletRequest request, @RequestBody ProfileRequest profileRequestDto)
    {
        Object usernameObj = request.getAttribute("username");
        if (usernameObj == null)
            throw new ServerException();

        String username = (String) usernameObj;

        ProfileResponse profileResponse = profileService.getProfileResponse(username);
        if (profileResponse != null)
            throw new NotAcceptableException();

        try
        {
            ProfileGoal profileGoalParse = ProfileGoal.valueOf(profileRequestDto.getGoal());
            ProfileStatus profileStatusParse = ProfileStatus.valueOf(profileRequestDto.getStatus());
            ProfileProgramLang profileProgramLangParse = ProfileProgramLang.valueOf(profileRequestDto.getProgram_language());

            profileService.save(Profile.builder()
                    .username(username)
                    .name(profileRequestDto.getName())
                    .about(profileRequestDto.getAbout())
                    .noValidMsg(profileRequestDto.getNo_valid())
                    .profileStatus(profileStatusParse)
                    .profileGoal(profileGoalParse)
                    .profileProgramLang(profileProgramLangParse)
                    .vk(profileRequestDto.getContact().getVk())
                    .telegram(profileRequestDto.getContact().getTelegram())
                    .phone(profileRequestDto.getContact().getPhone())
                    .email(profileRequestDto.getContact().getEmail())
                    .build());
        } catch (Exception e) {
            throw new ConflictException();
        }
    }

    @PutMapping("/profile")
    @ResponseStatus(HttpStatus.OK)
    public void editProfile(HttpServletRequest request, @RequestBody ProfileRequest profileRequestDto)
    {
        Object usernameObj = request.getAttribute("username");
        if (usernameObj == null)
            throw new ServerException();

        String username = (String) usernameObj;

        Profile profile = profileService.getProfile(username);
        if (profile == null)
            throw new NotAcceptableException();

        try
        {
            ProfileGoal profileGoalParse = ProfileGoal.valueOf(profileRequestDto.getGoal());
            ProfileStatus profileStatusParse = ProfileStatus.valueOf(profileRequestDto.getStatus());
            ProfileProgramLang profileProgramLangParse = ProfileProgramLang.valueOf(profileRequestDto.getProgram_language());

            profile.setName(profileRequestDto.getName());
            profile.setAbout(profileRequestDto.getAbout());
            profile.setNoValidMsg(profileRequestDto.getNo_valid());
            profile.setProfileStatus(profileStatusParse);
            profile.setProfileGoal(profileGoalParse);
            profile.setProfileProgramLang(profileProgramLangParse);
            profile.setVk(profileRequestDto.getContact().getVk());
            profile.setTelegram(profileRequestDto.getContact().getTelegram());
            profile.setPhone(profileRequestDto.getContact().getPhone());
            profile.setEmail(profileRequestDto.getContact().getEmail());

            profileService.save(profile);
        } catch (Exception e) {
            throw new ConflictException();
        }
    }
}
