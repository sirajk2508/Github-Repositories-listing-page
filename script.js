import { appState } from "./utils.js";
import displayUserInfo from "./displayUserInfo.js";
import displayRepositories from "./displayRepositories.js";
import showError from "./showErrorMessage.js";

// Search button functionality
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
    const inputElement = document.getElementById('searchInput');
    appState.username = inputElement.value.trim();
    appState.currentPage = 1;

  if (appState.username) {
    displayUserInfo();
    displayRepositories();
  } else showError("Username cannot be empty. Please enter a valid username.");
});

// Functionality to change page according to selected pages
const changePerPage = () => {
  appState.perPage = document.getElementById("perPage").value;
  // console.log(perPage);
  appState.currentPage = 1;
  displayRepositories();
}

document.addEventListener("DOMContentLoaded", function () {
  const perPageSelect = document.getElementById("perPage");
  perPageSelect.addEventListener("change", function () {
    changePerPage();
  });
});

// Default User Info and repositories
displayUserInfo();
displayRepositories();