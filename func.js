const unit_w = 0.88;
const unit_e = 0.86;

function up_cost() {
    var val = getValue();

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
    var val = getValue();
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

function getInputIds() {
    var ids = [];
    for (var i = 0; i < 6; i++) {
        var id = document.getElementsByClassName('input')[i].getAttribute('id');
        ids.push(id);
    }
    //console.log(tip);
    return ids;
}

function getValue(this_e, lst_e, this_w, lst_w, total_e, total_w) {
    var this_e = document.getElementById("this_e").value;
    var lst_e = document.getElementById("lst_e").value;
    var this_w = document.getElementById("this_w").value;
    var lst_w = document.getElementById("lst_w").value;
    var total_e = document.getElementById("total_e").value;
    var total_w = document.getElementById("total_w").value;
    /*
        var value = {
            this_e: this_e,
            lst_e: lst_e,
            this_w: this_w,
            lst_w: lst_w,
            total_e: total_e,
            total_w: total_w
        };
        */

    return this_e, lst_e, this_w, lst_w, total_e, total_w;
}

function begin() {
    reset();
    var rel = checks();
    // getValue();
    // var tipId = getTipId();
    // var rel = isNotANumber(lst_e);

    if (rel) {
        up_cost();
        down_cost();
        getData();
    }

}

function reset() {
    var tipIds = getTipId();
    for (var i = 0; i < tipIds.length; i++) {
        clearInputWarn(tipIds[i]);
    }
}

function getTipId() {
    var tip = [];
    for (var i = 0; i < 6; i++) {
        var tipi = document.getElementsByTagName('span')[i].getAttribute('id');
        tip.push(tipi);
    }
    //console.log(tip);
    return tip;
}

function test() {
    var tipId = getTipId();


    var tip1 = document.getElementById(tipId[0]);
    tip1.innerHTML = "请输入数字";


    // console.log(tipId[0]);

}
function isNotANumber(this_e, lst_e, this_w, lst_w, total_e, total_w) {
    //var val = getValue();

    //console.log(val[v]);

    //console.log(val.v);
    if (parseFloat(lst_e).toString() == "NaN") {

        return true

    }

    else {
        return false;
    }


}
function lst_w() {
    var val = getValue();

    //console.log(val[v]);

    //console.log(val.v);
    if (parseFloat(val.lst_w).toString() == "NaN") {

        return true

    }

    else {
        return false;
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
        series: [
            { type: 'bar', barWidth: 40 },
            { type: 'bar', barWidth: 40 }


        ]

    };

    myChart.setOption(option);

}

function checks() {
    var ids = getInputIds();
    var isSuccess = true;
    for (var i = 0; i < ids.length; i++) {
        var success = check(ids[i]);
        if (!success) {
            isSuccess = false;
        }
    }
    return isSuccess;
}

function check(inputId) {
    var val = document.getElementById(inputId).value;
    if (!isNum(val)) {
        inputWarn(inputId + "_tip");
        return false;
    }
    return true;
}

function inputWarn(inputId) {
    document.getElementById(inputId).innerHTML = "请输入数字";
}

function clearInputWarn(inputId) {
    var tip = document.getElementById(inputId);
    tip.innerHTML = "";
}

function isNum(val) {
    if (val == null || val.trim() == '') {
        return false;
    }
    return !isNaN(val);
}