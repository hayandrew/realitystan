import React from 'react'
import './FormGroup.css'

function FormGroup({ children }) {
  return (
    <div className="form-group">
      {children}
    </div>
  )
}

export default FormGroup
