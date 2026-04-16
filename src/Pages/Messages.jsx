import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import simplehaz from "../kepek/feketeHaz.svg";
import messages from "../kepek/feketeKomment.svg";
import settings from "../kepek/feketeSettings.svg";
import people from "../kepek/feketePeople.svg";
import useLanguage from "../language";
import BaratokCard from "../Components/BaratokCard";
import UzenetekCard from "../Components/UzenetekCard";
import { ismerosok, BASE, uzenetkuldes, getUzenetek, szobakeszites } from "../api";

export default function Messages() {
    const [smerosok, setIsmerosok] = useState([]);
    const [lang, setLang] = useState(1);
    const [ismerosId, setIsmerosId] = useState(null);
    const [szobaId, setSzobaId] = useState(null);
    const [text, setText] = useState("");

    useEffect(() => {
        (async () => {
            const data = await ismerosok();
            console.log("ismerosok valasz:", data);
            if (data.result && Array.isArray(data.ismerosok)) {
                setIsmerosok(data.ismerosok);
            } else {
                setIsmerosok([]);
            }
            console.log("ismerosok ID:", ismerosId);
        })();

        const language = JSON.parse(localStorage.getItem("language")) || { lang: "0" };
        setLang(useLanguage(language.lang));
    }, []);
    const [uzenet, setUzenet] = useState([]);

    useEffect(() => {
        if (!szobaId) return;

        async function loadMessages() {
            const res = await getUzenetek(szobaId);
            if (res.result) {
                setUzenet(res.message.uzenetek);
            }
        }

        loadMessages();

        const interval = setInterval(loadMessages, 2000);

        return () => clearInterval(interval);
    }, [szobaId]);

    return (
        <div className="background" style={{ height: 100, overflow: "hidden" }}>
            <Navbar homeI={simplehaz} messagesI={messages} settingsI={settings} peopleI={people} />
            <div className="row d-flex flex-column justify-content-start background text-white" style={{ paddingTop: "100px" }}>
                <div className="d-flex flex-row container">
                    <div className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex flex-column vh-80 align-items-start m-3 bombo px-4 p-2">
                        <div className="d-flex flex-row mt-5">
                            <h4 className="d-flex text-white">Barátok</h4>
                            <div className="m-1">(  {smerosok.length} )</div>
                        </div>
                        {smerosok.length > 0 ? (
                            smerosok.map((ismeros, index) => (
                                <BaratokCard
                                    key={index}
                                    profilkep={`${BASE}/uploads/${ismeros.kep}`}
                                    felhasznalonev={ismeros.felhasznalo_nev}
                                    onClick={async () => {
                                        console.log("clicked:", ismeros.felhasznalo_id);

                                        setIsmerosId(ismeros.felhasznalo_id);

                                        const res = await szobakeszites(ismeros.felhasznalo_id);

                                        if (res.result) {
                                            setSzobaId(res.szobaId);
                                        }
                                    }
                                    }
                                />
                            ))
                        ) : (
                            <p>Nincsnek barataid :(</p>
                        )}
                    </div>

                    <div className="d-flex align-items-start bombo m-3" style={{ height: "815px", overflow: "overlay", scrollbarWidth: "none" }}>
                        <div className="flex-grow-1 d-flex flex-column h-100 p-3">
                            {/* ÜZENETEK */}
                            <div className="flex-grow-1">
                                {uzenet.map((msg, i) =>
                                    msg.felhasznalo_id === ismerosId ? (
                                        <UzenetekCard key={i} balUzenet={msg.szoveg} />

                                    ) : (
                                        <UzenetekCard key={i} jobbUzenet={msg.szoveg} />
                                    )
                                )}
                            </div>

                            {/* INPUT */}
                            <div className="d-flex p-2" style={{ maxWidth: "97%" }}>
                                <input
                                    className="form-control"
                                    placeholder="Üzenet..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                                <button
                                    className="btn csetliColor me-auto"
                                    onClick={async () => {
                                        if (!szobaId || !text.trim()) return;

                                        const res = await uzenetkuldes(szobaId, text);

                                        if (res.result) {
                                            setUzenet(prev => [...prev, res.uzenet]);

                                            setText("");
                                        }
                                    }}
                                >
                                    Küldés
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
