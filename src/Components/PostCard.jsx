import { useState, useEffect, useRef } from "react";
import LikeIcon from "../kepek/Comment.png"
import Comment from "../kepek/Comment.png"
import "../style/style.css"
import { deleteBejegyzes, BASE } from "../api";

export default function PostCard({ bejegyzes_id, profilkep, felhasznalonev, feltoltotkep, szoveg }) {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center m-1 m-md-3 text-white">
            {/* w-50 lecserélve: mobilon 95%, tableten/PC-n max 600px */}
            <div className="bombo p-3 p-md-4 position-relative" style={{ width: "95%", maxWidth: "600px" }}>

                {/* Menü választó rész */}
                <div className="position-absolute" style={{ top: "15px", right: "20px" }} ref={menuRef}>
                    <button
                        className="btn text-white border-0"
                        type="button"
                        style={{ fontSize: "20px", background: "transparent" }}
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        &#8942;
                    </button>

                    {showMenu && (
                        <div className="bg-dark border border-secondary rounded p-2 shadow"
                            style={{ position: "absolute", right: 0, zIndex: 1000, minWidth: "120px" }}>
                            <div
                                className="p-2 border-bottom border-secondary text-white hover-item"
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowMenu(false)}
                            >
                                <small>Szerkesztés</small>
                            </div>
                            <div
                                className="p-2 text-danger hover-item"
                                style={{ cursor: "pointer" }}
                                onClick={async () => {
                                    setShowMenu(false);
                                    const res = await deleteBejegyzes(bejegyzes_id)
                                    window.location.reload();
                                    alert(res.message);
                                }}
                            >
                                <small>Törlés</small>
                            </div>
                        </div>
                    )}
                </div>

                {/* Fejléc: Profilkép + Név */}
                <div className="d-flex flex-row align-items-center m-2">
                    <div className="mx-1">
                        <img style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%" }} src={profilkep} alt="profilkep" />
                    </div>
                    <div className="mx-1" style={{ fontSize: "20px", fontWeight: "bold" }}>
                        {felhasznalonev}
                    </div>
                </div>

                {/* KÉP (szöveg nélkül) */}
                {feltoltotkep && !szoveg && (
                    <div className="d-flex justify-content-center m-2" >
                        <img className="img-fluid" style={{
                            maxHeight: "400px", objectFit: "cover", borderRadius: "25px", width: "100%"
                        }} src={`${BASE}/uploads/${feltoltotkep}`} alt="poszt" />
                    </div>
                )}

                {/* KÉP + SZOVEG EGYÜTT (A kényes rész) */}
                {feltoltotkep && szoveg && (
                    <div
                        className="d-flex flex-column flex-md-row m-2" // Mobilon egymás alá, PC-n egymás mellé rakja
                        style={{
                            background: "#333333",
                            borderRadius: "25px",
                            overflow: "hidden"
                        }}
                    >
                        {/* KÉP: Mobilon teljes szélesség, PC-n fix 200-250px */}
                        <div style={{ flex: "0 0 auto" }}>
                            <img
                                src={`${BASE}/uploads/${feltoltotkep}`}
                                alt="poszt"
                                style={{
                                    width: "100%",
                                    minWidth: "200px",
                                    maxWidth: "100%",
                                    height: "250px",
                                    objectFit: "cover",
                                    display: "block"
                                }}
                            />
                        </div>

                        {/* SZOVEG: Kitölti a maradék helyet */}
                        <div
                            style={{
                                flex: 1,
                                padding: "15px",
                                fontSize: "16px",
                                overflowWrap: "anywhere",
                                wordBreak: "break-word",
                                whiteSpace: "pre-wrap"
                            }}
                        >
                            {szoveg}
                        </div>
                    </div>
                )}

                {/* CSAK SZOVEG */}
                {!feltoltotkep && szoveg && (
                    <div className="m-2 p-3" style={{ fontSize: "18px", background: "#333333 ", borderRadius: "20px", wordBreak: "break-word" }}>
                        {szoveg}
                    </div>
                )}

                {/* Footer ikonok */}
                <div className="d-flex flex-wrap m-2">
                    <div className="mx-1"><img src={LikeIcon} alt="like" style={{width: "24px"}} /></div>
                    <div className="mx-1"><img src={LikeIcon} alt="like" style={{width: "24px"}} /></div>
                    <div className="mx-1"><img src={LikeIcon} alt="like" style={{width: "24px"}} /></div>
                    <div className="mx-1 text-secondary" style={{fontSize: "14px"}}>
                        <img src={Comment} alt="komment" style={{width: "24px"}} /> komment
                    </div>
                </div>
            </div>
        </div>
    )
}
