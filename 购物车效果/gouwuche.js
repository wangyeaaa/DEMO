window.onload=function(){
	var  ocartTable=document.getElementById("cartTable");
	var  otr=ocartTable.children[1].rows;
	var  len=otr.length;
	var  ocheckinput=document.getElementsByClassName("check");
	var  ocheckallinput=document.getElementsByClassName("check-all");
	var  oselecttotal=document.getElementById("selectedTotal");
	var  opriceTotal=document.getElementById("priceTotal");
	var  oselected=document.getElementById("selected");
	var  ofoot=document.getElementById("foot");
	var oselectedViewList=document.getElementById("selectedViewList");
	var deleteAll=document.getElementById("deleteAll");
	//声明字符串变量 用于拼接字符串


	//计算单个商品
	function subtotal(tr){
		var count=parseInt(tr.getElementsByTagName("input")[1].value);
		var price=parseFloat(tr.getElementsByClassName("price")[0].innerHTML);
		var subtotal=tr.getElementsByClassName("subtotal")[0];
		subtotal.innerHTML=parseFloat(price*count).toFixed(2);
	}
	//计算总价函数
	function getTotal(){
		var select=0, price=0;
		var htmlstr=" ";
		for(var i=0;i<len;i++){
			if(otr[i].getElementsByTagName("input")[0].checked){
				otr[i].className="on";
				select+=parseInt(otr[i].getElementsByTagName("input")[1].value);
				price+=parseFloat(otr[i].cells[4].innerHTML);
				htmlstr+='<div><img src="'+otr[i].getElementsByTagName('img')[0].src+'" alt="" /><span class="del" index="'+i+'">取消选择</span></div>';
			}else{
				otr[i].className="";
			}
			oselecttotal.innerHTML=select;
			opriceTotal.innerHTML=price.toFixed(2);
			oselectedViewList.innerHTML=htmlstr;
			
		}
		if(oselecttotal.innerHTML==0){
			ofoot.className="foot";
		  }
	}
	//选中商品
	for(var i=0;i<ocheckinput.length;i++){
		ocheckinput[i].onclick=function(){//全选功能
			if(this.className==="check-all check"){
				for(var j=0;j<ocheckinput.length;j++){
					ocheckinput[j].checked=this.checked;
				}
			}
			if(this.checked==false){
				for(var k=0;k< ocheckallinput.length;k++){
					ocheckallinput[k].checked=false;
				}
			}
			getTotal();
		}
	}
	//采用事件代理  商品在列表中删除
	oselectedViewList.onclick=function(e){

		e=e||window.event;//兼容IE7以下

		var el=e.srcElement;
		if(el.className=="del"){
			var index=el.getAttribute("index");
			var input=otr[index].getElementsByTagName("input")[0];
			input.checked=false;
			input.onclick();
		}
	}
	//商品列表展示
	oselected.onclick=function(){
		ofoot.className=(ofoot.className=="foot")?"foot show":"foot";
	}
	//商品数量增减  事件代理到每行tr元素上
	for(var i=0;i<len;i++){
		otr[i].onclick=function(e){
			e=e||window.event;
			var el=e.srcElement;
			var  input=this.getElementsByTagName("input")[1];
			var  val=parseInt(input.value);
			var reduce=this.getElementsByClassName("reduce")[0];
			if(el.className=="add"){
				input.value=val+1;
				subtotal(this);				//调用计算单个商品函数
			}
			if(el.className=="reduce"){
				if(val>1){
				      input.value=val-1;
				}
				if(val==1){
				}
				subtotal(this);	
			}
			if(el.className=="delete"){
				var conf=confirm("请确认删除?")
				if(conf){
					el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode);
				}
				
			}
				reduce.innerHTML=input.value>1?"-":" " ;
			getTotal();
		}

	//手动输入商品数量
	otr[i].getElementsByTagName("input")[1].onkeyup=function(){
		var val=parseInt(this.value);
		var  tr=this.parentNode.parentNode;
		var reduce=tr.getElementsByClassName("reduce")[0];
		if(val>1){
			reduce.innerHTML="-";
		}
		else if(val<1 ||isNaN(val)){
			val=1;
		}
		this.value=val;
		subtotal(tr);
		getTotal();
	}

}
deleteAll.onclick=function(){
	if(oselecttotal.innerHTML>0){
		var conf=confirm("确认删除？");
		if(conf){
		for(var i=0;i<len;i++){
			var input=otr[i].getElementsByClassName("check-one check")[0];
			if(input.checked){
				otr[i].parentNode.removeChild(otr[i]);
				i--;
			}
		     }
		}
	}
}
ocheckallinput[0].checked=true;//默认全部选中
ocheckallinput[0].onclick();

	

}