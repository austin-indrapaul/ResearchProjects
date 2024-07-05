function getAnalyzerComponent(){
    return (
        <form className="analyzer-form">
        {/*parameter section*/}
        <div className="parameters">
        <table className="parameter">
        <tr>
            <td><label for="population">Population (in millions):</label></td>
            <td><input type="number" name="population" defaultValue={0} step="any"/></td>
        </tr>
        </table>
        <table className="parameter">
        <tr>
            <td><label for="oil-price">Oil Price (USD/BRL) $:</label></td>
            <td><input type="number" name="oil-price" defaultValue={0} step="any"/></td>
        </tr>
        </table>
        <table className="parameter">
        <tr>
            <td><label for="gold-price">Gold Price ($/troy oz): </label></td>
            <td><input type="number" name="gold-price" defaultValue={0} step="any"/></td>
        </tr>
        </table>
        <table className="parameter">
        <tr>
            <td><label for="inflation">Inflation (percent/rate): </label></td>
            <td><input type="number" name="inflation" defaultValue={0} step="any"/></td>
        </tr>
        </table>
        <table className="parameter">
        <tr>
            <td><label for="s_p-index">S&P Index (points): </label></td>
            <td><input type="number" name="s_p-index" defaultValue={0} step="any"/></td>
        </tr>
        </table>
        <table className="parameter">
        <tr>
            <td><label for="gni">GNI (units): </label></td>
            <td><input type="number" name="gni" defaultValue={0} step="any"/></td>
        </tr>
        </table>
        {/*
        <table className="parameter">
        <tr>
            <td><label for="deposit-amt">Deposits amount:</label></td>
            <td><input type="number" name="deposit-amt" defaultValue={0}/></td>
        </tr>
        </table>
        <table className="parameter">
        <tr>
            <td><label for="stock-market-amt">Stock market amount:</label></td>
            <td><input type="number" name="stock-market-amt" defaultValue={0}/></td>
        </tr>
        </table>
        <table className="parameter">
        <tr>
            <td><label for="national-debt">National Debt:</label></td>
            <td><input type="number" name="national-debt" defaultValue={0}/></td>
        </tr>
        </table>*/}
        </div>
        {/*predict btn section*/}
        <div className="parameters">
        <div className="parameter">
        <button type="submit" className="submit-btn btn btn-secondary btn-lg" name="submit-btn">Let{"'"}s Predict <i className="bi bi-arrow-repeat"></i></button>
        </div>
        </div>
        {/*result section*/}
        <div className="parameters">
        <div className="parameter">
            <p className="d-none alert alert-light result"></p>
        </div>
        </div>
        </form>
      );
}

function submitForm() {
    console.log("form submitted")

    let form = event.target;
    let nameInput = form.elements.name;
    let inputs = form.getElementsByTagName('input');

    let formData = {};

    for (let i = 0; i < inputs.length; i++) {
     let input = inputs[i];
     formData[input.name] = input.value;
    }
    let result_tag = form.lastElementChild.lastElementChild.getElementsByTagName('p')[0];

    predictResult(formData)
      .then(result => {
      if(result == null){
        result_tag.innerHTML = "error";
      }else{
        result_tag.innerHTML = result.replace(/\n/g, "<br/>");
      }
    }).catch(error => {
        console.error(error);
        result_tag.innerHTML = "error";
    }).finally(() => {
        result_tag.classList.remove('d-none');
    });
}

function predictResult(formData){
    let results="";
    return new Promise((resolve, reject) => {
        fetch('/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
            reject('Network response was not 200')
          }
          console.log(response)
          return response.json();
        })
        .then(data => {
            console.log(data)
            resolve(data)
        })
        .catch(error => {
            console.error('Error:', error);
            console.log("catch returning: "+results);
            reject(error)
        });
    });
}

