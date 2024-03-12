`timescale 1ns/1ns

module tb_SequenceDetector;
    parameter CLK_PERIOD = 10; 
    reg clk;
    reg reset;
    reg data_in;
    wire detected;
    SequenceDetector dut (
        .clk(clk),
        .reset(reset),
        .data_in(data_in),
        .detected(detected)
    );
    always #((CLK_PERIOD/2)) clk = ~clk;
    initial begin
        $dumpfile("dec/tb.vcd");
        $dumpvars(0, dut);
        clk = 1;
        reset = 1;
        data_in = 0;
        #10;
        reset = 0;
        #10;
        data_in = 1;
        #10;
        data_in = 0;
        #10;
        data_in = 1;
        #10;
        data_in = 0;
        #10;
        data_in = 1;
        #10;
        data_in = 0;
        #10;
        data_in = 0;
        #10;
        data_in = 0;
        #10;
        data_in = 0;
        #10;
        data_in = 1;
        #10;
        data_in = 0;
        #10;
        $finish;
    end
endmodule
;