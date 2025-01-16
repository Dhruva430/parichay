const container = document.getElementById("container");
var currentPage = "signup";

function setCurrentPage(value) {
  container.dataset.page = value;
}

setCurrentPage(currentPage);

const signInButton = document.getElementById("signin-button");
signInButton.addEventListener("click", () => {
  currentPage = currentPage == "signin" ? "signup" : "signin";
  setCurrentPage(currentPage);
});
