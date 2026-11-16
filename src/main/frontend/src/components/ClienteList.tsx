import type { Cliente } from "../types/Cliente";
import ClienteItem from "./ClienteItem";
import { lista, listaVazia } from "./estilos";

interface ClienteListProps {
  clientes: Cliente[];
  onEditar: (cliente: Cliente) => void;
  onExcluir: (id: number) => void;
}

function ClienteList({ clientes, onEditar, onExcluir }: ClienteListProps) {
  if (clientes.length === 0) {
    return <p className={listaVazia}>Nenhum cliente cadastrado.</p>;
  }

  return (
    <ul className={lista}>
      {clientes.map((cliente) => (
        <ClienteItem
          key={cliente.id}
          cliente={cliente}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}
    </ul>
  );
}

export default ClienteList;
