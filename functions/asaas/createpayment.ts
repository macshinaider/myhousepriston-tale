"use server";
import { asaas } from "@/lib/assas";
import { getDataDoDiaSeguinte } from "../newdate";
import { prisma } from "@/lib/prisma";

export async function CreatePayment(data: any) {
  try {
    const user = await prisma.pedidos.findUnique({
      where: {
        customer: data,
      },
    });
    const vencimento = getDataDoDiaSeguinte();
    console.log("🚀 ~ CreatePayment ~ vencimento:", vencimento);
    const datapay = {
      billingType: "PIX",
      customer: user?.customer,
      value: user?.value,
      dueDate: vencimento,
    };

    const createpay = await asaas.post("/v3/payments", datapay);

    const dados = await createpay.data
    console.log("🚀 ~ CreatePayment ~ dados:", dados)

    return dados;
  } catch (error) {
    console.log(error);
    return false;
  }
}
