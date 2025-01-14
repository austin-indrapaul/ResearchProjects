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
    
    let select = document.createElement("select");
    select.classList.add("btn","btn-secondary");
    select.setAttribute("id","selected-algorthim");
    select.setAttribute("data-selected","linear");

    // Add options to the select element
    let option1 = document.createElement("option");
    option1.text = "Linear Regression";
    option1.value = "linear";
    select.appendChild(option1);
    
    let option2 = document.createElement("option");
    option2.text = "Decision Tree Regressor";
    option2.value= "decision-tree";
    select.appendChild(option2);

    let option3 = document.createElement("option");
    option3.text = "Random Forest Regressor";
    option3.value = "random-forest";
    select.appendChild(option3);

    let option4 = document.createElement("option");
    option4.text = "Weightage Algorithm";
    option4.value = "weightage";
    select.appendChild(option4);

    let option5 = document.createElement("option");
    option5.text = "K Neighbors Regressor";
    option5.value = "k-neighbors";
    select.appendChild(option5);


    select.addEventListener("change", function() {
        let select_tag = document.getElementById("selected-algorthim");
        let selectedOption = select_tag.options[select_tag.selectedIndex];
        let selectedValue = selectedOption.value;
        let selectedCustom = select_tag.getAttribute("data-selected");
        select_tag.setAttribute("data-selected", selectedValue);
    });
    header.appendChild(select);
    let space_select = document.createElement('span');
    space_select.innerHTML = " &nbsp; "
    header.appendChild(space_select);
    
    let span2 = document.createElement('span');
    span2.innerHTML =
      "<button type=\"button\" class=\"btn btn-success\" onclick=\"handle_save_regenerate(event);\">Save & Regenerate model <i class=\"bi bi-arrow-clockwise\"></i></button>";
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

