package ru.profind.mscore.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.profind.mscore.exception.*;
import ru.profind.mscore.servise.PrematchService;

@RestController
@RequestMapping("/")
public class PrematchController
{
    @Autowired private PrematchService prematchService;

    @GetMapping("/prematch")
    @ResponseStatus(HttpStatus.OK)
    public void savePrematch(
            @RequestParam String targetUsername,
            @RequestParam String swaipUsername,
            @RequestParam Boolean wasLike
    )
    {
        if (prematchService.exist(targetUsername, swaipUsername))
        {
            throw new ConflictException();
        }

        prematchService.save(targetUsername, swaipUsername, wasLike);
    }

    @GetMapping("/prematch/complete")
    @ResponseStatus(HttpStatus.OK)
    public void savePrematch(
            @RequestParam String targetUsername,
            @RequestParam String swaipUsername
    )
    {
        if (!prematchService.exist(targetUsername, swaipUsername))
        {
            throw new ConflictException();
        }

        prematchService.complete(targetUsername, swaipUsername);
    }
}
