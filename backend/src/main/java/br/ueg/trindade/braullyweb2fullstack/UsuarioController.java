package br.ueg.trindade.braullyweb2fullstack;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // CREATE
    @PostMapping("/usuarios")
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return usuarioService.criar(usuario);
    }

    // READ — todos
    @GetMapping("/usuarios")
    public List<Usuario> getAllUsuarios() {
        return usuarioService.listar();
    }

    // READ — por id
    @GetMapping("/usuarios/{id}")
    public Usuario getUsuarioById(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    // UPDATE
    @PutMapping("/usuarios/{id}")
    public Usuario updateUsuario(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        return usuarioService.atualizar(id, usuarioAtualizado);
    }

    // DELETE
    @DeleteMapping("/usuarios/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioService.excluir(id);
    }

    // N:N — permissões de um usuário
    @GetMapping("/usuarios/{id}/permissoes")
    public Set<Permissao> getPermissoesDoUsuario(@PathVariable Long id) {
        return usuarioService.buscarPermissoes(id);
    }

    // N:N — substitui as permissões do usuário pela lista de ids enviada
    @PutMapping("/usuarios/{id}/permissoes")
    public Set<Permissao> atribuirPermissoes(@PathVariable Long id, @RequestBody List<Long> idsPermissoes) {
        return usuarioService.atribuirPermissoes(id, idsPermissoes);
    }
}
