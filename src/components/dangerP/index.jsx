import React from 'react'
import PropTypes from 'prop-types'

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

DangerP.propTypes = {
  text: PropTypes.string
}

export default DangerP