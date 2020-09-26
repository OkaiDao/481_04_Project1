// Draw stuff, with P5  // CF p5js.org/reference
// Time-stamp: <2020-09-20 17:19:35 Chuck Siska>
// ------------------------------------------------------------

// =====================================================  draw_grid ====
// Draw a fancy grid with major & minor lines 
// & major row/col numbers.
function draw_grid( rminor, rmajor, rstroke, rfill  ) 
{
    stroke( rstroke );
    fill( rfill );;
    let sz = g_grid.cell_size;
    let width = g_grid.wid*sz;
    let height = g_grid.hgt*sz
    let line_wgt = 1;
    strokeWeight( line_wgt );
    for ( var ix = 0; ix < width; ix += rminor )
    {
        line( ix, 0, ix, height );
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        line( 0, iy, width, iy );
    }
}
