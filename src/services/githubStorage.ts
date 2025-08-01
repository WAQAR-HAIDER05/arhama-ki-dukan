/**
 * GitHub Storage Service - Upload images to GitHub repository
 * Free image hosting using GitHub as CDN
 */

export interface GitHubUploadConfig {
  owner: string;          // Your GitHub username
  repo: string;           // Repository name (e.g., 'ecom-images')
  token: string;          // GitHub Personal Access Token
  branch?: string;        // Branch name (default: 'main')
}

export interface GitHubUploadResult {
  success: boolean;
  url?: string;
  error?: string;
  fileName?: string;
}

// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Upload image to GitHub repository
 */
export const uploadImageToGitHub = async (
  file: File,
  config: GitHubUploadConfig,
  onProgress?: (progress: number) => void
): Promise<GitHubUploadResult> => {
  try {
    onProgress?.(10);
    
    // Convert file to base64
    const base64Content = await fileToBase64(file);
    const base64Data = base64Content.split(',')[1]; // Remove data:image/... prefix
    
    onProgress?.(30);
    
    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const fileName = `product-${timestamp}.${extension}`;
    const filePath = `images/products/${fileName}`;
    
    onProgress?.(50);
    
    // Upload to GitHub
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${config.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: `Upload product image: ${fileName}`,
          content: base64Data,
          branch: config.branch || 'main',
        }),
      }
    );
    
    onProgress?.(80);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `GitHub upload failed: ${response.status}`);
    }
    
    const result = await response.json();
    
    onProgress?.(100);
    
    // Return the raw GitHub URL for the image
    const imageUrl = `https://raw.githubusercontent.com/${config.owner}/${config.repo}/${config.branch || 'main'}/${filePath}`;
    
    return {
      success: true,
      url: imageUrl,
      fileName: fileName,
    };
    
  } catch (error) {
    console.error('GitHub upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
};

/**
 * Upload multiple images to GitHub
 */
export const uploadImagesToGitHub = async (
  files: File[],
  config: GitHubUploadConfig,
  onProgress?: (fileIndex: number, fileProgress: number, totalProgress: number) => void
): Promise<GitHubUploadResult[]> => {
  const results: GitHubUploadResult[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    const result = await uploadImageToGitHub(file, config, (progress) => {
      const totalProgress = ((i + progress / 100) / files.length) * 100;
      onProgress?.(i, progress, totalProgress);
    });
    
    results.push(result);
  }
  
  return results;
};

/**
 * Convert File to base64 string
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Delete image from GitHub repository
 */
export const deleteImageFromGitHub = async (
  fileName: string,
  config: GitHubUploadConfig
): Promise<boolean> => {
  try {
    const filePath = `images/products/${fileName}`;
    
    // First, get the file SHA (required for deletion)
    const getResponse = await fetch(
      `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${filePath}`,
      {
        headers: {
          'Authorization': `Bearer ${config.token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );
    
    if (!getResponse.ok) {
      return false;
    }
    
    const fileInfo = await getResponse.json();
    
    // Delete the file
    const deleteResponse = await fetch(
      `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${filePath}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${config.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: `Delete product image: ${fileName}`,
          sha: fileInfo.sha,
          branch: config.branch || 'main',
        }),
      }
    );
    
    return deleteResponse.ok;
  } catch (error) {
    console.error('GitHub delete error:', error);
    return false;
  }
};
