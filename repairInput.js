localStorage.setItem('url', 'http://127.0.0.1:5000/')

window.onload = function () {
    console.log(
        localStorage.getItem('alias'),
        localStorage.getItem('priority')
    )
    document.getElementById('show_alias_p').innerHTML = localStorage.getItem('alias')
}

// 選擇鄉鎮市區
function getTownship() {
    let urlStr = localStorage.getItem('url') + 'users'
    let jqxhr = $.getJSON(urlStr, function (dataArr) {
        let townshipArray = []
        let result_township = []

        dataArr.forEach(function (data) {
            townshipArray.push(data['township'])
            result_township = townshipArray.filter(function (element, index, array) {
                return array.indexOf(element) === index;
            })
        })
        result_township.forEach(function (data) {
            $(document).ready(function () {
                $('#inputGroupSelect01').append('<option value="">' + data + '</option>')
            })
        })
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

        modalSchool.innerHTML = '申&ensp;告&ensp;學&ensp;校：' + schoolName
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

    let postObj = {
        id: 1,
        school: schoolName,
        name: getInputText('input01'),
        tel: getInputText('input02'),
        device_type: device_type,
        repair_description: getInputText('input03'),
        start_time: time
    }

    console.log(postObj)
    let json = JSON.stringify(postObj)
    $.ajax({
        type: 'POST',
        url: localStorage.getItem('url') + 'repair_infos',
        data: json,
        success: console.log('success'),
        dataType: 'json'
    })
}