import { gql } from "@apollo/client";
export const GET_COMPANIES_BY_PROJECT_ID = gql`
  query GetCompanies($projectId: Int!) {
    companiesByProjectId(projectId: $projectId) {
      data {
        companyId
        companyName
        companyowner
        email
        phone
        priority
        status
      }
    }
  }
`;
