import React from 'react'
import './Input.css'

function Input({ label, value, props, onChange, valid }) {
  console.log(valid)
  return (
    <div className='input-wrapper'>
      <label>{label}</label>
      <input
        className={!valid && 'invalid'}
        {...props}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
