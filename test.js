// $.get('http://103.3.63.116:5000/login?username=admin&password=admin', function (data) {
//     console.log(data)
// })

// $.post(localStorage.getItem('url') + 'login', {username: 'admin', password: 'admin'}, function (data) {
//     console.log(data)
//     window.location.assign('signin.html')
// })

// $.ajax({
//     type: 'post',
//     // url: localStorage.getItem('url') + 'login',
//     url: 'http://127.0.0.1:5000/login',
//     data: {
//         'username': 'admin',
//         'password': 'admin'
//     },
//     headers: {
//         'access-control-allow-credentials': true,
//         'access-control-allow-origin': '*',
//         'content-type': 'application/json'
//     },
//     success: function (data) {
//         console.log(data)
//     }
// })

let postObj = {
    username: 'admin',
    password: 'admin'
}

let jsonStr = JSON.stringify(postObj)
// console.log(jsonStr)
$.ajax({
    type: 'POST',
    url: 'http://103.3.63.116:5000/login',
    // url: 'http://0.0.0.0:5000/login',
    dataType: 'json',
    data: jsonStr,
    success: function (data) {
        console.log(data)
    },
    error: function () {
        console.log('error')
    }
})

// $.get('http://103.3.63.116:5000/users', function (data) {
//     console.log(data)
// })