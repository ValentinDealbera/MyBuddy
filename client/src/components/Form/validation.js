const regexName = /\d/
export function validate(input) {
    let errors = {};
    if (regexName.test(input.name)) {
      errors.name = "El nombre solo puede contener letras!";
    }
    if (input.heightMin.length > 2) {
      errors.heightMin = "Solo puede contener uno o dos caracteres";
    }
    if (input.heightMax.length > 2) {
      errors.heightMax = "Solo puede contener uno o dos caracteres";
    }
    if (input.weightMin.length > 2) {
      errors.weightMin = "Solo puede contener uno o dos caracteres";
    }
    if (input.weightMax.length > 2) {
      errors.weightMax = "Solo puede contener uno o dos caracteres";
    }
    if (input.life_spanMin.length > 2) {
      errors.life_spanMin = "Solo puede contener uno o dos caracteres";
    }
    if (input.life_spanMax.length > 2) {
      errors.life_spanMax = "Solo puede contener uno o dos caracteres";
    }
    return errors;
  }