package br.ueg.trindade.braullyweb2fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ueg.trindade.braullyweb2fullstack.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    boolean existsByClienteId(Long clienteId);

    boolean existsByProdutoId(Long produtoId);
}
