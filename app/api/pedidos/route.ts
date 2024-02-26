import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customer = searchParams.get("customer");

  if(customer) {
    const dados = await prisma.pedidos.findUnique({
        where: {
          invoiceNumber: customer
        }
    })
    return Response.json({dados})
  }
}
