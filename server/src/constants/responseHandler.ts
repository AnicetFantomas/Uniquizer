import { Response } from "express";

const SuccessResponse = (res: Response, data: any, message: string, pages?: number, page?: any) => {
    return res.status(200).send({
        status: 200,
        message,
        pages,
        page,
        data,
    });
}

const ErrorResponse = (res: Response, status: number, message: String) => {
  return res.status(status).send({
    status,
    message,
  });
};

const ServerErrorResponse = (res: Response, error: any) => {
  return res.status(500).send({
    status: 500,
    message: error.message,
  });
};

const NotFoundResponse = (res: Response, message: String) => {
  return res.status(400).send({
    status: 400,
    message,
  });
};

const BadRequestResponse = (res: Response, message: String) => {
  return res.status(400).send({
    status: 400,
    message,
  });
};

const ConflictResponse = (res: Response, message: String) => {
  return res.status(409).send({
    status: 409,
    message,
  });
};

export default {
  SuccessResponse,
  ErrorResponse,
  ServerErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
  ConflictResponse,
};