function loadWeightageOptions(){
    // population,Gold price,Oil price,S&P index,GNI,Inflation
    const inputContainer = document.createElement('form');
    inputContainer.setAttribute('id', 'weightage-form');

            // Input Field 1
            const div1 = document.createElement('div');
            div1.className = 'input-container';
            const label1 = document.createElement('label');
            label1.textContent = 'Weightage for population: ';
            label1.setAttribute('for', 'input1');
            const input1 = document.createElement('input');
            input1.setAttribute('type', 'number');
            input1.setAttribute('id', 'input1');
            input1.setAttribute('name', 'input1');
            input1.classList.add('weight-input');
            input1.value = 1;
            input1.setAttribute('required', 'true');
            input1.setAttribute('step', 'any');
            div1.appendChild(label1);
            div1.appendChild(input1);
            inputContainer.appendChild(div1);

            // Input Field 2
            const div2 = document.createElement('div');
            div2.className = 'input-container';
            const label2 = document.createElement('label');
            label2.textContent = 'Weightage for gold price: ';
            label2.setAttribute('for', 'input2');
            const input2 = document.createElement('input');
            input2.setAttribute('type', 'number');
            input2.setAttribute('id', 'input2');
            input2.setAttribute('name', 'input2');
            input2.classList.add('weight-input');
            input2.value = 1;
            input2.setAttribute('required', 'true');
            input2.setAttribute('step', 'any');
            div2.appendChild(label2);
            div2.appendChild(input2);
            inputContainer.appendChild(div2);

            // Input Field 3
            const div3 = document.createElement('div');
            div3.className = 'input-container';
            const label3 = document.createElement('label');
            label3.textContent = 'Weightage for oil price: ';
            label3.setAttribute('for', 'input3');
            const input3 = document.createElement('input');
            input3.setAttribute('type', 'number');
            input3.setAttribute('id', 'input3');
            input3.setAttribute('name', 'input3');
            input3.classList.add('weight-input');
            input3.value = 1;
            input3.setAttribute('required', 'true');
            input3.setAttribute('step', 'any');
            div3.appendChild(label3);
            div3.appendChild(input3);
            inputContainer.appendChild(div3);

            // Input Field 4
            const div4 = document.createElement('div');
            div4.className = 'input-container';
            const label4 = document.createElement('label');
            label4.textContent = 'Weightage for S&P index: ';
            label4.setAttribute('for', 'input4');
            const input4 = document.createElement('input');
            input4.setAttribute('type', 'number');
            input4.setAttribute('id', 'input4');
            input4.setAttribute('name', 'input4');
            input4.classList.add('weight-input');
            input4.value = 1;
            input4.setAttribute('required', 'true');
            input4.setAttribute('step', 'any');
            div4.appendChild(label4);
            div4.appendChild(input4);
            inputContainer.appendChild(div4);

            // Input Field 5
            const div5 = document.createElement('div');
            div5.className = 'input-container';
            const label5 = document.createElement('label');
            label5.textContent = 'Weightage for GNI: ';
            label5.setAttribute('for', 'input5');
            const input5 = document.createElement('input');
            input5.setAttribute('type', 'number');
            input5.setAttribute('id', 'input5');
            input5.setAttribute('name', 'input5');
            input5.classList.add('weight-input');
            input5.value = 1;
            input5.setAttribute('required', 'true');
            input5.setAttribute('step', 'any');
            div5.appendChild(label5);
            div5.appendChild(input5);
            inputContainer.appendChild(div5);

            // Input Field 6
            const div6 = document.createElement('div');
            div6.className = 'input-container';
            const label6 = document.createElement('label');
            label6.textContent = 'Weightage for inflation: ';
            label6.setAttribute('for', 'input6');
            const input6 = document.createElement('input');
            input6.setAttribute('type', 'number');
            input6.setAttribute('id', 'input6');
            input6.setAttribute('name', 'input6');
            input6.classList.add('weight-input');
            input6.value = 1;
            input6.setAttribute('required', 'true');
            input6.setAttribute('step', 'any');
            div6.appendChild(label6);
            div6.appendChild(input6);
            inputContainer.appendChild(div6);

            const div_eph = document.createElement('div');
            div_eph.className = 'input-container';
            const label_eph = document.createElement('label');
            label_eph.textContent = 'Epoch: ';
            label_eph.setAttribute('for', 'input_eph');
            const input_eph = document.createElement('input');
            input_eph.setAttribute('type', 'number');
            input_eph.setAttribute('id', 'epoch-input');
            input_eph.setAttribute('name', 'input_eph');
            input_eph.classList.add('epoch-input');
            input_eph.value = 1;
            input_eph.setAttribute('required', 'true');
            input_eph.setAttribute('min', '1');
            div_eph.appendChild(label_eph);
            div_eph.appendChild(input_eph);
            inputContainer.appendChild(div_eph);

            const button = document.createElement("button");
            button.innerText = "Proceed";
            button.classList.add('btn', 'btn-success', 'btn-lg')

            // Add a click event listener to the button
//            button.addEventListener("click", function() {
//                handle_save_regenerate_weightage(event)
//            });
            inputContainer.appendChild(button);

        inputContainer.addEventListener('submit', function(event) {
            event.preventDefault();
            handle_save_regenerate_weightage(event)
        });

    document.getElementById("modalTableEditor-body").appendChild(inputContainer);

}

let table_data_set;
function handle_save_regenerate(event){
    let selected_algorithm = document.getElementById("selected-algorthim").getAttribute("data-selected");
    let s_r_url = '/save-regenerate/'+selected_algorithm;
    table_data_set = get_table_data()
        if (selected_algorithm == "weightage") {
           document.getElementById("modalTableEditor-body").innerHTML= "";
           loadWeightageOptions();
        }
        else{
            save_regenerate(event, s_r_url, table_data_set)
        }
}

function handle_save_regenerate_weightage(event){
    let inputs = document.getElementsByClassName('weight-input');
    let formData = [];
    for (let i = 0; i < inputs.length; i++) {
     formData.push(inputs[i].value);
    }
    let weight_string = JSON.stringify(formData)
    console.log(weight_string)

    let epoch_input = document.getElementById('epoch-input').value;
   //let s_r_url = "/save-regenerate/weightage/15/[0.1, 0.1, 0.1, 0.1, 0.1, 0.1]";
   let s_r_url = "/save-regenerate/weightage/"+epoch_input+"/"+weight_string
   document.getElementById("modalTableEditor-body").innerHTML= "<img src=\"./static/images/loader.gif\"></img>";
   save_regenerate(event, s_r_url, table_data_set)
}

function save_regenerate(event,s_r_url, table_data_set){
    return new Promise((resolve, reject) => {
        fetch(s_r_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(table_data_set),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json()
        }).then(data => {
            console.log("Data saved successfully. Model score: "+data)
            document.getElementById("modalTableEditor-body").innerHTML= "<p class=\"alert alert-success\" role=\"alert\">Data saved successfully and model is regenerated. Model score is "+data+"</p>";
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