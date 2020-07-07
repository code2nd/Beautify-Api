import React from 'react'
import './index.less'

const CodeArea = (props) => {

  const {
    codes,
    hasQuot = true
  } = props

  const formatCode = (code) => {

    let codeStr = JSON.stringify(code, undefined, 4)
    codeStr = codeStr.replace(/&/g, '&amp').replace(/</g, '&lt').replace(/>/g, '&gt')
    codeStr = codeStr.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|[\{\}\[\],])/g,
      function (match) {
        var cls = 'number'
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key'
          } else {
            cls = 'string'
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean'
        } else if (/null/.test(match)) {
          cls = 'null'
        } else if (/[\{\}\[\],]/.test(match)) {
          cls = 'symbol'
        }
        return `<span class="${cls}">${hasQuot ? match : match.replace(/^['|"](.*)['|"]$/, "$1").replace(/\\/g, "")}</span>`
      })
    
    return codeStr
  }

  return <pre className="code" >
    <p dangerouslySetInnerHTML={{ __html: formatCode(codes) }}></p>
  </pre>
}

export default CodeArea