node gen.js
iverilog -o .\\dist\\a.vvp .\\dist\\SequenceDetector.v .\\testbench.v 
vvp .\\dist\\a.vvp 
gtkwave .\\dist\\tb.vcd
echo 'yosys -p "read_verilog dist/SequenceDetector.v; synth; show" -o dist/synth.blif' | oss-cad
dot -Tpng show.dot -o dist/synth.png
rm show.dot
rm dist/a.vvp