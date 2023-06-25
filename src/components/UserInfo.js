export default class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector, profileAvatarSelector) {
    this._nameElement = profileNameSelector;
    this._descriptionElement = profileDescriptionSelector;
    this._avatarElement = profileAvatarSelector;
  }

  getUserInfo() {
    const userObject = {};
    userObject["profileName"] = this._nameElement.textContent;
    userObject["description"] = this._descriptionElement.textContent;
    return userObject;
  }

  setUserInfo(nameInfo, jobInfo) {
    this._nameElement.textContent = nameInfo;
    this._descriptionElement.textContent = jobInfo;
  }
}
