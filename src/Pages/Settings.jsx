import Navbar from "../Components/Navbar";
import simplehaz from "../kepek/feketeHaz.svg"
import messages from "../kepek/feketeKomment.svg"
import settings from "../kepek/feketeSettings.svg"
import people from "../kepek/feketePeople.svg"
import useLanguage from "../language"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Language from "../Components/Lanugage";
import Button from "../Components/Button";
import TextBox from "../Components/TextBox";
import { kijelentkezes, felhasznalonevModositas, jelszoModositas, profilKepModositas, fiokom } from "../api";

export default function Settings() {
    const navigate = useNavigate();

    // Állapotok (States)
    const [lang, setLang] = useState(useLanguage(1));
    const [imagePreview, setImagePreview] = useState(null);
    const [file, setFile] = useState(null);
    const [ujfelhasznalonev, setujFelhasznalonev] = useState("");
    const [jelenlegiJelszo, setJelenlegiJelszo] = useState("");
    const [ujJelszo, setUjJelszo] = useState("");
    const [ujProfilkep, setUjProfilkep] = useState("");
    

    useEffect(() => {
        const language = JSON.parse(localStorage.getItem("language")) || { lang: "0" };
        setLang(useLanguage(language.lang));
    }, []);

    // Képkezelő függvény
    const saveToPreview = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile));
        }
    };

     const uploadImg = async () => {
            if (!file) {
                alert('Nincs kiválasztva kép')
                return
            }
            const data = await profilKepModositas(file)
            alert(data.message)
        }

    return (
        <div className="background min-vh-100 p-3 pt-5 p-md-5">
            <Navbar homeI={simplehaz} messagesI={messages} peopleI={people} settingsI={settings} />

            <div className="container mt-5 csetliColor text-center fw-bold">
                <div className="row g-4 justify-content-center">

                    {/* BAL OLDAL: Név és Nyelv */}
                    <div className="col-12 col-md-5">
                        <TextBox title={lang.settingsUserString} setValue={setujFelhasznalonev} />
                        <Button content={lang.button} onClick={() => {
                            (async () => {
                                const res = await felhasznalonevModositas(ujfelhasznalonev);
                                alert(res.message)
                            })()
                        }} />
                        <div className="mt-4">
                            <h2>{lang.setLangChange}</h2>
                            <div className="d-flex justify-content-center">
                                <Language />
                            </div>
                        </div>
                    </div>

                    {/* JOBB OLDAL: Jelszavak */}
                    <div className="col-12 col-md-5">
                        <TextBox title={lang.pw} type="password" setValue={setJelenlegiJelszo} />
                        <TextBox title={lang.pw1} type="password" setValue={setUjJelszo} />
                        <TextBox title={lang.pw1} type="password" setValue={setUjJelszo} />
                        <Button content={lang.button} onClick={() => {
                            (async () => {
                                const res = await jelszoModositas(jelenlegiJelszo, ujJelszo);
                                alert(res.message)
                            })()
                        }} />
                    </div>

                    {/* KÉPFELTÖLTÉS RÉSZ */}
                    <div className="col-12 col-md-8 mt-5">
                        <div className="d-flex flex-column align-items-center">
                            <h3 className="mb-3">Profilkép módosítása</h3>
                            <div className="mb-3" style={{ width: "150px", height: "150px", borderRadius: "50%", border: "2px solid #D95E2E", overflow: "hidden", backgroundColor: "#333" }}>
                                {imagePreview ? (
                                    <img src={imagePreview} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Preview" />
                                ) : (
                                    <div className="d-flex align-items-center h-100 justify-content-center text-secondary">Nincs kép</div>
                                )}
                            </div>
                            <input type="file" accept="image/*" className="form-control mb-3 w-auto mx-auto" onChange={saveToPreview} />
                            <Button content="Kép mentése" onClick={() => {
                                (async () => {
                                    const res = await uploadImg();
                                    alert(res.message)
                                })()
                            }} />
                        </div>
                    </div>

                    {/* ALSÓ GOMBOK */}
                    <div className="col-12 mt-5 pb-5">
                        <div className="d-flex flex-column flex-md-row gap-3 justify-content-center align-items-center">
                            <Button content={lang.signOut} onClick={async () => {
                                const res = await kijelentkezes();
                                if (res.result) navigate("/");
                            }} />
                            <Button content={lang.accountDelete}  onClick={() => {
                            (async () => {
                                const res = await fiokom();
                                alert(res.message)
                                navigate('/')
                            })()
                            }}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}