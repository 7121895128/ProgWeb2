package br.ueg.trindade.braullyweb2fullstack.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ueg.trindade.braullyweb2fullstack.model.Permissao;

public interface PermissaoRepository extends JpaRepository<Permissao, Long> {
    Optional<Permissao> findByNomeIgnoreCase(String nome);
}
