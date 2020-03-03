import React from 'react';
import { Menu } from 'antd';

function RightMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="register">
                <a href="/">등록하기</a>
            </Menu.Item>
            <Menu.Item key="login">
                <a href="/">로그인</a>
            </Menu.Item>
        </Menu>
    )
}

export default RightMenu
