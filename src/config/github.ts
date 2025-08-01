import { GitHubUploadConfig } from '../services/githubStorage';

/**
 * GitHub Configuration for Image Storage
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new GitHub repository for images (e.g., 'ecom-images')
 * 2. Generate a Personal Access Token with 'repo' permissions
 * 3. Update the values below with your GitHub details
 */

export const GITHUB_CONFIG: GitHubUploadConfig = {
  owner: 'WAQAR-HAIDER05',        // Replace with your GitHub username
  repo: 'ecom-data-',                  // Replace with your image repository name
  token: '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',           // Replace with your Personal Access Token
  branch: 'main',                       // Branch to upload to
};

// For development/testing (you can use environment variables)
export const getGitHubConfig = (): GitHubUploadConfig => {
  return {
    owner: GITHUB_CONFIG.owner,
    repo: GITHUB_CONFIG.repo,
    token: GITHUB_CONFIG.token,
    branch: GITHUB_CONFIG.branch,
  };
};

/**
 * Check if GitHub configuration is complete
 */
export const isGitHubConfigured = (): boolean => {
  const config = getGitHubConfig();
  return !!(
    config.owner && 
    config.owner !== 'YOUR_GITHUB_USERNAME' &&
    config.repo && 
    config.token && 
    config.token !== 'YOUR_PERSONAL_ACCESS_TOKEN'
  );
};
