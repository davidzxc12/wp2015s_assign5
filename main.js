 $('.dropdown-toggle').dropdown()
  $.getJSON(
    'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D"'+$('button').text()+'")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
    {},
    function(data, status){
      console.log('data', data);
    }
  );
