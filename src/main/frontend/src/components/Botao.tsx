import type { ButtonHTMLAttributes } from "react";

type Variante = "primario" | "perigo" | "neutro" | "sucesso";

const estilos: Record<Variante, string> = {
  primario: "bg-indigo-600 text-white hover:bg-indigo-700",
  perigo: "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
  neutro: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
  sucesso: "bg-emerald-600 text-white hover:bg-emerald-700",
};

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
}

function Botao({ variante = "primario", className = "", ...props }: BotaoProps) {
  return (
    <button
      className={`cursor-pointer rounded-lg px-3.5 py-2 text-sm font-medium shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${estilos[variante]} ${className}`}
      {...props}
    />
  );
}

export default Botao;
