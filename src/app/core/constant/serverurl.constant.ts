import { environment } from "./../../../environments/environment";

export class ServerUrl {

 public static MAIN = environment.baseUrl
 public static API_ENDPOINT_GET_ROOMLIST: string = '/vastu/getRoomList';
 public static API_GET_ROOMDETAILS_DIRECTION:string='/vastuCheck/getDirectionDetails'
//  public static API_ENDPOINT_GET_ROOMDETAILS: string = 'getRoomDetails';

//  public static API_ENDPOINT_VAASTU_SCORE: string = 'getVastuScore';


}
