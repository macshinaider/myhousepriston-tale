"use server";
import { asaas } from "@/lib/assas";
import { prisma } from "@/lib/prisma";

interface IUdata {
  invoice: string;
  customer: string;
}

export async function CaptureQRcode(data: IUdata) {
  try {
    const createpay = await asaas.get(`v3/payments/${data.invoice}/pixQrCode`);

    const data1 = await createpay.data;

    if (createpay) {
      const updateprisma = await prisma.pedidos.update({
        where: {
          customer: data.customer,
        },
        data: {
          invoiceNumber: data1.invoiceNumber,
          payload: data1.payload,
        },
      });
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
