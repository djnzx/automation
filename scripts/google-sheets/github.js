function isValidGitHubRepo(repoUrl) {
    if (!repoUrl) return false;
    return repoUrl.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)$/) !== null;
}

function fetchGitHubCommits(repoUrl) {
    if (!repoUrl) return null;

    var match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return "Invalid GitHub URL";

    var owner = match[1];
    var repo = match[2];

    var apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;

    var options = {
        "method": "get",
        "headers": {
            "Accept": "application/vnd.github.v3+json",
            // Add a GitHub Token for private repos: "Authorization": "token YOUR_GITHUB_PERSONAL_ACCESS_TOKEN"
        }
    };

    try {
        var response = UrlFetchApp.fetch(apiUrl, options);
        var commits = JSON.parse(response.getContentText());

        if (!commits.length) return "No commits found";

        var commitMessages = commits
            .map(commit => {
                return `• ${commit.commit.message} (${commit.commit.author.date})`;
            }).join("\n");

        return commitMessages;
    } catch (e) {
        return "Error fetching commits: " + e.toString();
    }
}
