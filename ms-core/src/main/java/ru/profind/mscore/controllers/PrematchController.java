package ru.profind.mscore.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.profind.mscore.domain.*;
import ru.profind.mscore.dto.requset.ProfileRequest;
import ru.profind.mscore.dto.response.ProfileResponse;
import ru.profind.mscore.exception.*;
import ru.profind.mscore.servise.PrematchService;
import ru.profind.mscore.servise.ProfileService;

import java.util.ArrayList;
import java.util.List;

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
        if (!prematchService.check(targetUsername, swaipUsername))
        {
            throw new ConflictException();
        }

        prematchService.save(targetUsername, swaipUsername, wasLike);
    }
}
