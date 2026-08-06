interface ErrorFallbackProps {
  error: string
  onRetry?: () => void
}

function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  return (
    <div className="error-fallback">
      <p className="error-fallback-text">{error}</p>
      {onRetry && (
        <button type="button" className="btn btn-outline" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  )
}

export default ErrorFallback
