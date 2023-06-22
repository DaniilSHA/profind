package ru.profind.mscore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.profind.mscore.domain.Profile;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long>
{
    Optional<Profile> findProfileByUsername(String username);
}
