window.onload = function () {
    autoGetDetailInfos('detail_body')
    // console.log(localStorage.getItem('repair_id'))
    let case_closed_remark = document.getElementById('case_closed_remark')
    let alias = localStorage.getItem('alias')
    if (alias !== "慈暉工程師") {
        case_closed_remark.hidden = true
    }

}

let now = new Date()
let time = now.toLocaleString()

function getScheduleInfo() {

    let urlStr = localStorage.getItem('url') + 'aa_repair_infos/' + localStorage.getItem('repair_id')
    $.getJSON(urlStr, function (data) {
        let repair_schedule_div = document.getElementById('repair_schedule_div')
        let repair_schedule_school = document.createElement('label')
        let repair_schedule_name = document.createElement('label')
        let repair_schedule_tel = document.createElement('label')
        let repair_schedule_device_type = document.createElement('label')
        let repair_schedule_status = document.createElement('label')
        let repair_schedule_repair_description = document.getElementById('repair_description_id')
        let repair_schedule_start_time = document.getElementById('start_time_id')
        let repair_schedule_end_time = document.getElementById('end_time_id')
        let repair_schedule_change_status = document.createElement('button')

        repair_schedule_change_status.id = 'change_status_id'

        repair_schedule_school.classList.add('col-md-12', 'col-sm-6')
        repair_schedule_name.classList.add('col-md-12', 'col-sm-6')
        repair_schedule_tel.classList.add('col-md-12', 'col-sm-6')
        repair_schedule_device_type.classList.add('col-md-12', 'col-sm-6')
        repair_schedule_status.classList.add('col-md-12', 'col-sm-6')
        repair_schedule_change_status.classList.add('col-md-8', 'col-sm-6', 'btn', 'btn-outline-dark')

        repair_schedule_school.innerHTML = '學&ensp;校：' + data['school']
        repair_schedule_name.innerHTML = '申&ensp;告&ensp;人：' + data['name']
        repair_schedule_tel.innerHTML = '聯&ensp;絡&ensp;電&ensp;話：' + data['tel']
        repair_schedule_device_type.innerHTML = '設&ensp;備&ensp;類&ensp;型：' + data['device_type']
        repair_schedule_status.innerHTML = '狀&ensp;態：' + data['status']
        repair_schedule_repair_description.innerHTML = data['repair_description']
        repair_schedule_start_time.innerHTML = '【立案時間】 ' + data['start_time']

        repair_schedule_change_status.innerHTML = '工程師接案'
        repair_schedule_change_status.type = 'button'
        repair_schedule_change_status.onclick = function () {

            let urlStr = localStorage.getItem('url') + 'aa_repair_infos/' + localStorage.getItem('repair_id') + '/detail?repair_status=處理中'

            let putUrlStr = localStorage.getItem('url') + 'aa_repair_infos/' + localStorage.getItem('repair_id')

            let putObj = {
                id: 0,
                record_time: time,
                record_info: '慈暉工程師接案處理',
                record_user: '慈暉工程師'
            }

            let json = JSON.stringify(putObj)

            $.when(
                $.ajax({
                    url: urlStr,
                    type: 'PUT',
                    success: function(result) {
                        console.log(result)
                        window.location.reload()
                    }
                }),
                $.ajax({
                    url: putUrlStr,
                    type: 'PUT',
                    data: json,
                    contentType: "application/json",
                    success: function(result) {
                        console.log(result)
                        window.location.reload()
                    },
                    error: function () {
                        console.log('error')
                    }
                })
            )


            let detail_tbody = document.getElementById('detail_body')
            let detail_tr = document.createElement('tr')
            let detail_th = document.createElement('th')
            let detail_td_time = document.createElement('td')
            let detail_td_info = document.createElement('td')
            let detail_td_user = document.createElement('td')

            detail_th.classList.add('text-center')
            detail_th.scope = 'row'
            detail_th.innerHTML = '1'
            detail_td_time.innerHTML = time
            detail_td_info.innerHTML = '慈暉工程師接案處理'
            detail_td_user.innerHTML = '慈暉工程師'

            detail_tbody.appendChild(detail_tr)
            detail_tr.appendChild(detail_th)
            detail_tr.appendChild(detail_td_time)
            detail_tr.appendChild(detail_td_info)
            detail_tr.appendChild(detail_td_user)
        }

        if (localStorage.getItem('priority') === '1') {
            repair_schedule_change_status.hidden = true
            document.getElementById('inputStatusDiv').hidden = true
        }

        if (data['status'] === '處理中') {
            repair_schedule_change_status.hidden = true
        } else if (data['status'] === '已結案') {
            repair_schedule_end_time.innerHTML = '【結案時間】 ' + data['end_time']
            document.getElementById('button_hidden_obj').hidden = true
            repair_schedule_change_status.hidden = true
        } else {
            repair_schedule_end_time.innerHTML = '【結案時間】 ' + 'NA'
        }

        repair_schedule_div.appendChild(repair_schedule_school)
        repair_schedule_div.appendChild(repair_schedule_name)
        repair_schedule_div.appendChild(repair_schedule_tel)
        repair_schedule_div.appendChild(repair_schedule_device_type)
        repair_schedule_div.appendChild(repair_schedule_status)
        repair_schedule_div.appendChild(repair_schedule_change_status)
    })
}

