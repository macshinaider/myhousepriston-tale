"use client";
import { z } from "zod";

export const createUserFormSchema = z.object({
    id: z.string().min(3, "Seu usuario tem muito pouco Caracteres!"),
    name: z.string().min(3, "Nome tem muito curto"),
    cpfcnpj: z.string().min(4, "DADOS incompletos!"),
    coins: z.string().min(1,"Minimo de coins é 1")
});
