import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';

function RightMenu(props) {
    const user = useSelector(state => state.user)

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`)
            .then(response => {
                if(response.status === 200){
                    props.history.push('/login')
                } else {
                    alert('로그아웃 실패')
                }
            });
    }

    if(user.userData && !user.userData.isAuth) { //속도가 상당히 느리다 리팩토링 대상
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="register">
                    <a href="/register">회원가입</a>
                </Menu.Item>
                <Menu.Item key="login">
                    <a href="/login">로그인</a>
                </Menu.Item>
            </Menu>
        )
    }
    else{
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="registerStu">
                    <a href="/registerStu">학생 등록</a>
                </Menu.Item>
                <Menu.Item key="login">
                    <a onClick={logoutHandler} href >로그아웃</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu);
