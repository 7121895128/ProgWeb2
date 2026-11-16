package br.ueg.trindade.braullyweb2fullstack.dto;

import java.util.List;

public record LoginResposta(String token, String nome, List<String> permissoes) {
}
