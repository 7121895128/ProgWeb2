package br.ueg.trindade.braullyweb2fullstack.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import br.ueg.trindade.braullyweb2fullstack.exception.RecursoNaoEncontradoException;
import br.ueg.trindade.braullyweb2fullstack.exception.RegraNegocioException;
import br.ueg.trindade.braullyweb2fullstack.model.Produto;
import br.ueg.trindade.braullyweb2fullstack.repository.ProdutoRepository;

@Service
public class ProdutoService {

    private final ProdutoRepository repository;

    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    public List<Produto> listar() {
        return repository.findAll();
    }

    public Produto buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Produto não encontrado"));
    }

    public Produto criar(Produto dados) {
        validar(dados);
        dados.setId(null);
        return repository.save(dados);
    }

    public Produto atualizar(Long id, Produto dados) {
        Produto produto = buscar(id);
        validar(dados);
        produto.setNome(dados.getNome());
        produto.setDescricao(dados.getDescricao());
        produto.setPreco(dados.getPreco());
        produto.setQuantidade(dados.getQuantidade());
        return repository.save(produto);
    }

    public void excluir(Long id) {
        buscar(id);
        repository.deleteById(id);
    }

    // Regras de negócio: nome obrigatório, preço > 0 e estoque não negativo
    private void validar(Produto p) {
        if (p.getNome() == null || p.getNome().isBlank()) {
            throw new RegraNegocioException("O nome do produto é obrigatório");
        }
        if (p.getPreco() == null || p.getPreco().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RegraNegocioException("O preço deve ser maior que zero");
        }
        if (p.getQuantidade() == null || p.getQuantidade() < 0) {
            throw new RegraNegocioException("A quantidade não pode ser negativa");
        }
    }
}
