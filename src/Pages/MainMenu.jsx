import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import messages from "../kepek/feketeKomment.svg";
import settings from "../kepek/feketeSettings.svg";
import people from "../kepek/feketePeople.svg";
import useLanguage from "../language";
import PostCard from "../Components/PostCard";
import feketeHaz from "../kepek/feketeHaz.svg";
import { BASE, bejegyzesek } from "../api";
import KepFeltoltesCard from "../Components/KepFeltoltescard";
import KepSzerkesztesCard from "../Components/KepSzerkesztesCard";

export default function MainMenu() {
    const [lang, setLang] = useState(1);
    const [posts, setPosts] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        (async () => {
            const data = await bejegyzesek();
            if (data.result) {
                setPosts(data.posts);
            } else {
                setPosts([]);
            }
        })();

        () => {
            const language = JSON.parse(localStorage.getItem("language")) || { lang: "0" };
            setLang(useLanguage(language.lang));
        }
    }, []);

    return (
        <div className="background p-0 p-md-5"> {/* Csökkentett padding mobilon a kártyák maximális szélessége érdekében */}
            <Navbar homeI={feketeHaz} messagesI={messages} settingsI={settings} peopleI={people} />
            <div className="container-fluid px-0"> {/* d-flex flex-column align-items-center helyett container-fluid a teljes szélességért */}
                {posts.map((post) => (
                    <div key={post.bejegyzes_id} className="w-100 px-2 px-md-3"> {/* Csökkentett padding a kártyák szélénél */}
                        <PostCard
                            bejegyzes_id={post.bejegyzes_id}
                            feltoltotkep={post.bejegyzes_kep || null}
                            szoveg={post.tartalom || null}
                            felhasznalonev={post.felhasznalonev}
                            profilkep={`${BASE}/uploads/${post.profilkep}`}
                        />
                    </div>
                ))}
            </div>
            <KepFeltoltesCard />
            {showEditModal && (
                <KepSzerkesztesCard
                    onClose={() => setShowEditModal(false)}
                />
            )}
        </div>
    );
}
