export default async function deleteLayananBengkel(bengkel_id, layanan_id ) {
    const myHeaders = new Headers();
    const token = localStorage.getItem("token");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    

    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/${bengkel_id}/deleteLayananBengkel/${layanan_id}`;
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }