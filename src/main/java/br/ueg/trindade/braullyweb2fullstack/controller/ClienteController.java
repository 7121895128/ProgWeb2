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

import br.ueg.trindade.braullyweb2fullstack.model.Cliente;
import br.ueg.trindade.braullyweb2fullstack.service.ClienteService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @GetMapping("/clientes")
    public List<Cliente> listar() {
        return service.listar();
    }

    @GetMapping("/clientes/{id}")
    public Cliente buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping("/clientes")
    public Cliente criar(@RequestBody Cliente cliente) {
        return service.criar(cliente);
    }

    @PutMapping("/clientes/{id}")
    public Cliente atualizar(@PathVariable Long id, @RequestBody Cliente cliente) {
        return service.atualizar(id, cliente);
    }

    @DeleteMapping("/clientes/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}
