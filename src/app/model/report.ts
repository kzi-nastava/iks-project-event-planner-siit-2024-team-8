import {UserInfoResponse} from '../user/domain/user.info.response';
import {User} from '../user/domain/user';

export interface ReportResponse {
  id: string;
  userEmail : string,
  reportedEmail: string,
  reason: string;
  date: string;
}
