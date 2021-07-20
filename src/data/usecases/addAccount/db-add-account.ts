import { AccountModel} from '../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../protocols/db/account/add-account-repository'
import { Hasher } from '../../protocols/criptography/hasher'

export class DbAddAccount implements AddAccount {
    private readonly addAccountRepository: AddAccountRepository
    private readonly hasher: Hasher

    constructor (hasher: Hasher, addAccountRepository: AddAccountRepository) {
        this.hasher = hasher
        this.addAccountRepository = addAccountRepository
    }

    async add (accountData: AddAccountModel): Promise<AccountModel> {
        const hashedPassword = await this.hasher.hash(accountData.password)
        const account = await this.addAccountRepository.add(Object.assign({}, accountData, {password: hashedPassword}))
        return account
    }
}