import React, { useState } from 'react'

const WordBox = ({ word, color }) => (
  <span style={{ 
    backgroundColor: color, 
    padding: '5px 10px', 
    margin: '0 5px', 
    borderRadius: '5px', 
    display: 'inline-block'
  }}>
    {word}
  </span>
)

const Arrow = () => (
  <span style={{ margin: '0 10px' }}>→</span>
)

const TransformerLayer = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      name: 'Input',
      description: 'The input sentence is converted into vectors. Each word is represented as a numerical vector.',
      visualization: (
        <div>
          <WordBox word="The" color="#e3f2fd" />
          <WordBox word="cat" color="#e3f2fd" />
          <WordBox word="sat" color="#e3f2fd" />
          <div style={{ marginTop: '10px' }}>
            Each word is converted to a vector, e.g., "The" → [0.1, -0.2, 0.3, ...]
          </div>
        </div>
      )
    },
    {
      name: 'Layer Norm 1',
      description: 'Normalizes each input vector to have zero mean and unit variance, which helps stabilize the learning process.',
      visualization: (
        <div>
          <div>
            <WordBox word="The" color="#e3f2fd" />
            <Arrow />
            <WordBox word="The (normalized)" color="#c8e6c9" />
          </div>
          <div>
            <WordBox word="cat" color="#e3f2fd" />
            <Arrow />
            <WordBox word="cat (normalized)" color="#c8e6c9" />
          </div>
          <div>
            <WordBox word="sat" color="#e3f2fd" />
            <Arrow />
            <WordBox word="sat (normalized)" color="#c8e6c9" />
          </div>
          <div style={{ marginTop: '10px' }}>
            Normalization: x_norm = (x - mean(x)) / std(x)
          </div>
        </div>
      )
    },
    {
      name: 'Multi-Head Attention',
      description: 'Allows the model to focus on different parts of the input sequence. Each word can attend to every other word, capturing various relationships.',
      visualization: (
        <div style={{ textAlign: 'center' }}>
          <svg width="300" height="200" viewBox="0 0 300 200">
            {['The', 'cat', 'sat'].map((word, i) => (
              <React.Fragment key={word}>
                <rect x={10 + i * 100} y={10} width="80" height="30" fill="#e3f2fd" />
                <text x={50 + i * 100} y={30} textAnchor="middle" dominantBaseline="middle">{word}</text>
                {['The', 'cat', 'sat'].map((_, j) => (
                  <line 
                    key={`${i}-${j}`}
                    x1={50 + i * 100} y1={40} 
                    x2={50 + j * 100} y2={160} 
                    stroke="#90caf9" 
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                ))}
              </React.Fragment>
            ))}
            <rect x={110} y={170} width="80" height="30" fill="#c8e6c9" />
            <text x={150} y={190} textAnchor="middle" dominantBaseline="middle">Attention</text>
          </svg>
          <div>Arrows represent attention between words</div>
        </div>
      )
    },
    {
      name: 'Residual Connection 1',
      description: 'Adds the output of the attention mechanism to the original input. This helps preserve information from earlier layers.',
      visualization: (
        <div>
          <div>
            <WordBox word="The (normalized)" color="#c8e6c9" />
            {' + '}
            <WordBox word="The (attention)" color="#ffecb3" />
            <Arrow />
            <WordBox word="The (combined)" color="#ffcc80" />
          </div>
          <div>
            <WordBox word="cat (normalized)" color="#c8e6c9" />
            {' + '}
            <WordBox word="cat (attention)" color="#ffecb3" />
            <Arrow />
            <WordBox word="cat (combined)" color="#ffcc80" />
          </div>
          <div>
            <WordBox word="sat (normalized)" color="#c8e6c9" />
            {' + '}
            <WordBox word="sat (attention)" color="#ffecb3" />
            <Arrow />
            <WordBox word="sat (combined)" color="#ffcc80" />
          </div>
          <div style={{ marginTop: '10px' }}>
            Normalized + Attention Output = Combined Representation
          </div>
        </div>
      )
    },
    {
      name: 'Layer Norm 2',
      description: 'Normalizes the data again after the first residual connection, maintaining consistent scales throughout the network.',
      visualization: (
        <div>
          <div>
            <WordBox word="The (combined)" color="#ffcc80" />
            <Arrow />
            <WordBox word="The (re-normalized)" color="#ce93d8" />
          </div>
          <div>
            <WordBox word="cat (combined)" color="#ffcc80" />
            <Arrow />
            <WordBox word="cat (re-normalized)" color="#ce93d8" />
          </div>
          <div>
            <WordBox word="sat (combined)" color="#ffcc80" />
            <Arrow />
            <WordBox word="sat (re-normalized)" color="#ce93d8" />
          </div>
          <div style={{ marginTop: '10px' }}>
            Second normalization: x_renorm = (x_combined - mean(x_combined)) / std(x_combined)
          </div>
        </div>
      )
    },
    {
      name: 'Feedforward Network',
      description: 'Processes each word vector independently through a simple neural network, allowing for more complex transformations.',
      visualization: (
        <div style={{ textAlign: 'center' }}>
          <svg width="300" height="200" viewBox="0 0 300 200">
            <rect x={10} y={10} width="280" height="180" fill="#f3e5f5" rx="10" />
            <text x={150} y={30} textAnchor="middle" dominantBaseline="middle" fontSize="14">Feedforward Network</text>
            {[0, 1, 2].map(i => (
              <React.Fragment key={i}>
                <circle cx={50} cy={70 + i * 50} r="20" fill="#ce93d8" />
                <circle cx={150} cy={70 + i * 50} r="20" fill="#9fa8da" />
                <circle cx={250} cy={70 + i * 50} r="20" fill="#80cbc4" />
              </React.Fragment>
            ))}
            {[0, 1, 2].map(i => (
              <React.Fragment key={i}>
                {[0, 1, 2].map(j => (
                  <React.Fragment key={j}>
                    <line x1={70} y1={70 + i * 50} x2={130} y2={70 + j * 50} stroke="#bdbdbd" strokeWidth="2" />
                    <line x1={170} y1={70 + i * 50} x2={230} y2={70 + j * 50} stroke="#bdbdbd" strokeWidth="2" />
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </svg>
          <div>Each word vector passes through this network independently</div>
        </div>
      )
    },
    {
      name: 'Residual Connection 2',
      description: 'Adds the output of the feedforward network to its input, helping to maintain a strong gradient flow through the network.',
      visualization: (
        <div>
          <div>
            <WordBox word="The (re-normalized)" color="#ce93d8" />
            {' + '}
            <WordBox word="The (FFN output)" color="#80cbc4" />
            <Arrow />
            <WordBox word="The (final)" color="#a5d6a7" />
          </div>
          <div>
            <WordBox word="cat (re-normalized)" color="#ce93d8" />
            {' + '}
            <WordBox word="cat (FFN output)" color="#80cbc4" />
            <Arrow />
            <WordBox word="cat (final)" color="#a5d6a7" />
          </div>
          <div>
            <WordBox word="sat (re-normalized)" color="#ce93d8" />
            {' + '}
            <WordBox word="sat (FFN output)" color="#80cbc4" />
            <Arrow />
            <WordBox word="sat (final)" color="#a5d6a7" />
          </div>
          <div style={{ marginTop: '10px' }}>
            Re-normalized + FFN Output = Final Layer Output
          </div>
        </div>
      )
    },
    {
      name: 'Repeat Process',
      description: 'The entire process (from Layer Norm 1 to Residual Connection 2) is repeated multiple times, typically 6 to 24 times depending on the model size. Each repetition is called a "layer" or "block".',
      visualization: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '5px', width: '200px', textAlign: 'center' }}>
            Input
          </div>
          <div style={{ fontSize: '20px' }}>↓</div>
          <div style={{ padding: '10px', backgroundColor: '#c8e6c9', borderRadius: '5px', width: '200px', textAlign: 'center' }}>
            Transformer Layer 1
          </div>
          <div style={{ fontSize: '20px' }}>↓</div>
          <div style={{ padding: '10px', backgroundColor: '#c8e6c9', borderRadius: '5px', width: '200px', textAlign: 'center' }}>
            Transformer Layer 2
          </div>
          <div style={{ fontSize: '20px' }}>↓</div>
          <div style={{ padding: '10px', backgroundColor: '#c8e6c9', borderRadius: '5px', width: '200px', textAlign: 'center' }}>
            Transformer Layer 3
          </div>
          <div style={{ fontSize: '20px' }}>⋮</div>
          <div style={{ padding: '10px', backgroundColor: '#c8e6c9', borderRadius: '5px', width: '200px', textAlign: 'center' }}>
            Transformer Layer N
          </div>
          <div style={{ fontSize: '20px' }}>↓</div>
          <div style={{ padding: '10px', backgroundColor: '#fff9c4', borderRadius: '5px', width: '200px', textAlign: 'center' }}>
            Output
          </div>
        </div>
      )
    }
  ]

  const handlePrevious = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNext = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Transformer Layer Explanation</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {steps.map((step, index) => (
          <button
            key={step.name}
            onClick={() => setActiveStep(index)}
            style={{
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              background: activeStep === index ? '#3498db' : '#ecf0f1',
              color: activeStep === index ? 'white' : 'black',
              cursor: 'pointer'
            }}
          >
            {step.name}
          </button>
        ))}
      </div>
      <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '20px' }}>
        <h2>{steps[activeStep].name}</h2>
        <p>{steps[activeStep].description}</p>
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
          {steps[activeStep].visualization}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button
          onClick={handlePrevious}
          style={{ 
            padding: '10px', 
            borderRadius: '5px', 
            background: activeStep === 0 ? '#d5dbdb' : '#bdc3c7', 
            border: 'none', 
            cursor: activeStep === 0 ? 'default' : 'pointer',
            color: activeStep === 0 ? '#7f8c8d' : 'black'
          }}
          disabled={activeStep === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          style={{ 
            padding: '10px', 
            borderRadius: '5px', 
            background: activeStep === steps.length - 1 ? '#d5dbdb' : '#3498db', 
            color: activeStep === steps.length - 1 ? '#7f8c8d' : 'white', 
            border: 'none', 
            cursor: activeStep === steps.length - 1 ? 'default' : 'pointer'
          }}
          disabled={activeStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default TransformerLayer