import { API } from "aws-amplify";
import { getProfileByUsername } from "graphql/queries";

export const FetchAppsyncDetailsByUsername = async (username, userId) => {
  try {
    let data = null;
    let viewProfile = await API.graphql({
      query: getProfileByUsername,
      variables: { username: username },
      authMode: userId ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
    });
    data = viewProfile.data.getProfileByUsername;

    if (data) {
      return data;
    } else {
      throw new Error(`Unknown User  ${username}`);
    }
  } catch (e) {
    console.log(e.name);
    console.log(e);
    throw e;
  }
};

export const FAKE_APPSYNCUSER = {
  lazybaer: {
    id: "679a1892-06a8-49c4-b978-880d75e945f9",
    agreedToTerms: null,
    agreedToMarketing: null,
    badges: [
      {
        entityId: "OuEfgvVFTAKqQQR1faIdLw",
        image:
          "https://api.badgr.io/public/assertions/OuEfgvVFTAKqQQR1faIdLw/image",
        issuedOn: "2021-10-25T17:38:15.566159Z",
        count: 1,
      },
      {
        entityId: "n70GXKcqSnqZTUgVxgOeOQ",
        image:
          "https://api.badgr.io/public/assertions/n70GXKcqSnqZTUgVxgOeOQ/image",
        issuedOn: "2021-10-26T14:27:15.310006Z",
        count: 1,
      },
      {
        entityId: "dalJtHf9SgCpa9NpQLag0A",
        image:
          "https://api.badgr.io/public/assertions/dalJtHf9SgCpa9NpQLag0A/image",
        issuedOn: "2021-10-26T18:24:17.768816Z",
        count: 1,
      },
      {
        entityId: "X3B4LnSkSgu1q9dw546feA",
        image:
          "https://api.badgr.io/public/assertions/X3B4LnSkSgu1q9dw546feA/image",
        issuedOn: "2021-10-27T19:00:28.903803Z",
        count: 1,
      },
      {
        entityId: "cBFEvcEAQtepo2IY5mxnJw",
        image:
          "https://api.badgr.io/public/assertions/cBFEvcEAQtepo2IY5mxnJw/image",
        issuedOn: "2021-10-28T17:23:53.706379Z",
        count: 1,
      },
      {
        entityId: "yR82k3aRQTWxABwU2uvQ0Q",
        image:
          "https://api.badgr.io/public/assertions/yR82k3aRQTWxABwU2uvQ0Q/image",
        issuedOn: "2021-10-30T23:59:15.236704Z",
        count: 1,
      },
    ],
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis ac magna vitae ornare. Nunc eleifend sed augue quis ullamcorper. Pellentesque pellentesque vulputate magna et scelerisque. Vivamus egestas, elit ac interdum tempor consectetur adipiscing elit. Integer mattis ac magna vitae ornare. Nunc eleifend sed augue quis ullamcorper. Pellentesque pellentesque vulputate magna et scelerisque. Vivamus egestas, elit ac interdum tempor, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis ac magna vitae ornare.",
    company: "OpenTorc",
    // coverPhoto: "dev/vlz19mmuktwdcz0g4xpt",
    creator: null,
    email: "cwd@torc.dev",
    family_name: "D",
    githubAccessToken: null,
    given_name: "CW",
    // headshotKey: "dev/zs7kjltjigot1zbnbd8a",
    phone: {
      number: "+1163345551",
      whatsAppAllowed: true,
    },
    identity_username: "lazybaer",
    isVip: null,
    locale: "USA",
    profileCompletion: null,
    referralCode: "rzK1tU4",
    referrerCode: "",
    skills: [
      {
        id: "KS127296VDYS7ZFWVC46",
        infoUrl: "https://skills.emsidata.com/skills/KS127296VDYS7ZFWVC46",
        name: "Node.js",
        type: {
          id: "ST1",
          name: "Hard Skill",
        },
      },
      {
        id: "KS124GY6NTR3LHSVW3WZ",
        infoUrl: "https://skills.emsidata.com/skills/KS124GY6NTR3LHSVW3WZ",
        name: "Graph Theory",
        type: {
          id: "ST1",
          name: "Hard Skill",
        },
      },
      {
        id: "KS1249871JLCVYYL83JV",
        infoUrl: "https://skills.emsidata.com/skills/KS1249871JLCVYYL83JV",
        name: "Genetic Programming",
        type: {
          id: "ST1",
          name: "Hard Skill",
        },
      },
      {
        id: "KS1249566FV5RQSV6XKD",
        infoUrl: "https://skills.emsidata.com/skills/KS1249566FV5RQSV6XKD",
        name: "Genetic Algorithm",
        type: {
          id: "ST1",
          name: "Hard Skill",
        },
      },
      {
        id: "KS2DSDNSP4UY5VRHV2CM",
        infoUrl: "https://skills.emsidata.com/skills/KS2DSDNSP4UY5VRHV2CM",
        name: "Blockchain",
        type: {
          id: "ST1",
          name: "Hard Skill",
        },
      },
    ],
    socialLinks: [
      {
        type: "TWITTER",
        value: "tienshi",
      },
      {
        type: "INSTAGRAM",
        value: "tiendongle",
      },
      {
        type: "LINKEDIN",
        value: "tiendongle",
      },
      {
        type: "FACEBOOK",
        value: "tiendongle",
      },
      {
        type: "STACKOVERFLOW",
        value: "https://stackoverflow.com/users/10039688/tien",
      },
      {
        type: "HASHNODE",
        value: "test",
      },
      {
        type: "PORTFOLIO",
        value: "http://tiendongle.com",
      },
    ],
    stats: {
      avatarUrl: "https://avatars.githubusercontent.com/u/1504607?v=4",
      bio: "Lover of all things Crypto. Founder of Subter: Read Between The Lines",
      eventCountSummary: [
        {
          amt: 54,
          name: "IssueEvent",
        },
        {
          amt: 17,
          name: "PullRequestEvent",
        },
        {
          amt: 2228,
          name: "IssueCommentEvent",
        },
        {
          amt: 43,
          name: "PullRequestReviewEvent",
        },
        {
          amt: 189,
          name: "PushEvent",
        },
        {
          amt: 2,
          name: "CreateEvent",
        },
      ],
      generatedDescription:
        "a trend setting JavaScripter. Contributing for 9 years on Github shows how dedicated they are to their profession! While an avid coder, based on the amount of gists, CWD must be verbose because they do not contribute often to gists. ",
      isBountyHunter: false,
      isCampusExpert: false,
      isDeveloperProgramMember: false,
      isGitHubStar: false,
      languages: [
        {
          name: "JavaScript",
          value: 37,
        },
        {
          name: "HTML",
          value: 15,
        },
        {
          name: "CSS",
          value: 11,
        },
        {
          name: "Java",
          value: 6,
        },
        {
          name: "Shell",
          value: 6,
        },
        {
          name: "Python",
          value: 5,
        },
        {
          name: "Dockerfile",
          value: 5,
        },
        {
          name: "C++",
          value: 3,
        },
        {
          name: "Apex",
          value: 2,
        },
        {
          name: "Arduino",
          value: 2,
        },
        {
          name: "Perl",
          value: 1,
        },
        {
          name: "Batchfile",
          value: 1,
        },
        {
          name: "Ruby",
          value: 1,
        },
        {
          name: "Puppet",
          value: 1,
        },
        {
          name: "SaltStack",
          value: 1,
        },
        {
          name: "Swift",
          value: 1,
        },
        {
          name: "Processing",
          value: 1,
        },
        {
          name: "C",
          value: 1,
        },
        {
          name: "Arc",
          value: 1,
        },
        {
          name: "Sass",
          value: 1,
        },
      ],
      location: "Canada",
      login: "cwdcwd",
      name: "CWD",
      pinnedItems: [],
      ratings: [
        {
          category: "Reliability",
          desc: "Average Contributor",
          img: "torc",
          number: "2.5",
        },
        {
          category: "Quality",
          desc: "Top Contributor",
          img: "torque",
          number: "4.5",
        },
      ],
      totalFollowers: 24,
    },
    status: null,
    tagline: "Ayatollah of Rock N Rollah",
    updater: null,
    username: "lazybaer",
    userType: null,
    visibility: "FULL",
    createdAt: "2021-10-28T17:23:48.920Z",
    updatedAt: "2021-10-31T02:06:53.969Z",
  },
  "pga-jt": {
    id: "7a5412f0-4e84-40b1-b607-51ea7ccb73fd",
    agreedToTerms: null,
    agreedToMarketing: null,
    badges: null,
    bio: "At just 28-years old, he can lay claim to a Major victory, a FedEx Cup Championship, PLAYERS Championship and a PGA TOUR Player of the Year Award. Thomas is also only 1 of 4 players in PGA Tour history with 14 victories before his 28th birthday, joining Jack Nicklaus, Johnny Miller and Tiger Woods.\n\nJustin Thomas currently has the most wins of any player on TOUR currently under 30 years old with 14. In 2018, Justin was just the 21st player to ever reach #1 in the Official World Golf Rankings following his WGC win in Memphis. Thomas’ breakout season came in 2016-17 with five of his PGA TOUR wins, including the PGA Championship, 12 top 10 finishes and, ultimately, the FedEx Championship. His other victories came at the CIMB Classic, Sentry Tournament of Champions, Sony Open in Hawaii and Dell Technologies Championship. At the Sony Open, Thomas became the youngest player to shoot 59 on the PGA TOUR and also broke the TOUR’s 72-hole scoring record by a stroke.\n\nThomas, who was born and raised in Goshen, KY, played collegiate golf for the Alabama Crimson Tide. There he became one of the storied program’s most decorated athletes, being named Phil Mickelson Freshman of the Year, Jack Nicklaus Player of the Year, the Haskins Award Winner as the most outstanding player in collegiate and amateur golf, and capped his collegiate career by helping the Crimson Tide win their first National Championship.",
    company: "",
    coverPhoto: "nr64jb4isx58qwifqdqj",
    creator: "com.opentorc.id.post_confirmation",
    email: "mcardillo+jt@torc.dev",
    family_name: "Thomas",
    githubAccessToken: "",
    given_name: "Justin",
    headshotKey: "bocd0tlsnsq8lcs2qy7a",
    identity_username: "pga-jt",
    isVip: null,
    locale: "Vancouver, BC, Canada",
    profileCompletion: null,
    referralCode: "Bfg8Tjy",
    referrerCode: "",
    skills: [
      {
        id: "KS1200771D9CR9LB4MWW",
        infoUrl: "https://skills.emsidata.com/skills/KS1200771D9CR9LB4MWW",
        name: "JavaScript (Programming Language)",
        type: {
          id: "ST1",
          name: "Hard Skill",
        },
      },
      {
        id: "KS124PR62MV42B5C9S9F",
        infoUrl: "https://skills.emsidata.com/skills/KS124PR62MV42B5C9S9F",
        name: "Hibernate (Java)",
        type: {
          id: "ST1",
          name: "Hard Skill",
        },
      },
      {
        id: "KS120F870XKPK0RFTKMC",
        infoUrl: "https://skills.emsidata.com/skills/KS120F870XKPK0RFTKMC",
        name: "Photography",
        type: {
          id: "ST1",
          name: "Hard Skill",
        },
      },
      {
        id: "ES4B3454E376E83679DE",
        infoUrl: "https://skills.emsidata.com/skills/ES4B3454E376E83679DE",
        name: "Golf Instruction",
        type: {
          id: "ST1",
          name: "Hard Skill",
        },
      },
      {
        id: "ES1D31E676126942EEA6",
        infoUrl: "https://skills.emsidata.com/skills/ES1D31E676126942EEA6",
        name: "Golf Course Maintenance",
        type: {
          id: "ST1",
          name: "Hard Skill",
        },
      },
    ],
    socialLinks: [],
    stats: null,
    status: null,
    tagline: "One of the most exciting and popular golfers on the PGA TOUR. ",
    updater: "pga-jt",
    username: "pga-jt",
    userType: "FREELANCER",
    visibility: "FULL",
    createdAt: "2021-10-30T15:59:44.246Z",
    updatedAt: "2021-10-30T16:42:55.632Z",
  },
  empty: {
    id: null,
    agreedToTerms: null,
    agreedToMarketing: null,
    badges: null,
    bio: null,
    company: null,
    coverPhoto: null,
    creator: null,
    email: null,
    family_name: null,
    githubAccessToken: null,
    given_name: null,
    headshotKey: null,
    identity_username: null,
    isVip: null,
    locale: null,
    phone: null,
    profileCompletion: null,
    referralCode: null,
    referrerCode: null,
    skills: [],
    socialLinks: [],
    stats: null,
    status: null,
    tagline: null,
    updater: null,
    username: null,
    userType: null,
    visibility: null,
  },
};
