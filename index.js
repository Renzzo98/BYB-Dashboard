// index.js

/**
 * Required External Modules
 */

require('dotenv').config();
const express = require("express");
const path = require("path");

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "assets")));

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
  res.render("index", { title: "DASHBOARD" });
});

app.get("/api/weather", async (req, res) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=11501,us&appid=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch weather data" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Weather API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/github", async (req, res) => {
  try {
    const username = "Renzzo98";

    // Fetch user profile
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    if (!userResponse.ok) {
      return res.status(userResponse.status).json({ error: "Failed to fetch GitHub data" });
    }
    const userData = await userResponse.json();

    // Fetch recent repos
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
    if (!reposResponse.ok) {
      return res.status(reposResponse.status).json({ error: "Failed to fetch repos" });
    }
    const repos = await reposResponse.json();

    res.json({
      profile: {
        name: userData.name,
        bio: userData.bio,
        followers: userData.followers,
        following: userData.following,
        public_repos: userData.public_repos,
        avatar_url: userData.avatar_url,
        profile_url: userData.html_url
      },
      repos: repos.slice(0, 5).map(repo => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count,
        updated_at: repo.updated_at
      }))
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/commits", async (req, res) => {
  try {
    const username = "Renzzo98";
    const token = process.env.GITHUB_TOKEN;
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 90);

    // Use GraphQL with token to get exact contribution calendar
    if (token) {
      const query = `
        query {
          user(login: "${username}") {
            contributionsCollection(from: "${sixMonthsAgo.toISOString()}", to: "${new Date().toISOString()}") {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (response.ok) {
        const data = await response.json();
        const weeks = data.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
        if (weeks) {
          const commitMap = {};
          weeks.forEach(week => {
            week.contributionDays.forEach(day => {
              if (day.contributionCount > 0) commitMap[day.date] = day.contributionCount;
            });
          });
          return res.json(commitMap);
        }
      }
    }

    // Fallback: REST API (limited without token)
    const since = sixMonthsAgo.toISOString();
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
      { headers }
    );
    if (!reposResponse.ok) return res.json({});
    const repos = await reposResponse.json();

    const commitMap = {};
    for (const repo of repos) {
      try {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&since=${since}&per_page=100`,
          { headers }
        );
        if (commitsResponse.ok) {
          const commits = await commitsResponse.json();
          if (Array.isArray(commits)) {
            commits.forEach(commit => {
              const date = new Date(commit.commit.author.date).toISOString().split('T')[0];
              commitMap[date] = (commitMap[date] || 0) + 1;
            });
          }
        }
      } catch (e) { /* skip */ }
    }

    res.json(commitMap);
  } catch (error) {
    console.error("Contributions API error:", error);
    res.json({});
  }
});

/**
 * Server Activation
 */

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });