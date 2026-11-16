package br.ueg.trindade.braullyweb2fullstack.dto;

public record PedidoRequest(Long clienteId, Long produtoId, Integer quantidade) {
}
