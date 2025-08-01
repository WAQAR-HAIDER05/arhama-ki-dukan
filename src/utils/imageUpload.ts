/**
 * Simple image upload utility for mobile users
 * This would be replaced with your actual backend API in production
 */

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Simulates image upload to cloud storage
 * In production, replace this with your actual upload service (Cloudinary, AWS S3, etc.)
 */
export const uploadImage = async (file: File): Promise<UploadResult> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      try {
        // In production, you would upload to your actual storage service
        // For now, we'll create a local URL for preview
        const url = URL.createObjectURL(file);
        
        resolve({
          success: true,
          url: url
        });
      } catch (error) {
        resolve({
          success: false,
          error: 'Failed to upload image'
        });
      }
    }, 1000 + Math.random() * 2000); // Random delay 1-3 seconds
  });
};

/**
 * Upload multiple images with progress tracking
 */
export const uploadImages = async (
  files: File[], 
  onProgress?: (progress: number) => void
): Promise<UploadResult[]> => {
  const results: UploadResult[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const result = await uploadImage(files[i]);
    results.push(result);
    
    if (onProgress) {
      onProgress((i + 1) / files.length * 100);
    }
  }
  
  return results;
};

/**
 * Validates image file before upload
 */
export const validateImage = (file: File): { valid: boolean; error?: string } => {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Please upload only JPEG, PNG, or WebP images'
    };
  }
  
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image size must be less than 5MB'
    };
  }
  
  return { valid: true };
};

/**
 * Compresses image for faster upload (useful for mobile users)
 */
export const compressImage = (file: File, quality: number = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions (max 1200px width)
      const maxWidth = 1200;
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now()
          });
          resolve(compressedFile);
        } else {
          resolve(file); // Return original if compression fails
        }
      }, file.type, quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};
