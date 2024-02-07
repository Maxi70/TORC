/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMe = /* GraphQL */ `
  query GetMe {
    getMe {
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
export const getBadgesFromIssuer = /* GraphQL */ `
  query GetBadgesFromIssuer {
    getBadgesFromIssuer {
      description
      entityId
      image
      name
    }
  }
`;
export const getJobOpportunity = /* GraphQL */ `
  query GetJobOpportunity($id: ID!) {
    getJobOpportunity(id: $id) {
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
export const listJobOpportunitys = /* GraphQL */ `
  query ListJobOpportunitys(
    $filter: ModelJobOpportunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobOpportunitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const getApplication = /* GraphQL */ `
  query GetApplication($id: ID!) {
    getApplication(id: $id) {
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
export const listApplications = /* GraphQL */ `
  query ListApplications(
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getJobType = /* GraphQL */ `
  query GetJobType($id: ID!) {
    getJobType(id: $id) {
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
export const listJobTypes = /* GraphQL */ `
  query ListJobTypes(
    $filter: ModelJobTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getMatch = /* GraphQL */ `
  query GetMatch($applicationId: ID!, $jobOpportunityId: ID!) {
    getMatch(
      applicationId: $applicationId
      jobOpportunityId: $jobOpportunityId
    ) {
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
export const listMatchs = /* GraphQL */ `
  query ListMatchs(
    $applicationId: ID
    $jobOpportunityId: ModelIDKeyConditionInput
    $filter: ModelMatchFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMatchs(
      applicationId: $applicationId
      jobOpportunityId: $jobOpportunityId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
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
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        match {
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
      nextToken
    }
  }
`;
export const getMatchById = /* GraphQL */ `
  query GetMatchById(
    $id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getMatchById(
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
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
        match {
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
      nextToken
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
        match {
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
      nextToken
    }
  }
`;
export const listMatchNotes = /* GraphQL */ `
  query ListMatchNotes(
    $applicationId: ID
    $jobOpportunityId: ModelIDKeyConditionInput
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
        match {
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
      nextToken
    }
  }
`;
export const getProfileByUsername = /* GraphQL */ `
  query GetProfileByUsername($username: String!) {
    getProfileByUsername(username: $username) {
      id
      agreedToTerms
      agreedToMarketing
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
      coverPhoto
      creator
      displayName
      family_name
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
    }
  }
`;
export const getSkill = /* GraphQL */ `
  query GetSkill($id: ID!) {
    getSkill(id: $id) {
      id
      infoUrl
      name
      type {
        id
        name
      }
    }
  }
`;
export const searchSkills = /* GraphQL */ `
  query SearchSkills($term: String!, $limit: Int = 5) {
    searchSkills(term: $term, limit: $limit) {
      id
      infoUrl
      name
      type {
        id
        name
      }
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getUserByUsername = /* GraphQL */ `
  query GetUserByUsername(
    $username: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUserByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getUserByEmail = /* GraphQL */ `
  query GetUserByEmail(
    $email: AWSEmail
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUserByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getUserByIdentityUsername = /* GraphQL */ `
  query GetUserByIdentityUsername(
    $identity_username: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUserByIdentityUsername(
      identity_username: $identity_username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
