import { Controller, httpRequest, httpResponse } from '../../presentation/protocols'
import { LogErrorRepository } from "../../data/protocols/db/log/log-error-repository"

export class LogControllerDecorator implements Controller {
    constructor (
        private readonly controller: Controller,
        private readonly logErrorRepository: LogErrorRepository){
        this.controller = controller
        this.logErrorRepository = logErrorRepository
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        const httpResponse = await this.controller.handle(httpRequest)
        if (httpResponse.statusCode === 500) { 
           await this.logErrorRepository.logError(httpResponse.body.stack)
        }
       return httpResponse
    }
}
