package in.bharadwaj.auth.Service;

import in.bharadwaj.auth.io.ProfileRequest;
import in.bharadwaj.auth.io.ProfileResponse;

public interface ProfileService {
    ProfileResponse createProfile(ProfileRequest request);

    ProfileResponse getProfile(String email);

    void sendResetOtp(String email);

    void resetPassword(String email, String otp, String newPassword);

    void sendOTP(String email);

    void verifyOtp(String email, String otp);

}
