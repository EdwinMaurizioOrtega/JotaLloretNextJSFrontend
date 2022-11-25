import getConfig from 'next/config';
import {Sidebar} from 'primereact/sidebar';
import React, {useContext, useEffect, useState} from 'react';

const AppConfig = () => {
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    const onConfigSidebarHide = () => {
         return false ;
    };


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
            <Sidebar style={{width: '16%'}} modal={false} visible={bannerVert()} onHide={onConfigSidebarHide} showCloseIcon={false} position="right" className="layout-config-sidebar">

                <img src={`${contextPath}/layout/images/banner-premios-dos.png`} alt="Sakai Logo" height="600" className="mr-0 lg:mr-2"/>

            </Sidebar>
        </>
    );
};

export default AppConfig;
