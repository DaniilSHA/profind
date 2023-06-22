package ru.profind.mscore.filters;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.profind.mscore.servise.JwtService;

import java.io.IOException;

@Component
public class AuthFilter implements Filter
{
    @Autowired private JwtService jwtService;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws ServletException, IOException
    {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String authToken = request.getHeader("auth_token");

        if (authToken == null)
        {
            response.setStatus(403);
            return;
        }

        if (!authToken.contains("bearer_") && authToken.split("_").length != 2) {
            response.setStatus(403);
            return;
        }

        String username = jwtService.validate(authToken.split("_")[1]);
        if (username == null) {
            response.setStatus(403);
            return;
        }

        request.setAttribute("username", username);
        filterChain.doFilter(servletRequest, servletResponse);
    }
}