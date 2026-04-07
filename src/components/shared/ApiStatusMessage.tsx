interface ApiStatusMessageProps {
  isLoading: boolean;
  error: unknown;
  loadingText?: string;
  errorText?: string;
}

const ApiStatusMessage: React.FC<ApiStatusMessageProps> = ({ 
  isLoading, error, 
  loadingText = "Loading...", 
  errorText = "Something went wrong. Please try again." 
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-4">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <p className="text-gray-400 text-sm tracking-wide">{loadingText}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center gap-2 py-4 px-4 rounded-lg border border-red-500/30 bg-red-500/10">
        <p className="text-red-400 text-sm">{errorText}</p>
      </div>
    );
  }

  return null;
};

export default ApiStatusMessage;
