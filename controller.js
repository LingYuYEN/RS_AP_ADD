function inactivityTime () {
    let t;
    // window.onload = resetTimer;

    // DOM Events
    window.onmousemove = resetTimer;
    window.onkeypress = resetTimer;
    //window.onmousedown = resetTimer; // catches touchscreen presses
    //window.onclick = resetTimer;     // catches touchpad clicks
    //window.onscroll = resetTimer;    // catches scrolling with arrow keys

    function logout() {
        if (window.location.href === "http://103.3.63.116/RS_AP_ADD/repairSearch.html") {
            // alert("系統閒置已 15 分鐘，頁面將自動關閉！")
            winClose()
        } else {
            alert("系統閒置已 15 分鐘，將自動登出！")
            window.location = "signin.html"
        }
    }

    function resetTimer() {
        clearTimeout(t)
        let sessionTimeoutWarning = 15; //min
        // let sTimeout = 5000
        let sTimeout = sessionTimeoutWarning * 60 * 1000
        // let sTimeout = parseInt(sessionTimeoutWarning) * 60 * 1000;
        t = setTimeout(logout, sTimeout)
        // 1000 milisec = 1 sec
    }
}

function winClose() {
    window.opener = null
    window.open('','_self')
    window.close()
}

inactivityTime ()
