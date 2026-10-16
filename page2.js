/* =========================================
   LARCK HOME JAVASCRIPT
========================================= */

/* =========================================
   SUPABASE
========================================= */

const SUPABASE_URL =
    "https://hxtwdzvnqtxoutdetfoy.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_hEot0ds6XIcLYo7Fj8xtUQ_0ICFxMBV";

const larckSupabase =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


/* =========================================
   TOP TABS
========================================= */

const topTabs = document.querySelectorAll(".top-tab");

topTabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

        topTabs.forEach(function (item) {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        const selectedTab = tab.dataset.tab;

        console.log("Selected Home tab:", selectedTab);

    });

});


/* =========================================
   SEARCH
========================================= */

const searchButton =
    document.getElementById("searchButton");

const homeSearch =
    document.getElementById("homeSearch");

const searchBackButton =
    document.getElementById("searchBackButton");

const homeSearchInput =
    document.getElementById("homeSearchInput");

const homeHeader =
    document.querySelector(".home-header");


/* OPEN SEARCH */

searchButton.addEventListener("click", function () {

    homeHeader.classList.add("search-active");
    homeHeader.classList.add("search-mode");

    homeSearch.classList.add("show");

    userSearchResults.innerHTML = "";
    userSearchResults.classList.remove("show");

    setTimeout(function () {
        homeSearchInput.focus();
    }, 100);
});

/* CLOSE SEARCH */

searchBackButton.addEventListener("click", function () {

    homeSearch.classList.remove("show");

    homeHeader.classList.remove("search-active");
    homeHeader.classList.remove("search-mode");

    homeSearchInput.value = "";

    userSearchResults.innerHTML = "";
    userSearchResults.classList.remove("show");
});


/* =========================================
   SEARCH LARCK USERS BY ID
========================================= */

const userSearchResults =
    document.getElementById("userSearchResults");


homeSearchInput.addEventListener("input", async function () {

    const searchValue =
        homeSearchInput.value.trim();


    /* CLEAR RESULTS */

    if (searchValue === "") {

        userSearchResults.innerHTML = "";

        userSearchResults.classList.remove("show");

        return;

    }


    /* SEARCH MESSAGE */

    userSearchResults.innerHTML = `
        <div class="user-search-message">
            Searching...
        </div>
    `;

    userSearchResults.classList.add("show");


    try {

        const { data, error } =
            await larckSupabase
                .from("profiles")
                .select("larck_id, username, profile_picture")
                .eq("larck_id", searchValue)
                .maybeSingle();


        if (error) {

            console.error(
                "LARCK ID search error:",
                error
            );

            userSearchResults.innerHTML = `
                <div class="user-search-message">
                    Something went wrong. Please try again.
                </div>
            `;

            return;

        }


        /* USER NOT FOUND */

        if (!data) {

            userSearchResults.innerHTML = `
                <div class="user-search-message">
                    No LARCK user found with this ID.
                </div>
            `;

            return;

        }


        /* USER FOUND */

        userSearchResults.innerHTML = `

            <div class="user-search-result" id="foundUserResult">

                <img
                    class="user-search-avatar"
                    src="${data.profile_picture || "default-avatar.png"}"
                    alt=""
                >

                <div class="user-search-info">

                    <div class="user-search-username">
                        ${data.username}
                    </div>

                    <div class="user-search-id">
                        ${data.larck_id}
                    </div>

                </div>

            </div>

        `;


        /* CLICK USER RESULT */

        const foundUserResult =
            document.getElementById("foundUserResult");


        foundUserResult.addEventListener(
            "click",
            function () {

                console.log(
                    "Opening profile:",
                    data.larck_id
                );

                // Open the person's profile using their LARCK ID
        window.location.href =
            "profile.html?id=" + encodeURIComponent(data.larck_id);

            }
        );


    } catch (error) {

        console.error(
            "Unexpected search error:",
            error
        );

        userSearchResults.innerHTML = `
            <div class="user-search-message">
                Something went wrong. Please try again.
            </div>
        `;

    }

});


/* =========================================
   NOTIFICATIONS
========================================= */

