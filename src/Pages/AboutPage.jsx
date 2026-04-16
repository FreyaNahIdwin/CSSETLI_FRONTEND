import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import csetliLogo from "../kepek/csetli.png";
import theme from "../kepek/sun.png";
import "../style/style.css"
import Language from "../Components/Lanugage";
import useLanguage from "../language"

export default function AboutusPage() {
    // const navigate = useNavigate();

    const [lang, setLang]= useState(useLanguage(1))

    useEffect(()=>{
        // a localstorage-et beolvassuk
        const language = JSON.parse(localStorage.getItem("language")) || {lang: "0"}
        setLang(useLanguage(language.lang))
        console.log(lang.username);
    },[])

    return (
        <div className="background min-vh-100 d-flex flex-column">
            {/* FELSŐ SZEKCIÓ: Nyelvválasztó */}
            <div className="container-fluid p-3">
                <div className="d-flex justify-content-end align-items-center ">
                    <Language />
                </div>
            </div>

            {/* KÖZÉPSŐ TARTALOM */}
            <div className="container flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center px-4">
                
                {/* Logó: Mobilon kisebb, asztali gépen nagyobb */}
                <div className="mb-4 logo-container">
                    <img src={csetliLogo} alt="CsetliLogo" className="img-fluid" style={{ maxHeight: "100px" }} />
                </div>

                {/* Szöveges tartalom */}
                <div className="about-text-wrapper">
                    <h1 className="text-white display-5 mb-4">{lang.abautus}</h1>
                    
                    {/* Itt egy példa, ha több szöveged lenne, így tördeli szépen */}
                    <p className="text-white-50 fs-5 mb-4" style={{ maxWidth: "700px" }}>
                        {lang.abot}
                    </p>
                </div>

                {/* Vissza gomb */}
                <div className="mt-4">
                    <Link to="/" className="csetliColor text-decoration-none fs-2">
                        {lang.backtohome}
                    </Link>
                </div>
            </div>
        </div>
    )
}
