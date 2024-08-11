export default async function addSukuCadang(
  nama,
  deskripsi,
  harga,
  stok,
  fileInput
) {
  const myHeaders = new Headers();
  const token = localStorage.getItem("token");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const formdata = new FormData();
  formdata.append("nama", nama);
  formdata.append("deskripsi", deskripsi);
  formdata.append("harga", harga);
  formdata.append("stok", stok);
  formdata.append("foto", fileInput);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/admin/addSukuCadang`;
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
