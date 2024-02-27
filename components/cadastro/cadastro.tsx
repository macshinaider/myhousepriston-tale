"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUserFormSchema } from "./createUserFormSchema";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type CreateUserFormData = z.infer<typeof createUserFormSchema>;
export function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });

  const routes = useRouter();


  
  async function InPay(data: any) {
    toast.success('Carregando Aguarde!')
    const dados = {
      id: data.id,
      name: data.name,
      cpfcnpj: data.cpfcnpj,
      coins: data.coins,
    };

    const res = await api.post("/createpay", dados);

    if (res) {
      const invoice = await res.data.invoice;
      console.log("🚀 ~ InPay ~ invoice:", invoice)

      routes.push(`/checkout/${invoice}`);
    }
  }

  return (
    <div className="flex flex-col gap-4 bg-zinc-950 text-zinc-300 items-center justify-center p-4 h-screen">
      <form
        onSubmit={handleSubmit(InPay)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="id">Sua ID</label>
          <input
            type="text"
            className="border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
            {...register("id", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cpfcnpj">CPF ou CNPJ</label>
          <input
            type="text"
            className="border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
            {...register("cpfcnpj", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Qual Seu Nome?</label>
          <input
            type="text"
            className="border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
            {...register("name", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="coins">Valor em Reais</label>
          <input
            type="text"
            className="border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-800 text-white"
            {...register("coins", { required: true })}
          />
        </div>
        <p className="flex items-center justify-center">Cada Coins vale 3x</p>
        <div className="flex bg-emerald-600 text-center h-10 items-center justify-center rounded cursor-pointer">
          <button type="submit">Pagar</button>
        </div>
      </form>
    </div>
  );
}
