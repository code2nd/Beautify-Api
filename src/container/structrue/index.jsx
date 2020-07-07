import React from 'react'
import { Layout } from 'antd'
import './index.less'

const { Content, Sider } = Layout;

const Structure = (props) => {

  const { menu, content } = props

  return <div className="structure">
    <Layout className="site-layout-background">
      <Sider className="site-layout-background layout-sider" width={320}>
        { menu }
      </Sider>
      <Content style={{ minHeight: 280 }}>{content}</Content>
    </Layout>
  </div>
}

export default Structure