function putRepairDetail() {
    let urlStr = localStorage.getItem('url') + 'aa_repair_infos/' + localStorage.getItem('repair_id')
    let text = document.getElementById('add_message')
    let putObj = {
        id: 0,
        record_time: time,
        record_info: text.value,
        record_user: localStorage.getItem('alias')
    }
    let json = JSON.stringify(putObj)
    $.ajax({
        url: urlStr,
        type: 'PUT',
        data: json,
        async: false,
        contentType: "application/json",
        success: function(result) {
            console.log(result)
        },
        error: function (error) {
            console.log(error)
        },
        done: function () {
            window.location.reload()
        }
    })

}
function autoGetDetailInfos(id) {
    let urlStr = localStorage.getItem('url') + 'aa_repair_infos/' + localStorage.getItem('repair_id')

    $.getJSON(urlStr, function (dataArr) {
        let detail_arr = dataArr.repair_record;
        if(detail_arr == null) {
            return console.log('no value')
        } else {
            detail_arr.forEach(function (data) {
                let detail_tbody = document.getElementById(id)
                let detail_tr = document.createElement('tr')
                let detail_th = document.createElement('th')
                let detail_td_time = document.createElement('td')
                let detail_td_info = document.createElement('td')
                let detail_td_user = document.createElement('td')
                // let detail_td_status = document.createElement('td')

                detail_th.classList.add('text-center')
                detail_th.scope = 'row'
                detail_th.innerHTML = data['id']
                detail_td_time.innerHTML = data['record_time']
                detail_td_info.innerHTML = data['record_info']
                detail_td_user.innerHTML = data['record_user']
                // detail_td_status.innerHTML = '處理中'

                detail_tbody.appendChild(detail_tr)
                detail_tr.appendChild(detail_th)
                detail_tr.appendChild(detail_td_time)
                detail_tr.appendChild(detail_td_info)
                detail_tr.appendChild(detail_td_user)
                // detail_tr.appendChild(detail_td_status)
            });
        }
    })
}

function getDetailInfos(id) {
    let urlStr = localStorage.getItem('url') + 'aa_repair_infos/' + localStorage.getItem('repair_id')

    $.getJSON(urlStr, function (dataArr) {
        let detail_arr = dataArr.repair_record;
        if(detail_arr == null) {
            return console.log('no value')
        } else {
            detail_arr.forEach(function (data) {
                let detail_tbody = document.getElementById(id)
                let detail_tr = document.createElement('tr')
                let detail_th = document.createElement('th')
                let detail_td_time = document.createElement('td')
                let detail_td_info = document.createElement('td')
                let detail_td_user = document.createElement('td')
                // let detail_td_status = document.createElement('td')

                detail_th.classList.add('text-center')
                detail_th.scope = 'row'
                detail_th.innerHTML = data['id']
                detail_td_time.innerHTML = data['record_time']
                detail_td_info.innerHTML = data['record_info']
                detail_td_user.innerHTML = data['record_user']
                // detail_td_status.innerHTML = '處理中'

                detail_tbody.appendChild(detail_tr)
                detail_tr.appendChild(detail_th)
                detail_tr.appendChild(detail_td_time)
                detail_tr.appendChild(detail_td_info)
                detail_tr.appendChild(detail_td_user)
                // detail_tr.appendChild(detail_td_status)
            }).done(function () {
                window.location.reload()
            })
        }
    })
}

let statusSelect = '處理中'
function selectStatusAction() {
    $('#inputStatus').change(function () {
        statusSelect = $('#inputStatus option:selected').text()
        // 變更狀態
        let urlStr = localStorage.getItem('url') + 'aa_repair_infos/' + localStorage.getItem('repair_id') + '/detail?repair_status=' + statusSelect
        $.ajax({
            url: urlStr,
            type: 'PUT',
            contentType: "application/json",
            success: function(result) {
                console.log(result)
                window.location.reload()
            }
        })

        if (statusSelect === '已結案') {
            // 加入結案時間, 狀態, 結案註解
            let putUrlStr = localStorage.getItem('url') + 'aa_repair_infos/' + localStorage.getItem('repair_id') + '/end_time?end_time=' + time
            let putStatusStr = localStorage.getItem('url') + 'aa_repair_infos/' + localStorage.getItem('repair_id') + '/detail?repair_status=' + statusSelect
            let putFinalMessageUrlStr = localStorage.getItem('url') + 'aa_repair_infos/' + localStorage.getItem('repair_id')

            let putObj = {
                id: 0,
                record_time: time,
                record_info: '慈暉工程師結案',
                record_user: '慈暉工程師'
            }
            let json = JSON.stringify(putObj)
            $.when(
                $.ajax({
                    url: putStatusStr,
                    type: 'PUT',
                    contentType: "application/json",
                    success: function(result) {
                        console.log(result)
                        window.location.reload()
                    }
                }),
                $.ajax({
                    url: putUrlStr,
                    type: 'PUT',
                    contentType: "application/json",
                    success: function(result) {
                        console.log(result)
                        window.location.reload()
                    }
                }),
                $.ajax({
                    url: putFinalMessageUrlStr,
                    type: 'PUT',
                    data: json,
                    contentType: "application/json",
                    success: function(result) {
                        console.log(result)
                    }
                })
            )
        }


    })
}
