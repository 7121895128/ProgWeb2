package br.ueg.trindade.braullyweb2fullstack.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Nesta etapa a API é aberta (sem login); o Security é usado para criptografar senhas.
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults())          // respeita o @CrossOrigin dos controllers
            .csrf(csrf -> csrf.disable())
            .headers(h -> h.frameOptions(f -> f.sameOrigin())) // console do H2 usa frames
            .authorizeHttpRequests(a -> a.anyRequest().permitAll());
        return http.build();
    }
}
