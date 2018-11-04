import React from 'react'
import './TextArea.css'

function TextArea({ label, value, props, onChange, valid }) {
  return (
    <div className='textarea-wrapper'>
      <label>{label}</label>
      <textarea
        {...props}
        className={!valid && 'invalid'}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default TextArea
