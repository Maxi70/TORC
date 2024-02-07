/**
 * Difference b/w this mutation and the one in autoMutations.js
 * - Requests for just the application id and job opportunity id in the result
 */
export const updateMatch = /* GraphQL */ `
  mutation UpdateMatch(
    $input: UpdateMatchInput!
  ) {
    updateMatch(input: $input) {
      applicationId
      jobOpportunityId
      rejectionByCustomer
      reasonsForRating
      reasonForRejection
      moreInfoRequest
      moreInfoRequestMessage
      status
      subStatus
    }
  }
`;

/**
 * Difference b/w this mutation and the one in autoMutations.js
 * - Requests for just the JobOpportunity id
 */

export const updateJobOpportunity = /* GraphQL */ `
  mutation UpdateJobOpportunity(
    $input: UpdateJobOpportunityInput!
  ) {
    updateJobOpportunity(input: $input) {
      id
      jobLengthInWeeks
      jobTypeId
      maxRate {
        currency
        value
      }
      minRate {
        currency
        value
      }
      organization
      overview
      regions
      requiredPositions
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
      startDate
      status
      timeCommitment
      timeOverlap
      timezone {
        label
        value
      }
      title
      visibilityLevel
    }
  }
`;

export const forgotPassword = /* GraphQL */ `
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      message
      reason
    }
  }
`;

export const createJobOpportunity = `
  mutation CreateJobOpportunity($input: CreateJobOpportunityInput!) {
    createJobOpportunity(input: $input) {
      id
      jobLengthInWeeks
      jobTypeId
      maxRate {
        currency
        value
      }
      minRate {
        currency
        value
      }
      organization
      overview
      regions
      requiredPositions
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
      startDate
      status
      timeCommitment
      timeOverlap
      timezone {
        label
        value
      }
      title
      visibilityLevel
    }
  }
`;

export const createApplication = `
  mutation CreateApplication($input: CreateApplicationInput!) {
    createApplication(input: $input) {
      id
      jobTypeId
    }
  }
`;

export const updateApplication = `
  mutation UpdateApplication($input: UpdateApplicationInput!) {
    updateApplication(input: $input) {
      id
      isNotActive
    }
  }
`;

export const updateUser = `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      agreedToMarketing
      agreedToTerms
      company
      family_name
      given_name
      careers {
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
      phone {
        number
        whatsAppAllowed
      }
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
      ratePerHour {
        currency
        value
      }
      referrerCode
      socialLinks {
        type
        value
      }
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
      username
      userType
    }
  }
`;

export const updateUserAndQueryAllFields = `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      address {
        city
        country
        line1
        line2
        postalCode
        state
      }
      agreedToTerms
      agreedToMarketing
      availability
      bio
      company
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

export const updateReferralCount = `
  mutation UpdateReferralCount($input: UpdateReferralCountInput) {
    updateReferralCount(input: $input) {
      message
    }
  }
`;

export const createNote = /* GraphQL */ `
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
      content
      creator
      updater
      createdAt
      updatedAt
    }
  }
`;

export const createReferral = /* GraphQL */ `
  mutation CreateReferral($input: CreateReferralInput!) {
    createReferral(input: $input) {
      message
    }
  }
`;


export const createMatch = /* GraphQL */ `
  mutation CreateMatch($input: CreateMatchInput!) {
    createMatch(input: $input) {
      id
      application {
        id
        availableStartDate
        creator
        isNotActive
        jobType {
          id
          applicationCount
          applications {
            nextToken
          }
          commitment
          creator
          highEndLength
          isActive
          jobOpportunities {
            nextToken
          }
          lowEndLength
          metadata
          overview
          requirements
          responsibilities
          skills {
            id
            infoUrl
            name
          }
          title
          updater
          createdAt
          updatedAt
        }
        jobTypeId
        matches {
          items {
            id
            applicationId
            availableStartDate
            creator
            freelancerPitch
            isAccepted
            jobOpportunityId
            metadata
            moreInfoRequest
            moreInfoRequestMessage
            reasonForRejection
            rejectionByCustomer
            status
            updater
            createdAt
            updatedAt
          }
          nextToken
        }
        metadata
        preferredRate {
          value
          currency
        }
        updater
        userId
        createdAt
        updatedAt
        user {
          id
          address {
            city
            country
            line1
            line2
            postalCode
            state
          }
          agreedToTerms
          agreedToMarketing
          applications {
            nextToken
          }
          availability
          badges {
            count
            description
            entityId
            image
            issuedOn
            name
          }
          bio
          calendarLink
          company
          companyDetails {
            billingEmail
            bio
            logo
            name
            tagline
            url
          }
          countryName
          coverPhoto
          creator
          displayName
          email
          family_name
          githubAccessToken
          githubRefreshToken
          given_name
          headshotKey
          identity_username
          isVip
          jobOpportunities {
            nextToken
          }
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
          metadata
          milestoneRewards {
            id
            name
          }
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
          ratePerHour {
            value
            currency
          }
          referralCode
          referralCount
          referrerCode
          shirtSize
          skills {
            id
            infoUrl
            name
          }
          socialLinks {
            type
            value
          }
          stats {
            avatarUrl
            bio
            generatedDescription
            isBountyHunter
            isCampusExpert
            isDeveloperProgramMember
            isGitHubStar
            location
            login
            name
            totalFollowers
          }
          status
          tagline
          updater
          username
          userType
          visibility
          notes {
            nextToken
          }
          createdAt
          updatedAt
        }
      }
      applicationId
      availableStartDate
      creator
      customerRate {
        value
        currency
      }
      freelancerPitch
      isAccepted
      jobOpportunity {
        id
        adminConfig {
          disableAutoFulfillment
        }
        creator
        customerId
        jobLength
        jobLengthInWeeks
        jobType {
          id
          applicationCount
          applications {
            nextToken
          }
          commitment
          creator
          highEndLength
          isActive
          jobOpportunities {
            nextToken
          }
          lowEndLength
          metadata
          overview
          requirements
          responsibilities
          skills {
            id
            infoUrl
            name
          }
          title
          updater
          createdAt
          updatedAt
        }
        jobTypeId
        matches {
          items {
            id
            applicationId
            availableStartDate
            creator
            disableNotification
            freelancerPitch
            isAccepted
            jobOpportunityId
            metadata
            moreInfoRequest
            moreInfoRequestMessage
            reasonForRejection
            rejectionByCustomer
            status
            updater
            createdAt
            updatedAt
          }
          nextToken
        }
        metadata
        maxRate {
          value
          currency
        }
        minRate {
          value
          currency
        }
        openPositions
        organization
        overview
        regions
        requiredPositions
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
        startDate
        status
        timeOverlap
        timeCommitment
        timezone {
          label
          value
        }
        title
        updater
        createdAt
        updatedAt
      }
      jobOpportunityId
      metadata
      moreInfoRequest
      moreInfoRequestMessage
      reasonForRejection
      rejectionByCustomer
      status
      rate {
        value
        currency
      }
      updater
      createdAt
      updatedAt
    }
  }
`;