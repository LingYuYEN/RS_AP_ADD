// let url = 'http://103.3.63.116:5000/repair_infos'
let url = 'http://0.0.0.0:5000/repair_infos'

// let postObj = {
//     'username': 'admin',
//     'password': 'admin'
// }
//
// let jsonStr = JSON.stringify(postObj)
//
// $.ajax({
//     type: 'GET',
//     // url: 'https://petstore.swagger.io/v2/store/inventory',
//     // url: 'http://103.3.63.116:5000/Repair',
//     // url: 'http://0.0.0.0:5000/login',
//     // url: 'http://103.3.63.116:5000/repair_infos',
//     url: 'http://103.3.63.116:5000/users',
//     success: function (data) {
//         console.log(data)
//     },
//     error: function () {
//         console.log('error')
//     }
// })

let postObj = {
    "id": 1,
    'school': '玉田國小',
    'name': '黃主任',
    'tel': '0966888666',
    'device_type': '輔助教學軟體',
    'repair_description': '部分電腦沒安裝',
    'start_time': '2021-08-16 20:00:05',
    'end_time': null,
    'status': '未接案',
    'repair_record': null
}

let jsonStr = JSON.stringify(postObj)
$.ajax({
    type: 'POST',
    url: url,
    // url: localStorage.getItem('url') + 'repair_infos',
    dataType: 'json',
    data: jsonStr,
    contentType: "application/json",
    success: function (response) {
        console.log(response)
        console.log('success')
    },
    error: function () {
        console.log('error')
    }
})