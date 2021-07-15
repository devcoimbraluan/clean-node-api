import { MissingParamError } from "../../errors/missing-params-error"
import { RequiredFieldValidation } from "./required-field-validation"

describe('RequiredField Validation', () => {
    test('Should return a MissingParamError if validation fails', () => {
        const sut = new RequiredFieldValidation('field')
        const error = sut.validate({ name: 'any_name' })
        expect(error).toEqual(new MissingParamError('field'))
    })

    test('Should not return a validation succeeds', () => {
        const sut = new RequiredFieldValidation('field')
        const error = sut.validate({ field: 'any_name' })
        expect(error).toBeFalsy()
    })
})