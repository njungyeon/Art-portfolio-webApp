import React from 'react';
import { useSelector } from 'react-redux';
import { Pagination, Card, Typography, Tag, Input } from 'antd';
import { UserOutlined, EditOutlined, EllipsisOutlined, SettingOutlined  } from '@ant-design/icons';

const { Title } = Typography;
// const { Meta } = Card;

function LandingPage() {
    const user = useSelector(state => state.user)
    const stuArray = [
        { name: '유재석', teacher: 'jenny', image: '', classLevel: 'beginner' },
        { name: '강호동', teacher: 'rose', image: '', classLevel: 'beginner' },
        { name: '김민석', teacher: 'lisa', image: '', classLevel: 'beginner' },        
        { name: '유재석', teacher: 'jenny', image: '', classLevel: 'beginner' },
        { name: '강호동', teacher: 'rose', image: '', classLevel: 'beginner' },
        { name: '김민석', teacher: 'lisa', image: '', classLevel: 'beginner' },
        { name: '유재석', teacher: 'jenny', image: '', classLevel: 'beginner' },
        { name: '강호동', teacher: 'rose', image: '', classLevel: 'beginner' },
        { name: '김민석', teacher: 'lisa', image: '', classLevel: 'beginner' },
        { name: '유재석', teacher: 'jenny', image: '', classLevel: 'beginner' },
        { name: '강호동', teacher: 'rose', image: '', classLevel: 'beginner' },
        { name: '김민석', teacher: 'lisa', image: '', classLevel: 'beginner' },
    ]
    const Cards = stuArray.map((element, index) => {
        console.log(element)
        return (
            <Card
                style={{ width: 250, marginBottom: 10}}// height:300, margin: 10
                title={`${element.name}`}
                headStyle = {{fontWeight: "bold"}}
                bodyStyle = {{fontWeight: "bold", padding: 10}}
                hoverable                 
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                actions={[
                    <EditOutlined key="edit" />,
                    <SettingOutlined key="setting" />,                    
                ]}
                
            >
                {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
                <p style={{ textAlign: 'center' }}>담당 선생님: {`${element.teacher}`} </p>
                <p style={{ textAlign: 'center' }}>소속 반: {`${element.classLevel}`} </p>
            </Card>
        )
    })
    const tag = (
        <div>
            <Tag>Tag 1</Tag>
            <Tag>
            <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
            </Tag>
            <Tag closable >
            Tag 2
            </Tag>
            <Tag closable>
            Prevent Default
            </Tag>
        </div>
    );

    const stuSearch = (
        <div className="example-input">
            <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
        </div>
    )

    if(user.userData && !user.userData.isAuth){
        return (
            <div>
                반갑습니다. NJY의 art portfoilo 사이트에 오신걸 환영합니다.
                로그인 해주세요~!
            </div>
        )
    }else{

        return (
            <div className="portfolio-div">
                <Title level={3}>아이들 포트폴리오 list</Title>
                {tag}
                <br />

                {stuSearch}
                <br />
                <br />

                <div className="portfolio-card">{Cards}</div>
                
            </div>
        )
    }
    
}

export default LandingPage
