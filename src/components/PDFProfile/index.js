import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";
import { MAP_AVAILABILITY } from "constants";
import { getWorkExperience } from "helpers/utils";
import moment from "moment";
import placeholderProfile from "../../images/placeholderProfile.png";
import SOCIAL_ICONS from "utils/svgIcons";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import logo from "../../images/headerLogo.png";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  text: {
    marginLeft: 10,
    fontFamily: "Helvetica",
    textAlign: "justify",
    fontSize: 12,
    color: "#000000DE",
    lineHeight: 1.5,
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
  },
  h1: {
    display: "block",
    fontSize: 22.5,
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 0,
    marginRight: 0,
    padding: 10,
    fontFamily: "Helvetica-Bold",
    fontWeight: 700,
    color: "black",
  },
  h2: {
    display: "block",
    fontSize: 18,
    marginTop: 1,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
    padding: 10,
    fontFamily: "Helvetica-Bold",
    fontWeight: 700,
    color: "black",
  },
  h3: {
    display: "block",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
    padding: 10,
    fontFamily: "Helvetica-Bold",
    fontWeight: 700,
    color: "black",
  },
  mb15: {
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
  },
  col: {
    flexDirection: "column",
    margin: 0,
  },
  left: {
    paddingVertical: 5,
    width: "25%",
    borderRight: "1px solid #e5e5e5",
    paddingRight: 15,
  },
  right: {
    paddingVertical: 5,
    paddingLeft: 10,
    width: "75%",
  },
  threeCol: {
    width: "33.333%",
  },
  textMSB: {
    marginLeft: 10,
    marginBottom: 5,
    fontWeight: 700,
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#4B5563",
  },
  textMS: {
    marginLeft: 10,
    fontSize: 9,
    color: "#737373",
  },
  textSkills: {
    color: "#155E75",
    fontSize: 9,
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: "#ecfeff",
  },
  image: {
    display: "block",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: 10,
    marginHorizontal: "auto",
  },
});

Font.registerHyphenationCallback((word) => {
  // Return entire word as unique part
  return [word];
});

