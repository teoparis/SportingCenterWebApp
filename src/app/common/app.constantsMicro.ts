import {AppConstantsPORT} from "./app.constantsPORT";

export class AppConstantsMicro {
  //GateWay Constant
  static API_GATEWAY_URL = "http://localhost:" + AppConstantsPORT.GATEWAY_PORT + "/";

  //Microservices Constants
  public static SUBSCRIPTION_SERVICE= AppConstantsMicro.API_GATEWAY_URL + "subscription-service/admin/";
  public static ACTIVITY_SERVICE = AppConstantsMicro.API_GATEWAY_URL + "activity-service/admin/";

  private static OAUTH2_URL = AppConstantsMicro.API_GATEWAY_URL + "authentication-service/oauth2/authorization/";
}
