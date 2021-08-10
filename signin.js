localStorage.setItem('url', 'http://0.0.0.0:5000/')
// 頁面載入完成後, 才會調用下列 func, 故須先 window onload
window.onload = function () {
    document.referrer
    localStorage.setItem('alias', null)
    localStorage.setItem('priority', null)
    let signin_btn = document.getElementById('signin_btn')

    signin_btn.onclick = function () {
        // let account_text_field = document.getElementById('inputAccount').value
        // let password_text_field = document.getElementById('inputPassword').value

        // let sign_url = localStorage.getItem('url') + 'login'
        let dataStr = {
            "username": "admin",
            "password": "admin"
        }
        $.ajax({
            type: "post",
            url: localStorage.getItem('url') + 'login',
            data: JSON.stringify(dataStr),
            success: function (data) {
                if (data === '未取得 token') {
                    alert('查無此帳號或密碼不正確！！')
                } else {
                    localStorage.setItem('alias', data['別名'])
                    localStorage.setItem('priority', data['權限'])
                    window.location.assign('repairInput.html')
                    // location.href='repairInput.html'
                }
            },
            error: function() {
                console.log('error')
            },
            dataType: 'json'
        });

        // let origin = ["*"]
        // $.ajax({
        //     type: 'POST',
        //     url: sign_url,
        //     // async: false,
        //     data: {
        //         "username": "string",
        //         "password": "string"
        //     },
        //     // dataType: 'json',  // 請求方式為jsonp
        //     // headers: {
        //     //     'Access-Control-Allow-Origin': origin,
        //     //     'Access-Control-Allow-Credentials': true,
        //     //     'Access-Control-Allow-Methods': '*',
        //     //     'Access-Control-Allow-Headers': '*',
        //     // },
        //     contentType: "application/json",
        //     success: function (data) {
        //         if (data === '未取得 token') {
        //             alert('查無此帳號或密碼不正確！！')
        //         } else {
        //             localStorage.setItem('alias', data['別名'])
        //             localStorage.setItem('priority', data['權限'])
        //             location.href='repairInput.html'
        //             // location.href='http://103.3.63.116:80/RepairSystem/repairInput.html'
        //         }
        //     }
        // })
        // $.post(sign_url, {username: account_text_field, password: password_text_field}, function (data) {
        //     if (data === '未取得 token') {
        //         alert('查無此帳號或密碼不正確！！')
        //     } else {
        //         localStorage.setItem('alias', data['別名'])
        //         localStorage.setItem('priority', data['權限'])
        //         window.location.assign('repairInput.html')
        //         // location.href='repairInput.html'
        //     }
        // })
    }
}