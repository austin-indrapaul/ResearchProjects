let counter = 0;
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
    let bar_img_path = results["image_path"][0];
    let heat_img_path = results["image_path"][1];
    let description = results["description"];
    let external_link = results["external-link"];
    console.log(results["image_path"]);

    return (
        <div id={element.getAttribute("id")}>
            <h2 style={{"text-decoration": "underline"}}>{element.innerText}</h2>
            <div className="graph-component-inner">
              <div className="carousel-comp">
                <div id={"carousel-comp"+counter} class="carousel  carousel-dark slide" data-bs-ride="carousel" data-bs-interval="3000">
                  <div className="carousel-inner">
                     {
                     results["image_path"].map((data, index) => (
                        <div className={index === 0 ? "carousel-item active" : "carousel-item"}>
                            <img src={data} class="d-block  graph-component-image"
                                width="420" height="400" style={{"margin": "10px"}}/>
                        </div>
                     ))}
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target={"#carousel-comp"+counter} data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target={"#carousel-comp"+counter} data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>

                <p className = "graph-component-desc">{description}
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
                )}<br/>
                <br/>
                <button
                  data-category={element.getAttribute("id")}
                  className="btn btn-info"
                  onClick={getLatestNewsFunc}
                   data-bs-toggle="modal" data-bs-target="#my-modal"
                >
                  Get latest news &nbsp;&nbsp;<i className="bi bi-newspaper"></i>
                </button>
                </p>
            </div>
        </div>
      );
}

function getLatestNewsFunc(event){
    return new Promise((resolve, reject) => {
        loadTheDataInModal(event.target.getAttribute("data-category")).then(
        data => {
            console.log(data);
        }).catch(error => {
            reject(error)
            console.error(error);
          });
      });
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
    counter = counter + 1;
    document.getElementById("loader-component").style.display = "flex";
    result(element)
      .then(temp => {
        const existingElement = document.querySelector("#right-side");
        const newElement = document.createElement("div");
        newElement.setAttribute("class","graph-component")
        existingElement.appendChild(newElement);
        ReactDOM.render(temp, newElement);
        document.getElementById("loader-component").style.display = "none";
        //existingElement.scrollTop = existingElement.scrollHeight;
        existingElement.scrollTo({
          top: existingElement.scrollHeight,
          behavior: "smooth"
        });
    }).catch(error => {
        console.error(error);
      });
}


