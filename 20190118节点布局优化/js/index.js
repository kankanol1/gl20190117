(function(){
    const searchDiv = document.getElementById("searchId");
    const searchInput = document.getElementById('search');

    const c = document.getElementById('canvas');
// c.width = document.documentElement.clientWidth * 0.8;
// c.height = document.documentElement.clientHeight *0.8;
//固定画布大小



    c.width = 1000;
    c.height = 700;
    const ct = c.getContext('2d');
//剔除重复数据
    function checkData(data){
        let newData = [];
        for(let i=0;i<data.length;i++){
            let flag = 0;
            for(let j=i+1;j<data.length;j++){
                if(data[i].id == data[j].id){
                    flag =1;
                }
            }
            if(flag ==0){
                newData.push(data[i]);
            }
        }
        return newData;
    }

//创建div显示企业的详细信息
    function  createElementDiv(dataInfo,m,nodes){
        let oDiv;
        oDiv = document.createElement('div');
        oDiv.className = "insert";
        if(dataInfo.name){
            console.log(dataInfo);
            const h4 = document.createElement('h4');
            const p = document.createElement('p');
            h4.innerHTML = dataInfo.name +"<a href='http://www.gl-data.com/'>查看详细信息>></a>";
            p.innerHTML = "名称："+"<span>"+ dataInfo.name +"</span>";
            hr = document.createElement('hr');
            oDiv.appendChild(h4);
            oDiv.appendChild(hr);
            oDiv.appendChild(p);
        }
        if(dataInfo.ctype){
            const p = document.createElement('p');
            p.innerHTML = "性质："+"<span>"+ dataInfo.ctype+"</span>";
            oDiv.appendChild(p);
        }
        if(dataInfo.id){
            const p = document.createElement('p');
            p.innerHTML = "ID："+"<span>"+ dataInfo.id+"</span>";
            oDiv.appendChild(p);
        }
        if(dataInfo.type){
            const p = document.createElement('p');
            p.innerHTML = "类型："+"<span>"+ dataInfo.type+"</span>";
            oDiv.appendChild(p);
        }
        if(dataInfo.state){
            const p = document.createElement('p');
            p.innerHTML = "公司状态："+"<span>"+ dataInfo.state+"</span>";
            oDiv.appendChild(p);
        }
        if(dataInfo.time){
            const p = document.createElement('p');
            p.innerHTML = "注册时间："+"<span>"+ dataInfo.time+"</span>";
            oDiv.appendChild(p);
        }
        oDiv.style.left = nodes[m].position_X + 10 + 'px';
        oDiv.style.top = nodes[m].position_Y +  10 + 'px';
        oBox.appendChild(oDiv);
    }

//创建div显示企业支付关系图
    function createElementPay(link,nodes,x,y){
        let oDiv  = document.createElement('div');
        oDiv.className = 'pay';
        let h4 = document.createElement('h4');
        h4.innerHTML = "支付关系";
        let hr = document.createElement('hr');
        oDiv.appendChild(h4);
        oDiv.appendChild(hr);
        for(let i =0;i<nodes.length;i++){
            if(nodes[i].id == link.endNode){
                let p =document.createElement('p');
                p.innerHTML = "收款方：" + "<span>"+nodes[i].name+"</span>";
                oDiv.appendChild(p);
            }
            if(nodes[i].id == link.startNode){
                let p =document.createElement('p');
                p.innerHTML = "付款方：" + "<span>"+nodes[i].name+"</span>";
                oDiv.appendChild(p);
            }

        }
        if(link.count){
            let p =document.createElement('p');
            p.innerHTML = "支付次数：" + "<span>"+link.count+"</span>";
            oDiv.appendChild(p);
        }
        oDiv.style.left = x + "px";
        oDiv.style.top= y + "px";
        oBox.appendChild(oDiv);
        drawLineTwo(checkIndex(link.startNode,nodes),checkIndex(link.endNode,nodes),link.count);

    }

    /*px:点的x坐标
      py:点的y坐标
      r:半径
      lw:线宽
      n:节点索引*/
//绘制中心节点
    function drawingC(px,py,r,lw,n,nodes){
        ct.beginPath();
        ct.lineWidth = lw;
        ct.fillStyle = "#ffea17";
        ct.strokeStyle = "#0f0";
        ct.arc(px,py,r, 0, Math.PI * 2);
        ct.fill();
        ct.stroke();
        setFont();//设置字体
        ct.fillText(nodes[n].propertyList.name.slice(0,5)+"...",px ,py - r-12);
        // ct.fillStyle = "#fff";

    }
//绘制叶子节点
    function drawingN(px,py,r,lw,n,nodes){
        ct.beginPath();
        ct.lineWidth = lw;
        ct.fillStyle = "#00f";
        ct.strokeStyle = "#fff";
        ct.arc(px,py,r, 0, Math.PI * 2);
        ct.fill();
        ct.stroke();
        setFont();//设置字体
        ct.fillText(nodes[n].propertyList.name.slice(0,5)+"...",px ,py - r-12);
        // ct.fillStyle = "#fff";

    }
//字体设置
    function setFont(){
        ct.fillStyle = "#000";
        ct.font = "lighter 12px Arial";
        ct.textAlign = "center";
        ct.textBaseline = "middle";
    }
    function setTitle(){
        ct.fillStyle = "#000";
        ct.font = "lighter 20px Arial";
        ct.textAlign = "center";
        ct.textBaseline = "middle";
    }

//判断节点是否为中心节点
    function checkPoint(n,nodes,centerNodes){
        let flag = 0;
        for(let i=0;i<centerNodes.length;i++){
            if(nodes[n].id == centerNodes[i]){
                flag = 1;
            }
        }
        return flag;
    }

//根据id检测节点索引
    function checkIndex(id,nodes){
        for(let i=0;i<nodes.length;i++){
            if(id == nodes[i].id){
                return nodes[i];
            }
        }
    }

//通过id检查元素索引
//绘制箭头
    function drawTriangleRB(x,y,alpha,beta){
        ct.lineTo(x+10*Math.cos(beta - Math.PI/6),y+10*Math.sin(beta -Math.PI/6));
        ct.lineTo(x+10*Math.sin(alpha - Math.PI/6),y+10*Math.cos(alpha - Math.PI/6));
        ct.lineTo(x,y);
    }
    function drawTriangleRT(x,y,beta,alpha){
        ct.lineTo(x+10*Math.sin(beta - Math.PI/6),y-10*Math.cos(beta -Math.PI/6));
        ct.lineTo(x+10*Math.cos(alpha - Math.PI/6),y-10*Math.sin(alpha - Math.PI/6));
        ct.lineTo(x,y);
    }
    function drawTriangleLB(x,y,alpha,beta){
        ct.lineTo(x-10*Math.cos(beta - Math.PI/6),y+10*Math.sin(beta -Math.PI/6));
        ct.lineTo(x-10*Math.sin(alpha - Math.PI/6),y+10*Math.cos(alpha - Math.PI/6));
        ct.lineTo(x,y);
    }
    function drawTriangleLT(x,y,alpha,beta){
        ct.lineTo(x-10*Math.cos(beta - Math.PI/6),y-10*Math.sin(beta -Math.PI/6));
        ct.lineTo(x-10*Math.sin(alpha - Math.PI/6),y-10*Math.cos(alpha - Math.PI/6));
        ct.lineTo(x,y);
    }
//绘制连线
    function drawLine(nodeO,nodeT,pay){
        ct.beginPath();
        ct.lineWidth = 1;
        ct.strokeStyle = "#666";
        ct.fillStyle = "#666";
        let alpha = Math.atan(Math.abs(nodeO.position_X-nodeT.position_X)/Math.abs(nodeO.position_Y-nodeT.position_Y));
        let beta =  Math.atan(Math.abs(nodeO.position_Y-nodeT.position_Y)/Math.abs(nodeO.position_X-nodeT.position_X));

        ct.fillText("支付("+pay+")",(nodeO.position_X+nodeT.position_X)/2,(nodeO.position_Y+nodeT.position_Y)/2);

        if( nodeO.position_X>nodeT.position_X && nodeO.position_Y>nodeT.position_Y) {
            ct.moveTo(nodeO.position_X  - Math.cos(beta)*(radius+5) ,nodeO.position_Y - Math.sin(beta) * (radius+5));
            ct.lineTo(nodeT.position_X + Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  + Math.cos(alpha) * (radius+5)*0.5);
            drawTriangleRB(nodeT.position_X + Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  + Math.cos(alpha) * (radius+5)*0.5,alpha,beta);
        }
        if( nodeO.position_X>nodeT.position_X && nodeO.position_Y<=nodeT.position_Y) {
            ct.moveTo(nodeO.position_X  - Math.cos(beta)*(radius+5) ,nodeO.position_Y + Math.sin(beta) * (radius+5));
            ct.lineTo(nodeT.position_X + Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  - Math.cos(alpha) * (radius+5)*0.5);
            drawTriangleRT(nodeT.position_X + Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  - Math.cos(alpha) * (radius+5)*0.5,alpha,beta)

        }
        if( nodeO.position_X<=nodeT.position_X && nodeO.position_Y>nodeT.position_Y) {
            ct.moveTo(nodeO.position_X  + Math.cos(beta)*(radius+5) ,nodeO.position_Y - Math.sin(beta) * (radius+5));
            ct.lineTo(nodeT.position_X - Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  + Math.cos(alpha) * (radius+5)*0.5);
            drawTriangleLB(nodeT.position_X - Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  + Math.cos(alpha) * (radius+5)*0.5,alpha,beta)

        }
        if( nodeO.position_X<=nodeT.position_X && nodeO.position_Y<=nodeT.position_Y) {
            ct.moveTo(nodeO.position_X  + Math.cos(beta)*(radius+5) ,nodeO.position_Y + Math.sin(beta) * (radius+5));
            ct.lineTo(nodeT.position_X - Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  - Math.cos(alpha) * (radius+5)*0.5);
            drawTriangleLT(nodeT.position_X - Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  - Math.cos(alpha) * (radius+5)*0.5,alpha,beta)

        }

        ct.stroke();
        ct.fill();
        ct.lineWidth = 5;
    }
    function drawLineTwo(nodeO,nodeT,pay){
        ct.beginPath();
        ct.lineWidth = 1;
        ct.strokeStyle = "red";
        ct.fillStyle = "red";
        let alpha = Math.atan(Math.abs(nodeO.position_X-nodeT.position_X)/Math.abs(nodeO.position_Y-nodeT.position_Y));
        let beta =  Math.atan(Math.abs(nodeO.position_Y-nodeT.position_Y)/Math.abs(nodeO.position_X-nodeT.position_X));

        ct.fillText("支付("+pay+")",(nodeO.position_X+nodeT.position_X)/2,(nodeO.position_Y+nodeT.position_Y)/2);

        if( nodeO.position_X>nodeT.position_X && nodeO.position_Y>nodeT.position_Y) {
            ct.moveTo(nodeO.position_X  - Math.cos(beta)*(radius+5) ,nodeO.position_Y - Math.sin(beta) * (radius+5));
            ct.lineTo(nodeT.position_X + Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  + Math.cos(alpha) * (radius+5)*0.5);
            drawTriangleRB(nodeT.position_X + Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  + Math.cos(alpha) * (radius+5)*0.5,alpha,beta);
        }
        if( nodeO.position_X>nodeT.position_X && nodeO.position_Y<=nodeT.position_Y) {
            ct.moveTo(nodeO.position_X  - Math.cos(beta)*(radius+5) ,nodeO.position_Y + Math.sin(beta) * (radius+5));
            ct.lineTo(nodeT.position_X + Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  - Math.cos(alpha) * (radius+5)*0.5);
            drawTriangleRT(nodeT.position_X + Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  - Math.cos(alpha) * (radius+5)*0.5,alpha,beta)

        }
        if( nodeO.position_X<=nodeT.position_X && nodeO.position_Y>nodeT.position_Y) {
            ct.moveTo(nodeO.position_X  + Math.cos(beta)*(radius+5) ,nodeO.position_Y - Math.sin(beta) * (radius+5));
            ct.lineTo(nodeT.position_X - Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  + Math.cos(alpha) * (radius+5)*0.5);
            drawTriangleLB(nodeT.position_X - Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  + Math.cos(alpha) * (radius+5)*0.5,alpha,beta)

        }
        if( nodeO.position_X<=nodeT.position_X && nodeO.position_Y<=nodeT.position_Y) {
            ct.moveTo(nodeO.position_X  + Math.cos(beta)*(radius+5) ,nodeO.position_Y + Math.sin(beta) * (radius+5));
            ct.lineTo(nodeT.position_X - Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  - Math.cos(alpha) * (radius+5)*0.5);
            drawTriangleLT(nodeT.position_X - Math.sin(alpha) *(radius+5)*0.5,nodeT.position_Y  - Math.cos(alpha) * (radius+5)*0.5,alpha,beta)

        }

        ct.stroke();
        ct.fill();
        ct.lineWidth = 5;
    }
    let dataC,
        radius = 20,
        lineWidth = 5,
        oBox = document.getElementById('box');
    $.getJSON('./json/data.json','',function(dataInfo){
        dataC = dataInfo.data;
        console.log(dataC);
        let links = dataC.links,
            nodes = dataC.nodes,
            centerNodes = dataC.centerNodes;
        nodes = checkData(nodes);
        // console.log(nodes.length);
        //先用一部分数据展示效果
        // nodes = nodes.splice(0,25);
        // ct.lineWidth = lineWidth;
        //添加初始位置 调用优化布局函数 改变位置即可重绘
        //
        let space = 100;//画布的旁白空间
        for(let i=0;i<nodes.length;i++){
            nodes[i].position_X = (c.width - 2 * space) * Math.random() + space;
            nodes[i].position_Y = (c.height - 2 * space) * Math.random() + space;
        }
        //添加基本常数初始数据
        for(let i=0;i<nodes.length;i++){
            let flag = 0;
            nodes[i].index = 0;
            for(let j=0;j<centerNodes.length;j++){
                if(nodes[i].id == centerNodes[j]){
                    flag = 1;
                }
            }
            if(flag){
                nodes[i].radius = radius;
                nodes[i].lineWidth = lineWidth;
            }else{
                nodes[i].radius = radius * 0.5;
                nodes[i].lineWidth = lineWidth * 0.5;
            }
        }

        //绘制初始图形
        drawing(nodes);
        //绘制初始图形
        function drawing(){
            setTitle();
            ct.fillText("政企支付关系网络",c.width/2,40);
            for(let i=0;i<nodes.length;i++){
                if(checkPoint(i,nodes,centerNodes)){
                    drawingC(nodes[i].position_X,nodes[i].position_Y,nodes[i].radius,nodes[i].lineWidth,i,nodes);
                } else{
                    drawingN(nodes[i].position_X,nodes[i].position_Y,nodes[i].radius,nodes[i].lineWidth,i,nodes);
                }
            }
            for(let i=0;i<nodes.length;i++){
                for(let j=0;j<links.length;j++){
                    let id= links[j].id.split('-');
                    let idF = id[0];
                    let idL = id[2];
                    let linkPay = links[j].count;
                    let flag_line = -1;
                    if(nodes[i].id.toString() == idF){
                        // console.log("是否是中心点");
                        for(let k=0;k<nodes.length;k++){
                            if(nodes[k].id.toString() == idL){
                                flag_line = k;
                            }
                        }
                        // console.log(flag_line);
                        if(flag_line>-1){
                            drawLine(nodes[i],nodes[flag_line],linkPay);
                        }
                    }
                }
            }
            ct.fillStyle='red';
        }

        //做标记
        let flag_dra = 0;

        searchInput.onkeydown = function(ev){
            let e = ev || event;
            if(e.keyCode == "13"){
                const idNum = searchInput.value;
                // console.log(idNum);//测试
                let flag = -1;
                for(let i=0;i<nodes.length;i++){
                    if(nodes[i].id == idNum){
                        flag = i;
                    }
                }
                if(flag >-1){
                    console.log(idNum);
                    ct.beginPath();
                    ct.fillStyle = "red";
                    ct.arc(nodes[flag].position_X,nodes[flag].position_Y,radius*0.5,0,Math.PI*2);
                    ct.fill();
                }else{
                    alert("请核对id！");
                }
            }
        };

        //点击事件函数
        c.onmousedown = function(ev){
            if(oBox.querySelector('.insert')){
                let oDiv = oBox.querySelector('.insert');
                ct.clearRect(0,0,c.width,c.height);
                drawing();
                oBox.removeChild(oDiv);
            }else if(oBox.querySelector('.pay')){
                let oDiv = oBox.querySelector('.pay');
                ct.clearRect(0,0,c.width,c.height);
                drawing();
                oBox.removeChild(oDiv);
            }
            let oldTime = (new Date()).getTime();
            let ed = ev || event;
            let xd = ed.clientX - c.getBoundingClientRect().left;
            let yd = ed.clientY - c.getBoundingClientRect().top;
            let sq = -1;
            for(let i=0;i<nodes.length;i++){
                let sqVal = Math.sqrt(Math.pow(xd-nodes[i].position_X,2)+Math.pow(yd-nodes[i].position_Y,2));
                if(sqVal < radius + lineWidth){
                    sq = i
                }
            }
            if(sq > -1){
                document.onmousemove = function(ev){
                    let em = ev || event;
                    let xm = em.clientX - c.getBoundingClientRect().left;
                    let ym = em.clientY - c.getBoundingClientRect().top;
                    nodes[sq].position_X = xm;
                    nodes[sq].position_Y = ym;
                    ct.clearRect(0,0,c.width,c.height);
                    drawing();
                };
                document.onmouseup = function(ev){
                    document.onmousemove = document.onmouseup = null;
                    let newTime = (new Date()).getTime();
                    if(newTime-oldTime<200){
                        ct.clearRect(0,0,c.width,c.height);
                        drawing();
                        if(oBox.getElementsByClassName("insert").length){
                            for(let s =0;s<oBox.getElementsByClassName("insert").length;s++){
                                oBox.removeChild(oBox.getElementsByClassName("insert")[s]);
                            }
                        }
                        var event = ev || event;
                        var x = event.clientX - c.getBoundingClientRect().left;
                        var y = event.clientY - c.getBoundingClientRect().top;
                        checkC(x,y);
                        //判断点击位置和节点的距离
                        function checkC(x,y){
                            for(let i=0;i<nodes.length;i++){
                                if(Math.sqrt( Math.pow(x - nodes[i].position_X, 2) + Math.pow(y - nodes[i].position_Y, 2)) < nodes[i].radius+nodes[i].lineWidth){
                                    flag_dra += 1;
                                    if(flag_dra == 2){
                                        flag_dra -= 2;
                                        ct.clearRect(0,0,c.width,c.height);
                                        drawing();
                                        if(oBox.getElementsByClassName("insert").length){
                                            // console.log("测试点击消除");
                                            for(let s =0;s<oBox.getElementsByClassName("insert").length;s++){
                                                oBox.removeChild(oBox.getElementsByClassName("insert")[s]);
                                            }
                                        }

                                    }
                                    else {
                                        if(checkPoint(i,nodes,centerNodes)){
                                            ct.beginPath();
                                            ct.strokeStyle = "#dd63c5";
                                            ct.lineWidth = 5;
                                            ct.arc(nodes[i].position_X,nodes[i].position_Y, nodes[i].radius, 0, Math.PI * 2);
                                            ct.stroke();
                                        }else{
                                            ct.beginPath();
                                            ct.strokeStyle = "#0f0";
                                            ct.arc(nodes[i].position_X,nodes[i].position_Y, nodes[i].radius, 0, Math.PI * 2);
                                            ct.stroke();
                                        }
                                        createElementDiv(nodes[i].propertyList,i,nodes);
                                    }
                                }
                            }
                            if(oBox.querySelector('.insert')){
                                let oDiv = oBox.querySelector('.insert');
                                oDiv.addEventListener('click',function(){
                                    ct.clearRect(0,0,c.width,c.height);
                                    drawing();
                                    oBox.removeChild(oDiv);
                                    flag_dra=0
                                })
                            }
                        }
                    }
                }

                return false;
            }
            else{
                for(let j=0;j<links.length;j++){
                    let startNodeId = links[j].startNode;
                    let endNodeId = links[j].endNode;

                    let startPoint =  checkIndex(startNodeId,nodes);
                    let endPoint=  checkIndex(endNodeId,nodes);

                    let a = Math.sqrt(Math.pow(startPoint.position_X - endPoint.position_X,2) + Math.pow(startPoint.position_Y - endPoint.position_Y,2));
                    let b = Math.sqrt(Math.pow(startPoint.position_X - xd,2) + Math.pow(startPoint.position_Y - yd,2));
                    let c = Math.sqrt(Math.pow(endPoint.position_X - xd,2) + Math.pow(endPoint.position_Y - yd,2));
                    let p = (a+b+c)/2;
                    let h = 2*Math.sqrt(p*(p-a)*(p-b)*(p-c))/a;
                    let disX = (startPoint.position_X + endPoint.position_X)/2;
                    let disY = (startPoint.position_Y + endPoint.position_Y)/2;
                    let dis = Math.sqrt(Math.pow(disX - xd,2),Math.pow(disY - yd,2));
                    let angleA = Math.acos((a*a+c*c-b*b)/(2*a*c));
                    let angleB = Math.acos((a*a+b*b-c*c)/(2*a*b));
                    if(h<2 && angleA<Math.PI/2 && angleB<Math.PI/2 ){
                        createElementPay(links[j],nodes,xd,yd);
                        // console.log(angleA,angleA);//角度确认
                        return false;
                    }

                }
            }
        }
    });


})();

