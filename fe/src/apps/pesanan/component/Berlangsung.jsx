import CardBooking from "./CardBooking";
import CardService from "./CardService";
import CardSukuCadang from "./CardSukuCadang";

export default function   Berlangsung({ data=[], dataSTG =[], dataSuku =[] }) {
  const tipe = data.type;
  const tipeSTG = dataSTG.type;
  const isPending = Array.isArray(data?.data)
    ? data.data.filter((item) => item.status === "PENDING")
    : [];

  const isPendingSTG = Array.isArray(dataSTG?.data)
    ? dataSTG?.data?.filter((item) => item.status === "PENDING")
    : [];

  const isPendingSUku = Array.isArray(dataSuku?.data)
    ? dataSuku?.data?.filter(
        (item) =>
          item.status === "MENUNGGU_KONFIRMASI" ||
          item.status === "MENUNGGU_PEMBAYARAN"
      )
    : [];

  return (
    <div>
      {isPending !== null &&
        isPending.map((item) => (
          <CardBooking key={item.id} pesanan={item} tipe={tipe} />
        ))}
      {isPendingSTG !== null &&
        isPendingSTG.map((item) => (
          <CardService key={item.id} service={item} tipe={tipeSTG} />
        ))}
      {isPendingSUku !== null &&
        isPendingSUku.map((item) => (
          <CardSukuCadang SukuCadang key={item.id} service={item} />
        ))}
    </div>
  );
}