const notificationButton =
    document.getElementById("notificationButton");

notificationButton.addEventListener("click", function () {

    alert("Your LARCK notifications will appear here.");

});


/* =========================================
   COUNTRY SELECTOR
========================================= */

const countryMoreButton =
    document.getElementById("countryMoreButton");

const countryPopup =
    document.getElementById("countryPopup");

const closeCountryPopup =
    document.getElementById("closeCountryPopup");

const allCountryButton =
    document.getElementById("allCountryButton");


countryMoreButton.addEventListener("click", function () {

    countryPopup.classList.add("show");

});


closeCountryPopup.addEventListener("click", function () {

    countryPopup.classList.remove("show");

});


countryPopup.addEventListener("click", function (event) {

    if (event.target === countryPopup) {
        countryPopup.classList.remove("show");
    }

});


/* =========================================
   COUNTRY BUTTONS
========================================= */

const countryButtons =
    document.querySelectorAll(
        ".country-button, .all-countries button"
    );


countryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedCountry =
            button.textContent.trim();

        console.log(
            "Selected country:",
            selectedCountry
        );

        countryPopup.classList.remove("show");

        alert(
            selectedCountry +
            " selected."
        );

    });

});


allCountryButton.addEventListener("click", function () {

    alert("Showing parties from all countries.");

});


/* =========================================
   ACTIVITY
========================================= */

const activityButton =
    document.getElementById("activityButton");


activityButton.addEventListener("click", function () {

    alert(
        "LARCK Activity Center will open here."
    );

});


/* =========================================
   GAMES
========================================= */

const gamesButton =
    document.getElementById("gamesButton");


gamesButton.addEventListener("click", function () {

    alert(
        "LARCK Games Center will open here."
    );

});



/* =========================================
   LOAD REAL POPULAR PARTY ROOMS
========================================= */

const popularPartyGrid =
    document.getElementById("popularPartyGrid");

function getCountryFlag(country) {
    const flags = {
        "nigeria": "🇳🇬",
        "ghana": "🇬🇭",
        "kenya": "🇰🇪",
        "south africa": "🇿🇦",
        "united states": "🇺🇸",
        "usa": "🇺🇸",
        "united kingdom": "🇬🇧",
        "uk": "🇬🇧",
        "canada": "🇨🇦",
        "india": "🇮🇳",
        "philippines": "🇵🇭",
        "australia": "🇦🇺",
        "france": "🇫🇷",
        "germany": "🇩🇪",
        "brazil": "🇧🇷"
    };

    return flags[(country || "").trim().toLowerCase()] || "🌍";
}

function escapePartyText(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];
    });
}

