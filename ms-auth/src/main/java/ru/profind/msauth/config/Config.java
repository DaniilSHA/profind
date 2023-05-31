package ru.profind.msauth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class Config
{
    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new PasswordEncoder()
        {
            @Override
            public String encode(CharSequence rawPassword)
            {
                return (String) rawPassword;
            }

            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword)
            {
                return rawPassword.equals(encodedPassword);
            }
        };
    }
}
