const unit_w = 0.88;
const unit_e = 0.86;

function up_cost() {
    var inpIds = getInputId();
    var val = {
        lst_e: document.getElementById(inpIds[0]).value,
        lst_w: document.getElementById(inpIds[1]).value,
        this_e: document.getElementById(inpIds[2]).value,
        this_w: document.getElementById(inpIds[3]).value,
        total_e: document.getElementById(inpIds[4]).value,
        total_w: document.getElementById(inpIds[5]).value
    };
    var up_eleCost = (Number(val.this_e) - Number(val.lst_e)) * unit_e;
    var up_ele = document.getElementById("up_ele");
    up_eleCost = parseFloat(up_eleCost.toFixed(2));
    console.log(up_eleCost);
    up_ele.innerHTML = up_eleCost + "元";

    var up_watCost = (Number(val.this_w) - Number(val.lst_w)) * unit_w;
    up_wat = document.getElementById("up_wat");
    up_wat.innerHTML = up_watCost + "元";

    var total_up = up_eleCost + up_watCost;
    total_up = parseFloat(total_up.toFixed(2));
    var up_total = document.getElementById("up_total");
    up_total.innerHTML = total_up + "元";

    var up = {
        up_eleCost: up_eleCost,
        up_watCost: up_watCost,
        total_up: total_up
    };

    return up;

}

function down_cost() {
    var inpIds = getInputId();
    var val = {
        lst_e: document.getElementById(inpIds[0]).value,
        lst_w: document.getElementById(inpIds[1]).value,
        this_e: document.getElementById(inpIds[2]).value,
        this_w: document.getElementById(inpIds[3]).value,
        total_e: document.getElementById(inpIds[4]).value,
        total_w: document.getElementById(inpIds[5]).value
    };
    var up = up_cost();

    var down_ele = document.getElementById("down_ele");

    var down_eleCost = Number(val.total_e) - Number(up.up_eleCost);

    down_eletCost = parseInt(down_eleCost).toFixed(2);
    down_ele.innerHTML = down_eleCost + "元";

    var down_wat = document.getElementById("down_wat");
    var down_watCost = Number(val.total_w) - Number(up.up_watCost);
    down_watCost = parseInt(down_watCost).toFixed(2);
    down_wat.innerHTML = down_watCost + "元";

    var total_down = Number(down_eleCost) + Number(down_watCost);
    total_down = parseInt(total_down).toFixed(2);
    var down_total = document.getElementById("down_total");
    down_total.innerHTML = total_down + "元";

    var down = {
        down_eleCost: down_eleCost,
        down_watCost: down_watCost,
        total_down: total_down
    };
    return down;

}

function getInputId() {
    var inpIds = [];
    for (var i = 0; i < 6; i++) {
        var inpId = document.getElementsByClassName('input')[i].getAttribute('id');
        inpIds.push(inpId);
    }
    return inpIds;


}

function getTipId() {
    var tipIds = [];
    for (var i = 0; i < 6; i++) {
        var tipId = document.getElementsByTagName('span').getAttribute('id');
        tipIds.push(tipId);
    }
    return tipIds;
}

function checkValues() {
    var inpIds = getInputId();
    var isSuccess = true;
    for (var i = 0; i < inpIds.length; i++) {
        var success = checkPerVal(inpIds[i]);
        if (!success) {
            isSuccess = false;
        }


    }
    return isSuccess;

}

function checkPerVal(inpId) {

    var val = document.getElementById(inpId).value;
    console.log(val);
    if (!isNum(val)) {

        warnTip(inpId);
        return false;
    } else {

        clearWarnTip(inpId);
        return true;
    }

}


function isNum(val) {
    if (val == null || val.trim() == '') {
        return false;
    } else {
        return !isNaN(val);
    }
}

function warnTip(inpId) {

    var tipId = inpId + "_tip";
    document.getElementById(tipId).innerHTML = "请输入数字";


}

function clearWarnTip(id) {
    var tipId = document.getElementById(id + '_tip');
    tipId.innerHTML = "";
}

function begin() {
    var rel = checkValues();
    if (rel) {
        up_cost();
        down_cost;
        getData();
    }
}




/*
第一步，获得数据
*/
function getData() {
    var u = up_cost();
    var d = down_cost();
    var up_arr = [Number(u.up_eleCost), Number(u.up_watCost), Number(u.total_up)];
    var down_arr = [Number(d.down_eleCost), Number(d.down_watCost), Number(d.total_down)];
    setData(up_arr, down_arr);
    //console.log(down_arr[2]);
    return up_arr, down_arr;

}
/*
第二步，将数据交给图形
*/
function setData(up_arr, down_arr) {
    var myChart = echarts.init(document.getElementById('main'));
    var option = {
        title: {
            text: '水电费计算'
        },
        grid: {
            x: 40,
            y: 55,
            x2: 60,
            y2: 80,

        },
        tooltip: {},
        legend: {
            name: ['费用']
        },
        dataset: {
            source: [
                ['费用', '楼上', '楼下'],
                ['电费', up_arr[0], down_arr[0]],
                ['水费', up_arr[1], down_arr[1]],
                ['总费用', up_arr[2], down_arr[2]]
            ]
        },
        xAxis: {
            type: 'category',
            name: '分类'
        },

        yAxis: {
            name: '费用（元）',
            axisLine: {
                show: true
            }
        },
        series: [{
            type: 'bar',
            barWidth: 40
        },
        {
            type: 'bar',
            barWidth: 40
        }


        ]

    };

    myChart.setOption(option);

}