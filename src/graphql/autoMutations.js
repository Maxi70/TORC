/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBadge = /* GraphQL */ `
  mutation CreateBadge($input: CreateBadgeInput) {
    createBadge(input: $input) {
      message
    }
  }
`;
export const updateUser = /* GraphQL */ `
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
      calendarLink
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
        billingEmail
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
      creator
      displayName
      email
      family_name
      githubAccessToken
      given_name
      headshotKey
      identity_username
      isVip
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
        type {
          id
          name
        }
      }
      socialLinks {
        type
        value
      }
      status
      tagline
      updater
      username
      userType
      visibility
    }
  }
`;
export const createJobType = /* GraphQL */ `
  mutation CreateJobType($input: CreateJobTypeInput!) {
    createJobType(input: $input) {
      id
      applicationCount
      applications {
        items {
          id
          availableStartDate
          creator
          isNotActive
          jobType {
            id
            applicationCount
            commitment
            creator
            highEndLength
            isActive
            lowEndLength
            metadata
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
            agreedToTerms
            agreedToMarketing
            availability
            bio
            calendarLink
            company
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
            jobRole
            locale
            metadata
            profileCompletion
            profileStats
            referralCode
            referralCount
            referrerCode
            shirtSize
            status
            tagline
            updater
            username
            userType
            visibility
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      commitment
      creator
      highEndLength
      isActive
      jobOpportunities {
        items {
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
            commitment
            creator
            highEndLength
            isActive
            lowEndLength
            metadata
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
          customer {
            id
            agreedToTerms
            agreedToMarketing
            availability
            bio
            calendarLink
            company
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
            jobRole
            locale
            metadata
            profileCompletion
            profileStats
            referralCode
            referralCount
            referrerCode
            shirtSize
            status
            tagline
            updater
            username
            userType
            visibility
            createdAt
            updatedAt
          }
        }
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
        type {
          id
          name
        }
      }
      title
      updater
      createdAt
      updatedAt
    }
  }
`;
export const updateJobType = /* GraphQL */ `
  mutation UpdateJobType($input: UpdateJobTypeInput!) {
    updateJobType(input: $input) {
      id
      applicationCount
      applications {
        items {
          id
          availableStartDate
          creator
          isNotActive
          jobType {
            id
            applicationCount
            commitment
            creator
            highEndLength
            isActive
            lowEndLength
            metadata
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
            agreedToTerms
            agreedToMarketing
            availability
            bio
            calendarLink
            company
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
            jobRole
            locale
            metadata
            profileCompletion
            profileStats
            referralCode
            referralCount
            referrerCode
            shirtSize
            status
            tagline
            updater
            username
            userType
            visibility
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      commitment
      creator
      highEndLength
      isActive
      jobOpportunities {
        items {
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
            commitment
            creator
            highEndLength
            isActive
            lowEndLength
            metadata
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
          customer {
            id
            agreedToTerms
            agreedToMarketing
            availability
            bio
            calendarLink
            company
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
            jobRole
            locale
            metadata
            profileCompletion
            profileStats
            referralCode
            referralCount
            referrerCode
            shirtSize
            status
            tagline
            updater
            username
            userType
            visibility
            createdAt
            updatedAt
          }
        }
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
        type {
          id
          name
        }
      }
      title
      updater
      createdAt
      updatedAt
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
      disableNotification
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
        customer {
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
export const updateMatch = /* GraphQL */ `
  mutation UpdateMatch($input: UpdateMatchInput!) {
    updateMatch(input: $input) {
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
      disableNotification
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
        customer {
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
export const createNote = /* GraphQL */ `
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
      applicationId
      content
      creator
      isPublic
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
        customer {
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
      jobOpportunityId
      match {
        id
        application {
          id
          availableStartDate
          creator
          isNotActive
          jobType {
            id
            applicationCount
            commitment
            creator
            highEndLength
            isActive
            lowEndLength
            metadata
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
            agreedToTerms
            agreedToMarketing
            availability
            bio
            calendarLink
            company
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
            jobRole
            locale
            metadata
            profileCompletion
            profileStats
            referralCode
            referralCount
            referrerCode
            shirtSize
            status
            tagline
            updater
            username
            userType
            visibility
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
        disableNotification
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
            commitment
            creator
            highEndLength
            isActive
            lowEndLength
            metadata
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
          customer {
            id
            agreedToTerms
            agreedToMarketing
            availability
            bio
            calendarLink
            company
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
            jobRole
            locale
            metadata
            profileCompletion
            profileStats
            referralCode
            referralCount
            referrerCode
            shirtSize
            status
            tagline
            updater
            username
            userType
            visibility
            createdAt
            updatedAt
          }
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
      metadata
      noteType
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
          items {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
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
          address {
            city
            country
            line1
            line2
            postalCode
            state
          }
          billingEmail
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
          items {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
            title
            updater
            createdAt
            updatedAt
          }
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
          type {
            id
            name
          }
        }
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
        status
        tagline
        updater
        username
        userType
        visibility
        notes {
          items {
            id
            applicationId
            content
            creator
            isPublic
            jobOpportunityId
            metadata
            noteType
            updater
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const createApplication = /* GraphQL */ `
  mutation CreateApplication($input: CreateApplicationInput!) {
    createApplication(input: $input) {
      id
      availableStartDate
      creator
      isNotActive
      jobType {
        id
        applicationCount
        applications {
          items {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        commitment
        creator
        highEndLength
        isActive
        jobOpportunities {
          items {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
            title
            updater
            createdAt
            updatedAt
          }
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
          type {
            id
            name
          }
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
          application {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
          applicationId
          availableStartDate
          creator
          customerRate {
            value
            currency
          }
          disableNotification
          freelancerPitch
          isAccepted
          jobOpportunity {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
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
          items {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
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
          address {
            city
            country
            line1
            line2
            postalCode
            state
          }
          billingEmail
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
          items {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
            title
            updater
            createdAt
            updatedAt
          }
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
          type {
            id
            name
          }
        }
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
        status
        tagline
        updater
        username
        userType
        visibility
        notes {
          items {
            id
            applicationId
            content
            creator
            isPublic
            jobOpportunityId
            metadata
            noteType
            updater
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateApplication = /* GraphQL */ `
  mutation UpdateApplication($input: UpdateApplicationInput!) {
    updateApplication(input: $input) {
      id
      availableStartDate
      creator
      isNotActive
      jobType {
        id
        applicationCount
        applications {
          items {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        commitment
        creator
        highEndLength
        isActive
        jobOpportunities {
          items {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
            title
            updater
            createdAt
            updatedAt
          }
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
          type {
            id
            name
          }
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
          application {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
          applicationId
          availableStartDate
          creator
          customerRate {
            value
            currency
          }
          disableNotification
          freelancerPitch
          isAccepted
          jobOpportunity {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
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
          items {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
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
          address {
            city
            country
            line1
            line2
            postalCode
            state
          }
          billingEmail
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
          items {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
            title
            updater
            createdAt
            updatedAt
          }
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
          type {
            id
            name
          }
        }
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
        status
        tagline
        updater
        username
        userType
        visibility
        notes {
          items {
            id
            applicationId
            content
            creator
            isPublic
            jobOpportunityId
            metadata
            noteType
            updater
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const createJobOpportunity = /* GraphQL */ `
  mutation CreateJobOpportunity($input: CreateJobOpportunityInput!) {
    createJobOpportunity(input: $input) {
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
          items {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        commitment
        creator
        highEndLength
        isActive
        jobOpportunities {
          items {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
            title
            updater
            createdAt
            updatedAt
          }
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
          type {
            id
            name
          }
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
          application {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
          applicationId
          availableStartDate
          creator
          customerRate {
            value
            currency
          }
          disableNotification
          freelancerPitch
          isAccepted
          jobOpportunity {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
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
      customer {
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
          items {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
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
          address {
            city
            country
            line1
            line2
            postalCode
            state
          }
          billingEmail
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
          items {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
            title
            updater
            createdAt
            updatedAt
          }
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
          type {
            id
            name
          }
        }
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
        status
        tagline
        updater
        username
        userType
        visibility
        notes {
          items {
            id
            applicationId
            content
            creator
            isPublic
            jobOpportunityId
            metadata
            noteType
            updater
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateJobOpportunity = /* GraphQL */ `
  mutation UpdateJobOpportunity($input: UpdateJobOpportunityInput!) {
    updateJobOpportunity(input: $input) {
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
          items {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        commitment
        creator
        highEndLength
        isActive
        jobOpportunities {
          items {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
            title
            updater
            createdAt
            updatedAt
          }
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
          type {
            id
            name
          }
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
          application {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
          applicationId
          availableStartDate
          creator
          customerRate {
            value
            currency
          }
          disableNotification
          freelancerPitch
          isAccepted
          jobOpportunity {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
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
      customer {
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
          items {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
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
          address {
            city
            country
            line1
            line2
            postalCode
            state
          }
          billingEmail
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
          items {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
            title
            updater
            createdAt
            updatedAt
          }
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
          type {
            id
            name
          }
        }
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
        status
        tagline
        updater
        username
        userType
        visibility
        notes {
          items {
            id
            applicationId
            content
            creator
            isPublic
            jobOpportunityId
            metadata
            noteType
            updater
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const disconnectGithub = /* GraphQL */ `
  mutation DisconnectGithub {
    disconnectGithub {
      message
    }
  }
`;
export const deleteApplication = /* GraphQL */ `
  mutation DeleteApplication(
    $input: DeleteApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    deleteApplication(input: $input, condition: $condition) {
      id
      availableStartDate
      creator
      isNotActive
      jobType {
        id
        applicationCount
        applications {
          items {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        commitment
        creator
        highEndLength
        isActive
        jobOpportunities {
          items {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
            title
            updater
            createdAt
            updatedAt
          }
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
          type {
            id
            name
          }
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
          application {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
          applicationId
          availableStartDate
          creator
          customerRate {
            value
            currency
          }
          disableNotification
          freelancerPitch
          isAccepted
          jobOpportunity {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
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
          items {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
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
          address {
            city
            country
            line1
            line2
            postalCode
            state
          }
          billingEmail
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
          items {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
            title
            updater
            createdAt
            updatedAt
          }
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
          type {
            id
            name
          }
        }
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
        status
        tagline
        updater
        username
        userType
        visibility
        notes {
          items {
            id
            applicationId
            content
            creator
            isPublic
            jobOpportunityId
            metadata
            noteType
            updater
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteJobOpportunity = /* GraphQL */ `
  mutation DeleteJobOpportunity(
    $input: DeleteJobOpportunityInput!
    $condition: ModelJobOpportunityConditionInput
  ) {
    deleteJobOpportunity(input: $input, condition: $condition) {
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
          items {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        commitment
        creator
        highEndLength
        isActive
        jobOpportunities {
          items {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
            title
            updater
            createdAt
            updatedAt
          }
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
          type {
            id
            name
          }
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
          application {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
          applicationId
          availableStartDate
          creator
          customerRate {
            value
            currency
          }
          disableNotification
          freelancerPitch
          isAccepted
          jobOpportunity {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
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
      customer {
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
          items {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
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
          address {
            city
            country
            line1
            line2
            postalCode
            state
          }
          billingEmail
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
          items {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
            title
            updater
            createdAt
            updatedAt
          }
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
          type {
            id
            name
          }
        }
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
        status
        tagline
        updater
        username
        userType
        visibility
        notes {
          items {
            id
            applicationId
            content
            creator
            isPublic
            jobOpportunityId
            metadata
            noteType
            updater
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteJobType = /* GraphQL */ `
  mutation DeleteJobType(
    $input: DeleteJobTypeInput!
    $condition: ModelJobTypeConditionInput
  ) {
    deleteJobType(input: $input, condition: $condition) {
      id
      applicationCount
      applications {
        items {
          id
          availableStartDate
          creator
          isNotActive
          jobType {
            id
            applicationCount
            commitment
            creator
            highEndLength
            isActive
            lowEndLength
            metadata
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
            agreedToTerms
            agreedToMarketing
            availability
            bio
            calendarLink
            company
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
            jobRole
            locale
            metadata
            profileCompletion
            profileStats
            referralCode
            referralCount
            referrerCode
            shirtSize
            status
            tagline
            updater
            username
            userType
            visibility
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      commitment
      creator
      highEndLength
      isActive
      jobOpportunities {
        items {
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
            commitment
            creator
            highEndLength
            isActive
            lowEndLength
            metadata
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
          customer {
            id
            agreedToTerms
            agreedToMarketing
            availability
            bio
            calendarLink
            company
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
            jobRole
            locale
            metadata
            profileCompletion
            profileStats
            referralCode
            referralCount
            referrerCode
            shirtSize
            status
            tagline
            updater
            username
            userType
            visibility
            createdAt
            updatedAt
          }
        }
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
        type {
          id
          name
        }
      }
      title
      updater
      createdAt
      updatedAt
    }
  }
`;
export const deleteMatch = /* GraphQL */ `
  mutation DeleteMatch(
    $input: DeleteMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    deleteMatch(input: $input, condition: $condition) {
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
      disableNotification
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
        customer {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      applicationId
      content
      creator
      isPublic
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
        customer {
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
      jobOpportunityId
      match {
        id
        application {
          id
          availableStartDate
          creator
          isNotActive
          jobType {
            id
            applicationCount
            commitment
            creator
            highEndLength
            isActive
            lowEndLength
            metadata
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
            agreedToTerms
            agreedToMarketing
            availability
            bio
            calendarLink
            company
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
            jobRole
            locale
            metadata
            profileCompletion
            profileStats
            referralCode
            referralCount
            referrerCode
            shirtSize
            status
            tagline
            updater
            username
            userType
            visibility
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
        disableNotification
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
            commitment
            creator
            highEndLength
            isActive
            lowEndLength
            metadata
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
          customer {
            id
            agreedToTerms
            agreedToMarketing
            availability
            bio
            calendarLink
            company
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
            jobRole
            locale
            metadata
            profileCompletion
            profileStats
            referralCode
            referralCount
            referrerCode
            shirtSize
            status
            tagline
            updater
            username
            userType
            visibility
            createdAt
            updatedAt
          }
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
      metadata
      noteType
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
          items {
            id
            availableStartDate
            creator
            isNotActive
            jobTypeId
            metadata
            updater
            userId
            createdAt
            updatedAt
          }
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
          address {
            city
            country
            line1
            line2
            postalCode
            state
          }
          billingEmail
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
          items {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
            title
            updater
            createdAt
            updatedAt
          }
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
          type {
            id
            name
          }
        }
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
        status
        tagline
        updater
        username
        userType
        visibility
        notes {
          items {
            id
            applicationId
            content
            creator
            isPublic
            jobOpportunityId
            metadata
            noteType
            updater
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
        items {
          id
          availableStartDate
          creator
          isNotActive
          jobType {
            id
            applicationCount
            commitment
            creator
            highEndLength
            isActive
            lowEndLength
            metadata
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
            agreedToTerms
            agreedToMarketing
            availability
            bio
            calendarLink
            company
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
            jobRole
            locale
            metadata
            profileCompletion
            profileStats
            referralCode
            referralCount
            referrerCode
            shirtSize
            status
            tagline
            updater
            username
            userType
            visibility
            createdAt
            updatedAt
          }
        }
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
        address {
          city
          country
          line1
          line2
          postalCode
          state
        }
        billingEmail
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
        items {
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
            commitment
            creator
            highEndLength
            isActive
            lowEndLength
            metadata
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
          customer {
            id
            agreedToTerms
            agreedToMarketing
            availability
            bio
            calendarLink
            company
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
            jobRole
            locale
            metadata
            profileCompletion
            profileStats
            referralCode
            referralCount
            referrerCode
            shirtSize
            status
            tagline
            updater
            username
            userType
            visibility
            createdAt
            updatedAt
          }
        }
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
        type {
          id
          name
        }
      }
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
      status
      tagline
      updater
      username
      userType
      visibility
      notes {
        items {
          id
          applicationId
          content
          creator
          isPublic
          jobOpportunity {
            id
            creator
            customerId
            jobLength
            jobLengthInWeeks
            jobTypeId
            metadata
            openPositions
            organization
            overview
            regions
            requiredPositions
            requirements
            responsibilities
            startDate
            status
            timeOverlap
            timeCommitment
            title
            updater
            createdAt
            updatedAt
          }
          jobOpportunityId
          match {
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
          metadata
          noteType
          updater
          userId
          createdAt
          updatedAt
          user {
            id
            agreedToTerms
            agreedToMarketing
            availability
            bio
            calendarLink
            company
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
            jobRole
            locale
            metadata
            profileCompletion
            profileStats
            referralCode
            referralCount
            referrerCode
            shirtSize
            status
            tagline
            updater
            username
            userType
            visibility
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
