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

import br.ueg.trindade.braullyweb2fullstack.dto.PedidoRequest;
import br.ueg.trindade.braullyweb2fullstack.model.Pedido;
import br.ueg.trindade.braullyweb2fullstack.service.PedidoService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PedidoController {

    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @GetMapping("/pedidos")
    public List<Pedido> listar() {
        return service.listar();
    }

    @GetMapping("/pedidos/{id}")
    public Pedido buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PostMapping("/pedidos")
    public Pedido criar(@RequestBody PedidoRequest dados) {
        return service.criar(dados);
    }

    @PutMapping("/pedidos/{id}")
    public Pedido atualizar(@PathVariable Long id, @RequestBody PedidoRequest dados) {
        return service.atualizar(id, dados);
    }

    @DeleteMapping("/pedidos/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}
