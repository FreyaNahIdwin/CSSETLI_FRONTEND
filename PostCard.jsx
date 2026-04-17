import { useState, useEffect, useRef } from "react";
import LikeIcon from "../kepek/Comment.png"
import Comment from "../kepek/Comment.png"
import "../style/style.css"
import { deleteBejegyzes, BASE } from "../api";
import KepSzerkesztesCard from "./KepSzerkesztesCard";

export default function PostCard({ bejegyzes_id, profilkep, felhasznalonev, feltoltotkep, szoveg }) {
    console.log('kép', feltoltotkep);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const [deleteBe, setDeleteBe] = useState();

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    (async () => {
        const data = await deleteBejegyzes();
        if (data.result) {
            setPosts(data.posts);
        } else {
            setPosts([]);
        }
    })();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center m-3 text-white">
            <div className="bombo w-50 p-4 position-relative">

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

                    {/* Feltételes renderelés: Csak akkor jelenik meg, ha showMenu true */}
                    {showMenu && (
                        <div className="bg-dark border border-secondary rounded p-2 shadow"
                            style={{ position: "absolute", right: 0, zIndex: 1000, minWidth: "120px" }}>
                            <div
                                className="p-2 border-bottom border-secondary text-white hover-item"
                                style={{ cursor: "pointer" }}
                                onClick={() => { setShowMenu(false); KepSzerkesztesCard }}
                            >
                                <small>Szerkesztés</small>
                            </div>
                            <div
                                className="p-2 text-danger hover-item"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setShowMenu(false);
                                    (async () => {
                                        const res = await deleteBejegyzes(bejegyzes_id)
                                        window.location.reload();
                                        alert(res.message);

                                    })();
                                }}
                            >
                                <small>Törlés</small>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- A kártya többi része változatlan --- */}
                <div className="d-flex flex-row m-2">
                    <div className="mx-1">
                        <img
                            style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }} src={profilkep} alt="profilkep" />
                    </div>

                    <div className="mx-1 d-flex align-items-center" style={{ fontSize: "25px" }}>
                        {felhasznalonev}
                    </div>
                </div>

                {feltoltotkep && !szoveg && (
                    <div className="d-flex justify-content-center m-2" >
                        <img className="m-2" style={{
                            height: "300px", objectFit: "cover", borderRadius: "45px", borderTopRightRadius: "45px",
                            borderBottomRightRadius: "45px"
                        }} src={`${BASE}/uploads/${feltoltotkep}`} alt="poszt" />
                    </div>
                )}

                {feltoltotkep && szoveg && (
                    <div
                        className="d-flex m-2"
                        style={{
                            background: "#333333",
                            borderRadius: "45px",
                            overflow: "hidden"
                        }}
                    >
                        {/* KEP */}
                        <div style={{ flex: "0 0 300px" }}>
                            <img
                                src={`${BASE}/uploads/${feltoltotkep}`}
                                alt="poszt"
                                style={{
                                    width: "300px",
                                    height: "300px",
                                    objectFit: "cover",
                                    display: "block",
                                    borderTopRightRadius: "45px",
                                    borderBottomRightRadius: "45px"
                                }}
                            />
                        </div>

                        {/* SZOVEG */}
                        <div
                            style={{
                                flex: 1,
                                padding: "12px",
                                fontSize: "20px",
                                overflowWrap: "anywhere",
                                wordBreak: "break-word",
                                whiteSpace: "pre-wrap",
                                minWidth: 0
                            }}
                        >
                            {szoveg}
                        </div>
                    </div>
                )}

                {!feltoltotkep && szoveg && (
                    <div className="m-2 p-3" style={{ fontSize: "20px", background: "#333333 ", borderRadius: "45px", overflowWrap: "break-word" }}>
                        {szoveg}
                    </div>
                )}

                <div className="d-flex flex-row m-2">
                    <div className="mx-1"><img src={LikeIcon} alt="like" /></div>
                    <div className="mx-1"><img src={LikeIcon} alt="like" /></div>
                    <div className="mx-1"><img src={LikeIcon} alt="like" /></div>
                    <div className="mx-1">
                        <img src={Comment} alt="komment" /> komment
                    </div>
                </div>
            </div>
        </div>
    )
}