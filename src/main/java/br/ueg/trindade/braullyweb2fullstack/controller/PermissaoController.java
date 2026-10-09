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
import br.ueg.trindade.braullyweb2fullstack.service.PermissaoService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PermissaoController {

    private final PermissaoService service;

    public PermissaoController(PermissaoService service) {
        this.service = service;
    }

    @GetMapping("/permissoes")
    public List<Permissao> listar() {
        return service.listar();
    }

    @GetMapping("/permissoes/{id}")
    public Permissao buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping("/permissoes")
    public Permissao criar(@RequestBody Permissao permissao) {
        return service.criar(permissao);
    }

    @PutMapping("/permissoes/{id}")
    public Permissao atualizar(@PathVariable Long id, @RequestBody Permissao permissao) {
        return service.atualizar(id, permissao);
    }

    @DeleteMapping("/permissoes/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}
