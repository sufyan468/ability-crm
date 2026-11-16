export const formatDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format
export const formatTime = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format
