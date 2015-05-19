 var change =function(t1){
 	return Math.round(((t1-32)*5)/9);
 }
 var query = function(city){
  $.getJSON(
    'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D"'+city+'")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
    {},
    function(data, status){
      console.log('data', data);
      $('.temperature').text(Math.round(change(data.query.results.channel.item.condition.temp)));
      var date=data.query.results.channel.item.condition.date;
      date=date.split(' ',4);
      $('.status').text(': '+data.query.results.channel.item.condition.text);
      $('.date').text(date[1]+' '+date[2]+''+date[3]);
      $("thead > tr >th:nth-child(1)").text(data.query.results.channel.item.forecast[1].date);
      $("thead > tr >th:nth-child(2)").text(data.query.results.channel.item.forecast[2].date);
      $("thead > tr >th:nth-child(3)").text(data.query.results.channel.item.forecast[3].date);
      $(".forecast_temp > td:nth-child(1)").text(change(data.query.results.channel.item.forecast[1].low)+'-'+change(data.query.results.channel.item.forecast[1].high)+ "℃");
      $(".forecast_temp > td:nth-child(2)").text(change(data.query.results.channel.item.forecast[2].low)+'-'+change(data.query.results.channel.item.forecast[2].high)+ "℃");
      $(".forecast_temp > td:nth-child(3)").text(change(data.query.results.channel.item.forecast[3].low)+'-'+change(data.query.results.channel.item.forecast[3].high)+ "℃");

    }
  );

  
};
$(function(){
	query('taipei');
	$('#dropdown li').on('click', function(){
    $('button').text($(this).text());
    query($(this).text());
});
});