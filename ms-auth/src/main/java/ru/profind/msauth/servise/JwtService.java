package ru.profind.msauth.servise;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.profind.msauth.domain.User;

import java.time.Instant;
import java.util.Date;

@Service
public class JwtService
{
    @Value("${key}") private String key;

    public String createBaseToken(User user)
    {
        return Jwts.builder()
                .claim("username", user.getUsername())
                .claim("role", user.getUserRole())
                .setIssuedAt(new Date())
                .setExpiration(Date.from(Instant.now().plusSeconds(60*15)))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    public String createRefreshToken(User user)
    {
        return Jwts.builder()
                .claim("username", user.getUsername())
                .claim("role", user.getUserRole())
                .setIssuedAt(new Date())
                .setExpiration(Date.from(Instant.now().plusSeconds(60*60)))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }
}
