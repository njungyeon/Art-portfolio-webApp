import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Form, Input, Button, Checkbox, Typography } from 'antd';

const { Title } = Typography;

function LoginPage() {

    const initialId = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
    const [rememberMe, setRememberMe] = useState(rememberMeChecked)

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
      };
    return (
        <div>
            <Formik
                initialValues={{ userId: '', password: '' }}
                validationSchema={Yup.object().shape({
                    userId: Yup.string()
                      .required('아이디를 입력하세요.'),
                    password: Yup.string()
                      .min(6, '비밀번호를 확인해주세요.')
                      .required('비밀번호를 입력하세요.'),
                  })}
                onSubmit={(values, { setSubmitting }) => {  //여기서 values에 userID와 password가 담겨오나봄
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    let dataToSubmit = {
                        email: values.email,
                        password: values.password
                    };

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

                    // <form onSubmit={handleSubmit}>
                    // <input
                    //     type="userId"
                    //     name="userId"
                    //     onChange={handleChange}
                    //     onBlur={handleBlur}
                    //     value={values.userId}
                    // />
                    // {errors.userId && touched.userId && errors.userId}
                    // <input
                    //     type="password"
                    //     name="password"
                    //     onChange={handleChange}
                    //     onBlur={handleBlur}
                    //     value={values.password}
                    // />
                    // {errors.password && touched.password && errors.password}
                    // <button type="submit" disabled={isSubmitting}>
                    //     Submit
                    // </button>
                    // </form>
                )}
                </Formik>
        </div>
    )
}

export default LoginPage
