import React from 'react'
import TextArea from '@dyna-form/textarea'
import Input from '@dyna-form/input'
import FormGroup from '@dyna-form/form-group'

function RenderForm({ title, currentStepName, type, currentStep, data, onChange }) {
  return (
    <div>
      <h1>{type} {title}</h1>
      <h2>{currentStepName}</h2>
      {Object.keys(currentStep).map((k) => {
        const step = currentStep[k]
        const { key, type, label, props } = step
        switch (type) {
          case 'location':
            return (
              <FormGroup key={key}>
                <Input
                  label={label}
                  value={data[key]}
                  props={props}
                  onChange={e => onChange(e, key)}
                />
              </FormGroup>
            )
          case 'input':
            return (
              <FormGroup key={key}>
                <Input
                  label={label}
                  value={data[key]}
                  props={props}
                  onChange={e => onChange(e, key)}
                />
              </FormGroup>
            )
          case 'textarea':
            return (
              <FormGroup key={key}>
                <TextArea
                  label={label}
                  props={props}
                  value={data[key]}
                  onChange={e => onChange(e, key)}
                />
              </FormGroup>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

export default RenderForm