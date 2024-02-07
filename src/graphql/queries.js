/**
 * Difference b/w this query and the one in autoQueries.js
 * - application.items field is added
 */
export const listJobOpportunities = /* GraphQL */ `
 query ListJobOpportunitys(
   $filter: ModelJobOpportunityFilterInput
   $limit: Int
   $nextToken: String
 ) {
   listJobOpportunitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        creator
        customerId
        customerOwner {
          id
          username
        }
        organization
        customer {
        company
          companyDetails {            
            name
          }
        }
        jobType {
          applicationCount
          title
        }
        jobTypeId
        matches {
          items {
            id
            applicationId
            isAccepted
            isCalibration
            status
            subStatus
          }
          nextToken
        }
        status
        title
        timeCommitment
        timeOverlap
        updater
        createdAt
        updatedAt
        }
      nextToken
   }
 }
`;

export const listJobOpportunitiesByVisibility = /* GraphQL */ `
  query ListJobOpportunitiesByVisibility(
    $visibilityLevel: JobOpportunityVisibilityLevel!
    $jobTypeIds: [ID!]
    $filter: ModelJobOpportunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobOpportunitiesByVisibility(
      visibilityLevel: $visibilityLevel
      jobTypeIds: $jobTypeIds
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        jobLength
        freelancerPitchPrefill
        jobLengthInWeeks
        maxRate {
          value
          currency
        }
        minRate {
          value
          currency
        }
        overview
        regions
        requirements
        responsibilities
        startDate
        skills {
          id
          infoUrl
          name
          type {
            id
            name
          }
        }
        startDate
        status
        timeOverlap
        timeCommitment
        timezone {
          label
          value
        }
        title
      }
      nextToken
      }
    }
`

export const getFieldHistory = /* GraphQL */ `
  query GetFieldHistory(
    $entity: String
    $key: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFieldHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getFieldHistory(
      entity: $entity
      key: $key
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        oldValue
        newValue
        creator
        createdAt
      }
    }
  }
`;

export const formGetJobOpportunity = (matchesFilter = '') => `
  query GetJobOpportunity($id: ID!) {
    getJobOpportunity(id: $id) {
      id
      calibrationIsEnabled
      jobLength
      jobLengthInWeeks
      customer {
        notes {
          items {
            content
          }
        }
      }
      customerOwner {
        id
        username
      }
      jobTypeId
      matches${matchesFilter} {
        items {
          application {
            id
            creator
            availableStartDate
            jobTypeId
            updater
            userId
            user {
              id
              assessments {
                id
                assessmentCompleted
                finalScore
                reportLink
                status
                testName
                timeTaken
              }
              availability
              badges {
                count
                entityId
                image
                name
                issuedOn
                description
              }
              bio
              careers {
                id
                companyName
                description
                endDate
                format
                locationType
                stack
                startDate
                title
              }
              countryName
              headshotKey
              family_name
              given_name
              coverPhoto
              otherLinks {
                createdAt
                description
                name
                value
                visibility
              }
              knownLanguages {
                language
                level
              }
              locale
              location {
                cityName
                countryName
                countryCode
                latitude
                locationId
                longitude
                stateName
              }
              projectsCaseStudies {
                id
                client
                description
                endDate
                workType
                link
                stack
                startDate
                title
                images
              }
              ratePerHour {
                value
                currency
              }
              resumeLocation
              skills {
                id
                infoUrl
                experience
                name
              }
              slugScheduler
              socialLinks {
                type
                value
              }
              stats {
                avatarUrl
                bio
                eventCountSummary {
                  amt
                  name
                }
                generatedDescription
                isBountyHunter
                isCampusExpert
                isDeveloperProgramMember
                isGitHubStar
                languages {
                  name
                  value
                }
                location
                login
                name
                pinnedItems {
                  name
                  url
                }
                ratings {
                  category
                  desc
                  img
                  number
                }
                totalFollowers
              }
              tagline
              username
              userType
            }
            createdAt
            updatedAt
          }
          availableStartDate
          moreInfoRequest
          moreInfoRequestMessage
          applicationId
          jobOpportunityId
          creator
          calibrationRate {
            value
            currency
          }
          customerRate {
            value
            currency
          }
          freelancerPitch
          isAccepted
          reasonsForRating
          rejectionByCustomer
          reasonForRejection
          status
          subStatus
          rating
          rate {
            value
            currency
          }
          updater
          createdAt
          updatedAt
        }
        nextToken
      }
      maxRate {
        value
        currency
      }
      minRate {
        value
        currency
      }
      requiredPositions
      openPositions
      organization
      overview
      regions
      requirements
      responsibilities
      shortDescription
      skills {
        id
        infoUrl
        name
        type {
          id
          name
        }
      }
      startDate
      status
      timeOverlap
      timeCommitment
      timezone {
        label
        value
      }
      title
      visibilityLevel
      createdAt
    }
  }
`;

