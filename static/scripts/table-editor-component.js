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
let parameters = 0;
function populateTheData(jsonData) {
    console.table(jsonData);
    let form = document.createElement('form');
    let table = document.createElement('table');
    table.setAttribute('id', 'table-editor');

    // Create table header row dynamically based on the keys in the JSON data
    let headerRow = document.createElement('tr');
    Object.keys(jsonData[0]).forEach(function(key) {
      let th = document.createElement('th');
      th.textContent = key;
      headerRow.appendChild(th);
      parameters = parameters + 1;
    });
    table.appendChild(headerRow);

    // Create table rows dynamically based on the JSON data
    jsonData.forEach(function(obj) {
      let row = document.createElement('tr');
      Object.values(obj).forEach(function(value) {
        let td = document.createElement('td');
        //td.textContent = value;
        let input = document.createElement('input');
        input.classList.add('data-table-input');
        input.value = value
        td.appendChild(input);
        row.appendChild(td);
      });

      let td = document.createElement('td');
      td.innerHTML =
      "<button type=\"button\" class=\"btn btn-danger btn-sm delete-btn\" onclick=\"deleteRecord(event);\"><i class=\"bi bi-x-circle-fill\"></i></button>";
      row.appendChild(td);
      table.appendChild(row);
    });
    form.appendChild(table);
    document.getElementById("modalTableEditor-body").innerHTML="";
    document.getElementById("modalTableEditor-body").appendChild(form);

    let span1 = document.createElement('span');
    span1.innerHTML =
      "<button type=\"button\" class=\"btn btn-info delete-btn\" onclick=\"addRecord(event);\">Add new record <i class=\"bi bi-plus-circle-fill\"></i></button>";
    let header = document.getElementById("modalTableEditor-controls");
    header.appendChild(span1);
    let space = document.createElement('span');
    space.innerHTML = " &nbsp; "
    header.appendChild(space);
    let span2 = document.createElement('span');
    span2.innerHTML =
      "<button type=\"button\" class=\"btn btn-success delete-btn\" onclick=\"addRecord(event);\">Save & Regenerate model <i class=\"bi bi-arrow-clockwise\"></i></button>";
    header.appendChild(span2);
}

function deleteRecord(event){
    let row = event.target.closest('tr');
    row.remove();
}

function addRecord(event){
    let table = document.getElementById('table-editor');
    let row = document.createElement('tr');

    for (let i = 0; i < parameters; i++){
        let td = document.createElement('td');
        let input = document.createElement('input');
        input.classList.add('data-table-input');
        //input.value = value
        td.appendChild(input);
        row.appendChild(td);
     }

      let td = document.createElement('td');
      td.innerHTML =
      "<button type=\"button\" class=\"btn btn-danger btn-sm delete-btn\" onclick=\"deleteRecord(event);\"><i class=\"bi bi-x-circle-fill\"></i></button>";
      row.appendChild(td);
      table.appendChild(row);

    let tableEditor = document.getElementById('modalTableEditor-body')
    tableEditor.scrollTo({
        top: row.offsetTop,
        behavior: 'smooth'
    });
}

function ModalTableEditor(){
      return (
       <div className="modal fade" id="modalTableEditor" tabindex="-1" aria-labelledby="modalTableEditor" aria-hidden="true">
            <div id="modalTableEditor-xl" className="modal-dialog modal-xl modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalTableEditor-title">Data Editor</h5>
                <p className="modal-controls modal-title" id="modalTableEditor-controls"></p>
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