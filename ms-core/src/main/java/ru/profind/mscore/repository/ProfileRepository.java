package ru.profind.mscore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.profind.mscore.domain.Profile;
import ru.profind.mscore.domain.ProfileGoal;
import ru.profind.mscore.domain.ProfileStatus;

import java.util.List;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long>
{
    Optional<Profile> findProfileByUsername(String username);

    List<Profile> findAllByProfileStatus(ProfileStatus profileStatus);

    List<Profile> findAllByProfileStatusAndProfileGoal(ProfileStatus profileStatus, ProfileGoal profileGoal);
}
