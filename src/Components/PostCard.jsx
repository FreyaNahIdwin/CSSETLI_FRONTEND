import { useState, useEffect, useRef } from "react";
import "../style/style.css";
import { deleteBejegyzes, BASE, getKommentek, emoji, emojiCount, kommentSzam } from "../api";
import getLanguage from "../language"

export default function PostCard({
  bejegyzes_id,
  profilkep,
  felhasznalonev,
  feltoltotkep,
  szoveg,
}) {
  // UI state
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [lang, setLang] = useState(getLanguage("1"));

  // Like state
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const menuRef = useRef(null);

  const MAX_TEXT_LENGTH = 140;
  const isLongText = szoveg && szoveg.length > MAX_TEXT_LENGTH;

  const displayedText = isLongText && !showFullText
    ? szoveg.slice(0, MAX_TEXT_LENGTH) + "..."
    : szoveg;

  // Fetch emoji count on mount or when bejegyzes_id changes
  useEffect(() => {
    let intervalId;
    async function fetchEmojiCount() {
      const result = await emojiCount(bejegyzes_id);
      if (result.result) {
        setLikeCount(result.emojiszam);
      } else {
        console.error("Failed to fetch emoji count:", result.message);
      }
    }
    fetchEmojiCount();
    intervalId = setInterval(fetchEmojiCount, 5000);
    return () => clearInterval(intervalId);
  }, [bejegyzes_id]);

  // Handle like button click
  async function handleLike() {
    if (loading) return;
    setLoading(true);

    const newEmoji = isLiked ? "0" : "1";

    const result = await emoji(bejegyzes_id, newEmoji);
    if (result.result) {
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } else {
      console.error("Failed to update emoji:", result.message);
    }
    setLoading(false);
  }
  useEffect(() => {
    if (!isModalOpen) return;

    (async () => {
      const res = await getKommentek(bejegyzes_id);
      if (res.result) setComments(res.comments);
    })();
  }, [isModalOpen, bejegyzes_id]);

  useEffect(() => {
    if (!isModalOpen) return;

    const interval = setInterval(async () => {
      const res = await getKommentek(bejegyzes_id);
      if (res.result) setComments(res.comments);
    }, 5000);

    return () => clearInterval(interval);
  }, [isModalOpen, bejegyzes_id]);

  // Load language preference on mount
useEffect(() => {
        // a localstorage-et beolvassuk
        const language = JSON.parse(localStorage.getItem("language")) || { lang: "0" }
        setLang(getLanguage(language.lang))
    }, [])

  // Close menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSendComment() {
    if (!newComment.trim()) return;

    await fetch(`${BASE}/komment`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tartalom: newComment,
        bejegyzes_id,
      }),
    });

    setNewComment("");

    const res = await getKommentek(bejegyzes_id);
    if (res.result) setComments(res.comments);
  }

  const ActionButton = ({ icon, label, count, active, onClick }) => (
    <button
      className="btn d-flex align-items-center gap-2 px-3 py-2"
      style={{
        background: active ? "rgba(255, 55, 35, 0.18)" : "#303030",
        color: active ? "#ff4b3a" : "#e6e6e6",
        borderRadius: "999px",
        border: "1px solid rgba(255,255,255,0.08)",
        fontWeight: "bold",
        fontSize: "14px",
        touchAction: "manipulation",
      }}
      onClick={onClick}
    >
      <span style={{ fontSize: "17px" }}>{icon}</span>
      <span>{label}</span>
      <span style={{ color: "#bdbdbd" }}>{count}</span>
    </button>
  );

  return (
    <div className="d-flex flex-column align-items-center m-2 text-white">
      <div
        className="position-relative"
        style={{
          width: "100%",
          maxWidth: "900px",
          borderRadius: "30px",
          background: "#252525",
          padding: "20px",
        }}
      >
        {/* MENU */}
        <div
          className="position-absolute"
          style={{ top: "15px", right: "20px" }}
          ref={menuRef}
        >
          <button
            className="btn text-white border-0"
            type="button"
            style={{
              fontSize: "22px",
              background: "transparent",
              lineHeight: "1",
            }}
            onClick={() => setShowMenu(!showMenu)}
          >
            &#8942;
          </button>

          {showMenu && (
            <div
              className="bg-dark border border-secondary rounded-4 p-2 shadow"
              style={{
                position: "absolute",
                right: 0,
                zIndex: 1000,
                minWidth: "140px",
              }}
            >
              <div
                className="p-2 text-danger"
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  setShowMenu(false);
                  const res = await deleteBejegyzes(bejegyzes_id);
                  alert(res.message);
                  window.location.reload();
                }}
              >
                <small>{lang.delete}</small>
              </div>
            </div>
          )}
        </div>

        {/* HEADER */}
        <div className="d-flex align-items-center mb-3 pe-5">
          <img
            src={profilkep}
            alt="profilkep"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <b className="ms-2">{felhasznalonev}</b>
        </div>

        {/* TEXT */}
        {szoveg && (
          <div
            className="mb-3"
            style={{
              background: "#323232",
              padding: "12px",
              borderRadius: "15px",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
              whiteSpace: "pre-wrap",
            }}
          >
            {displayedText}

            {isLongText && (
              <button
                className="btn p-0 ms-1 csetliColor"
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
                onClick={() => setShowFullText(!showFullText)}
              >
                {showFullText ? "Kevesebb megjelenítés" : "Több megjelenítés"}
              </button>
            )}
          </div>
        )}

        {/* IMAGE */}
        {feltoltotkep && (
          <img
            src={`${BASE}/uploads/${feltoltotkep}`}
            alt="poszt"
            style={{
              width: "100%",
              maxHeight: "420px",
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
        )}

        {/* ACTION BAR */}
        <div className="d-flex gap-2 mt-3 flex-wrap">
          <ActionButton
            icon={isLiked ? "❤️" : "🤍"}
            label="Like"
            count={likeCount}
            active={isLiked}
            onClick={handleLike}
          />

          <ActionButton
            icon="💬"
            label={lang.comments}
            active={false}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {/* KOMMENT MODAL */}
      {isModalOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.82)",
            zIndex: 9999,
            backdropFilter: "blur(5px)",
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="position-relative"
            style={{
              width: "90%",
              maxWidth: "900px",
              height: "80vh",
              borderRadius: "20px",
              overflow: "hidden",
              background: "#2b2b2b",
              color: "black",
              boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn position-absolute text-white"
              style={{
                top: "10px",
                right: "15px",
                zIndex: 10,
                fontSize: "24px",
              }}
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            <div className="d-flex h-100 flex-column flex-md-row">
              {/* BAL OLDAL - POSZT */}
              <div
                className="col-md-6 p-4 d-flex flex-column"
                style={{
                  background: "#2b2b2b",
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="d-flex align-items-center mb-3">
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    src={profilkep}
                    alt="profilkep"
                  />

                  <b className="ms-2 csetliColor2 rounded-pill py-1 px-3">
                    {felhasznalonev}
                  </b>
                </div>

                <div className="flex-grow-1 overflow-auto">
                  {feltoltotkep && (
                    <img
                      src={`${BASE}/uploads/${feltoltotkep}`}
                      className="img-fluid rounded mb-3"
                      style={{
                        maxHeight: "300px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      alt="poszt"
                    />
                  )}

                  {szoveg && (
                    <div
                      className="csetliColor2 p-3 rounded"
                      style={{
                        fontSize: "14px",
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {szoveg}
                    </div>
                  )}
                </div>
              </div>

              {/* JOBB OLDAL - KOMMENTEK */}
              <div
                className="col-md-6 p-4 d-flex flex-column"
                style={{
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-center mb-3">
                  <span className="csetliColor2 px-4 py-1 rounded-pill fw-bold">
                    {lang.comments}
                  </span>
                </div>

                <div
                  className="flex-grow-1 overflow-auto pe-2 no-scroll"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  <style>{`.no-scroll::-webkit-scrollbar { display: none; }`}</style>

                  {comments.length === 0 ? (
                    <div className="h-100 d-flex align-items-center justify-content-center text-center">
                      <span className="csetliColor2 rounded-pill px-3 py-2">
                        {lang.haveNotComment}
                      </span>
                    </div>
                  ) : (
                    comments.map((c) => (
                      <div key={c.id} className="mb-3 text-end">
                        <div className="small fw-bold mb-1">
                          {c.felhasznalonev}
                        </div>

                        <div
                          className="csetliColor2 d-inline-block p-2 px-3 rounded-pill shadow-sm"
                          style={{
                            fontSize: "13px",
                            maxWidth: "85%",
                            wordBreak: "break-word",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {c.szoveg}
                        </div>

                        <div
                          className="text-muted"
                          style={{
                            fontSize: "13px",
                          }}
                        >
                          {c.ido}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-3 position-relative">
                  <input
                    type="text"
                    className="form-control rounded-pill csetliColor2 pe-5"
                    placeholder={lang.commenthere}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSendComment()
                    }
                  />

                  <button
                    onClick={handleSendComment}
                    className="btn position-absolute end-0 top-0 me-2"
                  >
                    {lang.Send}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}