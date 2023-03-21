// global variables
var red_array_clean = [];
var red_array = [];
var uniq = [];

// event listeners
document.getElementById("restart_button").addEventListener("click", init)
document.getElementById("test_button").addEventListener("click", function(){compareArrays(uniq, red_array);})
// attach event listener to every grid item
function grid_item_listener(dim){
    for (let i = 1; i <= (dim ** 2); i++) {
        document.getElementById("1-"+i).addEventListener("click", function(){colorbyuser("1-"+i)});
    }
}

// setup both grid containers
let grid = document.getElementsByClassName("grid-container");
function setdimensions(dim){
    for (let classmember = 0; classmember < grid.length; classmember++) {
        console.log(grid[classmember])
        grid[classmember].style.gridTemplateRows = "repeat("+dim+", 1fr)";
        grid[classmember].style.gridTemplateColumns = "repeat("+dim+", 1fr)";
    }
}

// generate new items within both grid containers
function newgriditem(dim){
    for (let classmember = 0; classmember < grid.length; classmember++) {
        for (let gridnum = 1; gridnum <= dim ** 2; gridnum++){
            let griditem = document.createElement("div");
            griditem.setAttribute("class", "grid-item");
            // left grid has id's: 0-[1:x]
            // right grid has id's: 1-[1:x]
            griditem.setAttribute("id", classmember+"-"+gridnum);
            grid[classmember].appendChild(griditem);
            console.log(griditem)
        }
    }
}

// clear all divs
function remove_divs(classname){
    const elements = document.getElementsByClassName(classname);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    uniq = [];
}

// color grid_item in left grid
function color_grid_items(dim, frac){
    // generate an array of random numbers < grid.length
    const ranarray = Array.from({length: (dim ** 2)/frac}, () => Math.floor(Math.random() * dim ** 2)+1);
    // remove duplicates from array
    uniq = [...new Set(ranarray)];
    // color griditems in left grid
    for (let gridnum = 0; gridnum < uniq.length; gridnum++) {
        document.getElementById("0-"+uniq[gridnum]).style.backgroundColor = "green";
        
    }
    return uniq
}


// transform matrix
function transform(arr, dim) {
    var matrix = [];
    if (dim ** 2 === arr.length) {
        for(var i = 0; i < arr.length; i+= dim) {
            matrix.push(arr.slice(i, dim + i));
        }
    }else{
        alert("Transformation error")
    }
    trans_mat = matrix.map((val, index) => matrix.map(row => row[index]).reverse());
    flat_mat = trans_mat.flat()
    return flat_mat
}

// color grid_item in right grid
function colorbyuser(elem){
    var clicked_item = document.getElementById(elem)
    // get current color of grit item
    style = window.getComputedStyle(clicked_item);
    circ_bg = style.getPropertyValue("background-color");
    if (circ_bg == "rgba(0, 0, 0, 0)") {
        clicked_item.style.backgroundColor = "#d00000";
        // add grid item to array
        red_array.push(elem);
    }else if (circ_bg == "rgb(208, 0, 0)"){
        clicked_item.style.backgroundColor = "rgba(0, 0, 0, 0)";
        // remove grid item from array
        red_array = red_array.filter(function(item) {return item !== elem}) 
    }
    
    console.log(red_array)
}

function compareArrays(arr1, arr2){
    // clean up red_array
    var red_clean = arr2.map(x => x.replace("1-", "")).map(Number)
    // transform red array
    var dim_array = transform()
    var red_trans = [];
    for (let ind = 0; ind < red_clean.length; ind++) {
        red_trans = array[ind];
        
    }
    console.log(red_clean, uniq)
    if (JSON.stringify(arr1.sort()) === JSON.stringify(red_clean.sort())){
        alert("PEN_IS!")
    }else{
        alert("NO PENIS!");
        init();
    }
    red_array = [];
}

function init(){

    remove_divs("grid-item");
    setdimensions(2);
    newgriditem(2);
    color_grid_items(2,3);
    grid_item_listener(2);
}

init();

