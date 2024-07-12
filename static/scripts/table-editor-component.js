function show_table_editor(type){
    document.getElementById("modalTableEditor-body").innerHTML= "<img src=\"./static/images/loader.gif\"></img>";
    document.getElementById("modalTableEditor-controls").innerHTML = "";
    return new Promise((resolve, reject) => {
        fetch('/fetch-data-table/'+type)
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
            populateTheData(jsonData);
        })
        .catch(error => {
            console.error('Error:', error);
            reject(error)
        });
      });
}
let parameters = 0;
function populateTheData(jsonData) {
    parameters = 0;
    //console.table(jsonData);
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
      "<button type=\"button\" class=\"btn btn-info\" onclick=\"addRecord(event);\">Add new record <i class=\"bi bi-plus-circle-fill\"></i></button>";
    let header = document.getElementById("modalTableEditor-controls");
    header.appendChild(span1);
    let space1 = document.createElement('span');
    space1.innerHTML = " &nbsp; "
    header.appendChild(space1);
    let span2 = document.createElement('span');
    span2.innerHTML =
      "<button type=\"button\" class=\"btn btn-success\" onclick=\"save_regenerate(event);\">Save & Regenerate model <i class=\"bi bi-arrow-clockwise\"></i></button>";
    header.appendChild(span2);
    let space2 = document.createElement('span');
    space2.innerHTML = " &nbsp; "
    header.appendChild(space2);
    let span3 = document.createElement('span');
    span3.innerHTML =
      "<button type=\"button\" class=\"btn btn-warning\" onclick=\"show_table_editor('original');\">Load original dataset <i class=\"bi bi-database-fill-down\"></i></button>";
    header.appendChild(span3);
    let space3 = document.createElement('span');
    space3.innerHTML = " &nbsp; "
    header.appendChild(space3);
    let span4 = document.createElement('span');
    span4.innerHTML =
      "<button type=\"button\" class=\"btn btn-primary\" onclick=\"show_table_editor('current');\">Load current dataset <i class=\"bi bi-database-fill-down\"></i></button>";
    header.appendChild(span4);
}

function deleteRecord(event){
    let row = event.target.closest('tr');
    row.remove();
}

function save_regenerate(event){
    return new Promise((resolve, reject) => {
        fetch('/save-regenerate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(get_table_data()),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          } else{
            console.log("Data saved successfully.")
            document.getElementById("modalTableEditor-body").innerHTML= "<p class=\"alert alert-success\" role=\"alert\">Data saved successfully and model is regenerated.</p>";
          }
        })
        .catch(error => {
            console.error('Error:', error);
            reject(error)
        });
      });
}

function get_table_data(){
  const table = document.getElementById('table-editor');
  document.getElementById("modalTableEditor-body").innerHTML= "<img src=\"./static/images/loader.gif\"></img>";
  document.getElementById("modalTableEditor-controls").innerHTML = "";
  const rows = table.getElementsByTagName('tr');
  console.log(table)
  let csvString = '';


  for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const rowData = [];
        if (i!=0){
            for (let j = 0; j < cells.length-1; j++) {
              rowData.push(cells[j].querySelector('input').value);
            }
            csvString += rowData.join(',') + '\n';
        } else {
            const hcells = rows[i].getElementsByTagName('th');
            for (let j = 0; j < hcells.length; j++) {
              rowData.push(hcells[j].innerText);
            }
            csvString += rowData.join(',') + '\n';
        }
  }

  return csvString;
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
                <p className="modal-controls modal-title" id="modalTableEditor-controls">

                </p>
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