import React from 'react'
import NavbarTwo from './NavbarTwo'

const Main = ({child}) => {
  return (
    <div>
        <NavbarTwo />
        {child}
    </div>
  )
}

export default Main