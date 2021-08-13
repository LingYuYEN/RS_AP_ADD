// 頁面載入完成後, 才會調用下列 func, 故須先 window onload
window.onload = function () {
    localStorage.setItem('url', 'http://0.0.0.0:5000/')
    // localStorage.setItem('url', 'http://103.3.63.116:5000/')
    localStorage.setItem('alias', null)
    localStorage.setItem('priority', null)
}

let signin_btn = document.getElementById('signin_btn')

function signinBtnActive() {
    let account_text_field = document.getElementById('inputAccount').value
    let password_text_field = document.getElementById('inputPassword').value

    // let sign_url = localStorage.getItem('url') + 'login'
    let postObj = {
        'username': account_text_field,
        'password': password_text_field
    }

    let jsonStr = JSON.stringify(postObj)
    $.ajax({
        type: 'POST',
        url: localStorage.getItem('url') + 'login',
        dataType: 'json',
        data: jsonStr,
        contentType: "application/json",
        success: function (data) {
            if (data === '未取得 token') {
                alert('查無此帳號或密碼不正確！！')
            } else {
                localStorage.setItem('alias', data['alias'])
                localStorage.setItem('priority', data['priority'])
                // window.location.assign('repairInput.html')
                location.href='repairInput.html'
            }
        },
        error: function () {
            console.log('error')
        }
    })
}