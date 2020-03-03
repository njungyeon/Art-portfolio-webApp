import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { loginUser } from '../../../_actions/user_actions'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, Checkbox, Typography } from 'antd';
const { Title } = Typography;

function LoginPage(props) {
    const dispatch = useDispatch();
    const initialId = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
    const [rememberMe, setRememberMe] = useState(rememberMeChecked)
    const [formErrorMsg, setformErrorMsg] = useState('')

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    };
    return (
        <div>
            <Formik
                initialValues={{ userId: initialId, password: '' }}
                validationSchema={Yup.object().shape({
                    userId: Yup.string()
                      .required('아이디를 입력하세요.'),
                    password: Yup.string()
                      .min(5, '비밀번호를 확인해주세요.')
                      .required('비밀번호를 입력하세요.'),
                  })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    let dataToSubmit = {
                        userId: values.userId,
                        password: values.password
                    };
                    dispatch(loginUser(dataToSubmit))
                        .then(response => {
                            if(response.payload.loginSuccess){
                                window.localStorage.setItem('userId', response.payload.userId);
                                if(rememberMe === true){
                                    window.localStorage.setItem('rememberMe', response.payload.userId);
                                } else {
                                    window.localStorage.removeItem('rememberMe');
                                }
                                props.history.push("/");
                            }else {
                                setformErrorMsg('아이디나 비밀번호를 확인하세요.')
                                setTimeout(() => {
                                    setformErrorMsg("")
                                }, 3000);
                            }
                        })
                        .catch(err => {
                            setformErrorMsg('아이디나 비밀번호를 확인하세요.')
                            setTimeout(() => {
                                setformErrorMsg("")
                            }, 3000);
                        });
                    setSubmitting(false);
                    }, 500);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <div className="app">
                    <Title level={2}>Login</Title>
                    <form onSubmit={handleSubmit} style={{ width: '350px' }}>
                        <Form.Item required>
                            <Input
                                id="userId"
                                prefix={<i class="material-icons" style={{ color: 'rgba(0,0,0,.25)' }}> face </i>}
                                placeholder="아이디"
                                type="userId"
                                value={values.userId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className = { errors.userId && touched.userId ? 'text-input error' : 'text-input' }
                            />
                            { errors.userId && touched.userId && (
                                <div className="">{errors.userId}</div>
                            ) }
                        </Form.Item>

                        <Form.Item>
                            <Input
                                id="password"
                                prefix={<i class="material-icons" style={{ color: 'rgba(0,0,0,.25)' }}> lock </i>}
                                placeholder="비밀번호"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={ errors.password && touched.password ? 'text-input error' : 'text-input' }
                            />
                            {errors.password && touched.password && (
                                <div className="input-feedback">{errors.password}</div>
                            )}
                        </Form.Item>
                        
                        {formErrorMsg && (
                            <label><p>{formErrorMsg}</p></label>
                        )}

                        <Form.Item>
                            <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe}>아이디 저장</Checkbox>
                            <a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>비밀번호 찾기</a>
                            <br />
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                Log in
                            </Button>
                        </Form.Item>
                    </form>
                    </div>
                )}
                </Formik>
        </div>
    )
}

export default LoginPage
