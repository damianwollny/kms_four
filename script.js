// global variables
var red_array_clean = [];
var red_array = [];
var uniq = [];
var num_dimensions = 2;
var level = 1;
var fraction_of_grid = 6;
var points = 0;

// event listeners
document.getElementById("restart_button").addEventListener("click", init)
document.getElementById("test_button").addEventListener("click", function(){compareArrays(uniq, red_array);})
// difficulty levels
document.getElementById("diff1").addEventListener("click", function(){restart(2);})
document.getElementById("diff2").addEventListener("click", function(){restart(3);})
document.getElementById("diff3").addEventListener("click", function(){restart(4);})
document.getElementById("diff4").addEventListener("click", function(){restart(5);})
document.getElementById("diff5").addEventListener("click", function(){restart(6);})
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
        //console.log(grid[classmember])
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

// color grid_item of grids
function color_grid_items(dim, frac){
    // first, color all items from left grid in green with low opacity
    for (let gridnum = 1; gridnum < (dim ** 2)+1; gridnum++) {
        document.getElementById("0-"+gridnum).style.backgroundColor = "rgba(120, 220, 142, 0.1)";
        document.getElementById("0-"+gridnum).style.border = "0.5px solid grey";
    }
    // first, color all items from right grid in red with low opacity
    for (let gridnum = 1; gridnum < (dim ** 2)+1; gridnum++) {
        document.getElementById("1-"+gridnum).style.backgroundColor = "rgba(238, 121, 114, 0.1)";
        document.getElementById("1-"+gridnum).style.border = "0.5px solid grey";
    }
    // generate an array of random numbers < grid.length
    const ranarray = Array.from({length: (dim ** 2)/frac}, () => Math.floor(Math.random() * dim ** 2)+1);
    // remove duplicates from array
    uniq = [...new Set(ranarray)];
    // color griditems in left grid
    for (let gridnum = 0; gridnum < uniq.length; gridnum++) {
        document.getElementById("0-"+uniq[gridnum]).style.backgroundColor = "#78DC8E";
        document.getElementById("0-"+uniq[gridnum]).style.opacity = "1";
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
    if (circ_bg == "rgba(238, 121, 114, 0.1)") {
        clicked_item.style.backgroundColor = "#EE7972";
        // add grid item to array
        red_array.push(elem);
    }else if (circ_bg == "rgb(238, 121, 114)"){
        clicked_item.style.backgroundColor = "rgba(238, 121, 114, 0.1)";
        // remove grid item from array
        red_array = red_array.filter(function(item) {return item !== elem}) 
    }
}

function compareArrays(arr1, arr2){
    // clean up red_array
    var red_clean = arr2.map(x => x.replace("1-", "")).map(Number)
    // transform green array:
    left_grid = Array.from({length: num_dimensions ** 2}, (_, i) => i + 1)
    trans_left_grid = transform(left_grid, num_dimensions)
    console.log("left grid=", left_grid);
    console.log("transformed left grid=", trans_left_grid);
    // find positions of all 'uniq' in transformed green array
    tilted_green = [];
    for (let p = 0; p < uniq.length; p++) {
        tilted_green.push(trans_left_grid.indexOf(uniq[p])+1);
    }
    console.log("original green = ", uniq, "tilted green=", tilted_green, "red=", red_clean)
    if (JSON.stringify(tilted_green.sort()) === JSON.stringify(red_clean.sort())){
        next_level();
    }else{
        alert("PUNKTE: " + points);
        restart(num_dimensions);
    }
    red_array = [];
}

function change_dim(dimensions){
    num_dimensions = dimensions;
    console.log(num_dimensions);
}

// initialize game
function init(){
    console.log("fraction of grid=", fraction_of_grid)
    points = 0;
    document.getElementById("title").innerHTML = "PUNKTE: " + (points)
    remove_divs("grid-item");
    setdimensions(num_dimensions);
    newgriditem(num_dimensions);
    color_grid_items(num_dimensions, 3);
    grid_item_listener(num_dimensions);
}

// restart game
function restart(dimensions){
    num_dimensions = dimensions;
    fraction_of_grid = 6;
    if (num_dimensions > 2) {
        fraction_of_grid = fraction_of_grid
    }else{
        fraction_of_grid = 2;
    }
    points = 0;
    document.getElementById("title").innerHTML = "PUNKTE: " + (points)
    remove_divs("grid-item");
    setdimensions(num_dimensions);
    newgriditem(num_dimensions);
    color_grid_items(num_dimensions, fraction_of_grid);
    grid_item_listener(num_dimensions);
    console.log("fraction of grid=", fraction_of_grid)
    console.log("green position=",uniq[0])
}

// level up
function next_level(){
    // point increase depending on difficulty
    if (num_dimensions == 2) {
        points++;
    } else if (num_dimensions == 3) {
        points = points + 20
    } else if (num_dimensions == 4) {
        points = points + 30
    } else if (num_dimensions == 5) {
        points = points + 50
    } else if (num_dimensions == 6) {
        points = points + 100
    }
    console.log("num_dim=", num_dimensions)
    console.log("points=", points)
    document.getElementById("title").innerHTML = "PUNKTE: " + (points)
    remove_divs("grid-item");
    setdimensions(num_dimensions);
    newgriditem(num_dimensions);
    // difficulty increases unless num_dim == 2
    if (num_dimensions == 2) {
        color_grid_items(num_dimensions, 2);    
    }else{
        fraction_of_grid = fraction_of_grid - 0.5;
        if (fraction_of_grid <= 1.5) {
            fraction_of_grid = 1.5
        }
        console.log("new fraction of grid", fraction_of_grid)
        color_grid_items(num_dimensions, fraction_of_grid);    
    }
    grid_item_listener(num_dimensions);
}

init();
console.log("green position=",uniq[0])