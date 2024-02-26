"use server";
import { asaas } from "@/lib/assas";

export async function CreateCustomer(data: any) {
  try {
    const body = {
      name: data.name,
      cpfCnpj: data.cpfcnpj,
    };

    const createpay = await asaas.post("/v3/customers", body);

    return createpay.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
