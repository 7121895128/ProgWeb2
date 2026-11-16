package br.ueg.trindade.braullyweb2fullstack.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.ueg.trindade.braullyweb2fullstack.dto.PedidoRequest;
import br.ueg.trindade.braullyweb2fullstack.exception.RecursoNaoEncontradoException;
import br.ueg.trindade.braullyweb2fullstack.exception.RegraNegocioException;
import br.ueg.trindade.braullyweb2fullstack.model.Cliente;
import br.ueg.trindade.braullyweb2fullstack.model.Pedido;
import br.ueg.trindade.braullyweb2fullstack.model.Produto;
import br.ueg.trindade.braullyweb2fullstack.repository.ClienteRepository;
import br.ueg.trindade.braullyweb2fullstack.repository.PedidoRepository;
import br.ueg.trindade.braullyweb2fullstack.repository.ProdutoRepository;

@Service
public class PedidoService {

    private final PedidoRepository repository;
    private final ClienteRepository clienteRepository;
    private final ProdutoRepository produtoRepository;

    public PedidoService(PedidoRepository repository,
                         ClienteRepository clienteRepository,
                         ProdutoRepository produtoRepository) {
        this.repository = repository;
        this.clienteRepository = clienteRepository;
        this.produtoRepository = produtoRepository;
    }

    public List<Pedido> listar() {
        return repository.findAll();
    }

    public Pedido buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Pedido não encontrado"));
    }

    @Transactional
    public Pedido criar(PedidoRequest dados) {
        validar(dados);
        Cliente cliente = buscarCliente(dados.clienteId());
        Produto produto = buscarProduto(dados.produtoId());

        baixarEstoque(produto, dados.quantidade());

        Pedido pedido = new Pedido();
        pedido.setCliente(cliente);
        pedido.setProduto(produto);
        pedido.setQuantidade(dados.quantidade());
        pedido.setValorTotal(calcularTotal(produto, dados.quantidade()));
        pedido.setDataPedido(LocalDate.now());
        return repository.save(pedido);
    }

    @Transactional
    public Pedido atualizar(Long id, PedidoRequest dados) {
        Pedido pedido = buscar(id);
        validar(dados);
        Cliente cliente = buscarCliente(dados.clienteId());
        Produto produto = buscarProduto(dados.produtoId());

        devolverEstoque(pedido.getProduto(), pedido.getQuantidade());
        baixarEstoque(produto, dados.quantidade());

        pedido.setCliente(cliente);
        pedido.setProduto(produto);
        pedido.setQuantidade(dados.quantidade());
        pedido.setValorTotal(calcularTotal(produto, dados.quantidade()));
        return repository.save(pedido);
    }

    @Transactional
    public void excluir(Long id) {
        Pedido pedido = buscar(id);
        devolverEstoque(pedido.getProduto(), pedido.getQuantidade());
        repository.delete(pedido);
    }

    private void validar(PedidoRequest dados) {
        if (dados.clienteId() == null) {
            throw new RegraNegocioException("Selecione um cliente");
        }
        if (dados.produtoId() == null) {
            throw new RegraNegocioException("Selecione um produto");
        }
        if (dados.quantidade() == null || dados.quantidade() <= 0) {
            throw new RegraNegocioException("A quantidade deve ser maior que zero");
        }
    }

    private Cliente buscarCliente(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente não encontrado"));
    }

    private Produto buscarProduto(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Produto não encontrado"));
    }

    private void baixarEstoque(Produto produto, Integer quantidade) {
        if (produto.getQuantidade() < quantidade) {
            throw new RegraNegocioException(
                    "Estoque insuficiente: restam " + produto.getQuantidade() + " unidades de " + produto.getNome());
        }
        produto.setQuantidade(produto.getQuantidade() - quantidade);
        produtoRepository.save(produto);
    }

    private void devolverEstoque(Produto produto, Integer quantidade) {
        produto.setQuantidade(produto.getQuantidade() + quantidade);
        produtoRepository.save(produto);
    }

    private BigDecimal calcularTotal(Produto produto, Integer quantidade) {
        return produto.getPreco().multiply(BigDecimal.valueOf(quantidade));
    }
}
