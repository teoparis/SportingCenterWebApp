import {AppConstantsPORT} from "./app.constantsPORT";
import {AppConstantsURL} from "./app.constantsURL";

export class AppConstantsMicro {
  //GateWay Constant
  static API_GATEWAY_URL = AppConstantsURL.KUBERNATES + AppConstantsPORT.GATEWAY_PORT_KUB + "/";

  //Microservices Constants
  public static SUBSCRIPTION_SERVICE_ADMIN= AppConstantsMicro.API_GATEWAY_URL + "subscription-service/admin/";
  public static SUBSCRIPTION_SERVICE_USER= AppConstantsMicro.API_GATEWAY_URL + "subscription-service/user/";
  public static ACTIVITY_SERVICE = AppConstantsMicro.API_GATEWAY_URL + "activity-service/admin/";
  public static CALENDAR_SERVICE = AppConstantsMicro.API_GATEWAY_URL + "calendar-service/admin/";
  public static CALENDAR_SERVICE_USER = AppConstantsMicro.API_GATEWAY_URL + "calendar-service/user/";

  private static OAUTH2_URL = AppConstantsMicro.API_GATEWAY_URL + "authentication-service/oauth2/authorization/";
}
