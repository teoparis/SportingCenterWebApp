import {AppConstantsPORT} from "./app.constantsPORT";

export class AppConstants {
    static API_AUTH_USER_URL = "http://localhost:" + AppConstantsPORT.AUTH_USER_PORT + "/";
    private static OAUTH2_URL = AppConstants.API_AUTH_USER_URL + "oauth2/authorization/";
    private static REDIRECT_URL = "?redirect_uri=http://localhost:8081/login";
    public static API_URL = AppConstants.API_AUTH_USER_URL + "api/";
    public static ADMIN_URL = AppConstants.API_AUTH_USER_URL + "admin/";
    public static AUTH_API = AppConstants.API_URL + "auth/";
    public static GOOGLE_AUTH_URL = AppConstants.OAUTH2_URL + "google" + AppConstants.REDIRECT_URL;
    public static FACEBOOK_AUTH_URL = AppConstants.OAUTH2_URL + "facebook" + AppConstants.REDIRECT_URL;
    public static GITHUB_AUTH_URL = AppConstants.OAUTH2_URL + "github" + AppConstants.REDIRECT_URL;
    public static LINKEDIN_AUTH_URL = AppConstants.OAUTH2_URL + "linkedin" + AppConstants.REDIRECT_URL;
}
