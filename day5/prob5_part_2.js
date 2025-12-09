import { program } from "./prob5_air_conditioner.js";
const dbg = (x) => console.log(x) && x;

const add = (x, y) => x + y;
const mul = (x, y) => x * y;

const predicatesForProgram = {
  1: add,
  2: mul,
};

const getParameter = (
  parameterMode,
  memory,
  wholeInst,
  index,
  operandNum,
) =>
  parameterMode === 0
    ? memory[wholeInst[operandNum]]
    : memory[index + operandNum];

const parseOpcode = (opcodeStr) =>
  String(opcodeStr).padStart(5, "0").split("").map(Number);

const movePointer = {
  1: 4,
  2: 4,
  3: 2,
  4: 2,
  5: 3,
  6: 3,
  7: 4,
  8: 4,
};

const getNextPointer = (instruction, memory, opcodeStr, ptr) => {
  const [_thirdParamMode, secondParamMode, firstParamMode, ...opcode] =
    parseOpcode(opcodeStr);

  if ([1, 2].includes(opcode[1])) {
    const operand1 = getParameter(firstParamMode, memory, instruction, ptr, 1);
    const operand2 = getParameter(secondParamMode, memory, instruction, ptr, 2);
    const operation = predicatesForProgram[opcode[1]];
    memory[instruction[3]] = operation(operand1, operand2);
  }
  if (opcode[1] === 3) {
    memory[instruction[1]] = 5;
  }

  if (opcode[1] === 4) {
    const param = getParameter(firstParamMode, memory, instruction, ptr, 1);
    console.log(param);
  }

  if (opcode[1] === 5) {
    const operand = getParameter(firstParamMode, memory, instruction, ptr, 1);
    const result = getParameter(secondParamMode, memory, instruction, ptr, 2);
    if (operand !== 0) {
      return result;
    }
  }

  if (opcode[1] === 6) {
    const operand = getParameter(firstParamMode, memory, instruction, ptr, 1);
    const result = getParameter(secondParamMode, memory, instruction, ptr, 2);
    if (operand === 0) {
      return result;
    }
  }

  if (opcode[1] === 7) {
    const operand1 = getParameter(firstParamMode, memory, instruction, ptr, 1);
    const operand2 = getParameter(secondParamMode, memory, instruction, ptr, 2);
    memory[instruction[3]] = operand1 < operand2 ? 1 : 0;
  }

  if (opcode[1] === 8) {
    const operand1 = getParameter(firstParamMode, memory, instruction, ptr, 1);
    const operand2 = getParameter(secondParamMode, memory, instruction, ptr, 2);
    memory[instruction[3]] = operand1 === operand2 ? 1 : 0;
  }

  return ptr + movePointer[opcode[1]];
};

export const instructionPointer = (program) => {
  const programInstructions = program.split(",").map((x) => parseInt(x));

  let ptr = 0;
  let nextInstAddress;

  while (ptr < programInstructions.length) {
    const [_, __, ___, ...opcode] = parseOpcode(
      String(programInstructions[ptr]),
    );

    nextInstAddress = ptr + movePointer[opcode[1]];
    const parsedProgram = programInstructions.slice(ptr, nextInstAddress);
    if (parseInt(opcode.join("")) === 99) return programInstructions;

    ptr = getNextPointer(
      parsedProgram,
      programInstructions,
      parsedProgram[0],
      ptr,
    );
  }

  return programInstructions;
};

// const program = "1007,3,7,1,2,2,4,1,1,1,0,0";

export const part1 = (program) => {
  return instructionPointer(program);
};
part1(program);
