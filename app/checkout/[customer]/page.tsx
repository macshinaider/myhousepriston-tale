"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCircleCheck } from "react-icons/fa6";

export default function Checkout({ params }: { params: { customer: string } }) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");

  const [QR, setQrcode] = useState("");
  const [payload, setPayload] = useState("");
  const [copied, setCopied] = useState(false);
  const [carregando, setCarregando] = useState<boolean>(true);

  const dados = params.customer;

  useEffect(() => {
    const fetchPedido = async () => {
      const pedido = await api.get(`/pedidos?customer=${dados}`);
      if (pedido) {
        const t = pedido.data.dados.name;
        const a = pedido.data.dados.value;
        const z = pedido.data.dados.status;
        setName(t);
        setValue(a);
        setStatus(z);

        const invoice = pedido.data.dados.invoiceNumber;

        if (invoice) {
          const qrcode = await api.get(`/qrcode/?invoice=${invoice}`);
          if (qrcode) {
            const dadosQR = await qrcode.data.encodedImage;
            const payload1 = await qrcode.data.payload;
            setQrcode(dadosQR);
            setPayload(payload1);
            console.log(QR);
            setTimeout(() => {
              setCarregando(false);
            }, 2000);
          }
        }
      }
    };

    const intervalId = setInterval(fetchPedido, 10000); //

    return () => clearInterval(intervalId);
  }, [QR]);

  if (status === "RECEIVED") {
    return (
      <div className="flex flex-col gap-4 bg-zinc-950 text-zinc-300 items-center justify-center p-4 h-screen w-screen overflow-hidden">
        <div className="flex items-center justify-center gap-3">
          <FaCircleCheck color="#0cd83ff9" size={45} />{" "}
          <p>Pagamento Efetuado com sucesso</p>
        </div>
      </div>
    );
  }

  if (carregando) {
    return (
      <div className="flex flex-col gap-4 bg-zinc-950 text-zinc-300 items-center justify-center p-4 h-screen w-screen overflow-hidden">
        <div className="flex items-center justify-center gap-3">
          <FaCircleCheck color="#0cd83ff9" size={45} /> <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (status === "PENDING") {
    const base64Image = QR;
    const onCopy = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    };

    return (
      <div className="flex flex-col gap-4 bg-zinc-950 text-zinc-300 items-center justify-center p-4 h-screen w-screen overflow-hidden">
        <div>
          <h1>Qr Code Para Pagamento</h1>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={`data:image/jpeg;base64,${base64Image}`}
            alt="Qrcode"
            width={300}
            height={300}
            className="flex w-[50%] "
          />

          <p>Copiar e colar</p>
          <div className="flex items-center justify-center"></div>
          <div>
            <CopyToClipboard text={payload}>
              <button
                onClick={onCopy}
                style={{ wordWrap: "break-word", whiteSpace: "normal" }}
              >
                {payload}
              </button>
            </CopyToClipboard>
            {copied && (
              <span className="flex text-center items-center justify-center">
                Texto copiado!
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}
