let formEl = document.forms["signupForm"];
console.log(formEl); // Check if formEl is undefined

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(formEl);
  console.log(formData.get("username"));
  getData();
});

async function getData() {
  let formData = new FormData(formEl);
  const url = "/api/signup";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
}
