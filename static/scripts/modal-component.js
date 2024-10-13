function returnModal(results, element){
    let title = results[0];
    let description = results[1];

    return (
        <div className="modal-dialog  modal-xl modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modal-title"></h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body" id="modal-body">
                {description}
              </div>
              <div className="modal-footer">

              </div>
            </div>
        </div>
    );
}

function loadTheDataInModal(category){
        category = category.toUpperCase();
        document.getElementById("modal-title").innerHTML= "LATEST "+category+" RELATED NEWS ARTICLES"
        document.getElementById("modal-body").innerHTML= "<img src=\"./static/images/loader.gif\"></img>"
        return new Promise((resolve, reject) => {
               let results;
               getNewsResults(category)
              .then(data => {
                console.log(data);
                for (var key in data) {
                  console.log(key + ": " + data[key]);
                }
                results = data;
                if(data["text"].length > 0){
                    document.getElementById("modal-body").innerHTML=
                    "<h6>"+data["title"]+" - <i>"+data["author"]+" ("+data["publish_date"]+")"+"</i></h6>"+
                    "<p>"+data["text"]+"</p>";

                    document.getElementById("modal-title").innerHTML +=
                    ' : <meter id="myMeter" value="'+data["sentiment_level"]+'" min="-1" max="1" low="-0.25" high="0.25" optimum="1">'+data["sentiment_level"]+'</meter>';
                      const meter = document.getElementById("myMeter");
                      const value = data["sentiment_level"];
                      if (value > 0.5) {
                        meter.style.backgroundColor = "green";
                      } else if (value < -0.5) {
                        meter.style.backgroundColor = "red";
                      } else {
                        meter.style.backgroundColor = "yellow";
                      }
                    console.log("resultset: "+results);
                    document.getElementById("modal-title").innerHTML
                    resolve(results)
                } else {
                    document.getElementById("modal-body").innerHTML=
                        "<h6>No news to fetch or network error</h6";
                }
              })
              .catch(error => {
                reject(error)
                console.error(error);
              });
          });
         //document.getElementById("modal-title").innerHTML= "Latest "+category+" related news articles"
         //document.getElementById("modal-body").innerHTML= "Description of the news"
}


function getNewsResults(type){
    let results = {}
    return new Promise((resolve, reject) => {
    fetch('/fetch-news?type=' + type)
    .then(response => {
      if (!response.ok) {
        console.error('Network response was not ok / unable to fetch news');
        return {"text":""}
      }
      return response.json();
    })
    .then(data => {
        console.log("Data received: "+data)
        results=data;
        resolve(results)
        return results
    })
    .catch(error => {
        console.error('Error:', error);
        console.log("catch returning: "+results);
        reject(error)
        return results
    });
      });
}

function TheModal(){
      return (
       <div className="modal fade" id="my-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog  modal-xl modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modal-title">title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body" id="modal-body">
              </div>
              <div className="modal-footer">
              </div>
            </div>
            </div>
       </div>
      );
}
ReactDOM.render(<TheModal />, document.querySelector("#modal-container"));
