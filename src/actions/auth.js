
export default async function login(e) {
  let response = await fetch("http://localhost:8000/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: e.target.email.value,
      password: e.target.password.value,
    }),
  });

  let data = await response.json();
 

  if (response.status === 200) {
    localStorage.setItem("authToken", JSON.stringify(data));
    
    // toast.success("Login Success", { duration: 3000 });
    return data;
  } else {
    toast.error("Invalid User Credential");
  }
}

export function getLocal() {
  let response = localStorage.getItem("authToken");
 
  return response;
}