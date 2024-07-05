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
                document.getElementById("modal-body").innerHTML= data["news"]
                console.log("resultset: "+results);
                resolve(results)
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
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
        console.log("Data received: "+data)
        results["news"]=data;
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
    let results = ["Title of the model","lorem ipsum"];
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
