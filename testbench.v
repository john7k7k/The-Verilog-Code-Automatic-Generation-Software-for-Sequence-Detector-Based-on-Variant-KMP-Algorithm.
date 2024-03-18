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
    always #10 data_in=$random%3;
    initial begin
        $dumpfile("dist/tb.vcd");
        $dumpvars(0, dut);
        clk = 1;
        reset = 1;
        data_in = 0;
        #10
        reset = 0;
        #1000
        $finish;
    end
endmodule
