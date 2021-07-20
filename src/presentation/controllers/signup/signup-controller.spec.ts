import { SignUpController } from "./signup-controller"
import { MissingParamError } from '../../errors/missing-params-error'
import { ServerError } from "../../errors/server-error"
import { AddAccount, AddAccountModel, AccountModel, Validation} from "./signup-controller-protocols"
import { httpRequest } from "../../protocols"
import { ok, serverError, badRequest } from "../../helpers/http/http-helper"

const makeAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount{
       async add (account: AddAccountModel): Promise<AccountModel> {
            return await Promise.resolve(makeFakeAccount())
        }
    }
    return new AddAccountStub
}

const makeValidation = (): Validation => {
    class validationStub implements Validation{
       validate (input: any): Error {
            return null
        }
    }
    return new validationStub
}

const makeFakeAccount = (): AccountModel => ({
  id: 'validId',
  name: 'validName',
  email: 'valid_mail@mail.com',
  password: 'valid_password'
})

const makeFakeRequest = (): httpRequest => ({
    body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
    }
})


interface SutTypes {
    sut: SignUpController
    addAccountStub: AddAccount
    validationStub: Validation
}

const makeSut = (): SutTypes => {
    const addAccountStub = makeAddAccount()
    const validationStub = makeValidation()
    const sut = new SignUpController( addAccountStub, validationStub)
    return {
        sut,
        addAccountStub,
        validationStub
    }
}
describe('SignUp Controller', () => {
     test('Should call AddAccount with correct values', async () => {
        const { sut, addAccountStub } = makeSut()
        const addSpy = jest.spyOn(addAccountStub, 'add')
        sut.handle(makeFakeRequest())
        expect(addSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password'
        })
    })
    test('Should return 500 if AddAccount throws', async () => {
        const { sut, addAccountStub } = makeSut()
        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })
    test('Should return 200 if an alid data is provided', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(makeFakeAccount()))
    })
    test('Should call Validation with correct value', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(makeFakeRequest())
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
    test('Should return 400 validation returns an error', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })
})