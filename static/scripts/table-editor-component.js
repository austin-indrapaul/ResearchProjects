function show_table_editor(){
    document.getElementById("modalTableEditor-body").innerHTML= "<img src=\"./static/images/loader.gif\"></img>";
    return new Promise((resolve, reject) => {
        fetch('/fetch-data-table')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
            console.log("Data received: "+data)
            var jsonData = JSON.parse(data);
            console.log(jsonData);
            populateTheData(jsonData)
        })
        .catch(error => {
            console.error('Error:', error);
            reject(error)
        });
      });
}

function populateTheData(jsonData) {
    console.table(jsonData);
    let table = document.createElement('table');

    // Create table header row dynamically based on the keys in the JSON data
    let headerRow = document.createElement('tr');
    Object.keys(jsonData[0]).forEach(function(key) {
      let th = document.createElement('th');
      th.textContent = key;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create table rows dynamically based on the JSON data
    jsonData.forEach(function(obj) {
      let row = document.createElement('tr');
      Object.values(obj).forEach(function(value) {
        let td = document.createElement('td');
        td.textContent = value;
        row.appendChild(td);
      });
      table.appendChild(row);
    });

    document.getElementById("modalTableEditor-body").innerHTML="";
    document.getElementById("modalTableEditor-body").appendChild(table);
}

function ModalTableEditor(){
      return (
       <div className="modal fade" id="modalTableEditor" tabindex="-1" aria-labelledby="modalTableEditor" aria-hidden="true">
            <div id="modalTableEditor-xl" className="modal-dialog modal-xl modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalTableEditor-title">Data Editor</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body" id="modalTableEditor-body">
              </div>
              <div className="modal-footer">
              </div>
            </div>
            </div>
       </div>
      );
}
ReactDOM.render(<ModalTableEditor />, document.querySelector("#modalTableEditor-container"));