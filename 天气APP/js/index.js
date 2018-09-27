//$(function(){
//	获取当前城市的天气信息
	let tianqi;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
		dataType:"jsonp",
		success:function(obj){
			tianqi=obj.data;
			console.log(tianqi);
			updata(tianqi);
//			console.log(tianqi)		
		}
	})
	function updata(tianqi){
		//获取当前的城市
		$(".top>p>span").html(tianqi.weather.city_name)
		//获取当前城市的状况
		$(".kongqi").html(tianqi.weather.quality_level);
		$(".wendu").html(tianqi.weather.current_temperature+"°");
		$(".tianqi").html(tianqi.weather.current_condition);
		$(".feng").html(tianqi.weather.wind_direction);
		$(".shidu").html(tianqi.weather.wind_level+"级");
		$(".wendutody").html(tianqi.weather.dat_low_temperature+"°/"+tianqi.weather.dat_high_temperature+"°C");
		$(".tianqitody").html(tianqi.weather.dat_condition);
		$(".tubiao").attr("src","img/"+tianqi.weather.dat_weather_icon_id+".png")
		$(".wenduTo").html(tianqi.weather.tomorrow_low_temperature+"°/"+tianqi.weather.tomorrow_high_temperature+"°C");
		$(".tianqiTo").html(tianqi.weather.tomorrow_condition);
		$(".tubiao").attr("src","img/"+tianqi.weather.tomorrow_weather_icon_id+".png")
	    let info=tianqi.weather.hourly_forecast;
	    console.log(info)
	    info.forEach((v)=>{
	    	let str=`<li>
						<p class="time">${v.hour}:00</p>
						<img src="img/${v.weather_icon_id}.png"/>
						<p>${v.temperature}°</p>
					</li>`
	    	$(".forecastInfo").append(str);
	    })
	    let day=tianqi.weather.forecast_list;
	    console.log(day)
	    day.forEach((v)=>{
//	    	console.log(typeof v.date);
	    	let dates=v.date.slice(5,10).replace("-","/");
//	    	console.log(dates)
            let str1=`<li>
				<p>${dates}</p>
				<p>${v.condition}</p>
				<img src="img/${v.weather_icon_id}.png" alt="" />
				<p>${v.high_temperature}°</p>
				<p>${v.low_temperature}°</p>
				<img src="img/0.png" alt="" />
				<p>多云</p>
				<p>${v.wind_direction}</p>
				<p>${v.wind_level}</p>
			</li>`
            $(".container").append(str1);
	    })
	    	
	}
	
	//点击城市，出现城市
	$(".top>p>span").click(function(){
		$(".catogry").css({"display":"block"}).siblings().css({"display":"none"});
//		$(".city ul li").click(function(){
////		console.log(1)
//		let con1=$(this).html();	
//		console.log(con1);
//		ajaxs(con1);
//		$(".catogry").css({"display":"none"}).siblings().css({"display":"block"});
//		})
	})
	
	//点击取消
	$(".cancel").click(function(){
		$(".catogry").css({"display":"none"}).siblings().css({"display":"block"});
	})
	
	//15天预测
	let city;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/city/",
		dataType:"jsonp",
		success:function(obj){
			city=obj.data;
			console.log(city);
			updataCity(city);
		}
	})
	function updataCity(city){
		let k=0
		for(let i in city){
			let str2=`
			<p>${i}</p>
	    	<ul></ul>`;
			$(".city").append(str2);
			for(let j in city[i]){
				let str3=`
	    	    <li>${j}</li>
	    	   `
				$(".city>ul").eq(k).append(str3);
				
			}
			k++;
		}
	}

//})
//点击每个城市，获取当前城市的天气信息
window.onload=function(){
    	//点击城市
	$(".city ul li").click(function(){
		console.log(1)
		let con=$(this).html();	
		console.log(con);
		ajaxs(con);
		$(".catogry").css({"display":"none"}).siblings().css({"display":"block"});
	})
	
	//获取某个城市的天气信息
	function ajaxs(tianqi2){
		$(".container").html("");
		$(".forecastInfo").html("");
		let url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${tianqi2}`;
		console.log(tianqi2)
		
		$.ajax({
			type:"get",
			url:url1,
			dataType:"jsonp",
			success:function(obj){
				let tianqi2=obj.data;
				updata(tianqi2);
			}
		})
	}
//	获取搜索框中的天气信息
	$(".search>input").focus(function(){
		$(".cancel").html("搜索");
	})
//	点击搜索时,获取input中的内容进行搜索
	$(".cancel").click(function(){
		let text=$(".search>input").val();
		$(".catogry").css({"display":"none"}).siblings().css({"display":"block"});
	    for(let i in city){
	    
	    	for(let j in city[i]){
	    		if(text==j){
	    			ajaxs(text);
	    		}
	    	}
	    }
//	    alert("该城市不存在")
		
	})

}
