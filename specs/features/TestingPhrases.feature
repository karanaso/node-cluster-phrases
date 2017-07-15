Feature: Testing the assessor
  
  Scenario Outline: Testing the assessor
    Given that the service is running
    When I call the server and pass to the query string <phrase>
    Then I should get back <response>

  Examples:
  | phrase      | response |
  | I have a sore throat and headache | ["headache","sore throat"] | 