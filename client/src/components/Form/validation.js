const regexName = /\d/
const regexImage = /(https?:\/\/.*\.(?:png|jpg))/i

export function validate(input) {
    let errors = {};
    if (regexName.test(input.name)) {
      errors.name = "El nombre solo puede contener letras!";
    }
    if (!regexImage.test(input.image)) {
      if(input.image === '') errors.image = ''
      else errors.image = "El link debe terminar con .jpg | .gif | . png"
    }
    if (Number(input.heightMin) > Number(input.heightMax)) {
      errors.heightMin = 'Los valores estan mezclados'
    }
    if (input.heightMin.length > 2) {
      errors.heightMin = "Solo puede contener uno o dos caracteres";
    }
    if (input.heightMax.length > 2) {
      errors.heightMax = "Solo puede contener uno o dos caracteres";
    }
    if (Number(input.weightMin) > Number(input.weightMax)) {
      errors.weightMin = 'Los valores estan mezclados'
    }
    if (input.weightMin.length > 2) {
      errors.weightMin = "Solo puede contener uno o dos caracteres";
    }
    if (input.weightMax.length > 2) {
      errors.weightMax = "Solo puede contener uno o dos caracteres";
    }
    if (Number(input.life_spanMin) > Number(input.life_spanMax)) {
      errors.life_spanMin = 'Los valores estan mezclados'
    }
    if (input.life_spanMin.length > 2) {
      errors.life_spanMin = "Solo puede contener uno o dos caracteres";
    }
    if (input.life_spanMax.length > 2) {
      errors.life_spanMax = "Solo puede contener uno o dos caracteres";
    }
    return errors;
  }