import getConfig from 'next/config';
import PrimeReact from 'primereact/api';
import {Button} from 'primereact/button';
import {InputSwitch} from 'primereact/inputswitch';
import {RadioButton} from 'primereact/radiobutton';
import {Sidebar} from 'primereact/sidebar';
import {classNames} from 'primereact/utils';
import React, {useContext, useEffect, useState} from 'react';
import {LayoutContext} from './context/layoutcontext';

const AppConfig = (props) => {
    const [scales] = useState([12, 13, 14, 15, 16]);
    const {layoutConfig, setLayoutConfig, layoutState, setLayoutState} = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    function bannerVert() {
        if (typeof window !== 'undefined') {
            // console.log('You are on the browser')

            if (window.matchMedia("(min-width: 990px)").matches) {
                // console.log('Desktop')
                return true;
            } else {
                // console.log('Mobile')
                return false;
            }

        } else {
            console.log('You are on the server')
            // ⛔️ Don't use window here
        }
    }

    return (
        <>
            <Sidebar style={{width: '16%'}} modal={false} visible={bannerVert()} onHide={true} showCloseIcon={false} position="right" className="layout-config-sidebar">

                <img src={`${contextPath}/layout/images/banner-premios.png`} alt="Sakai Logo" height="600" className="mr-0 lg:mr-2"/>

            </Sidebar>
        </>
    );
};

export default AppConfig;
