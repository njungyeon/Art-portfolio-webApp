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

    if(user.userData && !user.userData.isAuth) { //이게 지금 제대로 실행되려면 auth.js를 제대로 구현해야한다.
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
                    <a href="/registerStu">등록하기</a>
                </Menu.Item>
                <Menu.Item key="login">
                    <a onClick={logoutHandler}>로그아웃</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu);