/**
 * Difference b/w this query and the one in autoQueries.js
 * - application.user field is added
 * - job opportunity creator / customer details are removed
 */
export const getJobOpportunity = formGetJobOpportunity();

export const getJobOpportunityAndItsApplicants = formGetJobOpportunity(
  `(filter: {or: [
    {status: {eq: APPLIED}},
    {status: {eq: ACCEPTED}},
    {status: {eq: REJECTEDBYCUSTOMER}},
    {status: {eq: MOREINFO}}
  ]})`
);

export const getJobOpportunityAndItsMatchFinalists = formGetJobOpportunity(
  `(filter: {
    or: [
      { status: { eq: ACCEPTED  } },
      { status: { eq: APPLIED  } },
      { status: { eq: MATCHED  } },
      { status: { eq: MOREINFO  } },
    ],
    and: { subStatus: { eq: FINALIST } },
  })`
);

export const getJobOpportunityAndItsMatchCalibrations = formGetJobOpportunity(
  `(filter: { 
    isCalibration: { eq: true },
    and: [
      { status: { ne: SKIPPED  } },
      { status: { ne: REJECTEDBYCUSTOMER  } },
      { status: { ne: REJECTEDBYMEMBER  } },
    ]
  })`
);

/**
 * Difference b/w this query and the one in autoQueries.js
 * - Lesser fields in the projection which does not lead to
 *   authorization issues
 */
export const getUser = /* GraphQL */ `
  query GetUser($id: ID! ) {
    getUser(id: $id) {
      id
      username
      userType
      visibility
      applications {
        items {
          id
          creator
          isNotActive
          jobType {
            id
            creator
            isActive
            overview
            requirements
            responsibilities
            title
            updater
            createdAt
            updatedAt
          }
          jobTypeId
          matches {
            items {
              applicationId
              creator
              availableStartDate
              freelancerPitch
              jobOpportunity {
                id
                freelancerPitchPrefill
                jobLength
                jobLengthInWeeks
                maxRate {
                  value
                  currency
                }
                minRate {
                  value
                  currency
                }
                overview
                regions
                requirements
                responsibilities
                startDate
                skills {
                  id
                  infoUrl
                  name
                }
                startDate
                status
                timeOverlap
                timeCommitment
                timezone {
                  label
                  value
                }
                title
              }
              jobOpportunityId
              isAccepted
              status
              rate {
                value
                currency
              }
              updater
              createdAt
              updatedAt
            }
            nextToken
          }
        }
      }
    }
  }
`;

