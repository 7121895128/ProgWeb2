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

import br.ueg.trindade.braullyweb2fullstack.model.Produto;
import br.ueg.trindade.braullyweb2fullstack.service.ProdutoService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ProdutoController {

    private final ProdutoService service;

    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    @GetMapping("/produtos")
    public List<Produto> listar() {
        return service.listar();
    }

    @GetMapping("/produtos/{id}")
    public Produto buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping("/produtos")
    public Produto criar(@RequestBody Produto produto) {
        return service.criar(produto);
    }

    @PutMapping("/produtos/{id}")
    public Produto atualizar(@PathVariable Long id, @RequestBody Produto produto) {
        return service.atualizar(id, produto);
    }

    @DeleteMapping("/produtos/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}
