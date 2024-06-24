fetch("https://marcconrad.com/uob/tomato/api.php").then((data)=>{

return data.json();
}).then((objectData)=>{
    if (Array.isArray(objectData) && objectData.length > 0) {

        console.log(objectData[0].question);
        console.log(objectData[0].solution);

    let tableData="";
    let tableData_="";
    objectData.forEach((values) => {
        tableData += `<img src="${values.question}"/>`;
        tableData_ += `"${values.solution}"`;
    });
    document.getElementById("image").innerHTML = tableData;
    document.getElementById("solution").innerHTML = tableData_;
}else if (typeof objectData === 'object' && objectData !== null) {

    console.log(objectData.question);
    console.log(objectData.solution);


    let tableData = `<img src="${objectData.question}"/>`;
    let tableData_ = `<a href="new.php"><button >${objectData.solution}</button></a>`;


    document.getElementById("image").innerHTML = tableData;
    document.getElementById("solution").innerHTML = tableData_;
}})   