import React, { useState } from 'react'
import { Drawer, Button } from 'antd';
import RightMenu from './Sections/RightMenu';
import LeftMenu from './Sections/LeftMenu';

import './Sections/NavBar.css';

const Logo = require('../../../assets/images/logo.PNG')

function NavBar() {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };
    
    return (
        <nav className="menu" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="menu_logo">
                {/* <a href="/"><img src={Logo} alt="Logo" style={{ width: '100%', marginTop: '-5px' }} /></a> */}
                <a href="/"><i class="material-icons">sentiment_very_satisfied</i></a>
            </div>

            <div className="menu_container">
                <div className="menu_left">
                    <LeftMenu mode="horizontal"/>
                </div>
                <div className="menu_right">
                    <RightMenu mode="horizontal"/>
                </div>                
                <Button
                    className="menu_mobile_btn"
                    type="primary"
                    onClick={showDrawer}
                >
                    <i class="material-icons"> menu </i>
                </Button>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    className="menu_drawer"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <LeftMenu mode="inline"/>
                    <RightMenu mode="inline"/>                    
                </Drawer>
                
            </div>
        </nav>
        
    )
}

export default NavBar
