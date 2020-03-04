import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { registerUser } from '../../../_actions/user_actions'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, Checkbox, Typography } from 'antd';
const { Title } = Typography;

function RegisterStuPage(props) {
    const dispatch = useDispatch();

    const [formErrorMsg, setformErrorMsg] = useState('')

    return (
        <div>
            <Formik
                initialValues={{ userId: '', password: '' }}
                validationSchema={Yup.object().shape({
                    studentId: Yup.string()
                      .min(5, '최소한 5자 이상 입력해주세요')
                      .required('아이디를 입력하세요.'),
                    password: Yup.string()
                      .min(5, '최소한 5자 이상 입력해주세요')
                      .required('비밀번호를 입력하세요.'),
                    name: Yup.string()
                      .required('이름은 필수사항입니다.'),
                    classLevel: Yup.string(),
                    //   .required('학생의 수업 레벨을 입력해주세요'),
                    image: Yup.string()
                    //   .required('학생의 이미지를 추가해주세요'),
                  })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2));
                    let dataToSubmit = {
                        userId: values.studentId,
                        password: values.password,
                        name: values.name,
                        classLevel: values.classLevel,
                        image: values.image,
                    };
                    dispatch(registerUser(dataToSubmit))
                        .then(response => {
                            if(response.payload.loginSuccess){
                                props.history.push("/");
                            }else {
                                setformErrorMsg('필수 사항들을 입력했는지 확인하세요.')
                                setTimeout(() => {
                                    setformErrorMsg("")
                                }, 3000);
                            }
                        })
                        .catch(err => {
                            setformErrorMsg('회원가입 오류.. [관리자에게 문의하세요]')
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
                    <Title level={2}>학생 등록</Title>
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
                            <Input
                                id="name"
                                prefix={<i class="material-icons" style={{ color: 'rgba(0,0,0,.25)' }}> account_circle </i>}
                                placeholder="이름"
                                type="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={ errors.name && touched.name ? 'text-input error' : 'text-input' }
                            />
                            {errors.name && touched.name && (
                                <div className="input-feedback">{errors.name}</div>
                            )}
                        </Form.Item>

                        <Form.Item>
                            <Input
                                id="classLevel"
                                prefix={<i class="material-icons" style={{ color: 'rgba(0,0,0,.25)' }}> account_circle </i>}
                                placeholder="수업 레벨"
                                type="classLevel"
                                value={values.classLevel}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                classname={ errors.classLevel && touched.classLevel ? 'text-input error' : 'text-input' }
                            />
                            {errors.classLevel && touched.classLevel && (
                                <div classname="input-feedback">{errors.classLevel}</div>
                            )}
                        </Form.Item>

                        <Form.Item>
                            <Input
                                id="image"
                                prefix={<i class="material-icons" style={{ color: 'rgba(0,0,0,.25)' }}> account_circle </i>}
                                placeholder="학생 이미지"
                                type="image"
                                value={values.image}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={ errors.image && touched.image ? 'text-input error' : 'text-input' }
                            />
                            {errors.image && touched.image && (
                                <div classname="input-feedback">{errors.image}</div>
                            )}
                        </Form.Item>
                        
                        {formErrorMsg && (
                            <label><p>{formErrorMsg}</p></label>
                        )}

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                학생 등록
                            </Button>
                        </Form.Item>
                    </form>
                    </div>
                )}
                </Formik>
        </div>
    )
}

export default RegisterStuPage
