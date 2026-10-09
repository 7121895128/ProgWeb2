package br.ueg.trindade.braullyweb2fullstack.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ueg.trindade.braullyweb2fullstack.model.Permissao;
import br.ueg.trindade.braullyweb2fullstack.model.Usuario;
import br.ueg.trindade.braullyweb2fullstack.service.UsuarioService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping("/usuarios")
    public List<Usuario> listar() {
        return service.listar();
    }

    @GetMapping("/usuarios/{id}")
    public Usuario buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping("/usuarios")
    public Usuario criar(@RequestBody Usuario usuario) {
        return service.criar(usuario);
    }

    @PutMapping("/usuarios/{id}")
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return service.atualizar(id, usuario);
    }

    @DeleteMapping("/usuarios/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }

    // N:N — permissões de um usuário
    @GetMapping("/usuarios/{id}/permissoes")
    public List<Permissao> permissoesDoUsuario(@PathVariable Long id) {
        return service.buscarPermissoes(id);
    }

    // N:N — substitui as permissões do usuário pela lista de ids enviada no corpo, ex.: [1, 3]
    @PutMapping("/usuarios/{id}/permissoes")
    public List<Permissao> atribuirPermissoes(@PathVariable Long id, @RequestBody List<Long> idsPermissoes) {
        return service.atribuirPermissoes(id, idsPermissoes);
    }
}
