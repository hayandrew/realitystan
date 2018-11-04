import React from 'react'

function RenderVerify({ steps, data, title }) {
  return (
    <div>
      <h1>Verify {title}</h1>
      {Object.keys(steps).map((key) => {
        const currentStep = steps[key]
        return (
          <div key={key}>
            <h2>{key}</h2>
            <div>
              {Object.keys(currentStep).map((k) => {
                const step = currentStep[k]
                return (
                  <div key={step.key}>
                    {step.label}: {data[step.key]}
                  </div>
                )
              })}
            </div>
          </div>
        )
      }
      )}
    </div>
  )
}

export default RenderVerify