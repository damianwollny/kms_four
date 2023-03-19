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

// color grid_item in left grid
function color_grid_items(dim, frac){
    // generate an array of random numbers < grid.length
    const ranarray = Array.from({length: (dim ** 2)/frac}, () => Math.floor(Math.random() * dim ** 2)+1);
    // remove duplicates from array
    uniq = [...new Set(ranarray)];
    console.log(ranarray)
    console.log(uniq)
    // color griditems in left grid
    for (let gridnum = 0; gridnum < uniq.length; gridnum++) {
        document.getElementById("0-"+uniq[gridnum]).style.backgroundColor = "green";
        
    }

}


// transform matrix


setdimensions(2);
newgriditem(2);
color_grid_items(2,3);