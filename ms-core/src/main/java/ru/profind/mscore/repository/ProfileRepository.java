package ru.profind.mscore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.profind.mscore.domain.Moditem;
import ru.profind.mscore.domain.ProfileStatus;

import java.util.List;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Moditem, Long>
{
    Optional<Moditem> findProfileByUsername(String username);

    List<Moditem> findAllByProfileStatus(ProfileStatus profileStatus);
}
