import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Typography } from 'antd';

const { Title } = Typography;

function ShowDetailPortfolio(props) {
    const user = useSelector(state => state.user)
    const [cardKey, setcardKey] = useState('tab1')
    const dispatch = useDispatch();

    const handleCard = (index) => {
        console.log("학생정보수정", index)
        //dispatch()
    }

    const onTabChange = () => {
        if(cardKey === 'tab1') setcardKey('tab2');
        else setcardKey('tab1');
    }    

    const tabList = [
        {
          key: 'tab1',
          tab: '작품사진',
        },
        {
          key: 'tab2',
          tab: '설명',
        },
      ];
      
      const pictures = (
          <div className="">
              <img className="artPictures" alt="example" src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'></img>
              <img className="artPictures" alt="example" src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'></img>
              <img className="artPictures" alt="example" src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'></img>
              <img className="artPictures" alt="example" src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'></img>
              <img className="artPictures" alt="example" src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'></img>
              <img className="artPictures" alt="example" src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'></img>
          </div>
      )
      const contentList = {
        tab1: <p>{pictures}</p>,
        tab2: (
            <p>
                작품설명:
                블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라
            </p>
        ),
      };

    const gridStyle = {
        width: '25%',
        textAlign: 'center',
        overflow: 'hidden'
      };

    const handleCardAction = (num) => {
        console.log("실행?", num)
        // dispatch()
        if(num === 1){
            // props.history.push('/AddNewPortfolio');
        }else{
            props.history.push('/modifyStuPage');
        }
        
    }

    const imageobject = [
        {image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'},
        {image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'},
        {image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'},
        {image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'},
        {image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'},
        {image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}
    ];

    const Cards = imageobject.map((element, index) => {
        return (
            <Card
                key={index}
                style={{ width: 250, marginBottom: 10, textAlign: 'center'}}// height:300, margin: 10
                headStyle = {{fontWeight: "bold"}}
                bodyStyle = {{fontWeight: "bold", padding: 10}}
                hoverable
                cover={<img 
                    onClick={() => {handleCard(index)}} 
                    alt="example" 
                    src={`${element.image}`}
                    className="userImage"/>
                }
            >
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
                <Title level={3}>포트폴리오 Detail</Title>
                {/* <div className="portfolio-card">{Cards}</div> */}
                <Card
                    style={{ width: '100%' }}
                    title="학생 이름'S portfolio"
                    tabList={tabList}
                    activeTabKey={cardKey}
                    onTabChange={key => {
                        onTabChange(key, 'key');
                    }}
                    >
                    {contentList[cardKey]}
                </Card>
            </div>
            
        )
    }
    
}

export default ShowDetailPortfolio
