import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin={true} />;
const Loading = () => (
    <div className="spin" style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Spin tip="Loading..." size="large" indicator={antIcon} />
    </div>
);

export default Loading;