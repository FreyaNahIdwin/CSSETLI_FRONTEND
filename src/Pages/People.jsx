import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import simplehaz from "../kepek/feketeHaz.svg";
import messages from "../kepek/feketeKomment.svg";
import settings from "../kepek/feketeSettings.svg";
import people from "../kepek/feketePeople.svg";
import useLanguage from "../language";
import PeopleCard from "../Components/PeopleCard.jsx";
import { BASE, emberek, kovetes } from "../api.js";

export default function People() {
  const [lang, setLang] = useState(useLanguage(1));
  const [users, setUsers] = useState([]);
  const [koveti, setkoveti] = useState({});

 
  useEffect(() => {
    (async () => {
      const data = await emberek();
      if (data.result) {
        setUsers(data.users);

        const res = await fetch(`${BASE}/kovetes/status`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const kovetData = await res.json();
        if (kovetData.result) {
          const kovetettMap = {};
          kovetData.followedUserIds.forEach((id) => {
            kovetettMap[id] = true;
          });
          setkoveti(kovetettMap);
        }
      } else {
        setUsers([]);
      }
    })();

    const language = JSON.parse(localStorage.getItem("language")) || { lang: "0" };
    setLang(useLanguage(language.lang));
  }, []);

  // kovetes
  const kovetesClick = async (userId) => {
    if (koveti[userId]) {
      alert("Már követed ezt a felhasználót.");
      return;
    }
    const res = await kovetes(userId);
    alert(res.message);
    if (res.result) {
      setkoveti((prev) => ({
        ...prev,
        [userId]: true,
      }));
    }
  };

  return (
    <div style={{ paddingTop: "90px" }} className="background min-vh-100">
      <Navbar homeI={simplehaz} messagesI={messages} settingsI={settings} peopleI={people} />

      <div className="container mt-5">
        <div className="row g-3 justify-content-center">
          {users.length === 0 && <p>Nincs senki csak te.</p>}
          {users.map((user, index) => (
            <div key={index} className="col-12 col-md-3">
              <PeopleCard
                content={koveti[user.felhasznalo_id] ? "Követve" : "Követes"}
                image={`${BASE}/uploads/${user.kep}`}
                felhasznalonev={user.felhasznalo_nev}
                onClick={() => kovetesClick(user.felhasznalo_id)}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
