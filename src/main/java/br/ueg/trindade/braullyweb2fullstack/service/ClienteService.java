package br.ueg.trindade.braullyweb2fullstack.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ueg.trindade.braullyweb2fullstack.exception.RecursoNaoEncontradoException;
import br.ueg.trindade.braullyweb2fullstack.exception.RegraNegocioException;
import br.ueg.trindade.braullyweb2fullstack.model.Cliente;
import br.ueg.trindade.braullyweb2fullstack.repository.ClienteRepository;
import br.ueg.trindade.braullyweb2fullstack.repository.PedidoRepository;

@Service
public class ClienteService {

    private final ClienteRepository repository;
    private final PedidoRepository pedidoRepository;

    public ClienteService(ClienteRepository repository, PedidoRepository pedidoRepository) {
        this.repository = repository;
        this.pedidoRepository = pedidoRepository;
    }

    public List<Cliente> listar() {
        return repository.findAll();
    }

    public Cliente buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente não encontrado"));
    }

    public Cliente criar(Cliente dados) {
        validar(dados, null);
        dados.setId(null);
        return repository.save(dados);
    }

    public Cliente atualizar(Long id, Cliente dados) {
        Cliente cliente = buscar(id);
        validar(dados, id);
        cliente.setNome(dados.getNome());
        cliente.setEmail(dados.getEmail());
        cliente.setTelefone(dados.getTelefone());
        return repository.save(cliente);
    }

    public void excluir(Long id) {
        buscar(id);
        if (pedidoRepository.existsByClienteId(id)) {
            throw new RegraNegocioException("Não é possível excluir um cliente que possui pedidos");
        }
        repository.deleteById(id);
    }

    private void validar(Cliente dados, Long idAtual) {
        if (dados.getNome() == null || dados.getNome().isBlank()) {
            throw new RegraNegocioException("O nome do cliente é obrigatório");
        }
        if (dados.getEmail() == null || dados.getEmail().isBlank()) {
            throw new RegraNegocioException("O e-mail do cliente é obrigatório");
        }
        repository.findByEmailIgnoreCase(dados.getEmail()).ifPresent(existente -> {
            if (!existente.getId().equals(idAtual)) {
                throw new RegraNegocioException("Já existe um cliente com esse e-mail");
            }
        });
    }
}
