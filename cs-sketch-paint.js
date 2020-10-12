// cs-sketch.js; P5 key animation fcns.  // CF p5js.org/reference
// Time-stamp: <2020-09-20 22:55:31 Chuck Siska>

// ============================================================ Mods ====
// 2020-02-10 16:42:24: Add btns.
// 2020-02-09 16:55:21: Add btn onclick exported fn
// 2020-02-10 17:22:23: Log btn onclick
// 2020-03-11 13:15:36: Add list_fn (& maybe more)
// 2020-09-12 14:23:07: Add g_img_stuff usage
// 2020-09-12 16:14:03: Paint maze using file images: add g_img_stuff;
//  rip g_box; repl g_canvas w g_grid; repl g_cnv w g_p5_cnv
//  Add New Maze Drawing Code Section.

// Make global g_grid JS 'object': a key-value 'dictionary'.
var g_grid; // JS Global var, w grid size info; cvts grid cells to pixels
var g_frame_cnt; // Setup a P5 display-frame counter, to do anim
var g_frame_mod; // Update ever 'mod' frames.
var g_stop; // Go by default.
var g_p5_cnv;   // To hold a P5 canvas.
var g_button; // btn
var g_button2; // btn
var g_color;
var g_sctrl;
var g_tiles;
var g_bot = {x:0, y:0};

