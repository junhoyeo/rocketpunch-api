interface ISocialLink {
  name: string;
  href: string;
}

interface IUserSummary {
  avatar: string;
  name: string;
  englishName: string;
  socialInfo: {
    recommends: number;
    friends: number;
    residence: string;
  };
  webpage: string;
  socialLinks: ISocialLink[];
  connection: {
    following: number;
    follower: number;
  }
}

interface IUserProfileProps {
  username: string;
  document: CheerioStatic;
}

const fallbackUserAvatar = 'https://image.rocketpunch.com/images/user/user.png?s=200x200&t=cover';

export default class UserProfile {
  username: string;
  document: CheerioStatic;

  constructor({ username, document }: IUserProfileProps) {
    this.username = username;
    this.document = document;
  }

  getSummary = async (): Promise<IUserSummary> => {
    const username = this.username;
    const avatar = this.document('img.avatar')
      .attr('src')
      ?.trim() || fallbackUserAvatar;
    const englishNameBeforeTrimmed = this.document('div.nowrap.name h1 small')
      .text()
      .trim();
    const [name, englishName] = ((englishNameBeforeTrimmed: string) => {
      const koreanName = this.document('div.nowrap.name h1')
        .text()
        .replace(englishNameBeforeTrimmed, '')
        .trim();
      const englishName = englishNameBeforeTrimmed.replace(/  +/g, ' ');
      return [koreanName, englishName];
    })(englishNameBeforeTrimmed);

    const parseSocialInfoByClassName = (className: string) =>
      this.document(`div#people-social-info a.${className}`)
        .text()
        .trim();

    const parseLastNumber = (text: string) => parseInt(text.split(' ')[1]);

    const recommends = parseLastNumber(parseSocialInfoByClassName('recommend'));
    const friends = parseLastNumber(parseSocialInfoByClassName('friends'));
    const residence = parseSocialInfoByClassName('residence');

    const webpage = this.document('div.user-activities div.description > a').attr('href')?.trim() || '';
    const socialLinks = this.document('div.social.description')
      .find('a')
      .toArray()
      .map((socialLinkReference) => {
        const socialLinkElement = this.document(socialLinkReference);
        return {
          name: socialLinkElement
            .children()
            .attr('class')
            ?.trim()
            .split('_')[1] || '',
          href: socialLinkElement
            .attr('href')
            ?.trim() || '',
        };
      });

    const parseConnectionByAttr = (attr: string, className: string) =>
      parseLastNumber(
        this.document(`div.connection-data a[${attr}="${className}"]`)
          .text()
          .trim(),
      );

    const following = parseConnectionByAttr('href', `/@${username}/following`);
    const follower = parseConnectionByAttr('href', `/@${username}/follower`);

    return {
      avatar,
      name,
      englishName,
      socialInfo: {
        recommends,
        friends,
        residence,
      },
      webpage,
      socialLinks,
      connection: {
        following,
        follower,
      }
    };
  };
}
