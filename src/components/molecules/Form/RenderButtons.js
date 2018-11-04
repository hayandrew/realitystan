import React from 'react'
import Button from '@dyna-form/button'
import FormGroup from '@dyna-form/form-group'

function RenderButtons({ stepNumber, changeStep, stepsLength, saveForm, disableNext }) {
  return (
    <FormGroup>
      {(stepNumber > 0) && <Button
        label='Prev'
        value={-1}
        onClick={changeStep}
      />}
      {(stepNumber <= stepsLength) &&
        <Button
          label='Next'
          value={1}
          onClick={changeStep}
          disabled={disableNext}
        />
      }
      {(stepNumber > stepsLength) &&
        <Button
          label='Save'
          onClick={saveForm}
        />
      }
    </FormGroup>
  )
}

export default RenderButtons