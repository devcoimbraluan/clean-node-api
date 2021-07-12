import { Controller, httpRequest, httpResponse } from "../../../presentation/protocols";
import {Request, Response} from 'express'

export const adaptRoute = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const HttpRequest: httpRequest = {
            body: req.body
        }
        const httpResponse = await controller.handle(HttpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}