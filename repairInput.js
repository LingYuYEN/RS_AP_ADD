window.onload = function () {
    document.getElementById('show_alias_p').innerHTML = localStorage.getItem('alias')
    if (localStorage.getItem('priority') === '1') {
        document.getElementById('inputGroupSelectDiv01').hidden = true
        document.getElementById('inputGroupSelectDiv02').hidden = true
    }
}

// 選擇鄉鎮市區
function getTownship() {
    let urlStr = localStorage.getItem('url') + 'aa_users'

    $.ajax({
        type: 'GET',
        url: urlStr,
        dataType: "json",
        contentType: "application/json",
        success: function (dataArr) {
            let townshipArray = [];
            let result_township = [];

            dataArr.forEach(function (data) {
                townshipArray.push(data['township'])
                result_township = townshipArray.filter(function (element, index, array) {
                    return array.indexOf(element) === index;
                });
            });
            result_township.forEach(function (data) {
                $(document).ready(function () {
                    $('#inputGroupSelect01').append('<option value="">' + data + '</option>')
                });
            });
        },
        error: function () {
            console.log('error')
        }
    })
}

function getSchool() {
}

function getInputText(obj) {
    let text = document.getElementById(obj)
    return text.value
}

function getRepairInfo() {
    function getAlert(obj) {
        $("#modal-body").empty()

        let modalBody = document.getElementById(obj)
        let modalSchool = document.createElement('p')
        let modalName = document.createElement('p')
        let modalTime = document.createElement('p')
        let modalTel = document.createElement('p')
        let now = new Date()
        let time = now.toLocaleString()

        modalSchool.innerHTML = '申&ensp;告&ensp;學&ensp;校：' + localStorage.getItem('alias')
        modalName.innerHTML = '申&ensp;請&ensp;人：' + getInputText('input01')
        modalTime.innerHTML = '申&ensp;告&ensp;時&ensp;間：' + time
        modalTel.innerHTML = '聯&ensp;絡&ensp;電&ensp;話：' + getInputText('input02')

        modalBody.appendChild(modalSchool)
        modalBody.appendChild(modalName)
        modalBody.appendChild(modalTel)
        modalBody.appendChild(modalTime)
    }

    $('button').click(function () {
        getAlert('modal-body')
    })
}

let device_type = ''
function selectAction() {
    $('#inputGroupSelect05').change(function () {
        device_type = $('#inputGroupSelect05 option:selected').text()
    })
}

function submitOnclick() {
    let now = new Date()
    let time = now.toLocaleString()
    let postObj
    if (localStorage.getItem('priority') === '0') {
        postObj = {
            "id": 1,
            "school": schoolName,
            "name": getInputText('input01'),
            "tel": getInputText('input02'),
            "device_type": device_type,
            "repair_description": getInputText('input03'),
            "start_time": time,
            "end_time": null,
            "status": "未接案",
            "repair_records": null
        }
    } else if (localStorage.getItem('priority') === '1') {
        postObj = {
            "id": 1,
            "school": localStorage.getItem('alias'),
            "name": getInputText('input01'),
            "tel": getInputText('input02'),
            "device_type": device_type,
            "repair_description": getInputText('input03'),
            "start_time": time,
            "end_time": null,
            "status": "未接案",
            "repair_records": null
        }
    }

    let jsonStr = JSON.stringify(postObj)
    $.ajax({
        type: 'POST',
        url: localStorage.getItem('url') + 'aa_repair_infos',
        dataType: 'json',
        data: jsonStr,
        contentType: "application/json",
        success: function () {
            console.log('success')
            location.href='repairSearch.html'
        },
        error: function (err) {
            console.log('error: ' + err)
        }
    })
}

function getAccount() {
    let inputAccount = document.getElementById('inputPasswordSelect01')
    inputAccount.value = localStorage.getItem('account')
    if (localStorage.getItem('priority') === '1') {
        inputAccount.setAttribute('disabled', 'disabled')
    }
}

function updatePassword() {
    let inputAccount = document.getElementById('inputPasswordSelect01').value
    let inputPassword = document.getElementById('inputPasswordSelect02').value
    let inputNewPassword = document.getElementById('inputPasswordSelect03').value

    let url = localStorage.getItem('url') + 'aa_repair_infos/aa_change_password?account=' + inputAccount + '&password=' + encodeURIComponent(inputPassword) + '&new_password=' + encodeURIComponent(inputNewPassword)
    $.ajax({
        type: 'POST',
        url: url,
        dataType: 'json',
        contentType: "application/json",
        success: function (response) {
            console.log(response)
            if (response == null) {
                alert('無此帳號或密碼錯誤！！')
            } else {
                alert('密碼已變更完成，請重新登入！！')
                window.location = 'signin.html'
            }
        },
        error: function () {
            console.log('error')
        }
    })
}