export const getFreelancerMatches = `
  query GetUser($id: ID!, $nextToken: String, $limit: Int, $filter: ModelMatchFilterInput, $applicationFilter: ModelApplicationFilterInput) {
    getUser(id: $id) {
      id
      username
      userType
      visibility
      applications (filter: $applicationFilter) {
        items {
          id
          isNotActive
          creator
          jobType {
            isActive
            title
          }
          jobTypeId
          matches(nextToken: $nextToken, limit: $limit, filter: $filter) {
            items {
              applicationId
              creator
              availableStartDate
              freelancerPitch
              freelancerPitchPrefill
              jobOpportunity {
                id
                jobLength
                freelancerPitchPrefill
                jobLengthInWeeks
                maxRate {
                  value
                  currency
                }
                minRate {
                  value
                  currency
                }
                overview
                regions
                requirements
                responsibilities
                startDate
                skills {
                  id
                  infoUrl
                  name
                  type {
                    id
                    name
                  }
                }
                shortDescription
                startDate
                status
                timeOverlap
                timeCommitment
                timezone {
                  label
                  value
                }
                title
              }
              jobOpportunityId
              isAccepted
              status
              subStatus
              rating
              rate {
                value
                currency
              }
              updater
              createdAt
              updatedAt
            }
            nextToken
          }
        }
      }
    }
  }
`;

export const listUserNotes = /* GraphQL */ `
  query ListUserNotes(
    $userId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserNotes(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        content
        createdAt
      }
    }
  }
`;

export const listMatchNotes = /* GraphQL */ `
  query ListMatchNotes(
    $applicationId: ID!
    $jobOpportunityId: ModelIDKeyConditionInput!
    $sortDirection: ModelSortDirection
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
    ) {
    listMatchNotes(
      applicationId: $applicationId
      jobOpportunityId: $jobOpportunityId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        creator
        createdAt
        noteType
      }
    }
  }
`;

export const listJobOpportunityNotes = /* GraphQL */ `
  query ListJobOpportunityNotes(
    $jobOpportunityId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobOpportunityNotes(
      jobOpportunityId: $jobOpportunityId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        creator
        createdAt
        noteType
      }
      nextToken
    }
  }
`;

export const getProfileByUsername = `
  query GetProfileByUsername($username: String!) {
    getProfileByUsername(username: $username) {
      id
      badges {
        count
        entityId
        image
        name
        issuedOn
        description
      }
      bio
      company
      companyDetails {
        address {
          city
          country
          line1
          line2
          postalCode
          state
        }
        bio
        logo
        name
        timezone {
          label
          value
        }
        url
      }
      coverPhoto
      email
      headshotKey
      phone {
        number
        whatsAppAllowed
      }
      jobRole
      locale
      location {
        cityName
        countryName
        countryCode
        latitude
        locationId
        longitude
        stateName
      }
      otherLinks {
        createdAt
        name
        value
      }
      referralCode
      skills {
        id
        name
        experience
      }
      socialLinks {
        type
        value
      }
      stats {
        eventCountSummary {
          amt
          name
        }
        generatedDescription
        isBountyHunter
        isCampusExpert
        isDeveloperProgramMember
        isGitHubStar
        languages {
          name
          value
        }
        login
        pinnedItems {
          name
          url
        }
        totalFollowers
      }
      tagline
      username
      userType
      visibility
      given_name
      family_name
      knownLanguages {
        language
        level
      }
      availability
      ratePerHour {
        value
        currency
      }
      careers {
        id
        companyName
        description
        endDate
        format
        locationType
        stack
        startDate
        title
      }
      projectsCaseStudies {
        id
        client
        description
        endDate
        workType
        link
        stack
        startDate
        title
        images
      }
      assessments {
        id
        assessmentCompleted
        testName
        finalScore
        status
        timeTaken
      }
    }
  }
`;

export const listJobTypes = `
  query ListJobTypes (
    $filter: ModelJobTypeFilterInput
    ) {
    listJobTypes (
      filter: $filter
    ) {
      items {
        id
        commitment
        displayName
        highEndLength
        isActive
        lowEndLength
        logo
        requirements
        responsibilities
        skills {
          id
          infoUrl
          name
          type {
              id
              name
          }
        }
        overview
        sort
        title
      }
      nextToken
    }
  }
`;

export const getJobType = /* GraphQL */ `
  query GetJobType($id: ID!) {
    getJobType(id: $id) {
      id
      commitment
      displayName
      highEndLength
      isActive
      lowEndLength
      overview
      requirements
      responsibilities
      skills {
          id
          infoUrl
          name
          type {
              id
              name
          }
        }
      title
    }
  }
`;

