import React from 'react';
import { useSelector } from 'react-redux';
import { Pagination, Card, Typography, Tag } from 'antd';

const { Title } = Typography;
// const { Meta } = Card;

function LandingPage() {
    const user = useSelector(state => state.user)
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

    if(user.userData && !user.userData.isAuth){
        return (
            <div>
                반갑습니다. NJY의 art portfoilo 사이트에 오신걸 환영합니다.
                로그인 해주세요~!
            </div>
        )
    }else{

        return (
            <div>
                
                <Title level={3}>아이들 포트폴리오 list</Title>
                {tag}
                
                <Card
                    title="학생이름칸"
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
                    <p>담당 선생님: </p>
                    <p></p>
                </Card>
            </div>
        )
    }
    
}

export default LandingPage
