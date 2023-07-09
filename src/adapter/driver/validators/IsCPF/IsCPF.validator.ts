import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

// TODO VERIFICAR VALIDAÇÃO CPF
@ValidatorConstraint({ name: 'customText', async: false })
export class IsCPF implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (text == "00000000000") return false;

    let sum = 0;
    let rest = 0;

    // Validation First Verification Digit
    const firstVerificationDigit =  parseInt(text.charAt(10));

    for (let i = 0; i < 9; i++) {
        sum += parseInt(text.charAt(i)) * (10 - i);
    }

    rest = (sum * 10) % 11;
    
    if ((rest == 10) || (rest == 11))  
        rest = 0;

    if (rest != firstVerificationDigit) return false;

    
    // Validation Second Verification Digit
    const secondVerificationDigit =  parseInt(text.charAt(10));

    sum = 0;

    for (let i = 0; i < 10; i++) {
        sum += parseInt(text.charAt(i)) * (11 - i);
    }

    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11))  
        rest = 0;

    if (rest != secondVerificationDigit) 
        return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return '($value) is not a valid CPF document!';
  }
}