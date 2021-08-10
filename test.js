let postObj = {
    'username': 'admin',
    'password': 'admin'
}

let jsonStr = JSON.stringify(postObj)
$.ajax({
    type: 'POST',
    url: 'http://103.3.63.116:5000/login',
    // url: 'http://0.0.0.0:5000/login',
    dataType: 'json',
    data: jsonStr,
    // headers: {
    //     "access-control-allow-origin": "*"
    // },
    contentType: "application/json",
    success: function (data) {
        console.log(data)
        // console.log(data.alias)
        // console.log(data.priority)
        // console.log(data["alias"])
        // console.log(data["priority"])
    },
    error: function () {
        console.log('error')
    }
})