var g_l4job = { id: 1 }; // Put Lisp stuff f JS-to-access in ob; id to force ob.
var pathsArr = [
    [ 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ], //0
    [ 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0 ],
    [ 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
    [ 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ],
    [ 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0 ],
    [ 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0 ], //5
    [ 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0 ],
    [ 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
    [ 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
    [ 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1 ], //10
    [ 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0 ],
    [ 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1 ],
    [ 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1 ],
    [ 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], //15
    [ 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1 ],
    [ 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1 ],
    [ 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1 ],
    [ 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1 ], //20
    [ 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ],
    [ 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1 ],
    [ 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0 ],
    [ 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1 ],
    [ 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1 ], //25
    [ 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1 ],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

hValues[36][28];
dValues[36][28];
gValues[36][28];

//calculates distance 
function distance( startX, startY, endX, endY)
{
    let tempX = endX - startX;
    let tempY = endY - startY;

    tempX = tempX * tempX;
    tempY = tempY * tempY;
    return (tempX + tempY);
}

//Calculates the h or g value depending on parameter given
//takes x and y coodinate in begX/Y, takes array for paths, and array to add values into
function values(begX, begY, walls, array)
{
    let x = 0;
    let y = 0;
    while (x < 36)
    {
        while (y < 28)
        {
            if (walls[x][y] === 0)    //If a wall skip
            {
                array[x][y] = null;
            }
            else
            {
                array[x][y] = distance(x, y, begX, begY);
            }
            y++;
        }
        y = 0;
    }
    x++;
}

function addArrays(aryV1, aryV2, arySet)
{
    while (x < 36)
    {
        while (y < 28)
        {
            if (aryV1[x][y] === null)
            {
                arySet[x][y] = null;
            }
            else
            {
                arySet[x][y] = aryV1[x][y] + aryV2[x][y];
            }
            y++;
        }
        x++;
    }
}
function do_btn( )
{ // grab code from csu\assets\js\js+p5+editbox

    // Creates an <input></input> element in the DOM for text input.
    // Use g_input.size() to set the display length of the box.
    // g_input = createInput( ); // Create input textbox.
    // g_input.position(  20, 30 );
    // g_button = createButton( "Submit" );
    // g_button.id( "btn" ); //Add for P5 btn onclick
    // g_button.position( 160, 30 );
    //text( "Enter your name.", 20, 20 );

    g_button2 = createButton( "Save Image" );
    g_button2.position( 20, 60 );
    g_button2.mousePressed( save_image ); // the callback
}

function save_image( ) // btn
{
    save('myCanvas-' + g_frame_cnt +  '.jpg');
}

  //Also g_img_cell = loadImage( '10x10-sqr-RBY.png' );
let g_img_stuff;
  
function get_images( )
{ 
    g_img_stuff = new Image( );
    g_img_stuff.src = "sprite-cells-28x28-a.png";
}

function setup( ) // P5 Setup Fcn
{
    console.log( "p5 Beg P5 setup =====");
    console.log( "p5 @: log says hello from P5 setup()." );
    g_grid = { cell_size:28, wid:36, hgt:28 };
    g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
    g_frame_mod = 6; // Update ever 'mod' frames.
    g_stop = 0; // Go by default.
    g_sctrl = 0;
    g_l4job = { id:1 };

    let sz = g_grid.cell_size;
    let width = sz * g_grid.wid;
    let height = sz * g_grid.hgt;
    g_p5_cnv = createCanvas( width, height );  // Make a P5 canvas.
    console.log( "p5 @: createCanvas()." );
    draw_grid( sz, 50, 'white', 'yellow' );
    do_btn( ); //
    console.log( "p5 Load the image." );
    get_images( );
    console.log("p5 End P5 setup =====");

    //Array Set Up
    values(1, 0, pathsArr, hValues);
    values(35, 25, pathsArr, dValues);
    addArrays(gValues, hValues, dValues);

}


// ==================================================
// =================== New Maze Drawing Code ========
// ==================================================
function get_sprite_by_id( rsprite_id ) // get sprite sheet x,y offsets obj.
{ // ID is a 0-based index; sprites are assumed to be grid cell size.
    // Sprite sheet is 2-elts 1-row, wall=0 and floor=1.
    let id = rsprite_id % 2;
    let sprite_ob = { id: id, img: g_img_stuff };
    sprite_ob.sheet_pix_x = id * g_grid.cell_size;
    sprite_ob.sheet_pix_y = 0;
    return sprite_ob;
}

function grid_to_pix( rx, ry ) // Cvt grid cell x,y to canvas x,y wrapped.
{
    let pix_ob = { x: (rx % g_grid.wid) * g_grid.cell_size,
                   y: (ry % g_grid.hgt) * g_grid.cell_size };
    return pix_ob;
}

function draw_sprite_in_cell( rsprite_id, rx, ry ) // wraps in x,y ifn.
{
    console.log( "(p5 draw_sprite_in_cell ", rsprite_id, rx, ry, " )" );
    let sprite_ob = get_sprite_by_id( rsprite_id );
    let pix_ob = grid_to_pix( rx, ry );
    let ctx = g_p5_cnv.canvas.getContext( '2d' ); // get html toolbox to draw.
    ctx.drawImage( sprite_ob.img,
                   sprite_ob.sheet_pix_x, sprite_ob.sheet_pix_y,
                     g_grid.cell_size, g_grid.cell_size,
                   pix_ob.x, pix_ob.y,
                     g_grid.cell_size, g_grid.cell_size );
    console.log( "end draw_sprite_in_cell)" );
}
// ==================================================
// =================== END New Maze Drawing Code ========
// ==================================================

function draw_update()  // Update our display.
{
    //console.log( "p5 Call g_l4job.draw_fn" );
    g_l4job.draw_fn( );

}

function csjs_get_pixel_color_sum( rx, ry )
{
    let acolors = get( rx, ry ); // Get pixel color [RGBA] array.
    let sum = acolors[ 0 ] + acolors[ 1 ] + acolors[ 2 ]; // Sum RGB.
    console.log( "color_sum = " + sum );
    return sum;
}
function move_bot_to_mouse( )
{
    let x = mouseX;
    let y = mouseY;
    //console.log( "p5 move_bot: x,y = " + x + "," + y );
    let cz = g_grid.cell_size;
    let gridx = floor( x / cz );
    let gridy = floor( y / cz );
    //console.log( "p5 move_bot: gridx,y,cz = " + gridx + "," + gridy + ", " +cz );
    g_bot.x = gridx + g_grid.wid; // Ensure it's positive.
    g_bot.x %= g_grid.wid; // Wrap to fit box.
    g_bot.y = gridy + g_grid.hgt;
    g_bot.y %= g_grid.hgt;
}
function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    
    ++g_frame_cnt;
    if (!g_stop
        && mouseIsPressed
        && (0 == g_frame_cnt % g_frame_mod))
    {
        //console.log( "p5 draw" );
        move_bot_to_mouse( );
        draw_update( );
    }
    // OBE:
    // Use JS Canvas's draw fcn, instead of P5's image(), to avoid CORS error.
    // API: drawImage( image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight )
    //  s = source (the image), d = dest (the canvase)
    //
    //  console.log( "beg: sprite test" );
    //  let ctx = g_p5_cnv.canvas.getContext('2d');
    //  ctx.drawImage( g_img_stuff, 0, 0, 28, 28, 120, 40, 28, 28 );
    //  draw_sprite_in_cell( 0, 0, 0 );
    //  console.log( "end: sprite test" );
    //
    // Works

}

function keyPressed( )
{
    if ('a' == key) g_sctrl = 0;
    if ('b' == key) g_sctrl = 1;
    if ('s' == key) g_stop = ! g_stop;
    if ('p' == key) {
        console.log( "p5 list_fn" );
        g_l4job.list_fn( );
    }
    if ('z' == key) {
        console.log( "p5 Call g_l4job.zzdefg_fn" );
        g_l4job.zzdefg_fn( );
    }

    console.log( "p5 keyPressed: "
                 // + ${key} + " " + ${keyCode} 
                 + key + " " + keyCode 
                 +  " g_sctrl = " + g_sctrl );

    console.log( "p5 keyPressed: post g_stop = " + g_stop );
    console.log( "p5 mouseIsPressed = " + mouseIsPressed );
    if (g_stop) { noLoop(); } else {loop();}
}
function mousePressed()      
{
    astar(start, goal);
}

function isValid(pos)
{
    gridpos = grid_to_pix(pos.x, pos.y);
    var color = get(gridpos.x + 2, gridpos.y + 2);
    var sum  = color[ 0 ] + color[ 1 ] + color[ 2 ];
    var valid = (pos.x <= 35 && pos.x >= 0 && pos.y <= 26 && pos.y >= 0 && sum == 315)
    //console.log(valid);
    return valid;
}

function astar(start, goal)
{
    openList.push(start);
    var closedList = [];

    while(openList.length != 0)
    {
        //console.log(openList[0]);
        var q = lowestFVal();

        //console.log(openList);

        openList.splice(q.index, 1);
        //console.log(openList);

        console.log(q.nd);

        var suctmp = successors(q.nd);

        for(x in suctmp)
        {
            var item = suctmp[x];
            //console.log(item);
            if(isValid(item))
            {
                if(isGoal(item))
                {
                    console.log("Found the shortest path");
                    goal.parent = item;
                    traceback(closedList);
                }
                        
                else if(!inClosed(item, closedList))
                {
                    var gNew = item.parent.g + 1;
                    var hNew =  calch(item, goal);
                    var fNew = gNew + hNew;

                    if(item.f > fNew || !inOpen(item))
                    {
                        openList.push(item);
                        item.f = fNew;
                        item.g = gNew;
                        item.h = hNew;
                        item.parent = q.nd;
                    }
                }
            }
        }
        closedList.push(q.nd);
        //suctmp.forEach(checkSuccessors);
    }
}

function inOpen(item)
{
    for(i in openList)
    {
        if(item.x == openList[i].x && item.y == openList[i].y)
            return true;
    }
    return false;
}

function inClosed(current, closedList)
{
    //console.log("This started");
    for(i in closedList)
    {
        //console.log(i);
        if(current.x == closedList[i].x && current.y == closedList[i].y)
            return true;
        //console.log(bool);
    }
    return false;
}

function isGoal(current)
{
    if(current.x == goal.x && current.y ==goal.y)
        return true;
    return false;
}

function successors(current)
{
    var successor = [];
    successor.push(new node(current.x, current.y - 1, 0, 0, 0, current));
    successor.push(new node(current.x + 1, current.y, 0, 0, 0, current));
    successor.push(new node(current.x, current.y + 1, 0, 0, 0, current));
    successor.push(new node(current.x - 1, current.y, 0, 0, 0, current));
    return successor
}

function calch(current, goal)
{
    return Math.abs(current.x - goal.x) + Math.abs(current.y - goal.y);
}

function lowestFVal()
{
    low.nd = openList[0];
    low.f = openList[0].f;
    low.index = 0;
    for(i in openList)
    {
        if(low.f > openList[i].f)
        {
            low.nd = openList[i];
            low.index = i;
        }
    }
    return low;
}

function traceback(closed)
{
    last = goal;
    while(last != start)
    {
        console.log(last);
        draw_sprite_in_cell(0, last.x, last.y);
        last = last.parent;
    }
}