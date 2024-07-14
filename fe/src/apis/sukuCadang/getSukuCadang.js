export default async function getAllSukuCadang(  ) {
    const myHeaders = new Headers();
    const token = localStorage.getItem("token");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    

    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/getAllSukuCadang`;
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }