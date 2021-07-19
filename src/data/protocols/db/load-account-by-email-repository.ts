import { AccountModel } from "../../usecases/addAccount/db-add-account-protocols";

export interface LoadAccountByEmailRepository {
    load (email: string): Promise<AccountModel>
}