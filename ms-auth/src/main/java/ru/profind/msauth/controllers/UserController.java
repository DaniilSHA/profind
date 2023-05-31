package ru.profind.msauth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.profind.msauth.dto.requset.RegisterRequest;
import ru.profind.msauth.exception.ConflictException;
import ru.profind.msauth.servise.UserService;

@RestController
@RequestMapping("/")
public class UserController
{
    @Autowired private UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public void register(@RequestBody RegisterRequest request)
    {
        if (!userService.register(request)) throw new ConflictException();
    }
}
