import React, { memo } from 'react'
import { Anchor }  from 'antd'
import PropTypes from 'prop-types'
import './index.less'

const { Link } = Anchor

const CustomMenu = memo((props) => {

  const {
    hash,
    menuData
  } = props

  const generateDom = (data) => {
    if (!data.length) {
      return null
    }

    return data.map((item) => {
      if (item.children) {
        return (
          <li className="custom-menu-group" key={item.key}>
            <div className="custom-menu-group-title" title={item.title}>{item.title}</div>
            <Link className="custom-menu-group-list">
              { generateDom(item.children) }
            </Link>
          </li>
        )
      }

      return (
        <Link 
          className={`custom-menu-item ${hash === item.key ? 'custom-menu-item-selected' : ''}`} 
          key={item.key} 
          data-key={item.key}
          href={`#${item.key}`}
          title={item.title}
          onClick={handleClick}
        />
      )
    })
  }

  const handleClick = e => {
    const key = e.currentTarget.getAttribute('data-key')
    props.handleMenuClick(key)
  }

  return <>
    <section className="custom-menu-wrap">
      <Anchor 
        className="custom-menu"
        getContainer={() => document.getElementById('custom-content')}
      >
        {generateDom(menuData)}
      </Anchor>
    </section>
  </>
})

CustomMenu.propTypes = {
  hash: PropTypes.string,
  menuData: PropTypes.array
}

export default CustomMenu