package ru.profind.msauth.servise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.profind.msauth.domain.User;
import ru.profind.msauth.domain.UserRole;
import ru.profind.msauth.dto.requset.RegisterRequest;
import ru.profind.msauth.repository.UserRepository;

import java.util.concurrent.atomic.AtomicBoolean;

@Service
@Transactional
public class UserService
{
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    public boolean register(RegisterRequest request) {
        AtomicBoolean result = new AtomicBoolean();
        userRepository.findUserByUsername(request.getUsername()).ifPresentOrElse(
                user -> result.set(false),
                () -> {
                    userRepository.saveAndFlush(User.builder()
                            .userRole(UserRole.USER)
                            .username(request.getUsername())
                            .password(passwordEncoder.encode(request.getPassword()))
                            .build());
                }
        );
        return result.get();
    }
}
