import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import TextBox from "../Components/TextBox"
import Button from "../Components/Button"
import { regisztracio } from "../api";
import { Link, useNavigate } from "react-router-dom";
import csetliLogo from "../kepek/csetli.png";
import "../style/style.css"
import getLanguage from "../language"

export default function RegistrationPage() {

    const navigate = useNavigate()

    const [lang, setLang] = useState(getLanguage("1"))

    useEffect(() => {
        // a localstorage-et beolvassuk
        const language = JSON.parse(localStorage.getItem("language")) || { lang: "0" }
        setLang(getLanguage(language.lang))
    }, [])

    const [email, setEmail] = useState("");
    const [felhasználonev, setFelhasznalonev] = useState("");
    const [jelszo, setJelszo] = useState("");
    const [jelszo2, setJelszo2] = useState("");
    const [imagePreview, setImagePreview] = useState(null)
    const [file, setFile] = useState(null)


    const saveToPreview = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile))
        }
    }

    return (
        <div className="background min-vh-100 py-5"> {/* min-vh-100 jobb, mint a vh-100, ha görgetni kell */}
            <div className="container">
                <div className="row justify-content-center align-items-center g-4">

                    {/* LOGO RÉSZ */}
                    <div className="col-12 col-md-3 d-flex justify-content-center">
                        <div style={{ maxWidth: "200px" }}>
                            <img src={csetliLogo} alt="CsetliLogo" className="img-fluid" />
                        </div>
                    </div>

                    {/* REGISZTRÁCIÓS ŰRLAP */}
                    <div className="col-12 col-md-5 col-lg-4">
                        <div className="p-3 shadow-sm rounded bg-dark-custom"> {/* Opcionális háttér a jobb olvashatóságért */}
                            <div className="text-center fs-1 csetliColor mb-4">{lang.register}</div>
                            <TextBox title={lang.username} type={"text"} placeholder={lang.username} value={felhasználonev} setValue={setFelhasznalonev} />
                            <TextBox title={lang.email} type={"email"} placeholder={lang.email} value={email} setValue={setEmail} />
                            <TextBox title={lang.password} type={"password"} placeholder={"********"} value={jelszo} setValue={setJelszo} />
                            <TextBox title={lang.passwordagain} type={"password"} placeholder={"********"} value={jelszo2} setValue={setJelszo2} />

                            <div className="d-grid gap-2 mt-4"> {/* Teljes szélességű gomb mobilon */}
                                <Button content={lang.register} onClick={async () => {
                                    if (!email || !felhasználonev || !jelszo || !jelszo2) {
                                        return alert("Hiányos beviteli adat(ok)!")
                                    }
                                    if (jelszo !== jelszo2) {
                                        return alert("A jelszavak nem egyeznek")
                                    }
                                    if (!file) {
                                        return alert("Profilkép kiválasztása kötelező!")
                                    }
                                    // Itt érdemes összevonni a regisztrációt és a képfeltöltést egy kérésbe,
                                    // de a te logikádat követve:
                                    const res = await regisztracio(email, felhasználonev, jelszo, file)
                                    alert(res.message)
                                    if (res.result) {
                                        navigate("/")
                                    }
                                }} />
                            </div>

                            <div className="text-center mt-3">
                                <Link to="/login" className="csetliColor text-decoration-none d-block">{lang.haveaccount}</Link>
                                <Link to="/" className="csetliColor text-decoration-none d-block mt-2">{lang.backtohome}</Link>
                            </div>
                        </div>
                    </div>

                    {/* KÉPFELTÖLTÉS RÉSZ */}
                    <div className="col-12 col-md-4">
                        <div className="d-flex flex-column align-items-center">
                            <h3 className="mb-3 csetliColor text-center">Profilkép feltöltése</h3>
                            <div className="mb-3 profile-preview-container">
                                {imagePreview ? (
                                    <img src={imagePreview} className="profile-preview-img" alt="Preview" />
                                ) : (
                                    <div className="d-flex align-items-center h-100 justify-content-center text-secondary">Nincs kép</div>
                                )}
                            </div>
                            <input type="file" accept="image/*" className="form-control mb-3 w-75" onChange={saveToPreview} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
