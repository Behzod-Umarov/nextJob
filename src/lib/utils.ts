export function cn(...inputs: (string | undefined)[]) {
    return inputs.filter(Boolean).join(' ');
  }
  
  export function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }