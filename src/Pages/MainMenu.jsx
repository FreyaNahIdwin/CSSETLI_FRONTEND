import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import messages from "../kepek/feketeKomment.svg";
import settings from "../kepek/feketeSettings.svg";
import people from "../kepek/feketePeople.svg";
import getLanguage from "../language";
import PostCard from "../Components/PostCard";
import feketeHaz from "../kepek/feketeHaz.svg";
import { BASE, bejegyzesek, kommentSzam } from "../api";
import KepFeltoltesCard from "../Components/KepFeltoltescard";
import KepSzerkesztesCard from "../Components/KepSzerkesztesCard";

export default function MainMenu() {
  const [lang, setLang] = useState(getLanguage("1"));
  const [posts, setPosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMobileInfo, setShowMobileInfo] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const language = JSON.parse(localStorage.getItem("language")) || {
      lang: "0",
    };
    setLang(getLanguage(language.lang));

    async function fetchData() {
      const data = await bejegyzesek();

      if (data.result) {
        setPosts(data.posts);
      } else {
        setPosts([]);
      }

      const res = await kommentSzam();
      setCommentCount(res.kommentSzam || 0);
    }

    fetchData();
  }, []);

  const InfoContent = () => (
    <div>
      <div className="mb-4">
        <h6 className="fw-bold mb-3">{lang.feed}</h6>

        <div className="d-flex justify-content-between mb-2">
          <span className="csetliColor">{lang.posts}</span>
          <b className="csetliColor">{posts.length}</b>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span className="csetliColor">{lang.comments}</span>
          <b className="csetliColor">{commentCount}</b>
        </div>
      </div>

      <div className="mb-4">
        <h6 className="fw-bold mb-3">{lang.recentPosters}</h6>

        {posts.slice(0, 4).map((post) => (
          <div
            key={post.bejegyzes_id}
            className="d-flex align-items-center mb-2"
          >
            <img
              src={`${BASE}/uploads/${post.profilkep}`}
              alt="profil"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                marginRight: "8px",
                objectFit: "cover",
              }}
            />

            <span className="csetliColor" style={{ fontSize: "13px" }}>
              {post.felhasznalonev}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #4a4a4a 0%, #2b2b2b 45%, #171717 100%)",
      }}
    >
      <Navbar
        homeI={feketeHaz}
        messagesI={messages}
        settingsI={settings}
        peopleI={people}
      />

      {/* MOBIL INFÓ GOMB */}
      <div
        className="d-flex d-lg-none"
        style={{
          position: "sticky",
          top: "75px",
          zIndex: 50,
          padding: "10px",
          width: "35%",
          minWidth: "140px",
          maxWidth: "210px",
          marginLeft: "10px",
        }}
      >
        <button
          className="btn text-white w-100"
          style={{
            background: "#242424",
            borderRadius: "999px",
            fontSize: "13px",
            padding: "7px 10px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          onClick={() => setShowMobileInfo(true)}
        >
          ℹ️ {lang.info}
        </button>
      </div>

      <div
        className="container-fluid"
        style={{
          paddingTop: "95px",
          paddingBottom: "60px",
        }}
      >
        <div
          className="row"
          style={{
            paddingLeft: "55px",
            paddingRight: "20px",
          }}
        >
          {/* BAL OLDALI INFÓ */}
          <div className="d-none d-lg-block col-lg-3 col-xl-2">
            <div
              className="position-sticky"
              style={{
                top: "110px",
                background: "#242424",
                borderRadius: "22px",
                padding: "18px",
                color: "white",
                boxShadow: "0 12px 35px rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <InfoContent />
            </div>
          </div>

          {/* FEED */}
          <div className="col-12 col-md-11 col-lg-8 col-xl-7">
            <div
              className="d-flex flex-column align-items-center"
              style={{ width: "100%" }}
            >
              {posts.length === 0 ? (
                <div
                  className="text-center text-white"
                  style={{
                    width: "100%",
                    maxWidth: "820px",
                    background: "#242424",
                    borderRadius: "28px",
                    padding: "35px 20px",
                    boxShadow: "0 12px 35px rgba(0,0,0,0.35)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h4 className="fw-bold mb-2">
                    {lang.noPostsYet}
                  </h4>

                  <p className="m-0" style={{ color: "#bdbdbd" }}>{lang.beFirstToPost}</p>
                </div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.bejegyzes_id}
                    className="mb-4"
                    style={{
                      width: "100%",
                      maxWidth: "820px",
                    }}
                  >
                    <PostCard
                      bejegyzes_id={post.bejegyzes_id}
                      feltoltotkep={post.bejegyzes_kep || null}
                      szoveg={post.tartalom || null}
                      felhasznalonev={post.felhasznalonev}
                      profilkep={`${BASE}/uploads/${post.profilkep}`}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBIL INFÓ PANEL */}
      {showMobileInfo && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
          }}
          onClick={() => setShowMobileInfo(false)}
        >
          <div
            className="h-100 overflow-auto"
            style={{
              width: "35vw",
              minWidth: "150px",
              maxWidth: "220px",
              background: "#202020",
              padding: "14px",
              color: "white",
              boxShadow: "10px 0 35px rgba(0,0,0,0.45)",
              borderRight: "1px solid rgba(255,255,255,0.08)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="m-0 fw-bold">{lang.info || "Infó"}</h6>

              <button
                className="btn text-white p-0"
                onClick={() => setShowMobileInfo(false)}
              >
                ✕
              </button>
            </div>

            <InfoContent />
          </div>
        </div>
      )}

      <KepFeltoltesCard />

      {showEditModal && (
        <KepSzerkesztesCard onClose={() => setShowEditModal(false)} />
      )}
    </div>
  );
}