async function loadPopularParties() {
    if (!popularPartyGrid) return;

    popularPartyGrid.innerHTML =
        '<div class="party-loading">Loading parties...</div>';

    try {
        const { data: rooms, error: roomsError } =
            await larckSupabase
                .from("rooms")
                .select("id, created_at, owner_id, name, room_id, label, is_locked")
                .order("created_at", { ascending: false });

        if (roomsError) throw roomsError;

        if (!rooms || rooms.length === 0) {
            popularPartyGrid.innerHTML =
                '<div class="party-loading">No parties available yet.</div>';
            return;
        }

        const ownerIds = [
            ...new Set(rooms.map(room => room.owner_id).filter(Boolean))
        ];

        const { data: profiles, error: profilesError } =
            await larckSupabase
                .from("profiles")
                .select("id, username, profile_picture, country, larck_id")
                .in("id", ownerIds);

        if (profilesError) throw profilesError;

        const profilesById = new Map(
            (profiles || []).map(profile => [profile.id, profile])
        );

        popularPartyGrid.innerHTML = "";

        rooms.forEach(function (room) {
            const profile = profilesById.get(room.owner_id);

            const username = profile?.username || room.name || "LARCK User";
            const LARCK_DEFAULT_AVATAR = "default-avatar.png";
            const profilePicture =profile?.profile_picture?.trim() || LARCK_DEFAULT_AVATAR;
            const countryFlag = getCountryFlag(profile?.country);
            const displayId = profile?.larck_id || room.room_id || "—";

            const card = document.createElement("article");
            card.className = "home-party-card";
            card.tabIndex = 0;
            card.dataset.roomId = room.room_id ?? "";
            card.dataset.roomRecordId = room.id ?? "";

            card.innerHTML = `
                <div class="party-cover">
                    <div class="party-top-left">
                        <span class="party-mic">🎙</span>
                        <span>Party</span>
                    </div>

                    <div class="party-live-count">
                        ${room.is_locked ? '<span aria-label="Locked">🔒</span>' : ""}
                    </div>

                    <div class="party-cover-image"></div>

                    <div class="party-bottom-info">
                        <div class="party-host-details">
                            <div class="party-country-id">
                                <span class="party-country-flag">${countryFlag}</span>
                                <span>ID: ${escapePartyText(displayId)}</span>
                            </div>

                            <h3 class="party-host-name">
                                ${escapePartyText(username)}
                            </h3>
                        </div>

                        <img
                            class="party-profile-picture"
                            src="${escapePartyText(profilePicture)}"
                            alt="Host profile picture"
                        >
                    </div>
                </div>
            `;

const coverImage = card.querySelector(".party-cover-image");
const avatar = card.querySelector(".party-profile-picture");

function useLarckAvatar() {
    coverImage.style.backgroundImage = `url("${LARCK_DEFAULT_AVATAR}")`;
    avatar.src = LARCK_DEFAULT_AVATAR;
}

coverImage.style.backgroundImage =
    `url("${profilePicture.replace(/["\\]/g, "\\$&")}")`;

coverImage.style.backgroundSize = "cover";
coverImage.style.backgroundPosition = "center";

avatar.addEventListener("error", useLarckAvatar, { once: true });

const coverTest = new Image();

coverTest.onload = function () {
    // The profile picture loaded successfully.
};

coverTest.onerror = useLarckAvatar;
coverTest.src = profilePicture;

popularPartyGrid.appendChild(card);
});

    } catch (error) {
        console.error("Could not load Popular Parties:", error);

        popularPartyGrid.innerHTML =
            '<div class="party-loading">Could not load parties. Please try again.</div>';
    }
}

loadPopularParties();

/* PARTY CARD CLICK */
if (popularPartyGrid) {
    popularPartyGrid.addEventListener("click", function (event) {
        const card = event.target.closest(".home-party-card");
        if (!card) return;

        const roomId = card.dataset.roomId;

        console.log("Selected room:", roomId);

        // Room-opening navigation can be connected to your actual room page.
    });

    popularPartyGrid.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") return;

        const card = event.target.closest(".home-party-card");
        if (!card) return;

        event.preventDefault();
        console.log("Selected room:", card.dataset.roomId);
    });
}



/* =========================================
   SEE ALL
========================================= */

const popularSeeAll =
    document.getElementById("popularSeeAll");


popularSeeAll.addEventListener("click", function () {

    alert(
        "All popular parties will appear here."
    );

});


/* =========================================
   CREATE PARTY
========================================= */

const createPartyButton =
    document.getElementById("createPartyButton");


createPartyButton.addEventListener("click", function () {

    alert(
        "Create Party screen will open here."
    );

});



/* =========================================
   CLOSE POPUPS WITH ESCAPE
========================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        countryPopup.classList.remove("show");

        homeSearch.classList.remove("show");

        homeHeader.classList.remove("search-active");
        homeHeader.classList.remove("search-mode");

        homeSearchInput.value = "";

        userSearchResults.innerHTML = "";
        userSearchResults.classList.remove("show");
    }
});


/* =========================================
   LARCK PAGE NAVIGATION
========================================= */

const bottomNavItems =
    document.querySelectorAll(".bottom-nav-item");


bottomNavItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const page =
            item.dataset.page;


        if (page === "home") {

            window.location.href = "page2.html";

        }

        else if (page === "party") {

            window.location.href = "page3.html";

        }

        else if (page === "message") {

            window.location.href = "page4.html";

        }

        else if (page === "me") {

            window.location.href = "page5.html";

        }

    });

});
