import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';

export function errorHandler(erro: any, req: Request, res: Response, next: NextFunction) {
  const status = erro.statusCode || 500;
  const message = erro.message || 'Erro Interno do Servidor!';
  fs.writeFile('./log/logtxt', erro);
  res.status(status).json({ error: message });
}
