import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="home">
                <a href="/">Home</a>
            </Menu.Item>
            <Menu.Item key="introduce">
                <a href="/">Art Academy 소개</a>
            </Menu.Item>
        </Menu>
    )
}

export default LeftMenu
