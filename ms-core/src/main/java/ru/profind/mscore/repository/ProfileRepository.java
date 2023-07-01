package ru.profind.mscore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.profind.mscore.domain.Moderation;
import ru.profind.mscore.domain.ProfileStatus;

import java.util.List;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Moderation, Long>
{
    Optional<Moderation> findProfileByUsername(String username);

    List<Moderation> findAllByProfileStatus(ProfileStatus profileStatus);
}
