import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({variant, children}) => {
  return (
    <Alert variant={variant} style={{borderRadius: '10px'}}>
        {children}
    </Alert>
  )
}

export default Message