export const getMe = `
  query GetMe {
    getMe {
      id
      assessments {
        finalScore
        testId
        testName
      }
      address {
        city
        country
        line1
        line2
        postalCode
        state
      }
      careers {
        id
        companyName
        description
        endDate
        format
        locationType
        stack
        startDate
        title
      }
      projectsCaseStudies {
        id
        client
        description
        endDate
        workType
        link
        stack
        startDate
        title
        images
      }
      agreedToTerms
      agreedToMarketing
      availability
      bio
      company
      companyDetails {
        address {
          city
          country
          line1
          line2
          postalCode
          state
        }
        bio
        logo
        name
        tagline
        timezone {
          label
          value
        }
        url
      }
      coverPhoto
      email
      family_name
      githubAccessToken
      given_name
      headshotKey
      identity_username
      jobRole
      knownLanguages {
        language
        level
      }
      locale
      location {
        cityName
        countryCode
        countryId
        countryName
        latitude
        locationId
        longitude
        stateCode
        stateId
        stateName
        wikiDataId
      }
      nylasAccountId
      otherLinks {
        createdAt
        creator
        description
        name
        type
        updatedAt
        updater
        value
        visibility
      }
      phone {
        number
        whatsAppAllowed
      }
      profileCompletion
      profileStats
      projectStyles {
        id,
        title
      }
      ratePerHour {
        value
        currency
      }
      referralCode
      referralCount
      referrerCode
      resumeLocation
      skills {
        id
        infoUrl
        name
        type {
          id
          name
        }
        experience
      }
      slugScheduler
      socialLinks {
        type
        value
      }
      status
      tagline
      username
      userType
      visibility
    }
  }
`;

export const listSkillsAssessmentsConfig = /* GraphQL */ `
  query ListSkillsAssessmentsConfig($skills: [String]) {
    listSkillsAssessmentsConfig(skills: $skills) {
      skillName
      assessment {
        testId
        isPrimary
        link
        testName
      }
    }
  }
`;

export const listSharedAssessmentsByUser = /* GraphQL */ `
  query ListSharedAssessmentsByUser(
    $userId: ID
    $testId: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSharedAssessmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSharedAssessmentsByUser(
      userId: $userId
      testId: $testId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        jobOpportunityId
        link
        testId
        testName
        userId
      }
      nextToken
    }
  }
`;

export const getUserJobOpportunities = `
  query getUser($id: ID!, $limit: Int = null) {
    getUser(id: $id) {
      jobOpportunities(limit: $limit) {
        items {
          id
          jobType {
            applicationCount
          }
          matches {
            items {
              id
              status
              subStatus
            }
          }
          title
          status
          timeCommitment
          timeOverlap
        }
        nextToken
      }
    }
  }
`;

export const formGetJobOpportunityMatches = (statusFilter = '') => `
  query getJobOpportunity($id: ID!, $nextToken: String) {
    getJobOpportunity(id: $id) {
      id
      title
      skills {
        id
        name
      }
      matches(nextToken: $nextToken${statusFilter}) {
        items {
          applicationId
          availableStartDate
          creator
          jobOpportunityId
          customerRate {
            currency
            value
          }
          status
          subStatus
          rating
          application {
            id
            user {
              availability
              id
              bio
              countryName
              coverPhoto
              family_name
              given_name
              headshotKey
              careers {
                id
                companyName
                description
                endDate
                format
                locationType
                stack
                startDate
                title
              }
              projectsCaseStudies {
                id
                client
                description
                endDate
                workType
                link
                stack
                startDate
                title
                images
              }
              knownLanguages {
                language
                level
              }
              locale
              location {
                cityName
                countryName
                countryCode
                latitude
                locationId
                longitude
                stateName
              }
              otherLinks {
                createdAt
                description
                name
                value
              }
              slugScheduler
              skills {
                id
                name
              }
              socialLinks {
                type
                value
              }
              ratePerHour {
                value
                currency
              }
              username
              userType
              resumeLocation
            }
          }
        }
        nextToken
      }
    }
  }
`;

