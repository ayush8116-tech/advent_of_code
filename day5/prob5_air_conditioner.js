const program =
  "3,225,1,225,6,6,1100,1,238,225,104,0,1102,72,20,224,1001,224,-1440,224,4,224,102,8,223,223,1001,224,5,224,1,224,223,223,1002,147,33,224,101,-3036,224,224,4,224,102,8,223,223,1001,224,5,224,1,224,223,223,1102,32,90,225,101,65,87,224,101,-85,224,224,4,224,1002,223,8,223,101,4,224,224,1,223,224,223,1102,33,92,225,1102,20,52,225,1101,76,89,225,1,117,122,224,101,-78,224,224,4,224,102,8,223,223,101,1,224,224,1,223,224,223,1102,54,22,225,1102,5,24,225,102,50,84,224,101,-4600,224,224,4,224,1002,223,8,223,101,3,224,224,1,223,224,223,1102,92,64,225,1101,42,83,224,101,-125,224,224,4,224,102,8,223,223,101,5,224,224,1,224,223,223,2,58,195,224,1001,224,-6840,224,4,224,102,8,223,223,101,1,224,224,1,223,224,223,1101,76,48,225,1001,92,65,224,1001,224,-154,224,4,224,1002,223,8,223,101,5,224,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1107,677,226,224,1002,223,2,223,1005,224,329,101,1,223,223,7,677,226,224,102,2,223,223,1005,224,344,1001,223,1,223,1107,226,226,224,1002,223,2,223,1006,224,359,1001,223,1,223,8,226,226,224,1002,223,2,223,1006,224,374,101,1,223,223,108,226,226,224,102,2,223,223,1005,224,389,1001,223,1,223,1008,226,226,224,1002,223,2,223,1005,224,404,101,1,223,223,1107,226,677,224,1002,223,2,223,1006,224,419,101,1,223,223,1008,226,677,224,1002,223,2,223,1006,224,434,101,1,223,223,108,677,677,224,1002,223,2,223,1006,224,449,101,1,223,223,1108,677,226,224,102,2,223,223,1006,224,464,1001,223,1,223,107,677,677,224,102,2,223,223,1005,224,479,101,1,223,223,7,226,677,224,1002,223,2,223,1006,224,494,1001,223,1,223,7,677,677,224,102,2,223,223,1006,224,509,101,1,223,223,107,226,677,224,1002,223,2,223,1006,224,524,1001,223,1,223,1007,226,226,224,102,2,223,223,1006,224,539,1001,223,1,223,108,677,226,224,102,2,223,223,1005,224,554,101,1,223,223,1007,677,677,224,102,2,223,223,1006,224,569,101,1,223,223,8,677,226,224,102,2,223,223,1006,224,584,1001,223,1,223,1008,677,677,224,1002,223,2,223,1006,224,599,1001,223,1,223,1007,677,226,224,1002,223,2,223,1005,224,614,101,1,223,223,1108,226,677,224,1002,223,2,223,1005,224,629,101,1,223,223,1108,677,677,224,1002,223,2,223,1005,224,644,1001,223,1,223,8,226,677,224,1002,223,2,223,1006,224,659,101,1,223,223,107,226,226,224,102,2,223,223,1005,224,674,101,1,223,223,4,223,99,226";

const add = (x, y) => x + y;
const mul = (x, y) => x * y;

const predicatesForProgram = {
  1: add,
  2: mul,
};

const operator = (program, programInstructions, instruction, index) => {
  const instructions = programInstructions;
  const [_thirdParamMode, secondParamMode, firstParamMode, ...opcode] =
    instruction.toString().padStart(5, "0").split("");
  const ins = parseInt(opcode.join(""));
  if ([1, 2].includes(ins)) {
    const param1 = parseInt(firstParamMode) === 0
      ? instructions[program[1]]
      : instructions[index + 1];
    const param2 = parseInt(secondParamMode) === 0
      ? instructions[program[2]]
      : instructions[index + 2];

    instructions[program[3]] = predicatesForProgram[ins](param1, param2);
  }

  if (ins === 3) {
    instructions[program[1]] = 1;
  }
  if (ins === 4) {
    console.log(instructions[program[1]]);
  }

  return instructions;
};

const parseProgram = (
  programInstructions,
  currentInstructionAddress,
  nextInstructionAddress,
) => {
  return programInstructions.slice(
    currentInstructionAddress,
    nextInstructionAddress,
  );
};

const instructionPointer = (program) => {
  const programInstructions = program.split(",").map((x) => parseInt(x));

  let currentInstructionAddress = 0;
  let nextInstructionAddress = 0;
  while (currentInstructionAddress < programInstructions.length) {
    nextInstructionAddress =
      [3, 4].includes(programInstructions[nextInstructionAddress])
        ? currentInstructionAddress + 2
        : currentInstructionAddress + 4;

    const parsedProgram = parseProgram(
      programInstructions,
      currentInstructionAddress,
      nextInstructionAddress,
    );

    if (parsedProgram[0] === 99) return programInstructions;

    operator(
      parsedProgram,
      programInstructions,
      parsedProgram[0],
      currentInstructionAddress,
    );
    currentInstructionAddress = nextInstructionAddress;
  }

  return programInstructions;
};

export const part1 = (program) => {
  return instructionPointer(program, 225, 1);
};

instructionPointer(program);