import  {Response} from 'express';

const SuccessResponse = (data: any, res: Response, message: String, pages?: number,page? :any ) => {
    res.status(200).json({
        status: 200,
        message, 
        pages,
        page,
        data
    });
}

const ErrorResponse = (res: Response,status : number, message: String) => {
    res.status(status).json({
        status,
        message
    });
}

const ServerErrorResponse = (res: Response, error: any) => {
    return res.status(500).send({
        status: 500,
        message: error.message,
    });
}

const NotFoundResponse = (res: Response, message: String) => {
    return res.status(400).send({
        status: 400,
        message
    });
}
