package br.ueg.trindade.braullyweb2fullstack.config;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import br.ueg.trindade.braullyweb2fullstack.model.Permissao;
import br.ueg.trindade.braullyweb2fullstack.model.Usuario;
import br.ueg.trindade.braullyweb2fullstack.repository.PermissaoRepository;
import br.ueg.trindade.braullyweb2fullstack.repository.UsuarioRepository;

@Configuration
public class ConfiguracaoInicial {

    @Bean
    CommandLineRunner carregarDados(UsuarioRepository usuarios, PermissaoRepository permissoes,
                                    PasswordEncoder encoder) {
        return args -> {
            Permissao admin = permissoes.findByNomeIgnoreCase("ADMIN")
                    .orElseGet(() -> permissoes.save(new Permissao("ADMIN", "Acesso total")));
            Permissao user = permissoes.findByNomeIgnoreCase("USER")
                    .orElseGet(() -> permissoes.save(new Permissao("USER", "Acesso comum")));

            if (usuarios.findByUsername("admin").isEmpty()) {
                Usuario u1 = new Usuario("Administrador", "admin", encoder.encode("admin123"), "admin@ueg.br");
                u1.setPermissoes(new HashSet<>(Set.of(admin, user)));
                usuarios.save(u1);
            }

            if (usuarios.findByUsername("joao").isEmpty()) {
                Usuario u2 = new Usuario("João", "joao", encoder.encode("joao123"), "joao@ueg.br");
                u2.setPermissoes(new HashSet<>(Set.of(user)));
                usuarios.save(u2);
            }
        };
    }
}
