const LS_PROFILE_KEY = "screenshare_user_profile";

export function getUserProfile() {
  const profile = localStorage.getItem(LS_PROFILE_KEY);

  if (profile) {
    return JSON.parse(profile);
  }

  return null;
}

export function setUserProfile(object) {
  localStorage.setItem(LS_PROFILE_KEY, JSON.stringify(object));
}
