function RequestTo(url,method,data,headers={"Content-Type": "application/json","cache-control": "no-cache"}) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": method, 
        "headers": headers,
        "processData": false,
        "data": data
      }
 
      
      var request = $.ajax(settings);

      return(request)
      
}