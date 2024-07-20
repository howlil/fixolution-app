export default async function editBengkel( namaBengkel,username,password,noHp,alamat,status, gmapsLink,fotos,id) {
  const myHeaders = new Headers();
  const token = localStorage.getItem("token");
  myHeaders.append("Authorization", `Bearer ${token}`);

const formdata = new FormData();
formdata.append("namaBengkel", namaBengkel);
formdata.append("username", username );
formdata.append("password", password);
formdata.append("noHp", noHp);
formdata.append("alamat", alamat);
formdata.append("status", status);
formdata.append("gmapsLink", gmapsLink)

if (fotos && fotos.files) {
  for (let i = 0; i < fotos.files.length; i++) {
    formdata.append("fotos", fotos.files[i]);
  }
}

const requestOptions = {
method: "PUT",
headers: myHeaders,
body: formdata,
redirect: "follow"
};

  try {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/admin/editBengkel/${id}`;
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}