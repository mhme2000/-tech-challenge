import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class IsCPF implements ValidatorConstraintInterface {
  validate(text: string) {
    if (typeof text !== 'string') return false;
    const cpf = text.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    const cpfSplited = cpf.split('');
    const validator = cpfSplited
      .filter((digit, index, array) => index >= array.length - 2 && digit)
      .map((el) => +el);
    const toValidate = (pop) =>
      cpfSplited
        .filter((digit, index, array) => index < array.length - pop && digit)
        .map((el) => +el);
    const rest = (count, pop) =>
      ((toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) *
        10) %
        11) %
      10;
    return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
  }

  defaultMessage() {
    return '($value) is not a valid CPF document';
  }
}
