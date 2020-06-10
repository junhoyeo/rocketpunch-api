import axios from 'axios';
import cheerio from 'cheerio';

import UserProfile from './profiles/UserProfile';

interface ICredentials {
  email: string;
  password: string;
}

export default class RocketPunchAPIClient {
  email: string;
  password: string;

  constructor({ email, password }: ICredentials) {
    this.email = email;
    this.password = password;
  }

  login = async () => {
  };

  getUser = async (username: string) => {
    const response = await axios.get(`https://www.rocketpunch.com/@${username}`);
    const rawHTML: string = response.data;

    const document = cheerio.load(rawHTML);
    return new UserProfile({
      username,
      document,
    });
  };
}
