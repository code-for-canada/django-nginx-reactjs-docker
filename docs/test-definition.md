# Test Defintion

## eMIB Overview

The eMIB test consists of the following parts.

| Section                | Types of content                                              | Stored                                      | Notes                                                   |
| ---------------------- | ------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------- |
| Meta data              | Sets of flags and strings                                     | Content database                            | isPublic, testName, testId, defaultTime, etc            |
| Overview page          | Single markdown file                                          | Content database                            | The header is taken from the test name in the meta data |
| Instructions           | Strings, email components                                     | Frontend translations file                  | These are the same for each eMIB test                   |
| Background information | Sets of markdown files and org charts (tree views and images) | Content database (images still in frontend) | This is different for each test                         |
| Inbox emails           | Single markdown file                                          | Content database                            | The header is taken from the test name in the meta data |

The address book is generated from all of the names in the organizational chart and the names in the org chart should match exactly with the names in the emails. If they don't the way to select recipients will break.

## Loading tests

We currently seed two tests into the application by default.

- The eMIB Sample test. This test is publicly available to all candidates so they can try out the interface before taking the test.
- The Pizza test. This test is filler content, and is used to develop on and have seeded test data representing a non-public test.

These two tests are seeded into the database using migrations because we want them to be there by default. In the future, protected tests will be loaded into the database via a script.

## Model definition

TODO(michaelcherry) - fill in a brief outline of the backend design for storing tests. It'd be great to add diagrams too!
