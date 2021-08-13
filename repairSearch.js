window.onload = function () {
    document.getElementById('show_alias_p').innerHTML = localStorage.getItem('alias')
    getRepairInfos('repair_tbody')
    localStorage.setItem('repair_id', '0')
    getTag()
}

function getTag() {
    let aTag = document.getElementById('connect_page')

    if (localStorage.getItem('repair_id') === '0') {
        aTag.setAttribute('href', 'javascript: alert(\'Error：請選擇欲查詢的項次\')')
        aTag.setAttribute('target', '')
    } else {
        aTag.setAttribute('href', 'repairSchedule.html')
        aTag.setAttribute('target', '_blank')
    }
}

function getRepairInfos(id) {
    let urlStr = localStorage.getItem('url') + 'repair_infos'
    let th_num = 1

    $.ajax({
        type: "GET",
        url: urlStr,
        dataType: "json",
        contentType: "application/json",
        headers: {
            "access-control-allow-credentials": true,
            "access-control-allow-headers": "access-control-allow-origin",
            "access-control-allow-methods": "*",
            "access-control-allow-origin": "*"
        },
        success: function (dataArr) {
            dataArr.forEach(function (data) {
                if (localStorage.getItem('alias') === '駐點工程師') {
                    let repair_tbody = document.getElementById(id)
                    let repair_tr = document.createElement('tr')
                    let repair_th = document.createElement('th')
                    let repair_td_school = document.createElement('td')
                    let repair_td_name = document.createElement('td')
                    let repair_td_tel = document.createElement('td')
                    let repair_td_device_type = document.createElement('td')
                    let repair_td_repair_description = document.createElement('td')
                    let repair_td_start_time = document.createElement('td')

                    repair_tr.id = 'repair_tr'

                    repair_th.innerHTML = th_num.toString()

                    repair_td_school.innerHTML = data.school
                    repair_td_name.innerHTML = data.name
                    repair_td_tel.innerHTML = data.tel
                    repair_td_device_type.innerHTML = data.device_type
                    repair_td_repair_description.innerHTML = data.repair_description
                    repair_td_start_time.innerHTML = data.start_time

                    repair_tbody.appendChild(repair_tr)
                    repair_tr.appendChild(repair_th)
                    repair_tr.appendChild(repair_td_school)
                    repair_tr.appendChild(repair_td_name)
                    repair_tr.appendChild(repair_td_tel)
                    repair_tr.appendChild(repair_td_device_type)
                    repair_tr.appendChild(repair_td_repair_description)
                    repair_tr.appendChild(repair_td_start_time)

                    // 點擊後選中 table cell
                    repair_tr.onclick = function () {
                        // 取得 table 中所有的 tr (Array)
                        let table = document.getElementById('repair_tb')
                        // let tbody = document.getElementById('repair_tbody')
                        let trArray = table.getElementsByTagName('tr')

                        // index(0) 為 tr 名稱，故略過
                        for (let index = 1; index < trArray.length; index++) {
                            // 變更選中前，先將所有 cell 移除 highlight
                            trArray[index].classList.remove('highlight')
                        }

                        // 再將選中的 cell 加入 hightlight
                        repair_tr.classList.add('highlight')

                        localStorage.setItem('repair_id', data['id'])

                        getTag()
                    }

                    th_num += 1
                }else if (data.school === localStorage.getItem('alias')) {
                    let repair_tbody = document.getElementById(id)
                    let repair_tr = document.createElement('tr')
                    let repair_th = document.createElement('th')
                    let repair_td_school = document.createElement('td')
                    let repair_td_name = document.createElement('td')
                    let repair_td_tel = document.createElement('td')
                    let repair_td_device_type = document.createElement('td')
                    let repair_td_repair_description = document.createElement('td')
                    let repair_td_start_time = document.createElement('td')

                    repair_tr.id = 'repair_tr'

                    repair_th.innerHTML = th_num.toString()

                    repair_td_school.innerHTML = data.school
                    repair_td_name.innerHTML = data.name
                    repair_td_tel.innerHTML = data.tel
                    repair_td_device_type.innerHTML = data.device_type
                    repair_td_repair_description.innerHTML = data.repair_description
                    repair_td_start_time.innerHTML = data.start_time

                    repair_tbody.appendChild(repair_tr)
                    repair_tr.appendChild(repair_th)
                    repair_tr.appendChild(repair_td_school)
                    repair_tr.appendChild(repair_td_name)
                    repair_tr.appendChild(repair_td_tel)
                    repair_tr.appendChild(repair_td_device_type)
                    repair_tr.appendChild(repair_td_repair_description)
                    repair_tr.appendChild(repair_td_start_time)

                    // 點擊後選中 table cell
                    repair_tr.onclick = function () {
                        // 取得 table 中所有的 tr (Array)
                        let table = document.getElementById('repair_tb')
                        // let tbody = document.getElementById('repair_tbody')
                        let trArray = table.getElementsByTagName('tr')

                        // index(0) 為 tr 名稱，故略過
                        for (let index = 1; index < trArray.length; index++) {
                            // 變更選中前，先將所有 cell 移除 highlight
                            trArray[index].classList.remove('highlight')
                        }

                        // 再將選中的 cell 加入 hightlight
                        repair_tr.classList.add('highlight')

                        localStorage.setItem('repair_id', data['id'])

                        getTag()
                    }

                    th_num += 1
                }
            })
            console.log(dataArr)
        },
        error: function (response) {
            console.log(response)
        }

    })
}





