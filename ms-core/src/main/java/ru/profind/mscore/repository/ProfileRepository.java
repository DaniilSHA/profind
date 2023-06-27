package ru.profind.mscore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.profind.mscore.domain.ProfileOK;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<ProfileOK, Long>
{
    Optional<ProfileOK> findProfileByUsername(String username);
}
