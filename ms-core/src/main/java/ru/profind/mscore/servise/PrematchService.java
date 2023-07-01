package ru.profind.mscore.servise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.profind.mscore.domain.Prematch;
import ru.profind.mscore.domain.Profile;
import ru.profind.mscore.domain.ProfileStatus;
import ru.profind.mscore.dto.response.ContactResponse;
import ru.profind.mscore.dto.response.ProfileResponse;
import ru.profind.mscore.repository.PrematchRepository;
import ru.profind.mscore.repository.ProfileRepository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

@Service
@Transactional
public class PrematchService
{
    @Autowired private PrematchRepository repository;

    public boolean check(String targetUsername, String swaipUsername) {
        AtomicBoolean result = new AtomicBoolean(true);
        List<Prematch> list = repository.findAllByTargetUsernameAndSwaipUsername(targetUsername, swaipUsername);

        if (list.size() != 0)
        {
            result.set(false);
        }

        return result.get();
    }

    public void save(String targetUsername, String swaipUsername, boolean wasLike)
    {
        repository.saveAndFlush(Prematch
                .builder()
                .targetUsername(targetUsername)
                .swaipUsername(swaipUsername)
                .wasLike(wasLike)
                .build());
    }

}
