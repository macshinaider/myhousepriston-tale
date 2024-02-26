import { asaas } from "@/lib/assas";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const invoice = searchParams.get("invoice");
  if (!invoice) {
    return Response.json({ message: "Invalid qrcode" });
  }
  const createpay = await asaas.get(`v3/payments/${invoice}/pixQrCode`);

  return Response.json(await createpay.data);
}
