import React from 'react'
import { withRouter } from 'react-router-dom';
import { Result, Button } from 'antd'

const NotFound = (props) => {

  const handleBack = () => {
    props.history.goBack(-1)
  }

  return <Result
    status="404"
    title="404"
    subTitle="对不起，您访问的页面不存在！"
    extra={<Button type="primary" onClick={handleBack}>返回上一页</Button>}
  />
}

export default withRouter(NotFound)