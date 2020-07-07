import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'
import Logo from '../../../../assets/img/logo.png'

const Title = () => {
  return <>
    <h1 className="title">
      <Link to="/">
        <span className="logo-link">
          <img className="logo" src={Logo} alt="logo"/>
          Beautify Api 
        </span>
      </Link>
    </h1>
  </>
  
} 

export default Title