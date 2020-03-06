import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
// import { registerUser } from '../../../_actions/user_actions'
import { useDispatch,  } from 'react-redux'
import { Form, Input, Button, Checkbox, Typography, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { TextArea } = Input;

function UploadPortfolio(props) {
    const dispatch = useDispatch();
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const [formErrorMsg, setformErrorMsg] = useState('')
    const [previewVisible, setpreviewVisible] = useState(false)
    const [previewImage, setpreviewImage] = useState('')
    const [fileList, setfileList] = useState(
        [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
              uid: '-5',
              name: 'image.png',
              status: 'error',
            },
          ]
    )

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
          
        });
    }
      
    const handleUpload = ({fileList}) => {
        setfileList([...fileList]);
    }

    const handlePreview = async file => {
        console.log("file : ", file);
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    
        setpreviewImage(file.url || file.preview);
        setpreviewVisible(true)
    };

    const handleCancel = () => setpreviewVisible(false);
    
    return (
        <div>
            <Formik
                initialValues={{ programName: '', fileInfo: null, description: '' }}
                validationSchema={Yup.object().shape({
                    programName: Yup.string()
                      .required('프로그램 명을 입력해주세요'),
                    fileInfo: Yup.mixed()
                      .required('1개 이상의 파일을 업로드 해야합니다.'),
                    description: Yup.string()
                      .required('작품설명을 추가해주세요')
                  })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    let dataToSubmit = {
                        programName: values.programName,
                        files: {
                            fileName: values.fileInfo.name,
                            type: values.fileInfo.type
                        },
                        description: values.description,
                    };
                    // dispatch(registerUser(dataToSubmit))
                    //     .then(response => {
                    //         if(response.payload.loginSuccess){
                    //             props.history.push("/");
                    //         }else {
                    //             setformErrorMsg('필수 사항들을 입력했는지 확인하세요.')
                    //             setTimeout(() => {
                    //                 setformErrorMsg("")
                    //             }, 3000);
                    //         }
                    //     })
                    //     .catch(err => {
                    //         setformErrorMsg('회원가입 오류.. [관리자에게 문의하세요]')
                    //         setTimeout(() => {
                    //             setformErrorMsg("")
                    //         }, 3000);
                    //     });
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
                    <Title level={2}>작품 등록</Title>
                    <form onSubmit={handleSubmit} style={{ width: '350px' }}>
                        <Form.Item required>
                            <Input
                                id="programName"
                                prefix={<i className="material-icons" style={{ color: 'rgba(0,0,0,.25)' }}>color_lens</i>}
                                placeholder="프로그램 명"
                                type="programName"
                                value={values.programName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className = { errors.programName && touched.programName ? 'text-input error' : 'text-input' }
                            />
                            { errors.programName && touched.programName && (
                                <div className="input-feedback">{errors.programName}</div>
                            ) }
                        </Form.Item>

                        <div className="clearfix">
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                type="picturesPath"
                                value={values.fileInfo}
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleUpload}
                                multiple={true}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                        
                        <TextArea 
                            rows={4}
                            id="description"
                            placeholder="작품 설명"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={ errors.description && touched.description ? 'text-input error' : 'text-input' }
                        />
                            {errors.description && touched.description && (
                            <div className="input-feedback">{errors.description}</div>
                        )}
                        
                        {formErrorMsg && (
                            <label><p>{formErrorMsg}</p></label>
                        )}
                        <br />
                        <br />
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                새로운 작품 등록
                            </Button>
                        </Form.Item>
                    </form>
                    </div>
                )}
                </Formik>
        </div>
    )
}

export default UploadPortfolio
