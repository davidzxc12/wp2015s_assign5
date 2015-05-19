 var change = function(t1) {
     return Math.round(((t1 - 32) * 5) / 9);
 }
 var state_judge = function(p1, p2,p3) {
     var temp_status = p2;
     if (temp_status.search("Sunny") >= 0)
         skycons.set(p1, Skycons.CLEAR_DAY);
     else if (temp_status.search("Clear") >= 0)
         skycons.set(p1, Skycons.CLEAR_NIGHT);
     else if (temp_status.search("Cloudy") >= 0) {
         if (temp_status.search("Partly") >= 0) {
             if (p3[5] === "pm")
                 skycons.set(p1, Skycons.PARTLY_CLOUDY_NIGHT);
             else
                 skycons.set(p1, Skycons.PARTLY_CLOUDY_DAY);
         } else
             skycons.set(p1, Skycons.CLOUDY);
     } 
     else if (temp_status.search("Rain") >= 0 || temp_status.search("shower") >= 0 || temp_status.search("storms") >= 0) {
         skycons.set(p1, Skycons.RAIN);
     } 
     else if (temp_status.search("Wind") >= 0)
         skycons.set(p1, Skycons.WIND);
     else if (temp_status.search("Fog") >= 0)
         skycons.set(p1, Skycons.FOG);
     else if (temp_status.search("Snow") >= 0)
         skycons.set(p1, Skycons.SNOW);
 }
 var query = function(city) {
     $.getJSON(
         'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D"' + city + '")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', {},
         function(data, status) {
             console.log('data', data);
             $('.temperature').text(Math.round(change(data.query.results.channel.item.condition.temp)));
             var date = data.query.results.channel.item.condition.date;
             date = date.split(' ');
             $('.status').text(': ' + data.query.results.channel.item.condition.text);
             $('.date').text(date[1] + ' ' + date[2] + '' + date[3]);
             $("thead > tr >th:nth-child(1)").text(data.query.results.channel.item.forecast[1].date);
             $("thead > tr >th:nth-child(2)").text(data.query.results.channel.item.forecast[2].date);
             $("thead > tr >th:nth-child(3)").text(data.query.results.channel.item.forecast[3].date);
             $(".forecast_temp > td:nth-child(1)").text(change(data.query.results.channel.item.forecast[1].low) + '-' + change(data.query.results.channel.item.forecast[1].high) + "℃");
             $(".forecast_temp > td:nth-child(2)").text(change(data.query.results.channel.item.forecast[2].low) + '-' + change(data.query.results.channel.item.forecast[2].high) + "℃");
             $(".forecast_temp > td:nth-child(3)").text(change(data.query.results.channel.item.forecast[3].low) + '-' + change(data.query.results.channel.item.forecast[3].high) + "℃");
             state_judge("today",data.query.results.channel.item.condition.text,date);
             state_judge("day1",data.query.results.channel.item.forecast[1].text,date);
             state_judge("day2",data.query.results.channel.item.forecast[2].text,date);
             state_judge("day3",data.query.results.channel.item.forecast[3].text,date);

         }
     );


 };
 $(function() {
     query('taipei');
     $('#dropdown li').on('click', function() {
         $('button').text($(this).text());
         query($(this).attr("id"));
     });
 });
