package ru.profind.mscore.servise;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService
{
    @Value("${key}") private String key;
    private final Gson gson = new Gson();

}
