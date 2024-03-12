const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function getFFNum(x) {
    return Math.ceil(Math.log(x) / Math.log(2));
}
function countSamePrefixSuffixLength(str) {
    let length = str.length;
    let count = 0;
    for (let i = 0; i < length - 1; i++) {
        if (str[i] === str.at(-i-1)) {
            count++;
        } else {
            break;
        }
    }
    return count;
}
function checkPrefixSuffix(binaryString) {
    const n = binaryString.length;
    const results = [];
    function prefixFunction(pattern) {
        const m = pattern.length;
        const prefix = new Array(m).fill(0);
        let j = 0;
        for (let i = 1; i < m; i++) {
            while (j > 0 && pattern[i] !== pattern[j]) {
                j = prefix[j - 1];
            }
            if (pattern[i] === pattern[j]) {
                j++;
            }
            prefix[i] = j;
        }
        return prefix;
    }

    for (let i = 0; i < n; i++) {
        const pattern = binaryString.substring(0, i + 1); 
        let lastChar = pattern.charAt(pattern.length - 1);
        lastChar = lastChar === '0' ? '1' : '0';
        const reversedPattern = pattern.slice(0, -1) + lastChar; 
        const prefix = prefixFunction(reversedPattern); 
        results.push(prefix[prefix.length - 1]); 
    }

    return results;
}

rl.question('请输入你的序列：', (seq) => {
    console.log(`你输入的序列是：${seq}`);
    const erroe_state = checkPrefixSuffix(seq);
    const FFnum = getFFNum(seq.length);
    "parameter IDLE = 2'b00;\n"
    let verilog_code = `
module SequenceDetector(
    input wire clk,
    input wire reset,
    input wire data_in,
    output reg detected
);
`;
    for(let i = 0; i < seq.length; i++){
        verilog_code = verilog_code.concat(`    parameter STATE_${i} = ${FFnum}'b${i.toString(2).padStart(FFnum,'0')};\n`);
    }
    verilog_code = verilog_code.concat(`    reg [${FFnum-1}:0] state;\n`);
    verilog_code = verilog_code.concat(`    always @(posedge clk) begin
        if (reset) begin
            state <= STATE_0;
            detected <= 0;
        end else begin
            case(state)`);
    for(let i = 0; i < seq.length - 1; i++){
        verilog_code = verilog_code.concat(`
                STATE_${i}: begin
                    detected <= 0;
                    if (${seq[i] === '1'?'':'!'}data_in) begin
                        state <= STATE_${i+1};
                    end else begin
                        state <= STATE_${erroe_state[i]};
                    end
                end`);
    }
    verilog_code = verilog_code.concat(`
                STATE_${seq.length - 1}: begin
                    detected <= 0;
                    if (${seq[seq.length - 1] === '1'?'':'!'}data_in) begin
                        detected <= 1;
                        state <= STATE_${countSamePrefixSuffixLength(seq)};
                    end else begin
                        state <= STATE_${erroe_state[seq.length - 1]};
                    end
                end`
    )
    verilog_code = verilog_code.concat(`
            endcase
        end
    end
endmodule`);
    fs.writeFile('./dec/dec1.v', verilog_code, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('File has been written');
    });
    rl.close();
});