export const formGetJobOpportunityMatchesFinalists = (statusFilter = '') => `
  query getJobOpportunity($id: ID!, $nextToken: String) {
    getJobOpportunity(id: $id) {
      id
      title
      skills {
        id
        name
      }
      matches(nextToken: $nextToken${statusFilter}) {
        items {
          applicationId
          availableStartDate
          creator
          jobOpportunityId
          customerRate {
            currency
            value
          }
          status
          subStatus
          rating
          application {
            id
            user {
              availability
              id
              badges {
                count
                entityId
                image
                name
                issuedOn
                description
              }
              bio
              countryName
              coverPhoto
              family_name
              given_name
              headshotKey
              careers {
                id
                companyName
                description
                endDate
                format
                locationType
                stack
                startDate
                title
              }
              projectsCaseStudies {
                id
                client
                description
                endDate
                workType
                link
                stack
                startDate
                title
                images
              }
              knownLanguages {
                language
                level
              }
              locale
              location {
                cityName
                countryName
                countryCode
                latitude
                locationId
                longitude
                stateName
              }
              otherLinks {
                createdAt
                description
                name
                value
              }
              slugScheduler
              skills {
                id
                name
              }
              socialLinks {
                type
                value
              }
              ratePerHour {
                value
                currency
              }
              username
              userType
              resumeLocation
            }
          }
        }
        nextToken
      }
    }
  }
`;

export const GetJobOpportunityMatchesWithStatus = (statusFilter = '') => `
  query getJobOpportunity($id: ID!, $nextToken: String) {
    getJobOpportunity(id: $id) {
      id
      title
      skills {
        id
        name
      }
      matches(nextToken: $nextToken${statusFilter}) {
        items {
          applicationId
          creator
          jobOpportunityId
          status
          subStatus
          isCalibration
        }
        nextToken
      }
    }
  }
`;

export const getCloudinarySignature = /* GraphQL */ `
  query GetCloudinarySignature($publicId: String!, $preset: String) {
    getCloudinarySignature(publicId: $publicId, preset: $preset) {
      signature
      timestamp
      apiKey
    }
  }
`;

export const getNylasEditToken = `
query getNylasEditToken {
  getNylasEditToken
}`

export const getJobOpportunityMatches = formGetJobOpportunityMatches(
  `, filter: {and: [
    {status: {ne: SHORTLISTED}},
    {status: {ne: SKIPPED}},
    {status: {ne: REJECTEDBYCUSTOMER}}
  ]}`
);

export const getJobOpportunityMatchesForCount = GetJobOpportunityMatchesWithStatus(
  `, filter: {or: [
    {status: {eq: APPLIED}},
    {status: {eq: MATCHED}},
    {subStatus: { eq: FINALIST }},
    {isCalibration: { eq: true }},
  ]}`
);

export const getJobOpportunityApplicants = formGetJobOpportunityMatches(
  `, filter: {or: [
    {status: {eq: APPLIED}},
    {status: {eq: ACCEPTED}},
    {status: {eq: REJECTEDBYCUSTOMER}},
    {status: {eq: MOREINFO}}
  ]}`
);

export const getJobOpportunityMatchesFinalists = formGetJobOpportunityMatchesFinalists(
  `, filter: {
    or: [
      { status: { eq: ACCEPTED  } },
      { status: { eq: APPLIED  } },
      { status: { eq: MATCHED  } },
      { status: { eq: MOREINFO  } },
    ],
    and: { subStatus: { eq: FINALIST } },
  }`
);

export const getJobOpportunityEvents = /* GraphQL */ `
  query GetJobOpportunityEvents($id: ID!) {
    getJobOpportunityEvents(id: $id) {
      conferencing {
        provider
        details {
          password
          url
          meetingCode
        }
      }
      description
      end
      owner
      participants {
        email
        name
        status
      }
      start
      status
      title
    }
  }
`;

