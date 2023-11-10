interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  repos_url: string;
  starred_url: string;
  subscriptions_url: string;
  site_admin: boolean;
  type: string;
}
export default User;
