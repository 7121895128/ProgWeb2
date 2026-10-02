package br.ueg.trindade.braullyweb2fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ueg.trindade.braullyweb2fullstack.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
