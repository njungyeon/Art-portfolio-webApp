import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { registerUser } from '../../../_actions/user_actions'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, Typography, Select, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Option } = Select;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
  
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

function RegisterStuPage(props) {
    const dispatch = useDispatch();

    const [formErrorMsg, setformErrorMsg] = useState('')
    const [loading, setloading] = useState(false)
    const [imageUrl, setimageUrl] = useState('')

    const handleOnChange = (info, cb) => {
        console.log("info.file",info.file)
        if (info.file.status === 'uploading') {
            setloading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                setimageUrl(imageUrl);
                console.log(imageUrl);
                setloading(false)
                cb("fileInfo", {
                    name: info.file.name,
                    size: info.file.size,
                    type: info.file.type
                });
            });
        }
      };

    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <div>
            <Formik
                initialValues={{ userId: '', password: '', fileInfo: null, }}
                validationSchema={Yup.object().shape({
                    studentId: Yup.string()
                      .min(5, '최소한 5자 이상 입력해주세요')
                      .required('아이디를 입력하세요.'),
                    password: Yup.string()
                      .min(5, '최소한 5자 이상 입력해주세요')
                      .required('비밀번호를 입력하세요.'),
                    name: Yup.string()
                      .required('이름은 필수사항입니다.'),
                    classLevel: Yup.string()
                      .required('학생의 수업 레벨을 입력해주세요'),
                    fileInfo: Yup.mixed()
                      .required('학생의 프로필사진을 추가해주세요'),
                  })}
                onSubmit={(values, { setSubmitting }) => {
                    console.log("왜 갑자기 안됨?")
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    let dataToSubmit = {
                        userId: values.studentId,
                        password: values.password,
                        name: values.name,
                        classLevel: values.classLevel,
                        imageInfo: values.fileInfo,
                    };
                    console.log(dataToSubmit)
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
                            setformErrorMsg('학생등록 오류.. [관리자에게 문의하세요]')
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
                    setFieldValue,
                    setFieldTouched,
                    onSearch
                    /* and other goodies */
                }) => (
                    <div className="app">
                    <Title level={2}>학생 등록</Title>
                    <form onSubmit={handleSubmit} style={{ width: '350px' }}>
                        <Form.Item required>
                            <Input
                                id="studentId"
                                prefix={<i className="material-icons" style={{ color: 'rgba(0,0,0,.25)' }}> face </i>}
                                placeholder="아이디"
                                type="studentId"
                                value={values.studentId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className = { errors.studentId && touched.studentId ? 'text-input error' : 'text-input' }
                            />
                            { errors.studentId && touched.studentId && (
                                <div className="input-feedback">{errors.studentId}</div>
                            ) }
                        </Form.Item>

                        <Form.Item>
                            <Input
                                id="password"
                                prefix={<i className="material-icons" style={{ color: 'rgba(0,0,0,.25)' }}> lock </i>}
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
                            <Select
                                showSearch
                                placeholder="수업 레벨"
                                optionFilterProp="children"
                                onChange={(EventTarget) => {
                                    console.log(EventTarget);
                                    setFieldValue("classLevel", EventTarget);
                                }}
                                onBlur={handleBlur}
                                id="classLevel"
                                value={values.classLevel}
                                classname={ errors.classLevel && touched.classLevel ? 'text-input error' : 'text-input' }
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="1">레벨1</Option>
                                <Option value="2">레벨2</Option>
                                <Option value="3">레벨3</Option>
                                <Option value="4">레벨4</Option>
                                <Option value="5">레벨5</Option>
                                <Option value="6">레벨6</Option>
                            </Select>
                            {errors.classLevel && touched.classLevel && (
                                <div className="input-feedback">{errors.classLevel}</div>
                            )}
                        </Form.Item>

                        <div>
                            <Upload
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}                               
                                onBlur={setFieldTouched}
                                classname={ errors.classLevel && touched.classLevel ? 'text-input error' : 'text-input' }
                                onChange={(info) => {
                                    handleOnChange(info, setFieldValue);
                                    //와 드디어해결 정연아 너 대박~ 멋잇어ㅎㅎ
                                    // third party https://codesandbox.io/s/jRzE53pqR 공부해랏
                                }}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                            {errors.fileInfo && touched.fileInfo && (
                                <div classname="input-feedback">{errors.fileInfo}</div>
                            )}
                        </div>
                        
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
