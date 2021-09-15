import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

function index() {
    return <div style={{position:"absolute", top:"50%", left:"50%"}}><Spin indicator={antIcon} size="large"/></div>
}

export default index
