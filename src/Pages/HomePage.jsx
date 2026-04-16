import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from "react-router-dom";
import csetliLogo from "../kepek/csetli.png";
import "../style/style.css"
import useLanguage from "../language";


export default function HomePage() {
    const navigate = useNavigate();

    const [lang, setLang] = useState(useLanguage(1))

    useEffect(() => {
        // a localstorage-et beolvassuk
        const language = JSON.parse(localStorage.getItem("language")) || { lang: "0" }
        setLang(useLanguage(language.lang))
        console.log(lang.username);
    }, [])

    const [theme, setTheme] = useState("dark");


    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
        document.body.className = savedTheme;
    }, []);


    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.body.className = newTheme;
    };

    return (

        <div className="d-flex vh-100 justify-content-center align-items-center p-3 background">


            <button onClick={toggleTheme} className="theme-btn position-absolute top-0 end-0 m-3">
                {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <div className="text-center">
                <div>
                    {/* Az 'img-fluid' osztály automatikusan átméretezi mobilon */}
                    <img src={csetliLogo} alt="csetliLogo" className="img-fluid" style={{ maxWidth: "400px" }} />
                </div>

                {/* A gombok/linkek jöhetnek alá szépen */}
                <div className="mt-4 d-flex flex-column gap-3">
                    <Link to="/registration" className="text-decoration-none csetliColor fs-4">{lang.registration}</Link>
                    <Link to="/login" className="text-decoration-none csetliColor fs-4">{lang.login}</Link>
                    <Link to="/about" className="text-decoration-none csetliColor fs-4">{lang.abautus}</Link>
                </div>
            </div>
        </div>
    )
}        