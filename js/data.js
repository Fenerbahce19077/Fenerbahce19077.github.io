const form  = document.getElementById('datainput');

form.addEventListener('submit', (event) => {
    // handle the form data
    event.preventDefault();
    
    // const name = form.elements['lname'];

    var testdata = new Object();
    testdata.fname = form.elements['fname'].value;
    testdata.lname = form.elements['lname'].value;
    testdata.date = form.elements['date'].value;
    testdata.test = form.elements['test'].checked;

    // let fullName = name.value;
    saveToStorage(testdata);
    // console.log(testdata);
});

function saveToStorage(testdata) {
    
    if (localStorage.getItem("dataArray") === null) {
        console.log("Leer");
        var array = [];
        array.push(testdata);
        localStorage.setItem("dataArray", JSON.stringify(array));
    } else {

        var storageObj = JSON.parse(localStorage.getItem("dataArray"));
        // var array = [];
        // storageObj.forEach(element => {
        //    array.push(element);
        // });
        console.log("lodatet");
        storageObj.push(testdata);
        localStorage.setItem("dataArray", JSON.stringify(storageObj));
        console.log(storageObj);
        
        
    };

    //localStorage.setItem("dataArray", JSON.stringify(testdata));
    // console.log(localStorage.getItem('dataArray'));
    // return true;
};