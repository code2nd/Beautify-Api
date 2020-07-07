import React from 'react'
import ModuleTitle from '../../../../components/moduleTitle'
import DangerP from '../../../../components/dangerP'
import CodeArea from '../../../../components/codeArea'
import ParaTitle from '../../../../components/paraTitle'

const DocModule = (props) => {

  const { content } = props

  const generateDom = (content) => {
    if (content.length) {
      return content.map(item => {
        switch (item.type) {
          case 'moduleTitle': return <ModuleTitle key={item.key} hash={item.hash} title={item.title} style={item.style} />
          case 'dangerP': return <DangerP key={item.key} text={item.text} />
          case 'codeArea': return <CodeArea key={item.key} codes={item.codes} hasQuot={item.hasQuot} />
          case 'paraTitle': return <ParaTitle key={item.key} title={item.title} size={item.size} />
          case 'p': return <p key={item.key} style={{ fontSize: '14px', marginBottom: '14px', lineHeight: '22px' }}>{item.text}</p>
          default: return null
        }
      })
    }
  }

  return <>
    { generateDom(content) }
  </>
}

export default DocModule