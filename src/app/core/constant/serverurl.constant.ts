import { environment } from "./../../../environments/environment";

export class ServerUrl {

 public static MAIN = environment.baseUrl
 public static API_GET_ROOMLIST: string = '/vastu/getRoomList';
 public static API_GET_ROOMDETAILS_DIRECTION:string='/vastu/getDirectionDetails'
public static API_GET_VASTUSCORE:string='/vastu/getVastuScore';
public static API_GET_ROOMDETAILS:string='/vastu/getRoomDetails';


}
