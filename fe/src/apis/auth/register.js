export default async function Register( username, password ) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");  

const raw = JSON.stringify({
  "username": username,
  "password": password
});
  
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/register`;
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }