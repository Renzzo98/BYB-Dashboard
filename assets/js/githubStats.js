fetch('/api/github')
  .then(response => response.json())
  .then(data => {
    const profile = data.profile;
    const repos = data.repos;

    // Display profile stats
    document.getElementById('githubName').textContent = profile.name || 'GitHub Profile';
    document.getElementById('githubBio').textContent = profile.bio || 'Developer';
    document.getElementById('githubAvatar').src = profile.avatar_url;
    document.getElementById('githubFollowers').textContent = profile.followers;
    document.getElementById('githubRepos').textContent = profile.public_repos;

    // Display recent repos
    const reposContainer = document.getElementById('recentRepos');
    reposContainer.innerHTML = repos.map(repo => `
      <div class="github-repo-item">
        <a href="${repo.url}" target="_blank" class="github-repo-name">${repo.name}</a>
        <p class="github-repo-desc">${repo.description || 'No description'}</p>
        <span class="github-repo-stars">⭐ ${repo.stars}</span>
        <span class="github-repo-updated">Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
    `).join('');
  })
  .catch(error => {
    console.error('Error fetching GitHub data:', error);
    document.getElementById('githubStats').innerHTML = '<p>Unable to load GitHub stats</p>';
  });
