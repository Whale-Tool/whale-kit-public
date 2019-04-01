import sketch from 'sketch'
import Sketch from 'sketch/dom'

var Style = require('sketch/dom').Style;

var Document = Sketch.Document;

var document = Document.getSelectedDocument();

var selection = document.selectedLayers;

//state 颜色组
var stateColor = {
    active: "#767272",
    noamal: "#D8D8D8",
    disabled: "#857D7D"
};

//state 常量
var STATE_NOAMAL = "noamal";
var STATE_ACTIVE = "active";
var STATE_DISABLED = "disabled";

//state ，默认常量
var state = STATE_ACTIVE;

//循环属性数组，change color
const doColor = (name,styleName) =>{
    for(var i=0;i<name.length;i++){
        if(name[i][styleName] == Style.FillType.Color){
            name[i].color = stateColor[state];
            return;
        }

    }
};

//获取fills、borders属性数组，调用doColor change color
const changeColor = (layer) =>{
    var fills = layer.style.fills;
    fills && doColor(fills,"fill");
    var borders = layer.style.borders;
    borders && doColor(borders,"fillType");
};

//判断layer的不同类型，调用不同的处理函数
const doToggleState = (layer) =>{
    if(layer.type == "ShapePath"){
        changeColor(layer);
    }else if(layer.type == "Text"){
        layer.style.textColor = stateColor[state];
    }else if(layer.type == "Group"){
        doSelection(layer.layers);
    }else{
        sketch.UI.message("Please select with Group 、Text or ShapePath type!");
    }
};

//判断图层的数量，调用不同的方法处理
const doSelection = (selection) =>{
    doSelectionGrop(selection);
};

//处理图层组
const doSelectionGrop = (selection) =>{
    selection.forEach(layer => (
        doSelectionSingle(layer)
    ))
};

//处理单个图层
const doSelectionSingle = (layer) =>{
    doToggleState(layer)
};

//程序入口
if(selection){
    doSelection(selection);
}else{
    sketch.UI.message("Please select a layer or layers!");
}
