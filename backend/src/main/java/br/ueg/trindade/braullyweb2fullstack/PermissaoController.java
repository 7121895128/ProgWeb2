package br.ueg.trindade.braullyweb2fullstack;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PermissaoController {

    @Autowired
    private PermissaoRepository permissaoRepository;

    // CREATE
    @PostMapping("/permissoes")
    public Permissao createPermissao(@RequestBody Permissao permissao) {
        return permissaoRepository.save(permissao);
    }

    // READ — todos
    @GetMapping("/permissoes")
    public List<Permissao> getAllPermissoes() {
        return permissaoRepository.findAll();
    }

    // READ — por id
    @GetMapping("/permissoes/{id}")
    public Permissao getPermissaoById(@PathVariable Long id) {
        return permissaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Permissão não encontrada"));
    }

    // UPDATE
    @PutMapping("/permissoes/{id}")
    public Permissao updatePermissao(@PathVariable Long id, @RequestBody Permissao permissaoAtualizada) {
        Permissao permissao = permissaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Permissão não encontrada"));

        permissao.setNome(permissaoAtualizada.getNome());
        permissao.setDescricao(permissaoAtualizada.getDescricao());

        return permissaoRepository.save(permissao);
    }

    // DELETE
    @DeleteMapping("/permissoes/{id}")
    public void deletePermissao(@PathVariable Long id) {
        permissaoRepository.deleteById(id);
    }
}
