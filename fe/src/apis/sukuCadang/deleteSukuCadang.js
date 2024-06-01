export default async function deleteSukuCadang( id ) {
    const myHeaders = new Headers();
    const token = localStorage.getItem("token");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    

    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/admin/deleteSukuCadang/${id}`;
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }