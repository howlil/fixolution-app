export default async function editSukuCadang( nama, deskripsi, harga, stok, fileInput,id) {
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
method: "PUT",
headers: myHeaders,
body: formdata,
redirect: "follow"
};

  try {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/admin/editSukuCadang/${id}`;
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}