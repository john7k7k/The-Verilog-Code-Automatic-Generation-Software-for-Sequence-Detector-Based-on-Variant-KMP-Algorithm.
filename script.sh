node gen.js
iverilog -o .\\dec\\a.vvp .\\dec\\dec1.v .\\dec\\testbench.v 
vvp .\\dec\\a.vvp 
gtkwave .\\dec\\tb.vcd