import {ErrorModel} from './error.model';

export class ApiResponseBaseModel<TContent> {
  success: boolean;
  content: TContent;
  error: ErrorModel;
}


