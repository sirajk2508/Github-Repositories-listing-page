import { apiUrl, appState } from "./utils.js";

// Fetching github repos using github api url
async function fetchRepositories() {
    try {
        const response = await fetch(`${apiUrl}${appState.username}/repos?per_page=${appState.perPage}&page=${appState.currentPage}`);
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}

// Functionality to display repositories on the page as per the username searched for.
async function displayRepositories() {
    const loader = document.getElementById('loader');
    const repositoriesList = document.getElementById('repositoriesList');
    loader.style.display = 'block';
    repositoriesList.innerHTML = '';

    const repositories = await fetchRepositories();

    // console.log(repositories);
    // displayUserInfo();

    repositories.map((repo) => {
        const repoContainer = document.createElement('div');
        repoContainer.classList.add('repo-container');

        const repoName = document.createElement('p');
        repoName.innerHTML = `<strong>${repo.name}</strong>`;
        repoContainer.appendChild(repoName);

        const repoDescription = document.createElement('p');
        repoDescription.innerHTML = repo.description || 'No description available';
        repoContainer.appendChild(repoDescription);

        const languagesUrl = repo.languages_url;

        fetch(languagesUrl)
            .then(response => response.json())
            .then(languagesData => {
                const repoLanguages = document.createElement('p');
                repoLanguages.innerHTML = `<strong>Tools and Frameworks:</strong> ${Object.keys(languagesData).join(', ')}`;
                repoContainer.appendChild(repoLanguages);

                repositoriesList.appendChild(repoContainer);
            })
            .catch(error => {
                console.error('Error fetching languages:', error);
                repositoriesList.appendChild(repoContainer); // adding container even if languages fetch fails
            });
    });

    loader.style.display = 'none';
}

export default displayRepositories;