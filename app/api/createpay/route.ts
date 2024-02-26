import { CaptureQRcode } from "@/functions/asaas/captureQrcode";
import { CreateCustomer } from "@/functions/asaas/createcustomer";
import { CreatePayment } from "@/functions/asaas/createpayment";
import { getDataDoDiaSeguinte } from "@/functions/newdate";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    if (data) {
      console.log(data);
      const pedidos = await CreateCustomer(data);
      if (pedidos) {
        const save = await prisma.pedidos.create({
          data: {
            customer: pedidos.id,
            name: pedidos.name,
            username: data.id,
            value: data.coins,
            billingType: "PIX",
          },
        });
        if (save) {
          const createpay = await CreatePayment(pedidos.id);
          console.log("🚀 ~ POST ~ createpay:", createpay);
          if (createpay) {
            const savepay = await prisma.pedidos.update({
              where: {
                customer: createpay.customer,
              },
              data: {
                status: createpay.status,
                dueDate: createpay.dueDate,
                invoiceNumber: createpay.invoiceNumber,
              },
            });
            setTimeout(() => {}, 3000);
            const dadosupdate = {
              invoice: createpay.invoiceNumber,
              customer: createpay.customer,
            };
            const qrcode = await CaptureQRcode(dadosupdate);

            return new NextResponse(
              JSON.stringify({
                success: true,
                invoice: createpay.invoiceNumber,
              }),
              {
                headers: {
                  "Content-Type": "application/json",
                },
                status: 200,
              }
            );
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
