import React from 'react'

const DangerP = (props) => {

const { text } = props 

return <p style={{ 
          fontSize: '14px', 
          lineHeight: '22px', 
          marginBottom: '14px' 
        }} 
        dangerouslySetInnerHTML={{ __html: text }}
      />
}

export default DangerP