export const getUsersByCompany = /* GraphQL */ `
  query getUsersByCompany($company: String!) {
    getUsersByCompany(company: $company) {
      items {
        id
        username
      }
    }
  }
`;

export const listReferralsByUser = /* GraphQL */ `
  query ListReferralsByUser(
    $userId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelReferralFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReferralsByUser(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        creator
        jobOpportunityId
        jobReferrerUsername
        jobOpportunity {
          id
        jobLength
        freelancerPitchPrefill
        jobLengthInWeeks
        maxRate {
          value
          currency
        }
        minRate {
          value
          currency
        }
        overview
        regions
        requirements
        responsibilities
        startDate
        skills {
          id
          infoUrl
          name
          type {
            id
            name
          }
        }
        startDate
        status
        timeOverlap
        timeCommitment
        timezone {
          label
          value
        }
        title
        }
        userId
      }
      nextToken
    }
  }
`;

export const listJobReferralsByJobOpportunity = /* GraphQL */ `
  query ListJobReferralsByJobOpportunity(
    $jobOpportunityId: ID
    $userId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReferralFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobReferralsByJobOpportunity(
      jobOpportunityId: $jobOpportunityId
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
      }
    }
  }
`;

export const generateJobShortDescription = /* GraphQL */ `
  query GenerateJobShortDescription($jobDetails: String!, $wordLimit: Int = 200) {
    generateJobShortDescription(jobDetails: $jobDetails, wordLimit: $wordLimit) {
      shortDescription
    }
  }
`;

export const listReferralsSharedJobMatches = /* GraphQL */ `
  query GetReferral(
    $id: ID!
    $matchFilter: ModelMatchFilterInput
    $matchNexToken: String
    $matchLimit: Int
    $jobOpportunityId: ModelIDKeyConditionInput
  ) {
    getReferral(id: $id) {
      id
      matches(jobOpportunityId: $jobOpportunityId, filter: $matchFilter, nextToken: $matchNexToken, limit: $matchLimit) {
        items {
          jobOpportunityId
          status
        }
        nextToken
      }
    }
  }
`;

export const listReferralsByJobReferrerUserId = /* GraphQL */ `
  query ListReferralsByJobReferrerUserId(
    $jobReferrerUserId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelReferralFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReferralsByJobReferrerUserId(
      jobReferrerUserId: $jobReferrerUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        creator
        jobOpportunityId
        jobOpportunity {
          id
          status
          title
        }
        user {
          id
          username
        }
        jobReferrerCode
        jobReferrerUserId
        jobReferrerUsername
        referralType
        userId
        userReferrerUserId
      }
      nextToken
    }
  }
`;

export const listReferralsByUserReferrerReferralType = /* GraphQL */ `
  query ListReferralsByUserReferrerReferralType(
    $userReferrerUserId: ID
    $referralType: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReferralFilterInput
    $limit: Int
    $nextToken: String
    $matchFilter: ModelMatchFilterInput
    $matchesLimit: Int
  ) {
    listReferralsByUserReferrerReferralType(
      userReferrerUserId: $userReferrerUserId
      referralType: $referralType
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        creator
        jobOpportunityId
        jobOpportunity {
          id
          status
          title
        }
        user {
          id
          headshotKey
          username
        }
        matches(filter: $matchFilter, limit: $matchesLimit) {
          items {
           jobOpportunityId
           status
          }
        }
        jobReferrerCode
        jobReferrerUserId
        jobReferrerUsername
        referralType
        userId
        userReferrerUserId
      }
      nextToken
    }
  }
`;

export const getFreelancerJobOpportunity = /* GraphQL */ `
  query GetJobOpportunity($id: ID!) {
    getJobOpportunity(id: $id) {
      id
      status
      freelancerPitchPrefill
      requirements
      responsibilities
      overview
      skills {
        id
        infoUrl
        name
        type {
          id
          name
        }
      }
      timeOverlap
      timezone {
        label
        value
      }
      title
      jobLength
      jobLengthInWeeks
      jobTypeId
      startDate
      shortDescription
    }
  }
`;
