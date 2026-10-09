package br.ueg.trindade.braullyweb2fullstack;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PermissaoRepository permissaoRepository;

    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public Usuario criar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario atualizar(Long id, Usuario usuarioAtualizado) {
        Usuario usuario = buscarPorId(id);

        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setUsername(usuarioAtualizado.getUsername());
        usuario.setEmail(usuarioAtualizado.getEmail());

        return usuarioRepository.save(usuario);
    }

    public void excluir(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Set<Permissao> buscarPermissoes(Long id) {
        // cópia dentro da transação para carregar a coleção LAZY
        return new HashSet<>(buscarPorId(id).getPermissoes());
    }

    @Transactional
    public Set<Permissao> atribuirPermissoes(Long id, List<Long> idsPermissoes) {
        Usuario usuario = buscarPorId(id);

        Set<Permissao> novas = new HashSet<>(permissaoRepository.findAllById(idsPermissoes));

        usuario.getPermissoes().clear();
        usuario.getPermissoes().addAll(novas);

        usuarioRepository.save(usuario);
        return novas;
    }
}
