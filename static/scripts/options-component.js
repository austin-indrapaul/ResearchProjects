var options = [
    {
        name:"population",
        display:"Get Population data year wise"
    },
    {
        name:"inflation",
        display:"Get Inflation data year wise"
    },
    {
        name:"gold-price",
        display:"Get Gold price data year wise"
    },
    {
        name:"oil-price",
        display:"Get Oil price data year wise"
    },
    {
        name:"s_p-index",
        display:"Get S&P index data year wise"
    },
    {
        name:"gni",
        display:"Get GNI data year wise"
    },
    {
        name:"realestate-index",
        display:"Get Realestate index data year wise"
    },
    {
        name:"IT-index",
        display:"Get IT index data year wise"
    }
]

function Options() {
  return (
     <ul className="list-group">
     <li className="list-group-item-dark text-center fw-bold insights">INSIGHTS</li>
      {options.map((data) => (
        <li id={data.name} className="list-group-item-dark list-group-item-action">{data.display}</li>
      ))}
     </ul>
   );
}
ReactDOM.render(<Options />, document.querySelector("#left-side"));

$(document).ready(function() {
//  $('.list-group-item-action').hover(function() {
//    $(this).toggleClass('black-glow');
//  });

  $('.insights').click(function() {
    addAnalyzer();
  });

  $('.list-group-item-action').click(function() {
    addResult(this); // check definition in graph-component
  });
});

function addAnalyzer(){
    const temp = getAnalyzerComponent()
    const existingElement = document.querySelector("#right-side");
    const newElement = document.createElement("div");
    newElement.setAttribute("class","analyzer-component")
    existingElement.appendChild(newElement);
    ReactDOM.render(temp, newElement);

    document.querySelectorAll('.analyzer-form').forEach(form=>
    {form.addEventListener('submit', event =>
    {
        event.preventDefault()
        submitForm()
    }
    )});
}

//function result(element) {
//    return new Promise((resolve, reject) => {
//           let results;
//           getResults(element.getAttribute('id'))
//          .then(data => {
//            console.log(data);
//            results = data;
//            console.log("resultset: "+results);
//            let resultSet = returnResult(results, element)
//            resolve(resultSet)
//            return resultSet;
//          })
//          .catch(error => {
//            reject(error)
//            console.error(error);
//          });
//      });
//}
