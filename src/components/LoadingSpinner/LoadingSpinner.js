import React from "react"
import "./LoadingSpinner.css"

const LoadingSpinner = ({ message = "Loading houseguests..." }) => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true">
        <div className="loading-ring" />
        <div className="loading-ring-inner" />
        <div className="loading-core" />
      </div>
      <div className="loading-text">{message}</div>
    </div>
  )
}

export default LoadingSpinner
