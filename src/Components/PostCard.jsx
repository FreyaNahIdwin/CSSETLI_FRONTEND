import { useState, useEffect, useRef } from "react";
import "../style/style.css";
import { deleteBejegyzes, BASE } from "../api";

export default function PostCard({
    bejegyzes_id,
    profilkep,
    felhasznalonev,
    feltoltotkep,
    szoveg
}) {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const [hasReacted, setHasReacted] = useState(false);

    const [selected, setSelected] = useState("");
    const [counts, setCounts] = useState({
        like: 0,
        love: 0,
        haha: 0
    });

    const emojiMap = {
        like: "👍",
        love: "❤️",
        haha: "😂"
    };

    //  EMOJI KATTINTÁS
    const handleEmoji = async (type) => {
        if (hasReacted) return;

        try {
            const res = await fetch(`http://localhost:3000/emoji/${bejegyzes_id}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ type }) //  EZ MEGY AZ ADATBÁZISBA
            });

            const result = await res.json();

            if (result.alreadyReacted) {
                setHasReacted(true);
                return;
            }

            if (result.success) {
                setHasReacted(true);
                setSelected(emojiMap[type]);
            }

            if (result.counts) {
                setCounts(result.counts);
            }

        } catch (err) {
            console.error(err);
        }
    };

    // 🔹 SELECT
    const handleChange = (value) => {
        handleEmoji(value);
    };

    // 🔹 KEZDŐ BETÖLTÉS
    const fetchEmojis = async () => {
        try {
            const res = await fetch(`http://localhost:3000/emoji-count/${bejegyzes_id}`);
            const data = await res.json();

            setCounts({
                like: data.counts?.like || 0,
                love: data.counts?.love || 0,
                haha: data.counts?.haha || 0
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchEmojis();
    }, []);

    // 🔹 MENÜ ZÁRÁS
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
        <div className="d-flex flex-column align-items-center m-3 text-white">
            <div className="bombo w-50 p-4 position-relative">

                {/* MENÜ */}
                <div
                    className="position-absolute"
                    style={{ top: "15px", right: "20px" }}
                    ref={menuRef}
                >
                    <button
                        className="btn text-white border-0"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        &#8942;
                    </button>

                    {showMenu && (
                        <div className="bg-dark border rounded p-2">
                            <div
                                className="text-danger"
                                style={{ cursor: "pointer" }}
                                onClick={async () => {
                                    const res = await deleteBejegyzes(bejegyzes_id);
                                    alert(res.message);
                                    window.location.reload();
                                }}
                            >
                                Törlés
                            </div>
                        </div>
                    )}
                </div>

                {/* PROFIL */}
                <div className="d-flex m-2">
                    <img
                        style={{ width: "50px", height: "50px" }}
                        src={profilkep}
                        alt=""
                    />
                    <div className="mx-2">{felhasznalonev}</div>
                </div>

                {/* KÉP */}
                {feltoltotkep && (
                    <img
                        style={{ height: "300px" }}
                        src={`${BASE}/uploads/${feltoltotkep}`}
                        alt=""
                    />
                )}

                {/* SZÖVEG */}
                {szoveg && <div className="m-2">{szoveg}</div>}

                {/* EMOJI */}
                <div className="m-2">
                    <select onChange={(e) => handleChange(e.target.value)} defaultValue="">
                        <option value="" disabled>😊 Válassz</option>
                        <option value="like">👍 Like</option>
                        <option value="love">❤️ Love</option>
                        <option value="haha">😂 Haha</option>
                    </select>

                    {selected && (
                        <span style={{ marginLeft: "10px", fontSize: "20px" }}>
                            {selected}
                        </span>
                    )}

                    {/* SZÁMLÁLÓ */}
                    <div style={{ marginTop: "10px" }}>
                        👍 {counts?.like ?? 0} &nbsp;
                        ❤️ {counts?.love ?? 0} &nbsp;
                        😂 {counts?.haha ?? 0}
                    </div>
                    {hasReacted && (
                        <div style={{ color: "gray", marginTop: "5px" }}>
                            Már érkezett tőled egy reakció 👍
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}