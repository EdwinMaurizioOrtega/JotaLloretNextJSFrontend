import React, {useContext, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import getConfig from 'next/config';
import {StyleClass} from 'primereact/styleclass';
import {Button} from 'primereact/button';
import {Ripple} from 'primereact/ripple';
import {Divider} from 'primereact/divider';
// import AppConfig from '../../layout/AppConfig';
import {LayoutContext} from '../../layout/context/layoutcontext';
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";

import {Toast} from 'primereact/toast';
import Head from "next/head";
import AppTopbar from "../../layout/AppTopbar";
import AppSidebar from "../../layout/AppSidebar";
import AppFooter from "../../layout/AppFooter";
import {Galleria} from "primereact/galleria";
import {PhotoService} from "../../demo/service/PhotoService";

var axios = require('axios');


const LandingPage = () => {
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const {layoutConfig} = useContext(LayoutContext);
    const menuRef = useRef();

    const [cedula, setCedula] = useState('');
    // console.log(cedula);
    const [telefono, setTelefono] = useState('');

    // const [octavo1, setOctavo1] = useState('');
    // // console.log(octavo1);
    // const [octavo2, setOctavo2] = useState('');
    // const [octavo3, setOctavo3] = useState('');
    // const [octavo4, setOctavo4] = useState('');
    // const [octavo5, setOctavo5] = useState('');
    // const [octavo6, setOctavo6] = useState('');
    // const [octavo7, setOctavo7] = useState('');
    // const [octavo8, setOctavo8] = useState('');

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
        if (cedula != "" && telefono != "" && cuarto1 != "" && final != "" && checked == true) {


            var axios = require('axios');
            var data = JSON.stringify({
                "fechaCreacion": fecha,
                "cedula": cedula,
                "telefono": telefono,
                // "octavo1": octavo1,
                // "octavo2": octavo2,
                // "octavo3": octavo3,
                // "octavo4": octavo4,
                // "octavo5": octavo5,
                // "octavo6": octavo6,
                // "octavo7": octavo7,
                // "octavo8": octavo8,
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
            // setOctavo1('')
            // setOctavo2('')
            // setOctavo3('')
            // setOctavo4('')
            // setOctavo5('')
            // setOctavo6('')
            // setOctavo7('')
            // setOctavo8('')

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

    const showSuccess = () => {
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


    const [images, setImages] = useState(null);
    const [images2, setImages2] = useState(null);

    const galleriaService = new PhotoService();

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    useEffect(() => {
        galleriaService.getImages().then(data => {
            setImages(data);
            setImages2(data.slice(0, 5))
        })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{width: '100%', display: 'block'}}/>;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{width: '100%', display: 'block'}}/>
    }

    const indicatorTemplate = (index) => {
        return (
            <span className="indicator-text">
                {index + 1}
            </span>
        )
    }


    return (


        <div className="surface-0 flex justify-content-center">

            {/*<React.Fragment>*/}

            {/*    <div  >*/}

            {/*        /!*<AppConfig />*!/*/}
            {/*    </div>*/}
            {/*</React.Fragment>*/}

            <Toast ref={toast}/>

            <div id="home" className="landing-wrapper overflow-hidden">
                <div className="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static">
                    <Link href="/">
                        <a className="flex align-items-center">
                            <img src={`${contextPath}/demo/images/landing/logo.png`} alt="Sakai Logo" height="50" className="mr-0 lg:mr-2"/>
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
                                    <span style={{color: '#01A0C6!important'}}>Inicio</span>
                                </a>
                                <Ripple/>
                            </li>
                            <li>
                                <a href='#features_uno' className="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                    <span style={{color: '#01A0C6!important'}}>1. REGÍSTRATE</span>
                                </a>
                                <Ripple/>
                            </li>
                            <li>
                                <a href="#features_dos" className="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                    <span style={{color: '#01A0C6!important'}}>2. HAZ TUS PREDICCIONES</span>
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
                    style={{background: `url(${contextPath}/demo/images/landing/screen-3.png) no-repeat fixed center`, clipPath: 'ellipse(150% 87% at 93% 13%)'}}>
                    <div className="mx-4 md:mx-8 mt-0 md:mt-4">
                        <h1 style={{color: 'transparent!important'}} className="text-6xl font-bold text-gray-900 line-height-2">
                            <span style={{color: 'transparent!important'}} className="font-light block">Participa</span>
                            en dos pasos.
                        </h1>
                        <p className="font-normal text-2xl line-height-3 md:mt-3 text-gray-700" style={{color: 'transparent!important'}}>Crea tu Polla online GRATIS para el Mundial de fútbol Qatar 2022 </p>
                        <p className="font-normal text-2xl line-height-3 md:mt-3 text-gray-700" style={{color: 'transparent!important'}}>Crea tu Polla online GRATIS para el Mundial de fútbol Qatar 2022 </p>
                        <p className="font-normal text-2xl line-height-3 md:mt-3 text-gray-700" style={{color: 'transparent!important'}}>Crea tu Polla online GRATIS para el Mundial de fútbol Qatar 2022 </p>
                        {/*<Button onClick={IrSeccion}  style={{backgroundColor: '#ff1d45!important'}} type="button" label="Conoce más" className="p-button-rounded text-xl border-none mt-3 bg-blue-500 font-normal line-height-3 px-3 text-white"></Button>*/}
                    </div>
                    <div id="features_go" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">

                        <div className="grid justify-content-center">

                            <div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                                <div
                                    className="col-12 text-center mt-8 mb-4">
                                    <img src={`${contextPath}/demo/images/landing/screen-4.png`} alt="Hero Image" className="w-9 md:w-auto"/>

                                </div>
                            </div>
                            <div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                                <div
                                    className=" col-12 text-center mt-8 mb-4">
                                    <img src={`${contextPath}/demo/images/landing/screen-5.png`} alt="Hero Image" className="w-9 md:w-auto"/>

                                </div>
                            </div>

                            <div className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                                <div
                                    className=" col-12 text-center mt-8 mb-4">
                                    <img src={`${contextPath}/demo/images/landing/screen-6.png`} alt="Hero Image" className="w-9 md:w-auto"/>

                                </div>
                            </div>


                        </div>


                    </div>

                </div>
                <div id="features_uno" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">

                    <div className="p-fluid formgrid grid justify-content-center"
                         style={{borderStyle: 'solid', borderColor: '#01A0C6!important', borderRadius: '20px!important'}}>

                        <div className="col-12 text-center mb-4" style={{padding: 'unset!important'}}>
                            <h2 className="text-900 font-normal mb-2" style={{backgroundColor: '#01A0C6!important', borderRadius: '20px 20px 0px 0px'}}>1. REGÍSTRATE</h2>
                            <span className="text-600 text-2xl">Crea tu cuenta.</span>
                        </div>


                        <div className="field col-12 md:col-4">

                            <h5>CÉDULA</h5>
                            <InputText type="text" className="p-inputtext-sm block mb-2" value={cedula} onChange={(e) => setCedula(e.target.value)}/>
                            <br></br>
                            <h5>TELÉFONO</h5>
                            <InputText type="text" className="p-inputtext-sm block mb-2" value={telefono} onChange={(e) => setTelefono(e.target.value)}/>

                        </div>


                    </div>

                </div>

                <div id="features_dos" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">

                    <div className="" style={{borderStyle: 'solid', borderColor: '#01A0C6!important', borderRadius: '20px!important'}}>

                        <div className="col-12 text-center mb-4" style={{padding: 'unset!important'}}>
                            <h2 className="text-900 font-normal mb-2" style={{backgroundColor: '#01A0C6!important', borderRadius: '20px 20px 0px 0px'}}>2. HAZ TUS PREDICCIONES</h2>
                            <span className="text-600 text-2xl">Pronostica los resultados de los partidos.</span>
                        </div>

                        <div className="grid justify-content-center">

                            <span>CUARTOS-SEMIFINAL-FINAL-CAMPEÓN</span>

                        </div>
                        <br></br>
                        <br></br>

                        <div className="grid justify-content-center">


                            <div className="organizational-chart">


                                {/*<ul>*/}
                                {/*    <li>*/}
                                {/*        <label htmlFor="uno">4to</label>*/}
                                {/*        <InputText id="uno" style={{width: "100px", height: "20px"}} value={octavo1} onChange={(e) => setOctavo1(e.target.value)}/>*/}

                                {/*    </li>*/}
                                {/*    <li>*/}
                                {/*        <label htmlFor="dos">4to</label>*/}
                                {/*        <InputText id="dos" style={{width: "100px", height: "20px"}} value={octavo2} onChange={(e) => setOctavo2(e.target.value)}/>*/}

                                {/*    </li>*/}
                                {/*    <li>*/}
                                {/*        <label htmlFor="tres">4to</label>*/}
                                {/*        <InputText id="tres" style={{width: "100px", height: "20px"}} value={octavo3} onChange={(e) => setOctavo3(e.target.value)}/>*/}

                                {/*    </li>*/}
                                {/*    <li>*/}
                                {/*        <label htmlFor="cuatro">4to</label>*/}
                                {/*        <InputText id="cuatro" style={{width: "100px", height: "20px"}} value={octavo4} onChange={(e) => setOctavo4(e.target.value)}/>*/}

                                {/*    </li>*/}
                                {/*    <li>*/}
                                {/*        <label htmlFor="cinco">4to</label>*/}
                                {/*        <InputText id="cinco" style={{width: "100px", height: "20px"}} value={octavo5} onChange={(e) => setOctavo5(e.target.value)}/>*/}

                                {/*    </li>*/}
                                {/*    <li>*/}
                                {/*        <label htmlFor="seis">4to</label>*/}
                                {/*        <InputText id="seis" style={{width: "100px", height: "20px"}} value={octavo6} onChange={(e) => setOctavo6(e.target.value)}/>*/}

                                {/*    </li>*/}
                                {/*    <li>*/}
                                {/*        <label htmlFor="siete">4to</label>*/}
                                {/*        <InputText id="siete" style={{width: "100px", height: "20px"}} value={octavo7} onChange={(e) => setOctavo7(e.target.value)}/>*/}

                                {/*    </li>*/}
                                {/*    <li>*/}
                                {/*        <label htmlFor="ocho">4to</label>*/}
                                {/*        <InputText id="ocho" style={{width: "100px", height: "20px"}} value={octavo8} onChange={(e) => setOctavo8(e.target.value)}/>*/}


                                {/*    </li>*/}
                                {/*</ul>*/}

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

                        <div id="features_tres" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">

                            <div className="p-fluid formgrid grid justify-content-center">

                                <div className="field-checkbox">
                                    <Checkbox inputId="binary" checked={checked} onChange={e => setChecked(e.checked)}/>
                                    <label htmlFor="binary">Términos y Condiciones</label>
                                </div>

                                <Button style={{backgroundColor: '#01A0C6!important', borderColor: 'black!important'}} label="FINALIZAR - PARTICIPAR" onClick={postData}/>

                            </div>

                        </div>


                    </div>

                </div>


                <div id="features_cuatro" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">

                    <div style={{borderStyle: 'solid', borderColor: '#01A0C6!important', borderRadius: '20px!important'}}>


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
                        <div>
                            {/*<img src={`${contextPath}/demo/images/landing/screen-2.png`} alt="Sakai Logo" height="50%" className="mr-0 lg:mr-2"/>*/}

                            <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} style={{maxWidth: '100%'}}
                                      showThumbnails={false} showIndicators showItemNavigators changeItemOnIndicatorHover showIndicatorsOnItem item={itemTemplate}/>

                            {/*<img src={{backgroundRepeat: 'no-repeat!important', background: `url(${contextPath}/demo/images/landing/screen-2.png)`}}/>*/}
                        </div>

                        <div className="grid justify-content-center" style={{borderRadius: '20px', backgroundColor: '#01A0C6!important'}}>

                            <div
                                className="col-12 mt-8 mb-8 p-2"
                            >
                                <div className="flex flex-column justify-content-center align-items-center text-center px-3 py-3 md:py-0">
                                    <h3 className="text-gray-900 mb-2" style={{color: 'white!important'}}>Contáctanos</h3>
                                    {/*<span className="text-gray-600 text-2xl" style={{color: 'white!important'}}>JOTALLORET</span>*/}
                                    <p className="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-4" style={{color: 'white!important', maxWidth: '800px'}}>
                                        “Para más información sobre cómo crear tu polla mundialista, contáctanos.”
                                    </p>
                                    <img src={`${contextPath}/demo/images/landing/facebook.png`} width="75" className="mt-4" alt="Company logo"/>
                                    <a className="text-700" style={{color: 'white!important'}}>@lospanasdeljota</a>

                                    <img src={`${contextPath}/demo/images/landing/mail.png`} width="75" className="mt-4" alt="Company logo"/>
                                    <a className="text-700" style={{color: 'white!important'}}>lospanasdeljota@gmail.com</a>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

                <div className="py-4 px-4 mx-0 mt-8 lg:mx-12" style={{backgroundColor: '#01A0C6!important'}}>
                    <div className="grid justify-content-between">
                        <div className="col-12 md:col-2" style={{marginTop: '-1.5rem'}}>
                            <Link href="/">
                                <a className="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
                                    <img src={`${contextPath}/demo/images/landing/logo-1.png`} alt="footer sections" height="100" className="mr-2"/>
                                </a>
                            </Link>
                        </div>

                        <div className="col-12 md:col-10 lg:col-7">
                            <div className="grid text-center md:text-left">
                                {/*<div className="col-12 md:col-3">*/}
                                {/*    <h4 className="font-medium text-2xl line-height-3 mb-3 text-900" style={{color: 'white!important'}}>Compañía</h4>*/}
                                {/*    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700" style={{color: 'white!important'}}>Sobre nosotros</a>*/}

                                {/*</div>*/}

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <h4 className="font-medium text-2xl line-height-3 mb-3 text-900" style={{color: 'white!important'}}>Legal</h4>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700" style={{color: 'white!important'}}>Política de marca</a>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700" style={{color: 'white!important'}}>Política de privacidad</a>
                                    <a className="line-height-3 text-xl block cursor-pointer text-700" style={{color: 'white!important'}}>Términos de servicio</a>
                                </div>


                                <div className="col-12 md:col-3 mt-4 md:mt-0">


                                    <h4 className="font-medium text-2xl line-height-3 mb-3 text-900" style={{color: 'white!important'}}>Comunidad </h4>


                                    <div className="field col-12 md:col-1">

                                        <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700" href="https://www.facebook.com/jotalloretv">
                                            <img src={`${contextPath}/demo/images/landing/facebook.png`} alt="footer sections" height="30" className="mr-2"/>
                                        </a>


                                        <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700" href="https://instagram.com/jotalloretv?igshid=YmMyMTA2M2Y=">
                                            <img src={`${contextPath}/demo/images/landing/instagram.png`} alt="footer sections" height="30" className="mr-2"/>
                                        </a>


                                        <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700" href="https://twitter.com/jotalloretv">
                                            <img src={`${contextPath}/demo/images/landing/twitter.png`} alt="footer sections" height="30" className="mr-2"/>
                                        </a>


                                        <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700" href="#">
                                            <img src={`${contextPath}/demo/images/landing/waspp.png`} alt="footer sections" height="30" className="mr-2"/>
                                        </a>


                                    </div>


                                </div>

                                {/*<div className="col-12 md:col-3 mt-4 md:mt-0">*/}
                                {/*    */}
                                {/*    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700" href="https://www.facebook.com/jotalloretv" style={{color: 'white!important'}}>*/}
                                {/*        <img src={`${contextPath}/demo/images/landing/logo-1.png`} alt="footer sections" height="100" className="mr-2"/>*/}

                                {/*    </a>*/}
                                {/*    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700" href="https://instagram.com/jotalloretv?igshid=YmMyMTA2M2Y=" style={{color: 'white!important'}}>*/}
                                {/*        <img src={`${contextPath}/demo/images/landing/logo-1.png`} alt="footer sections" height="100" className="mr-2"/>*/}
                                {/*    </a>*/}
                                {/*    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700" style={{color: 'white!important'}}>*/}
                                {/*        <img src={`${contextPath}/demo/images/landing/logo-1.png`} alt="footer sections" height="100" className="mr-2"/>*/}

                                {/*    </a>*/}
                                {/*    <a className="line-height-3 text-xl block cursor-pointer text-700" style={{color: 'white!important'}}>*/}
                                {/*        <img src={`${contextPath}/demo/images/landing/logo-1.png`} alt="footer sections" height="100" className="mr-2"/>*/}

                                {/*    </a>*/}
                                {/*</div>*/}

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
