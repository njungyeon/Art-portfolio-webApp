import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Card, Typography } from 'antd';

const { Title } = Typography;

function ShowStuPortfolio(props) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    const handleCard = (index) => {
        console.log("포트폴리오 보기", index)
        props.history.push('/showPortDetail'); 

        //dispatch()
    }

    const handleCardAction = (num) => {
        console.log("실행?", num)
        // dispatch()
        if(num === 1){
            // props.history.push('/modifyStuPage');
            // 포트폴리오 수정 화면
        }else{
            // props.history.push('/modifyStuPage');
            // 포트폴리오 삭제 버튼
            // alert 띄우기
        }
        
    }

    const portfolioArray = [
        { date: '2020.03.01', title: '상상속 나무' , image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
        { date: '2020.03.02', title: '상상속 꽃' ,image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',},
        { date: '2020.03.03', title: '상상속 자화상' ,image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',},        
        { date: '2020.03.04', title: '상상속 미래' , image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
        { date: '2020.03.05', title: '상상속 과거' ,image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',},
    ]
    const Cards = portfolioArray.map((element, index) => {
        return (
            <Card
                key={index}
                style={{ width: 250, marginBottom: 10, textAlign: 'center', padding: 10}}
                title={`날짜: ${element.date}`}
                headStyle = {{fontWeight: "bold"}}
                bodyStyle = {{fontWeight: "bold", padding: 10}}
                hoverable
                cover={<img 
                    onClick={() => {handleCard(index)}} 
                    alt="example" 
                    src={`${element.image}`}
                    className="userImage"/>
                }
                actions={[
                    <i key="modify" class="material-icons" onClick={() => {handleCardAction(1)}}>edit</i>,
                    <i key="delete" class="material-icons" onClick={() => {handleCardAction(2)}}>delete</i>
                ]}
                
            >
                <p> {`주제: ${element.title}`} </p>
            </Card>
        )
    })

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
                <Title level={3}> 포트폴리오 list</Title>
                <div className="portfolio-card-personal">{Cards}</div>
                <Pagination size="small" total={50} />
            </div>
            
        )
    }
    
}

export default ShowStuPortfolio
