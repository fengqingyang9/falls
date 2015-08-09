window.onload = function(){

    var aUl = document.getElementsByTagName('ul');
    var bBtn = true;

    window.onscroll = function(){

        var veiwHeight = document.documentElement.clientHeight;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;

        for(var i=0;i<aUl.length;i++){

            var aLi = aUl[i].getElementsByTagName('li');

            var lastLi = aLi[aLi.length-1];

            if(posTop(lastLi) < veiwHeight + scrollY && bBtn){

                bBtn = false;//注意这里开关的位置

                //实际开发中是在这里做个分页，来请求的
                ajax('js/data.txt',function(str){

                    var json = eval('('+ str +')');//注意这里解析json的方法，因为json是{}包住的，否则会报错

                    if(json.code){
                        bBtn = true;
                    }

                    for(var i=0;i<json.list.length;i++){
                        var list = json.list[i];

                        for(var j=0;j<list.src.length;j++){
                            var oLi = document.createElement('li');
                            oLi.innerHTML = '<img src="'+ list.src[j] +'" /><p>'+ list.title[j] +'</p>';
                            aUl[i].appendChild(oLi);
                        }

                    }

                });

            }

        }
    };

    function posTop(obj){
        var top = 0;

        while(obj){
            top += obj.offsetTop;
            obj = obj.offsetParent;
        }

        return top;
    }

};