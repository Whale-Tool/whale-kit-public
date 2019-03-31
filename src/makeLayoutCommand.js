import sketch from 'sketch'
import Sketch from 'sketch/dom'
import BrowserWindow from 'sketch-module-web-view'

var Group = Sketch.Group;
var Text = Sketch.Text;
var Rectangle = Sketch.Rectangle;
var Shape = Sketch.Shape;
var Document = Sketch.Document;

var document = Document.getSelectedDocument();

var page = document.selectedPage;

var selection = document.selectedLayers;

var buttonRect = "";

selection.forEach(layer => (buttonRect=layer));

var ceilStyle = buttonRect.style;


if(!buttonRect){//选择一个矩形
    sketch.UI.message("Please select a Rectangle!")
}else{
    let win = new BrowserWindow({
        width: 469,
        height: 282,
        title:"Make Layout",
        resizable:false,
        minimizable:false,
        maximizable:false,
        closable:true
    })
    win.on('closed', () => {
        win = null
    });

    // Load a localhost URL
    // const Panel = `http://localhost:8000/pagelayout.html#${Math.random()}`;
    // win.loadURL(Panel);

    win.loadURL('http://whalexplorer.coding.me/whale-kit/pagelayout.html');


    const dist = (data,type) => {
        var dist = "";
        if(data.type == 1){
            if(type=="height"){
                dist = (buttonRect.frame[type]-(data.rows-1)*data.rowMargin)/data.rows;
            }else{
                dist = (buttonRect.frame[type]-(data.columns-1)*data.columnMargin)/data.columns;
            }
        }else{
            if(type=="height"){
                if(data.proporData.type == 1){
                    dist = buttonRect.frame[type]/(data.proporData.row1+data.proporData.row2);
                }else{
                    dist = buttonRect.frame[type];
                }
            }else{
                if(data.proporData.type == 1){
                    dist = buttonRect.frame[type];
                }else{
                    dist = buttonRect.frame[type]/(data.proporData.column1+data.proporData.column2);
                }
            }
        }

        return dist;
    };

    const createGrid = (data,index,group) =>{//画grid ceil与位置
        var coordinate = {//每个ceil的坐标（1，2）
            x: Math.ceil(index/data.columns),
            y:  (index%data.columns == 0) ? data.columns : index%data.columns
        };

        //通过坐标coordinate与ceil的尺寸frameData，确定每个ceil的frame
        if(data.type==1){//等比
            var frame = {
                x:  (coordinate.y-1)*(data.frameData.width+data.columnMargin),
                y:  (coordinate.x-1)*(data.frameData.height+data.rowMargin),
                width: data.frameData.width,
                height: data.frameData.height
            };
        }else{//不等比
            const getCount = (index,type) => {
                var count = 0;
                for(var i=index;i>0;i--){//根据坐标获取此ceil是单个基本ceil的倍数
                    if(type=="x"){
                        count += data.proporData['row'+(coordinate.x-1)];//row1,row2的值
                    }else{
                        count += data.proporData['column'+(coordinate.y-1)];//column1,column2的值
                    }
                }
                return count;
            };
            var frame = {
                x:  data.frameData.width*(getCount(coordinate.y-1,"y")),
                y:  data.frameData.height*(getCount(coordinate.x-1,"x")),
                width: data.frameData.width*(data.proporData['column'+coordinate.y]),
                height: data.frameData.height*(data.proporData['row'+coordinate.x])
            };
        }

        //Create 单个ceil的group
        const groupitem = new Group({
            name: 'ceil group',
            parent: group
        })

        //Create Body(Group)-Item
        const rect = new Rectangle(frame.x, frame.y, frame.width, frame.height);
        const shape = new Shape({
            parent: groupitem,
            name: "item",
            frame: rect,
            style: ceilStyle,
        });

        if(data.showCoordinate){
            //Create Body(Group)-Text
            const text = new Text({
                text: coordinate.x + ","+coordinate.y,
                frame: rect,
                alignment: Text.Alignment.center,
                parent: groupitem,
                name: "text"
            })
            text.style.textAlign = "center";
            text.style.verticalAlignment = "center";
            text.style.fontSize = 12;
            text.style.lineHeight = frame.height;
            text.style.width = frame.width;
            text.style.height = frame.height;
        }

        shape.adjustToFit();
        groupitem.adjustToFit();

    }

    //执行webview的代码
    const makeLayout = (data) => {//布局代码
        var frameData = {//获取每一个ceil的size；不等比为最小的那个单位size
            width:dist(data,"width"),
            height:dist(data,"height")
        }

        data.frameData = frameData;

        //Create 最外层Group
        const layoutgroup = new Group({
            name: 'layout',
            parent: (buttonRect.parent || page),
            frame: buttonRect.frame
        });

        var frame = {
            x: 0,
            y: 0,
            width:buttonRect.frame.width,
            height:buttonRect.frame.height
        };

        //Create grid group
        const group = new Group({
            name: 'grid',
            parent: layoutgroup,
            frame: frame
        });

        //循环创建grid ceil
        for (var i=1;i<(data.rows*data.columns+1);i++){
            createGrid(data,i,group);
        }

        buttonRect.remove();
    };

    const closeWin = () =>{
        win.destroy();
        win.close();
    }

    var contents = win.webContents;

    //监听webview的事件：webview->plugin
    contents.on('fromwebview', function(s) {//获得webview设置的数据
        makeLayout(s);
        closeWin()
    });

    contents.on('closed', function(s) {
        closeWin();
    });
}

