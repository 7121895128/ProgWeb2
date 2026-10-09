package br.ueg.trindade.braullyweb2fullstack.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.ueg.trindade.braullyweb2fullstack.exception.RecursoNaoEncontradoException;
import br.ueg.trindade.braullyweb2fullstack.exception.RegraNegocioException;
import br.ueg.trindade.braullyweb2fullstack.model.Permissao;
import br.ueg.trindade.braullyweb2fullstack.repository.PermissaoRepository;

@Service
public class PermissaoService {

    private final PermissaoRepository repository;

    public PermissaoService(PermissaoRepository repository) {
        this.repository = repository;
    }

    public List<Permissao> listar() {
        return repository.findAll();
    }

    public Permissao buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Permissão não encontrada"));
    }

    public Permissao criar(Permissao dados) {
        validar(dados, null);
        dados.setId(null);
        return repository.save(dados);
    }

    public Permissao atualizar(Long id, Permissao dados) {
        Permissao permissao = buscar(id);
        validar(dados, id);
        permissao.setNome(dados.getNome());
        permissao.setDescricao(dados.getDescricao());
        return repository.save(permissao);
    }

    @Transactional
    public void excluir(Long id) {
        Permissao permissao = buscar(id);
        // Usuario é o lado dono do N:N: remove os vínculos antes, senão a FK de usuario_permissao bloqueia a exclusão
        permissao.getUsuarios().forEach(usuario -> usuario.getPermissoes().remove(permissao));
        repository.delete(permissao);
    }

    // Regra de negócio: nome obrigatório e único
    private void validar(Permissao dados, Long idAtual) {
        if (dados.getNome() == null || dados.getNome().isBlank()) {
            throw new RegraNegocioException("O nome da permissão é obrigatório");
        }
        repository.findByNomeIgnoreCase(dados.getNome()).ifPresent(existente -> {
            if (!existente.getId().equals(idAtual)) {
                throw new RegraNegocioException("Já existe uma permissão com esse nome");
            }
        });
    }
}
