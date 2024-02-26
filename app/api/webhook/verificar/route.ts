"use server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (data) {
      const invoice = await data.payment.invoiceNumber;
      const statusid = await data.payment.status;
      console.log("🚀 ~ POST ~ invoice:", invoice);
      const user = await prisma.pedidos.findUnique({
        where: {
          invoiceNumber: invoice,
        },
      });

      if (!invoice) {
        return (
          Response.json({ message: "Essa Invoice Ja Foi Paga ou excluida" }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            status: 200,
          }
        );
      }

      if (user && user.status === "PENDING") {
        const consulte = await prisma.credits.findUnique({
          where: {
            ID: user.username!,
          },
        });
        const valor = user.value;
        const coins = Number(valor) * 3;
        if (!consulte) {
          console.log("🚀 ~ POST ~ coins:", coins);
          const create = await prisma.credits.create({
            data: {
              ID: user.username!,
              Credits: coins,
            },
          });

          const updatestatus = await prisma.pedidos.update({
            where: {
              invoiceNumber: invoice,
            },
            data: {
              status: statusid,
            },
          });

          return Response.json(create);
        }
        const update = await prisma.credits.update({
          where: {
            ID: user.username!,
          },
          data: {
            Credits: coins,
          },
        });
        const updatestatus = await prisma.pedidos.update({
          where: {
            invoiceNumber: invoice,
          },
          data: {
            status: statusid,
          },
        });
        return Response.json(update);
      }
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 200 });
  }
}
