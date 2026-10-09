package br.ueg.trindade.braullyweb2fullstack.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.ueg.trindade.braullyweb2fullstack.exception.RecursoNaoEncontradoException;
import br.ueg.trindade.braullyweb2fullstack.exception.RegraNegocioException;
import br.ueg.trindade.braullyweb2fullstack.model.Usuario;
import br.ueg.trindade.braullyweb2fullstack.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Usuario> listar() {
        return repository.findAll();
    }

    public Usuario buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado"));
    }

    public Usuario criar(Usuario dados) {
        validarCampos(dados);
        validarUsernameUnico(dados.getUsername(), null);
        validarSenha(dados.getSenha());
        dados.setId(null);
        dados.setSenha(passwordEncoder.encode(dados.getSenha()));
        return repository.save(dados);
    }

    public Usuario atualizar(Long id, Usuario dados) {
        Usuario usuario = buscar(id);
        validarCampos(dados);
        validarUsernameUnico(dados.getUsername(), id);

        usuario.setNome(dados.getNome());
        usuario.setUsername(dados.getUsername());
        usuario.setEmail(dados.getEmail());
        // Senha em branco na edição = manter a senha atual
        if (dados.getSenha() != null && !dados.getSenha().isBlank()) {
            validarSenha(dados.getSenha());
            usuario.setSenha(passwordEncoder.encode(dados.getSenha()));
        }
        return repository.save(usuario);
    }

    public void excluir(Long id) {
        buscar(id);
        repository.deleteById(id);
    }

    private void validarCampos(Usuario u) {
        if (u.getNome() == null || u.getNome().isBlank()) {
            throw new RegraNegocioException("O nome é obrigatório");
        }
        if (u.getUsername() == null || u.getUsername().isBlank()) {
            throw new RegraNegocioException("O username é obrigatório");
        }
    }

    private void validarSenha(String senha) {
        if (senha == null || senha.length() < 4) {
            throw new RegraNegocioException("A senha deve ter pelo menos 4 caracteres");
        }
    }

    // Regra de negócio: username não pode se repetir
    private void validarUsernameUnico(String username, Long idAtual) {
        repository.findByUsername(username).ifPresent(existente -> {
            if (!existente.getId().equals(idAtual)) {
                throw new RegraNegocioException("Já existe um usuário com esse username");
            }
        });
    }
}
