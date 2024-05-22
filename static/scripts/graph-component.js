function result(element) {
    return new Promise((resolve, reject) => {
           let results;
           getResults(element.getAttribute('id'))
          .then(data => {
            console.log(data);
            for (var key in data) {
              console.log(key + ": " + data[key]);
            }
            results = data;
            console.log("resultset: "+results);
            let resultSet = returnResult(results, element)
            resolve(resultSet)
            return resultSet;
          })
          .catch(error => {
            reject(error)
            console.error(error);
          });
      });
}

function returnResult(results, element){
    let img_path = results["image_path"];
    let description = results["description"];
    let external_link = results["external-link"];

    return (
        <div id={element.getAttribute("id")}>
            <h2 style={{"text-decoration": "underline"}}>{element.innerText}</h2>
            <div className="graph-component-inner">
                <img classname = "graph-component-image" src={img_path}
            width="400" height="400" style={{"margin-right": "20px"}}/>
                <p classname = "graph-component-desc">{description}
                <br/>
                <br/>
                {external_link !== "" && (
                  <a
                    target="_blank"
                    href={external_link}
                    data-category={element.getAttribute("id")}
                    className="btn btn-warning"
                  >visit external link &nbsp;&nbsp;<i className="bi bi-box-arrow-up-right"></i>
                  </a>
                )}
                </p>
            </div>
        </div>
      );
}

function getResults(type){
    let results = {}
    return new Promise((resolve, reject) => {
    fetch('/get-graph-component/' + type)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
        console.log("Data received: "+data)
        for (var key in data) {
          console.log(key + ": " + data[key]);
        }

        results["image_path"]=data["image_path"];
        results["description"]=data["description"];
        results["external-link"]=data["external_link"];
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

function addResult(element){
    result(element)
      .then(temp => {
        const existingElement = document.querySelector("#right-side");
        const newElement = document.createElement("div");
        newElement.setAttribute("class","graph-component")
        existingElement.appendChild(newElement);
        ReactDOM.render(temp, newElement);
    }).catch(error => {
        console.error(error);
      });
}

//function addResult(element){
//    let temp = result(element);
//    const existingElement = document.querySelector("#right-side");
//    const newElement = document.createElement("div");
//    newElement.setAttribute("class","graph-component")
//    existingElement.appendChild(newElement);
//    ReactDOM.render(temp, newElement);
//}


