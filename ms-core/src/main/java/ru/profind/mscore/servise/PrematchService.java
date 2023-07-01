package ru.profind.mscore.servise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.profind.mscore.domain.Prematch;
import ru.profind.mscore.repository.PrematchRepository;

import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
@Transactional
public class PrematchService
{
    @Autowired private PrematchRepository repository;

    public boolean exist(String targetUsername, String swaipUsername) {
        AtomicBoolean result = new AtomicBoolean(false);
        List<Prematch> list = repository.findAllByTargetUsernameAndSwaipUsername(targetUsername, swaipUsername);

        if (list.size() != 0)
        {
            result.set(true);
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
                .isComplete(false)
                .build());
    }

    public void complete(String targetUsername, String swaipUsername)
    {
        List<Prematch> list = repository.findAllByTargetUsernameAndSwaipUsername(targetUsername, swaipUsername);
        list.forEach(prematch -> prematch.setComplete(true));
        repository.saveAllAndFlush(list);
    }

    public List<Prematch> findAllWhereTargetUsername(String targetUsername) {
        return repository.findAllByTargetUsername(targetUsername);
    }
}
