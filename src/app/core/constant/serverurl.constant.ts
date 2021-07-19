import { environment } from "./../../../environments/environment";

export class ServerUrl {

 public static MAIN = environment.baseUrl
 public static API_GET_ROOMLIST: string = '/vastu/getRoomList';
 public static API_GET_ROOMDETAILS_DIRECTION:string='/vastu/getDirectionDetails'


}
