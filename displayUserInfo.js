import { apiUrl, appState } from "./utils.js";

// Functionality to fetch user information from github api url
async function fetchUserInfo() {
    try {
        const response = await fetch(`${apiUrl}${appState.username}`);
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching user information:', error);
    }
}

// Functionality to display user info
async function displayUserInfo() {
    const userInfoContainer = document.getElementById('userInfo');
    userInfoContainer.innerHTML = '';

    const userInfo = await fetchUserInfo();
    // console.log(userInfo);

    const userAvatar = document.createElement('img');
    userAvatar.src = userInfo.avatar_url;
    userAvatar.alt = 'User Avatar';
    userAvatar.classList.add('avatar');
    userInfoContainer.appendChild(userAvatar);

    const userName = document.createElement('p');
    userName.classList.add('user-name');

    const locationIcon = document.createElement('img');
    locationIcon.classList.add('location-icon');
    locationIcon.src = 'https://cdn-icons-png.flaticon.com/512/535/535239.png';

    const userLocation = document.createElement('p');
    userLocation.appendChild(locationIcon);
    userLocation.append(`${userInfo.location}`);

    const infoText = document.createElement('div');
    infoText.classList.add('info-text');
    
    userName.innerHTML = `<strong>${userInfo.name}</strong>` || 'No name available';
    infoText.appendChild(userName);

    infoText.appendChild(userLocation);

    const userBio = document.createElement('p');
    userBio.textContent = userInfo.bio || 'No bio available';
    infoText.appendChild(userBio);

    const githubLink = document.createElement('a');
    githubLink.href = userInfo.html_url;
    githubLink.textContent = `🔗${githubLink.href}`;
    githubLink.target = '_blank';
    infoText.appendChild(githubLink);

    if (userInfo.twitter_username) {
        const twitterLink = document.createElement('a');
        twitterLink.href = `https://twitter.com/${userInfo.twitter_username}`;
        twitterLink.textContent = `🔗${twitterLink.href}`;
        twitterLink.target = '_blank';
        infoText.appendChild(twitterLink);
    }

    userInfoContainer.appendChild(infoText);

    userInfoContainer.style.display = 'flex';
}

export default displayUserInfo;