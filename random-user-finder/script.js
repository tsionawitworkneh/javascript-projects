const btn = document.getElementById('find-user-btn');
const card = document.getElementById('profile-card');

async function fetchGitHubUser(){
    card.innerHTML = "<p>Searching GitHub...</p>";

    const randomOffset = Math.floor(Math.random() * 1000000);

    const listUrl = `https://api.github.com/users?since=${randomOffset}&per_page=1`;

    try {
        // 2. Get a random user from the list
        const listResponse = await fetch(listUrl);
        const users = await listResponse.json();
        const basicUser = users[0];

        // 3. Fetch full profile details (for bio, location, followers, etc.)
        const userResponse = await fetch(basicUser.url);
        const user = await userResponse.json();

        // 4. Update the UI
        displayUser(user);
    } catch (error) {
        card.innerHTML = `<p>Error fetching data. (You might be rate-limited!)</p>`;
    }

}


function displayUser(user) {
    card.innerHTML = `
        <img src="${user.avatar_url}" class="profile-pic" alt="${user.login}">
        <h2 class="user-name">${user.name || user.login}</h2>
        <p class="user-username">@${user.login}</p>
        
        
        
        <div class="stats-container">
            <div><strong>${user.followers}</strong><br>Followers</div>
            <div><strong>${user.public_repos}</strong><br>Repos</div>
            <div><strong>${user.following}</strong><br>Following</div>
        </div>

        <p class="user-info"><i class="fa-solid fa-location-dot"></i> ${user.location || 'Remote'}</p>
        
        <a href="${user.html_url}" target="_blank" class="github-link">View GitHub Profile</a>
    `;
}

btn.addEventListener('click', fetchGitHubUser);
fetchGitHubUser();
