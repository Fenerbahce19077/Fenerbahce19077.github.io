const storageObjLoad = JSON.parse(localStorage.getItem("dataArray"));

const showData = () => {
   let output = "";
   output += `
    <table>
        <tr>
            <th>Vorname</th>
            <th>Name</th>
            <th>Testdatum</th>
            <th>Ergebnis</th>
        </tr>
    `
   storageObjLoad.forEach(
     ({ fname, lname, date, test }) =>
       (output += `
                <tr>
                    <td>${fname}</td>
                    <td>${lname}</td>
                    <td>${date}</td>
                    <td>${test}</td>
                </tr>
               `)
   );
   output += `
    </table>
    `
   container.innerHTML = output;
 };


document.addEventListener("DOMContentLoaded", showData);