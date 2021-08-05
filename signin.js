// 頁面載入完成後, 才會調用下列 func, 故須先 window onload
window.onload = function () {
    localStorage.setItem('alias', null)
    localStorage.setItem('priority', null)
    let signin_btn = document.getElementById('signin_btn')

    signin_btn.onclick = function () {
        let account_text_field = document.getElementById('inputAccount').value
        let password_text_field = document.getElementById('inputPassword').value

        let sign_url = localStorage.getItem('url') + 'login'
        // let sign_url = localStorage.getItem('url') + 'login/' + 'admin/admin'

        $.get(sign_url, {username: account_text_field, password: password_text_field}, function (data) {
            if (data === '未取得 token') {
                alert('查無此帳號或密碼不正確！！')
            } else {
                localStorage.setItem('alias', data['別名'])
                localStorage.setItem('priority', data['權限'])
                location.href='repairInput.html'
            }
        })
        // location.href='repairInput.html'
        // console.log(sign_url)
    }
}