const PDFProfile = ({ user, isAdmin }) => {
  let {
    given_name,
    family_name,
    bio,
    location,
    skills,
    tagline,
    knownLanguages,
    availability,
    careers,
    socialLinks,
    projectsCaseStudies,
    headshotKey,
    email,
    phone,
    username,
  } = user;

  const { fullAddress, countryCodeFormat } = useMemo(() => {
    if (!location) {
      return { fullAddress: "", countryCodeFormat: "" };
    }
    const fullAddress = `${location.countryName}${
      location.stateName ? ", " + location.stateName + ", " : ""
    }${location.cityName ? location.cityName : ""}`;
    const countryCodeFormat = location.countryCode.toLowerCase();

    return { fullAddress, countryCodeFormat };
  }, [location]);

  const fullName = `${given_name} ${family_name}`;
  const [timeZoneId, setTimeZoneId] = useState();
  const linkProfile = `${process.env.REACT_APP_DOMAIN}/${window.location.hash}`;

  const getSocial = (type) => {
    return SOCIAL_ICONS[type]
      ? SOCIAL_ICONS[type].svg
      : SOCIAL_ICONS["PORTFOLIO"].svg;
  };

  const getExperience = () => {
    let months = getWorkExperience(
      careers?.map((c) => ({ startDate: c.startDate, endDate: c.endDate }))
    );

    const years = Math.floor(months / 12);
    const yearsInStr = months % 12 > 0 ? `${years}+` : `${years}`;
    const yearsUnit = years === 1 && months % 12 === 0 ? "year" : "years";

    return years > 0 ? `${yearsInStr} ${yearsUnit}` : "Fresh";
  };

  const dirImg = headshotKey
    ? `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/${headshotKey}`
    : placeholderProfile;

  useEffect(() => {
    if (!location) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/timezone/json?location=${
            location.latitude
          },${location.longitude}&timestamp=${Math.floor(
            Date.now() / 1000
          )}&key=${process.env.REACT_APP_GOOGLE_TIMEZONES_API_KEY}`
        );
        const { status, timeZoneId } = response.data;

        if (status === "OK") setTimeZoneId(timeZoneId);
        else console.error("Failed to fetch local time.");
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchData();
  }, [location]);

  const getLevel = (level) => {
    return `${level.charAt(0).toUpperCase()}${level.slice(1).toLowerCase()}`;
  };

  function buildSocialURL(socialLink) {
    const socialNetworks = {
      TWITTER: "https://www.x.com/",
      FACEBOOK: "https://www.facebook.com/",
      INSTAGRAM: "https://www.instagram.com/",
      LINKEDIN: "https://www.linkedin.com/in/",
      GITHUB: "https://github.com/",
      STACKOVERFLOW: "https://stackoverflow.com/users/",
      DEV: "https://dev.to/",
      HASHNODE: "https://hashnode.com/",
      PORTFOLIO: "",
    };

    if (socialLink.type in socialNetworks) {
      const urlBase = socialNetworks[socialLink.type];
      let userName = socialLink.value;

      if (userName.startsWith("http://") || userName.startsWith("https://")) {
        return userName;
      } else {
        if (socialLink.type === "hashnode" && !userName.startsWith("@")) {
          userName = `@${userName}`;
        }

        return `${urlBase}${userName}`;
      }
    } else {
      console.error("failed");
    }
  }

  return (
    <>
      <Document>
        <Page style={styles.page} wrap size="A4">
          <View style={styles.row}>
            <View style={styles.left}>
              <Image
                src={dirImg}
                alt="Profile Image"
                style={styles.image}
              ></Image>
              {isAdmin && (
                <View>
                  <Text
                    style={[
                      styles.h2,
                      {
                        textAlign: "center",
                        display: "block",
                        marginBottom: 0,
                      },
                    ]}
                  >
                    {fullName}
                  </Text>
                </View>
              )}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 15,
                }}
              >
                <Link
                  style={[
                    styles.text,
                    {
                      textAlign: "center",
                      marginLeft: 0,
                      flex: 1,
                    },
                  ]}
                  src={linkProfile}
                >
                  @{username}
                </Link>
              </View>
              {isAdmin && (
                <>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginBottom: 15,
                    }}
                  >
                    <Link
                      style={{
                        marginLeft: 0,
                        marginRight: 10,
                      }}
                      src={`mailto:${email}`}
                    >
                      <Image
                        style={{ width: 15, height: 15 }}
                        src={SOCIAL_ICONS["EMAIL"].svg}
                      ></Image>
                    </Link>

                    {phone?.number && (
                      <Link
                        style={{
                          marginLeft: 0,
                        }}
                        src={`tel:${phone.number}`}
                      >
                        <Image
                          style={{ width: 15, height: 15 }}
                          src={SOCIAL_ICONS["PHONE"].svg}
                        ></Image>
                      </Link>
                    )}
                  </View>
                </>
              )}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      marginLeft: 0,
                      marginBottom: 15,
                      flex: 1,
                      textAlign: "center",
                    },
                  ]}
                >
                  <Image
                    src={`https://flagcdn.com/16x12/${countryCodeFormat}.png`}
                    alt="flag"
                    style={{ width: "16px", height: "12px" }}
                  ></Image>
                  &nbsp;&nbsp;{fullAddress}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {socialLinks
                  ?.filter((socialLink) => socialLink.value)
                  .map((socialLink, idx) => (
                    <Link
                      style={[
                        styles.text,
                        styles.textBold,
                        {
                          textAlign: "center",
                          textTransform: "lowercase",
                          gap: "3",
                          marginBottom: 5,
                        },
                      ]}
                      src={buildSocialURL(socialLink)}
                      key={idx}
                    >
                      <Image
                        style={{ width: 15, height: 15 }}
                        src={getSocial(socialLink.type)}
                      ></Image>
                    </Link>
                  ))}
              </View>
            </View>
            <View style={styles.right}>
              <Image
                src={logo}
                alt="logo"
                style={{ width: "80px", marginLeft: "auto" }}
                fixed
              ></Image>
              <Text style={styles.h1}>{tagline}</Text>
              <Text style={styles.text}>{bio}</Text>
              <Text style={styles.h3}>Summary</Text>
              <View style={styles.row}>
                <View style={{ width: "120px" }}>
                  <Text style={styles.textMSB}>{getExperience()}</Text>
                  <Text style={styles.textMS}>Experience</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.textMSB, { textTransform: "capitalize" }]}
                  >
                    {
                      Intl.DateTimeFormat(undefined, {
                        timeZone: timeZoneId,
                        timeZoneName: "long",
                      }).formatToParts()[6].value
                    }
                  </Text>
                  <Text style={styles.textMS}>Timezone</Text>
                </View>
                <View style={{ width: "120px" }}>
                  <Text style={styles.textMSB}>
                    {MAP_AVAILABILITY[availability] ?? "N/a"}
                  </Text>
                  <Text style={styles.textMS}>Availability</Text>
                </View>
              </View>
              <Text style={styles.h3}>Skills</Text>
              <View style={styles.mb15}>
                {skills?.length > 0 &&
                  skills
                    .sort((a, b) => {
                      const order = {
                        high: 0,
                        medium: 1,
                        low: 2,
                      };
                      return order[a.experience] - order[b.experience];
                    })
                    .map((skill, idx) => (
                      <View
                        style={[
                          styles.row,
                          { alignItems: "center", marginBottom: 5 },
                        ]}
                        key={idx}
                      >
                        <Text style={styles.textSkills}>{skill.name}</Text>
                        {skill.experience ? (
                          <>
                            <Text style={styles.textMS}>
                              {skill.experience.charAt(0).toUpperCase() +
                                skill.experience.slice(1)}{" "}
                              experience{" "}
                            </Text>
                          </>
                        ) : (
                          <Text style={styles.textMS}>
                            Experienced in {skill.name}
                          </Text>
                        )}
                      </View>
                    ))}
              </View>
              <Text style={styles.h3}>Languages</Text>
              <View style={[styles.row, styles.mb15]}>
                {knownLanguages?.map((language, idx) => (
                  <View style={styles.row} key={idx}>
                    <Text style={[styles.text, styles.textBold]}>
                      {language.language}
                    </Text>
                    <Text style={styles.text}>{getLevel(language.level)}</Text>
                  </View>
                ))}
              </View>
              {careers?.length > 0 && (
                <>
                  <Text style={styles.h3}>Experience</Text>
                  {careers.map((career, idx) => (
                    <View style={[styles.row, styles.mb15]} key={idx}>
                      <View style={{ width: "90px" }}>
                        <Text style={styles.text}>
                          {moment(career.startDate).format("YYYY")} -{" "}
                          {career.endDate
                            ? moment(career.endDate).format("YYYY")
                            : "Present"}
                        </Text>
                      </View>

                      <View style={{ flex: 1 }}>
                        <Text style={[styles.text, styles.textBold]}>
                          {career.companyName}
                        </Text>
                        <Text style={styles.text}>
                          {career.description ?? ""}
                        </Text>
                      </View>
                    </View>
                  ))}
                </>
              )}
              {projectsCaseStudies?.length > 0 && (
                <>
                  <Text style={styles.h3}>Projects</Text>
                  {projectsCaseStudies.map((project, idx) => (
                    <View style={[styles.row, styles.mb15]} key={idx}>
                      <View style={{ width: "90px" }}>
                        <Text style={styles.text}>
                          {project.startDate && (
                            <>{moment(project.startDate).format("YYYY")} -</>
                          )}{" "}
                          {project.endDate
                            ? moment(project.endDate).format("YYYY")
                            : "Present"}
                        </Text>
                      </View>

                      <View style={{ flex: 1 }}>
                        <Text style={[styles.text, styles.textBold]}>
                          {project.client}
                        </Text>
                        <Text style={styles.text}>{project.description}</Text>
                      </View>
                    </View>
                  ))}
                </>
              )}
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default PDFProfile;
