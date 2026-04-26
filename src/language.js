export default function useLanguage(language) {
    return {
        username: language === "1" ? "Felhasználónév" : "Username",
        email: language === "1" ? "E-mail" : "E-mail",
        registration: language === "1" ? "Regisztráció" : "Registration",
        login: language === "1" ? "Bejelentkezés" : "Login",
        abautus: language === "1" ? "Rólunk" : "About Us",
        password: language === "1" ? "Jelszó" : "Password",
        passwordagain: language === "1" ? "Jelszó megerősítése" : "Password again",
        register: language === "1" ? "Regisztrálok" : "Register",
        haveaccount: language === "1" ? "Már van fiókom" : "I already have an account",
        backtohome: language === "1" ? "Vissza a főoldalra" : "Back to the homepage",
        emailorusername: language === "1" ? "E-mail vagy felhasználónév" : "E-mail or username",
        donthaveaccount: language === "1" ? "Még nincs fiókom" : "I don't have an account yet",
        Placeholderemailorusername: language === "1" ? "Felhasználónév/E-mail" : "Username/E-mail",
        placeholderpassword: language === "1" ? "Jelszó" : "Password",
        upload: language === "1" ? "Feltöltés" : "Upload",
        uploadstring: language === "1" ? "Nincs kiválasztva kép" : "Can't choose picture",
        picLocation: language === "1" ? "Kép helye" : "Image Location",
        pw: language === "1" ? "Régi jelszó" : "Old password",
        pw1: language === "1" ? "Új jelszó" : "New password",
        button: language === "1" ? "Módosítás" : "Change",
        settingsUserString: language === "1" ? "Adja meg az új felhasználónevét" : "Please provide your new username",
        settingsString: language === "1" ? "Beállítások" : "Settings",
        setLangChange: language === "1" ? "Módosítsa a nyelvet" : "Change language",
        setLogout: language === "1" ? "Kijelentkezés" : "Log out",
        accountDelete: language === "1" ? "Fiók törlés" : "Delete account",
        signOut: language === "1" ? "Kijelentkezés" : "Sign out",
        abot: language === "1" ? `Három tinédzser srác vagyunk, akik a szakmai vizsgájukra készülve hozták létre ezt az oldalt. Az ötletünk egy egyszerű, mégis modern társalgó platform megalkotása volt, ahol az emberek könnyedén kapcsolatba léphetnek egymással.
        Célunk, hogy egy olyan felületet biztosítsunk, amely nemcsak gyorsan és megbízhatóan működik, hanem stílusos megjelenésével is kitűnik. Fontos számunkra az egyszerű kezelhetőség, így bárki könnyen eligazodhat az oldalon, akár első használatkor is.
        Hiszünk abban, hogy a kommunikáció lehet gördülékeny, élvezetes és vizuálisan is inspiráló. Ez a projekt számunkra nemcsak egy vizsgafeladat, hanem egy lehetőség arra, hogy megmutassuk, mire vagyunk képesek, és értéket adjunk egy közösségnek.
        Örülünk, hogy itt vagy, és reméljük, hogy jól fogod érezni magad a platformunkon!
        `
        :
        `We are three teenage guys who created this platform while preparing for our professional exam. Our idea was to build a simple yet modern space where people can easily connect and communicate with each other.
        Our goal is to provide a platform that is not only fast and reliable, but also stands out with its stylish design. Ease of use is especially important to us, so anyone can navigate the site effortlessly, even on their first visit.
        We believe that communication can be smooth, enjoyable, and visually engaging. For us, this project is not just an exam assignment, but also an opportunity to show what we are capable of and to create something valuable for a community.
        We’re glad you’re here, and we hope you’ll enjoy using our platform!`,
        Send: language === "1" ? "Küldés" : "Send",
        messageFriendToChat: language === "1" ? "Válassz ki egy barátot az üzenetekhez" : "Select a friend to start chatting",
        settingsProfileChange: language === "1" ? "Profilkép módosítása" : "Change profile picture",
        messageIsNotFriend: language === "1" ? "Nincsenek barátaid" : "You don't have friends",
        friends: language === "1" ? "Barátok" : "Friends",
        placeholderMessage: language === "1" ? "Üzenet..." : "Message...",
        PictureUpload: language === "1" ? "Profilkép feltöltése" : "Upload profile picture",
        delete: language === "1" ? "Törlés" : "Delete",
        feed: language === "1" ? "Feed infó" : "Feed news",
        posts: language === "1" ? "Bejegyzések" : "Posts",
        comments: language === "1" ? "Kommentek" : "Comments",
        recPosters: language === "1" ? "Legutóbbi posztolók" : "Recent posters",
        noPosts: language === "1" ? "Még nincs bejegyzés" : "There are no posts yet",
        FirstPost: language === "1" ? "Legyél te az első, aki posztol valamit." : "Be the first to post something.",
        news: language === "1" ? "Infó" : "News",
        haveNotComment: language === "1" ? "Még nincs komment." : "There are no comments yet.",
        newPost: language === "1" ? "+ Új bejegyzés" : "+ New Post",
        addPost: language === "1" ? "Új bejegyzés hozzáadás" : "Add new post",
        postShare: language === "1" ? "Közzététel" : "Share",
        szoveg: language === "1" ? "Szöveg" : "Text",
        post: language === "1" ? "Közzététel" : "Post",
        imgselect: language === "1" ? "Nincs kép kiválasztva" : "No image selected",
        imgselectselect: language === "1" ? "📷 Kép kiválasztása" : "📷 Select image",
        whatsonurmind: language === "1" ? "Mi jár a fejedben?" : "What's on your mind?",


        newpost: language === "1" ? "+ Új bejegyzés" : "+ New post",
        commenthere: language === "1" ? "Ide írd a kommentet..." : "Write your comment here...",
        saveimage: language === "1" ? "Kép mentése" : "Save image",
        more: language === "1" ? "Több megjelenitése" : "Show more",
        less: language === "1" ? "Kevesebb megjelenitése" : "Show less",

    }
}
