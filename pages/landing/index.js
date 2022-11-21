import React, {useContext, useRef, useState} from 'react';
import Link from 'next/link';
import getConfig from 'next/config';
import {StyleClass} from 'primereact/styleclass';
import {Button} from 'primereact/button';
import {Ripple} from 'primereact/ripple';
import {Divider} from 'primereact/divider';
import AppConfig from '../../layout/AppConfig';
import {LayoutContext} from '../../layout/context/layoutcontext';
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";

import {Toast} from 'primereact/toast';
import Head from "next/head";
import AppTopbar from "../../layout/AppTopbar";
import AppSidebar from "../../layout/AppSidebar";
import AppFooter from "../../layout/AppFooter";

var axios = require('axios');


const LandingPage = () => {
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const {layoutConfig} = useContext(LayoutContext);
    const menuRef = useRef();

    const [cedula, setCedula] = useState('');
    // console.log(cedula);
    const [telefono, setTelefono] = useState('');

    const [octavo1, setOctavo1] = useState('');
    // console.log(octavo1);
    const [octavo2, setOctavo2] = useState('');
    const [octavo3, setOctavo3] = useState('');
    const [octavo4, setOctavo4] = useState('');
    const [octavo5, setOctavo5] = useState('');
    const [octavo6, setOctavo6] = useState('');
    const [octavo7, setOctavo7] = useState('');
    const [octavo8, setOctavo8] = useState('');

    const [cuarto1, setCuarto1] = useState('');
    const [cuarto2, setCuarto2] = useState('');
    const [cuarto3, setCuarto3] = useState('');
    const [cuarto4, setCuarto4] = useState('');

    const [semifinal1, setSemiFinal1] = useState('');
    const [semifinal2, setSemifinal2] = useState('');

    const [final, setFinal] = useState('');

    const [checked, setChecked] = useState(false);

    const toast = useRef(null);

    async function postData() {

        const fecha = new Date().toLocaleDateString()
        console.log("Terminos y Condiciones: " + checked)
        if (cedula != "" && telefono != "" && octavo1 != "" && final != "" && checked == true) {


            var axios = require('axios');
            var data = JSON.stringify({
                "fechaCreacion": fecha,
                "cedula": cedula,
                "telefono": telefono,
                "octavo1": octavo1,
                "octavo2": octavo2,
                "octavo3": octavo3,
                "octavo4": octavo4,
                "octavo5": octavo5,
                "octavo6": octavo6,
                "octavo7": octavo7,
                "octavo8": octavo8,
                "cuarto1": cuarto1,
                "cuarto2": cuarto2,
                "cuarto3": cuarto3,
                "cuarto4": cuarto4,
                "semifinal1": semifinal1,
                "semifinal2": semifinal2,
                "finalfinal": final,
                "tc": checked
            });

            var config = {
                method: 'post',
                url: 'https://backend.jotalloret.com/api/pollas',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    // console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });


            //Sumar arboles SEMBRADOS
            var configA = {
                method: 'put',
                url: 'https://backend.jotalloret.com/api/arboles/incrementar',
                headers: {}
            };

            axios(configA)
                .then(function (response) {
                    // console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });


            showSuccess();

            //Limpiamos todfos los campos

            setCedula('')
            setTelefono('')
            setOctavo1('')
            setOctavo2('')
            setOctavo3('')
            setOctavo4('')
            setOctavo5('')
            setOctavo6('')
            setOctavo7('')
            setOctavo8('')

            setCuarto1('')
            setCuarto2('')
            setCuarto3('')
            setCuarto4('')

            setSemiFinal1('')
            setSemifinal2('')

            setFinal('')

            setChecked(false)


        } else {

            showError();

        }

    }


    const showError = () => {
        toast.current.show({severity: 'error', summary: 'Mensaje de error', detail: 'Obligatorio llenar todos los campos.', life: 3000});
    }

    const showSuccess =() => {
        toast.current.show({severity: 'success', summary: 'Mensaje de éxito', detail: 'Polla guardada.'});
    }


    //Consultar arboles sembrados
    const [data, setData] = useState([]);

    var config = {
        method: 'get',
        url: 'https://backend.jotalloret.com/api/arboles',
        headers: {}
    };

    axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            setData(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });


    // function IrSeccion(){
    //     <a href="features_cuatro"></a>
    // }


    return (



        <div className="surface-0 flex justify-content-center">

            <React.Fragment>

                <div  >

                    <AppConfig />
                </div>
            </React.Fragment>

            <Toast ref={toast}/>

            <div id="home" className="landing-wrapper overflow-hidden">
                <div className="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static">
                    <Link href="/">
                        <a className="flex align-items-center">
                            <img src={`${contextPath}/layout/images/logo.svg`} alt="Sakai Logo" height="50" className="mr-0 lg:mr-2"/>
                            <span className="text-900 font-medium text-2xl line-height-3 mr-8">.</span>
                        </a>
                    </Link>
                    <StyleClass nodeRef={menuRef} selector="@next" enterClassName="hidden" leaveToClassName="hidden" hideOnOutsideClick="true">
                        <i ref={menuRef} className="pi pi-bars text-4xl cursor-pointer block lg:hidden text-700"></i>
                    </StyleClass>
                    <div className="align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style={{top: '100%'}}>
                        <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                            <li>
                                <a href="#home" className="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                    <span>Inicio</span>
                                </a>
                                <Ripple/>
                            </li>
                            <li>
                                <a href='#features_uno' className="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                    <span>1. REGÍSTRATE</span>
                                </a>
                                <Ripple/>
                            </li>
                            <li>
                                <a href="#features_dos" className="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                    <span>2. HAZ TUS PREDICCIONES</span>
                                </a>
                                <Ripple/>
                            </li>
                            {/*<li>*/}
                            {/*    <a href="#pricing" className="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">*/}
                            {/*        <span>Pricing</span>*/}
                            {/*    </a>*/}
                            {/*    <Ripple/>*/}
                            {/*</li>*/}
                        </ul>
                        <div className="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                            {/*<Button label="Login" className="p-button-text p-button-rounded border-none font-light line-height-2 text-blue-500"></Button>*/}
                            {/*<Button label="Register" className="p-button-rounded border-none ml-5 font-light line-height-2 bg-blue-500 text-white"></Button>*/}
                        </div>
                    </div>
                </div>

                <div
                    id="hero"
                    className="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden"
                    style={{backgroundRepeat: 'no-repeat!important', background: `url(${contextPath}/demo/images/landing/screen-3.png)`, clipPath: 'ellipse(150% 87% at 93% 13%)'}}>
                    <div className="mx-4 md:mx-8 mt-0 md:mt-4">
                        <h1 style={{color: 'skyblue!important'}} className="text-6xl font-bold text-gray-900 line-height-2">
                            <span style={{color: 'skyblue!important'}} className="font-light block">Participa</span>
                            en dos pasos.
                        </h1>
                        <p className="font-normal text-2xl line-height-3 md:mt-3 text-gray-700" style={{color: 'white!important'}}>Crea tu Polla online GRATIS para el Mundial de fútbol Qatar 2022 </p>
                        {/*<Button onClick={IrSeccion}  style={{backgroundColor: '#ff1d45!important'}} type="button" label="Conoce más" className="p-button-rounded text-xl border-none mt-3 bg-blue-500 font-normal line-height-3 px-3 text-white"></Button>*/}
                    </div>
                    <div className="flex justify-content-center md:justify-content-end">
                        <img src={`${contextPath}/demo/images/landing/screen-4.png`} alt="Hero Image" className="w-9 md:w-auto"/>
                    </div>

                </div>
                <div id="features_uno" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">

                    <div className="p-fluid formgrid grid justify-content-center">
                        <div className="col-12 text-center mt-8 mb-4">
                            <h2 className="text-900 font-normal mb-2">1. REGÍSTRATE</h2>
                            <span className="text-600 text-2xl">Crea tu cuenta.</span>
                        </div>

                        <div className="field col-12 md:col-3">

                        </div>

                        <div className="field col-12 md:col-3">

                            <h5>CÉDULA</h5>
                            <InputText type="text" className="p-inputtext-sm block mb-2" value={cedula} onChange={(e) => setCedula(e.target.value)}/>
                            <br></br>
                            <h5>TELÉFONO</h5>
                            <InputText type="text" className="p-inputtext-sm block mb-2" value={telefono} onChange={(e) => setTelefono(e.target.value)}/>

                        </div>

                        <div className="field col-12 md:col-3">

                        </div>

                    </div>

                </div>

                <div id="features_dos" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">

                    <div className="col-12 text-center mt-8 mb-4">
                        <h2 className="text-900 font-normal mb-2">2. HAZ TUS PREDICCIONES</h2>
                        <span className="text-600 text-2xl">Pronostica los resultados de los partidos.</span>
                    </div>

                    <div className="grid justify-content-center">

                        <span>CUARTOS-SEMIFINAL-FINAL-CAMPEÓN</span>

                    </div>
                    <br></br>
                    <br></br>

                    <div className="grid justify-content-center">


                        <div className="organizational-chart">


                            <ul>
                                <li>
                                    <label htmlFor="uno">4to</label>
                                    <InputText id="uno" style={{width: "100px", height: "20px"}} value={octavo1} onChange={(e) => setOctavo1(e.target.value)}/>

                                </li>
                                <li>
                                    <label htmlFor="dos">4to</label>
                                    <InputText id="dos" style={{width: "100px", height: "20px"}} value={octavo2} onChange={(e) => setOctavo2(e.target.value)}/>

                                </li>
                                <li>
                                    <label htmlFor="tres">4to</label>
                                    <InputText id="tres" style={{width: "100px", height: "20px"}} value={octavo3} onChange={(e) => setOctavo3(e.target.value)}/>

                                </li>
                                <li>
                                    <label htmlFor="cuatro">4to</label>
                                    <InputText id="cuatro" style={{width: "100px", height: "20px"}} value={octavo4} onChange={(e) => setOctavo4(e.target.value)}/>

                                </li>
                                <li>
                                    <label htmlFor="cinco">4to</label>
                                    <InputText id="cinco" style={{width: "100px", height: "20px"}} value={octavo5} onChange={(e) => setOctavo5(e.target.value)}/>

                                </li>
                                <li>
                                    <label htmlFor="seis">4to</label>
                                    <InputText id="seis" style={{width: "100px", height: "20px"}} value={octavo6} onChange={(e) => setOctavo6(e.target.value)}/>

                                </li>
                                <li>
                                    <label htmlFor="siete">4to</label>
                                    <InputText id="siete" style={{width: "100px", height: "20px"}} value={octavo7} onChange={(e) => setOctavo7(e.target.value)}/>

                                </li>
                                <li>
                                    <label htmlFor="ocho">4to</label>
                                    <InputText id="ocho" style={{width: "100px", height: "20px"}} value={octavo8} onChange={(e) => setOctavo8(e.target.value)}/>


                                </li>
                            </ul>

                            <ul>
                                <li>
                                    <label htmlFor="nueve">SFINAL</label>
                                    <InputText id="nueve" style={{width: "100px", height: "20px"}} value={cuarto1} onChange={(e) => setCuarto1(e.target.value)}/></li>
                                <li>
                                    <label htmlFor="diez">SFINAL</label>
                                    <InputText id="diez" style={{width: "100px", height: "20px"}} value={cuarto2} onChange={(e) => setCuarto2(e.target.value)}/></li>
                                <li>
                                    <label htmlFor="once">SFINAL</label>
                                    <InputText id="once" style={{width: "100px", height: "20px"}} value={cuarto3} onChange={(e) => setCuarto3(e.target.value)}/></li>
                                <li>
                                    <label htmlFor="doce">SFINAL</label>
                                    <InputText id="doce" style={{width: "100px", height: "20px"}} value={cuarto4} onChange={(e) => setCuarto4(e.target.value)}/></li>
                            </ul>

                            <ul>
                                <li>
                                    <label htmlFor="trece">FINAL</label>
                                    <InputText id="trece" style={{width: "100px", height: "20px"}} value={semifinal1} onChange={(e) => setSemiFinal1(e.target.value)}/></li>
                                <li>
                                    <label htmlFor="catorce">FINAL</label>
                                    <InputText id="catorce" style={{width: "100px", height: "20px"}} value={semifinal2} onChange={(e) => setSemifinal2(e.target.value)}/></li>
                            </ul>

                            <ul>

                                <li>
                                    <label htmlFor="quince">CAMPEÓN</label>
                                    <InputText id="quince" style={{width: "100px", height: "20px"}} value={final} onChange={(e) => setFinal(e.target.value)}/></li>
                            </ul>
                        </div>


                    </div>
                </div>

                <div id="features_tres" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">

                    <div className="p-fluid formgrid grid justify-content-center">

                        <div className="field-checkbox">
                            <Checkbox inputId="binary" checked={checked} onChange={e => setChecked(e.checked)}/>
                            <label htmlFor="binary">Términos y Condiciones</label>
                        </div>

                        <Button label="Finalizar" onClick={postData}/>

                    </div>

                </div>


                <div id="features_cuatro" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">

                    <div className="p-fluid formgrid grid justify-content-center">

                        <div className="col-9 text-center mb-4"
                        >

                            <img src={`${contextPath}/layout/images/tree-green.gif`} height="100" className="mt-4" alt="Company logo"/>
                            <br></br>
                            <span className="text-600 text-2xl">Contador de árboles:</span>
                            <p style={{fontSize: '50px!important;', color: 'white'}}><b style={{backgroundColor: "black", borderRadius: "10px", opacity: "0.7", padding: "5px"}}>{data.contador}</b></p>
                            <span className="text-600 text-2xl">Por cada participante en la polla mundialista se incrementa nuestra responsabilidad de sembrar más árboles.</span>
                        </div>

                    </div>
                    <div >
                        <img src={`${contextPath}/demo/images/landing/screen-2.png`} alt="Sakai Logo" height="50%" className="mr-0 lg:mr-2"/>

                        {/*<img src={{backgroundRepeat: 'no-repeat!important', background: `url(${contextPath}/demo/images/landing/screen-2.png)`}}/>*/}
                    </div>

                </div>

                <div id="features" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">


                    <div className="grid justify-content-center">

                        {/*<div className="col-12 text-center mt-8 mb-4">*/}
                        {/*    <h2 className="text-900 font-normal mb-2">Marvelous Features</h2>*/}
                        {/*    <span className="text-600 text-2xl">Placerat in egestas erat...</span>*/}
                        {/*</div>*/}

                        {/*<div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">*/}
                        {/*    <div*/}
                        {/*        style={{*/}
                        {/*            height: '160px',*/}
                        {/*            padding: '2px',*/}
                        {/*            borderRadius: '10px',*/}
                        {/*            background: 'linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))'*/}
                        {/*        }}>*/}
                        {/*        <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>*/}
                        {/*            <div className="flex align-items-center justify-content-center bg-yellow-200 mb-3" style={{width: '3.5rem', height: '3.5rem', borderRadius: '10px'}}>*/}
                        {/*                <i className="pi pi-fw pi-users text-2xl text-yellow-700"></i>*/}
                        {/*            </div>*/}
                        {/*            <h5 className="mb-2 text-900">Easy to Use</h5>*/}
                        {/*            <span className="text-600">Posuere morbi leo urna molestie.</span>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">*/}
                        {/*    <div*/}
                        {/*        style={{*/}
                        {/*            height: '160px',*/}
                        {/*            padding: '2px',*/}
                        {/*            borderRadius: '10px',*/}
                        {/*            background: 'linear-gradient(90deg, rgba(145,226,237,0.2),rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(172, 180, 223, 0.2))'*/}
                        {/*        }}>*/}
                        {/*        <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>*/}
                        {/*            <div className="flex align-items-center justify-content-center bg-cyan-200 mb-3" style={{width: '3.5rem', height: '3.5rem', borderRadius: '10px'}}>*/}
                        {/*                <i className="pi pi-fw pi-palette text-2xl text-cyan-700"></i>*/}
                        {/*            </div>*/}
                        {/*            <h5 className="mb-2 text-900">Fresh Design</h5>*/}
                        {/*            <span className="text-600">Semper risus in hendrerit.</span>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="col-12 md:col-12 lg:col-4 p-0 lg:pb-5 mt-4 lg:mt-0">*/}
                        {/*    <div*/}
                        {/*        style={{*/}
                        {/*            height: '160px',*/}
                        {/*            padding: '2px',*/}
                        {/*            borderRadius: '10px',*/}
                        {/*            background: 'linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(172, 180, 223, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(246, 158, 188, 0.2))'*/}
                        {/*        }}>*/}
                        {/*        <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>*/}
                        {/*            <div className="flex align-items-center justify-content-center bg-indigo-200" style={{width: '3.5rem', height: '3.5rem', borderRadius: '10px'}}>*/}
                        {/*                <i className="pi pi-fw pi-map text-2xl text-indigo-700"></i>*/}
                        {/*            </div>*/}
                        {/*            <h5 className="mb-2 text-900">Well Documented</h5>*/}
                        {/*            <span className="text-600">Non arcu risus quis varius quam quisque.</span>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">*/}
                        {/*    <div*/}
                        {/*        style={{*/}
                        {/*            height: '160px',*/}
                        {/*            padding: '2px',*/}
                        {/*            borderRadius: '10px',*/}
                        {/*            background: 'linear-gradient(90deg, rgba(187, 199, 205, 0.2),rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2),rgba(145, 210, 204, 0.2))'*/}
                        {/*        }}>*/}
                        {/*        <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>*/}
                        {/*            <div className="flex align-items-center justify-content-center bg-bluegray-200 mb-3" style={{width: '3.5rem', height: '3.5rem', borderRadius: '10px'}}>*/}
                        {/*                <i className="pi pi-fw pi-id-card text-2xl text-bluegray-700"></i>*/}
                        {/*            </div>*/}
                        {/*            <h5 className="mb-2 text-900">Responsive Layout</h5>*/}
                        {/*            <span className="text-600">Nulla malesuada pellentesque elit.</span>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">*/}
                        {/*    <div*/}
                        {/*        style={{*/}
                        {/*            height: '160px',*/}
                        {/*            padding: '2px',*/}
                        {/*            borderRadius: '10px',*/}
                        {/*            background: 'linear-gradient(90deg, rgba(187, 199, 205, 0.2),rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(145, 226, 237, 0.2),rgba(160, 210, 250, 0.2))'*/}
                        {/*        }}>*/}
                        {/*        <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>*/}
                        {/*            <div className="flex align-items-center justify-content-center bg-orange-200 mb-3" style={{width: '3.5rem', height: '3.5rem', borderRadius: '10px'}}>*/}
                        {/*                <i className="pi pi-fw pi-star text-2xl text-orange-700"></i>*/}
                        {/*            </div>*/}
                        {/*            <h5 className="mb-2 text-900">Clean Code</h5>*/}
                        {/*            <span className="text-600">Condimentum lacinia quis vel eros.</span>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="col-12 md:col-12 lg:col-4 p-0 lg:pb-5 mt-4 lg:mt-0">*/}
                        {/*    <div*/}
                        {/*        style={{*/}
                        {/*            height: '160px',*/}
                        {/*            padding: '2px',*/}
                        {/*            borderRadius: '10px',*/}
                        {/*            background: 'linear-gradient(90deg, rgba(251, 199, 145, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(212, 162, 221, 0.2))'*/}
                        {/*        }}>*/}
                        {/*        <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>*/}
                        {/*            <div className="flex align-items-center justify-content-center bg-pink-200 mb-3" style={{width: '3.5rem', height: '3.5rem', borderRadius: '10px'}}>*/}
                        {/*                <i className="pi pi-fw pi-moon text-2xl text-pink-700"></i>*/}
                        {/*            </div>*/}
                        {/*            <h5 className="mb-2 text-900">Dark Mode</h5>*/}
                        {/*            <span className="text-600">Convallis tellus id interdum velit laoreet.</span>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 mt-4 lg:mt-0">*/}
                        {/*    <div*/}
                        {/*        style={{*/}
                        {/*            height: '160px',*/}
                        {/*            padding: '2px',*/}
                        {/*            borderRadius: '10px',*/}
                        {/*            background: 'linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(160, 210, 250, 0.2)), linear-gradient(180deg, rgba(187, 199, 205, 0.2), rgba(145, 210, 204, 0.2))'*/}
                        {/*        }}>*/}
                        {/*        <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>*/}
                        {/*            <div className="flex align-items-center justify-content-center bg-teal-200 mb-3" style={{width: '3.5rem', height: '3.5rem', borderRadius: '10px'}}>*/}
                        {/*                <i className="pi pi-fw pi-shopping-cart text-2xl text-teal-700"></i>*/}
                        {/*            </div>*/}
                        {/*            <h5 className="mb-2 text-900">Ready to Use</h5>*/}
                        {/*            <span className="text-600">Mauris sit amet massa vitae.</span>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 mt-4 lg:mt-0">*/}
                        {/*    <div*/}
                        {/*        style={{*/}
                        {/*            height: '160px',*/}
                        {/*            padding: '2px',*/}
                        {/*            borderRadius: '10px',*/}
                        {/*            background: 'linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(251, 199, 145, 0.2), rgba(160, 210, 250, 0.2))'*/}
                        {/*        }}>*/}
                        {/*        <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>*/}
                        {/*            <div className="flex align-items-center justify-content-center bg-blue-200 mb-3" style={{width: '3.5rem', height: '3.5rem', borderRadius: '10px'}}>*/}
                        {/*                <i className="pi pi-fw pi-globe text-2xl text-blue-700"></i>*/}
                        {/*            </div>*/}
                        {/*            <h5 className="mb-2 text-900">Modern Practices</h5>*/}
                        {/*            <span className="text-600">Elementum nibh tellus molestie nunc non.</span>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="col-12 md:col-12 lg:col-4 p-0 lg-4 mt-4 lg:mt-0">*/}
                        {/*    <div*/}
                        {/*        style={{*/}
                        {/*            height: '160px',*/}
                        {/*            padding: '2px',*/}
                        {/*            borderRadius: '10px',*/}
                        {/*            background: 'linear-gradient(90deg, rgba(160, 210, 250, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(246, 158, 188, 0.2), rgba(212, 162, 221, 0.2))'*/}
                        {/*        }}>*/}
                        {/*        <div className="p-3 surface-card h-full" style={{borderRadius: '8px'}}>*/}
                        {/*            <div className="flex align-items-center justify-content-center bg-purple-200 mb-3" style={{width: '3.5rem', height: '3.5rem', borderRadius: '10px'}}>*/}
                        {/*                <i className="pi pi-fw pi-eye text-2xl text-purple-700"></i>*/}
                        {/*            </div>*/}
                        {/*            <h5 className="mb-2 text-900">Privacy</h5>*/}
                        {/*            <span className="text-600">Neque egestas congue quisque.</span>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div
                            className="col-12 mt-8 mb-8 p-2 md:p-8"
                            style={{borderRadius: '20px', background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EFE1AF 0%, #C3DCFA 100%)'}}>
                            <div className="flex flex-column justify-content-center align-items-center text-center px-3 py-3 md:py-0">
                                <h3 className="text-gray-900 mb-2">Contáctanos</h3>
                                <span className="text-gray-600 text-2xl">JOTALLORET</span>
                                <p className="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-4" style={{maxWidth: '800px'}}>
                                    “Para más información sobre cómo jugar o crear tu polla futbolera contáctanos por Facebook o correo electrónico.”
                                </p>
                                <img src={`${contextPath}/layout/images/logo.svg`} height="100" className="mt-4" alt="Company logo"/>
                            </div>
                        </div>
                    </div>
                </div>

                {/*<div id="highlights" className="py-4 px-4 lg:px-8 mx-0 my-6 lg:mx-8">*/}
                {/*    <div className="text-center">*/}
                {/*        <h2 className="text-900 font-normal mb-2">Powerful Everywhere</h2>*/}
                {/*        <span className="text-600 text-2xl">Amet consectetur adipiscing elit...</span>*/}
                {/*    </div>*/}

                {/*    <div className="grid mt-8 pb-2 md:pb-8">*/}
                {/*        <div className="flex justify-content-center col-12 lg:col-6 bg-purple-100 p-0 flex-order-1 lg:flex-order-0" style={{borderRadius: '8px'}}>*/}
                {/*            <img src={`${contextPath}/demo/images/landing/mockup.svg`} className="w-11" alt="mockup mobile"/>*/}
                {/*        </div>*/}

                {/*        <div className="col-12 lg:col-6 my-auto flex flex-column lg:align-items-end text-center lg:text-right">*/}
                {/*            <div className="flex align-items-center justify-content-center bg-purple-200 align-self-center lg:align-self-end" style={{width: '4.2rem', height: '4.2rem', borderRadius: '10px'}}>*/}
                {/*                <i className="pi pi-fw pi-mobile text-5xl text-purple-700"></i>*/}
                {/*            </div>*/}
                {/*            <h2 className="line-height-1 text-900 text-4xl font-normal">Congue Quisque Egestas</h2>*/}
                {/*            <span className="text-700 text-2xl line-height-3 ml-0 md:ml-2" style={{maxWidth: '650px'}}>*/}
                {/*                Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Eget aliquet nibh praesent tristique magna sit amet purus gravida. Sit amet mattis vulputate enim nulla aliquet.*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className="grid my-8 pt-2 md:pt-8">*/}
                {/*        <div className="col-12 lg:col-6 my-auto flex flex-column text-center lg:text-left lg:align-items-start">*/}
                {/*            <div className="flex align-items-center justify-content-center bg-yellow-200 align-self-center lg:align-self-start" style={{width: '4.2rem', height: '4.2rem', borderRadius: '10px'}}>*/}
                {/*                <i className="pi pi-fw pi-desktop text-5xl text-yellow-700"></i>*/}
                {/*            </div>*/}
                {/*            <h2 className="line-height-1 text-900 text-4xl font-normal">Celerisque Eu Ultrices</h2>*/}
                {/*            <span className="text-700 text-2xl line-height-3 mr-0 md:mr-2" style={{maxWidth: '650px'}}>*/}
                {/*                Adipiscing commodo elit at imperdiet dui. Viverra nibh cras pulvinar mattis nunc sed blandit libero. Suspendisse in est ante in. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi.*/}
                {/*            </span>*/}
                {/*        </div>*/}

                {/*        <div className="flex justify-content-end flex-order-1 sm:flex-order-2 col-12 lg:col-6 bg-yellow-100 p-0" style={{borderRadius: '8px'}}>*/}
                {/*            <img src={`${contextPath}/demo/images/landing/mockup-desktop.svg`} className="w-11" alt="mockup"/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div id="pricing" className="py-4 px-4 lg:px-8 my-2 md:my-4">*/}
                {/*    <div className="text-center">*/}
                {/*        <h2 className="text-900 font-normal mb-2">Matchless Pricing</h2>*/}
                {/*        <span className="text-600 text-2xl">Amet consectetur adipiscing elit...</span>*/}
                {/*    </div>*/}

                {/*    <div className="grid justify-content-between mt-8 md:mt-0">*/}
                {/*        <div className="col-12 lg:col-4 p-0 md:p-3">*/}
                {/*            <div className="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all">*/}
                {/*                <h3 className="text-900 text-center my-5">Free</h3>*/}
                {/*                <img src={`${contextPath}/demo/images/landing/free.svg`} className="w-10 h-10 mx-auto" alt="free"/>*/}
                {/*                <div className="my-5 text-center">*/}
                {/*                    <span className="text-5xl font-bold mr-2 text-900">$0</span>*/}
                {/*                    <span className="text-600">per month</span>*/}
                {/*                    <Button label="Get Started" className="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-blue-500 text-white"></Button>*/}
                {/*                </div>*/}
                {/*                <Divider className="w-full bg-surface-200"></Divider>*/}
                {/*                <ul className="my-5 list-none p-0 flex text-900 flex-column">*/}
                {/*                    <li className="py-2">*/}
                {/*                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>*/}
                {/*                        <span className="text-xl line-height-3">Responsive Layout</span>*/}
                {/*                    </li>*/}
                {/*                    <li className="py-2">*/}
                {/*                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>*/}
                {/*                        <span className="text-xl line-height-3">Unlimited Push Messages</span>*/}
                {/*                    </li>*/}
                {/*                    <li className="py-2">*/}
                {/*                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>*/}
                {/*                        <span className="text-xl line-height-3">50 Support Ticket</span>*/}
                {/*                    </li>*/}
                {/*                    <li className="py-2">*/}
                {/*                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>*/}
                {/*                        <span className="text-xl line-height-3">Free Shipping</span>*/}
                {/*                    </li>*/}
                {/*                </ul>*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <div className="col-12 lg:col-4 p-0 md:p-3 mt-4 md:mt-0">*/}
                {/*            <div className="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all">*/}
                {/*                <h3 className="text-900 text-center my-5">Startup</h3>*/}
                {/*                <img src={`${contextPath}/demo/images/landing/startup.svg`} className="w-10 h-10 mx-auto" alt="startup"/>*/}
                {/*                <div className="my-5 text-center">*/}
                {/*                    <span className="text-5xl font-bold mr-2 text-900">$1</span>*/}
                {/*                    <span className="text-600">per month</span>*/}
                {/*                    <Button label="Try Free" className="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-blue-500 text-white"></Button>*/}
                {/*                </div>*/}
                {/*                <Divider className="w-full bg-surface-200"></Divider>*/}
                {/*                <ul className="my-5 list-none p-0 flex text-900 flex-column">*/}
                {/*                    <li className="py-2">*/}
                {/*                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>*/}
                {/*                        <span className="text-xl line-height-3">Responsive Layout</span>*/}
                {/*                    </li>*/}
                {/*                    <li className="py-2">*/}
                {/*                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>*/}
                {/*                        <span className="text-xl line-height-3">Unlimited Push Messages</span>*/}
                {/*                    </li>*/}
                {/*                    <li className="py-2">*/}
                {/*                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>*/}
                {/*                        <span className="text-xl line-height-3">50 Support Ticket</span>*/}
                {/*                    </li>*/}
                {/*                    <li className="py-2">*/}
                {/*                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>*/}
                {/*                        <span className="text-xl line-height-3">Free Shipping</span>*/}
                {/*                    </li>*/}
                {/*                </ul>*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <div className="col-12 lg:col-4 p-0 md:p-3 mt-4 md:mt-0">*/}
                {/*            <div className="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all">*/}
                {/*                <h3 className="text-900 text-center my-5">Enterprise</h3>*/}
                {/*                <img src={`${contextPath}/demo/images/landing/enterprise.svg`} className="w-10 h-10 mx-auto" alt="enterprise"/>*/}
                {/*                <div className="my-5 text-center">*/}
                {/*                    <span className="text-5xl font-bold mr-2 text-900">$999</span>*/}
                {/*                    <span className="text-600">per month</span>*/}
                {/*                    <Button label="Get a Quote" className="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-blue-500 text-white"></Button>*/}
                {/*                </div>*/}
                {/*                <Divider className="w-full bg-surface-200"></Divider>*/}
                {/*                <ul className="my-5 list-none p-0 flex text-900 flex-column">*/}
                {/*                    <li className="py-2">*/}
                {/*                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>*/}
                {/*                        <span className="text-xl line-height-3">Responsive Layout</span>*/}
                {/*                    </li>*/}
                {/*                    <li className="py-2">*/}
                {/*                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>*/}
                {/*                        <span className="text-xl line-height-3">Unlimited Push Messages</span>*/}
                {/*                    </li>*/}
                {/*                    <li className="py-2">*/}
                {/*                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>*/}
                {/*                        <span className="text-xl line-height-3">50 Support Ticket</span>*/}
                {/*                    </li>*/}
                {/*                    <li className="py-2">*/}
                {/*                        <i className="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>*/}
                {/*                        <span className="text-xl line-height-3">Free Shipping</span>*/}
                {/*                    </li>*/}
                {/*                </ul>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="py-4 px-4 mx-0 mt-8 lg:mx-8">
                    <div className="grid justify-content-between">
                        <div className="col-12 md:col-2" style={{marginTop: '-1.5rem'}}>
                            <Link href="/">
                                <a className="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
                                    <img src={`${contextPath}/layout/images/logo.svg`} alt="footer sections" height="100" className="mr-2"/>
                                    {/*<span className="font-medium text-3xl text-900">JOTALLORET</span>*/}
                                </a>
                            </Link>
                        </div>

                        <div className="col-12 md:col-10 lg:col-7">
                            <div className="grid text-center md:text-left">
                                <div className="col-12 md:col-3">
                                    <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">Compañía</h4>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Sobre nosotros</a>
                                    {/*<a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">News</a>*/}
                                    {/*<a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Investor Relations</a>*/}
                                    {/*<a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Careers</a>*/}
                                    {/*<a className="line-height-3 text-xl block cursor-pointer text-700">Media Kit</a>*/}
                                </div>

                                {/*<div className="col-12 md:col-3 mt-4 md:mt-0">*/}
                                {/*    <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">Resources</h4>*/}
                                {/*    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Get Started</a>*/}
                                {/*    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Learn</a>*/}
                                {/*    <a className="line-height-3 text-xl block cursor-pointer text-700">Case Studies</a>*/}
                                {/*</div>*/}

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">Comunidad</h4>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Facebook</a>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                                        Instagram
                                        <img src={`${contextPath}/demo/images/landing/new-badge.svg`} className="ml-2"/>
                                    </a>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Twitter</a>
                                    <a className="line-height-3 text-xl block cursor-pointer text-700">WhatsApp</a>
                                </div>

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <h4 className="font-medium text-2xl line-height-3 mb-3 text-900">Legal</h4>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Política de marca</a>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Política de privacidad</a>
                                    <a className="line-height-3 text-xl block cursor-pointer text-700">Términos de servicio</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LandingPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple/>
        </React.Fragment>
    );
};

export default LandingPage;
