package ru.profind.mscore.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/")
public class ProfileController
{
    @GetMapping("/profile")
    @ResponseStatus(HttpStatus.OK)
    public void getProfile(HttpServletRequest request)
    {
        System.out.println(request.getAttribute("username"));
    }
}
