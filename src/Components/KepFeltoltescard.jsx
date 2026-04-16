import React, { useState, useEffect } from 'react';
import "../style/style.css";
import { bejegyzes } from '../api';

export default function KepFeltoltesCard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [imagePreview, setImagePreview] = useState(null);
    const [tartalom, setTartalom] = useState("");
    const [kep, setKep] = useState(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) setImagePreview(null); // Reset nyitáskor
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setKep(file); // save file
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) setIsVisible(false);
            else setIsVisible(true);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Új bejegyzés gomb */}
            {isVisible && (
                <div className="position-fixed" style={{ top: "80px", right: "20px", zIndex: 1050 }}>
                    <button
                        className="btn btn-csetliColor shadow-lg d-flex align-items-center gap-2 text-white px-4 py-2"
                        style={{ borderRadius: "25px", border: "none" }}
                        onClick={toggleModal}
                    >
                        <span className="fw-bold">+ Új bejegyzés</span>
                    </button>
                </div>
            )}

            {isModalOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.85)", zIndex: 2000, backdropFilter: "blur(8px)" }}
                    onClick={toggleModal}
                >
                    <div
                        className="bg-dark border border-secondary p-4 rounded-5 shadow-lg position-relative text-white"
                        style={{ width: "95%", maxWidth: "850px" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="btn text-white position-absolute top-0 end-0 m-3" onClick={toggleModal}>✕</button>

                        <div className="row g-4 align-items-stretch">

                            <h3 className="text-center mb-4">Új bejegyzés hozzáadás</h3>

                            <div style={{ display: "flex", gap: "25px", alignItems: "flex-start" }}>

                                {/* BAL OSZLOP */}
                                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                                    {/* Ezzel a margóval toljuk le a képkeretet a szövegdoboz szintjére */}
                                    <div
                                        className="border border-secondary rounded-4 d-flex align-items-center justify-content-center bg-black bg-opacity-25"
                                        style={{
                                            height: "350px",
                                            marginTop: "40px", // Ez tolja le a jobb oldali cím szintjére
                                            overflow: "hidden"
                                        }}
                                    >
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                        ) : (
                                            <span className="text-secondary">Nincs kép kiválasztva</span>
                                        )}
                                    </div>

                                    <label className="btn btn-outline-light w-100 py-2 mt-3 shadow-none" style={{ borderRadius: "10px", borderStyle: "dashed" }}>
                                        📷 Kép kiválasztása
                                        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                    </label>
                                </div>

                                {/* JOBB OSZLOP */}
                                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                                    <h5 className="text-secondary text-center mb-3" style={{ height: "24px" }}>Szöveg Helye</h5>
                                    <textarea
                                        className="form-control bg-dark text-white border-secondary shadow-none p-3"
                                        placeholder="Mi jár a fejedben?"
                                        value={tartalom}
                                        onChange={(e) => setTartalom(e.target.value)}
                                        style={{
                                            height: "350px",
                                            resize: "none",
                                            borderRadius: "10px"
                                        }}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                            <button className="btn csetliColor btn-lg px-5 shadow-none border-0" style={{ borderRadius: "15px" }} onClick={() => {
                                (async () => {
                                    const res = await bejegyzes(tartalom, kep);
                                    window.location.reload();
                                })();

                            }}>
                                Közzététel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}