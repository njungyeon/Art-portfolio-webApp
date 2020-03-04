import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { auth } from '../_actions/user_actions';

export default function (BeforeClass, reload, adminRoute = null){
    function AuthCheck(props){
        let user =  useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => { //BeforeClass의 함수 내부에 이 userEffect함수가 정의되도록 하고 있다.
            dispatch(auth()).then(async response => {
                if(await !response.payload.isAuth){
                    if(reload) {
                        props.history.push('/register_login')
                    }
                } else {
                    if(adminRoute && !response.payload.isAdmin) { //만약 관리자를 위한 라우트이고 관리자가 아니라면
                        props.history.push('/')
                    }
                    else {
                        if( reload === false ){
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [dispatch, props.history, user.googleAuth])

        return <BeforeClass {...props} user={user}/>
    }
    return AuthCheck
}