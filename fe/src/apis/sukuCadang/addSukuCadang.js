export default async function LoginAkun( username, password ) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");  

console.log(username, password);
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
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/login`;
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      const token = data.data.token;
  
      if (token) {
        localStorage.setItem("token", token);
      }
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }