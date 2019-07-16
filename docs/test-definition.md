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

### **Item**

The **Item** is the core of the model design. Each **Item** is linked to an **ItemType** that helps the code understand how to handle it

| Column Name       | Description                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _item_id_         | the PK of the **Item** table                                                                                                                                        |
| _order_           | used to organize siblings (**Item**s the same _parent_id_id_ ) so they are always displayed in the correct order                                                    |
| _date_created_    | creation date of the row; mostly for documentation purposes                                                                                                         |
| _date_to_         | expiration date; rows that are past the current date should be ignored by the code; usually null                                                                    |
| _date_from_       | activation date; rows that are before the current date should be ignored by the code; usually the same as creation date, but can also be set to a time in the futue |
| _item_type_id_id_ | RK to the **ItemType** table; helps the code understand how to handle the item                                                                                      |
| _parent_id_id_    | RK to another **Item** that is the parent of the current **Item**; for **Item**s of type test, this value is always null                                            |

### **ItemText**

All **Item**s have an **ItemText**. This contains strings intended to be displayed to the user of the applicaiton

| Column Name      | Description                                                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _item_text_id_   | PK for the **ItemText** table                                                                                                                                       |
| _text_detail_    | contains strings intended to be visible to the user of the application                                                                                              |
| _date_created_   | creation date of the row; mostly for documentation purposes                                                                                                         |
| _date_to_        | expiration date; rows that are past the current date should be ignored by the code; usually null                                                                    |
| _date_from_      | activation date; rows that are before the current date should be ignored by the code; usually the same as creation date, but can also be set to a time in the futue |
| _item_id_id_     | RK to the **Item** table                                                                                                                                            |
| _language_id_id_ | RK to the **Language** table                                                                                                                                        |

### **ItemType**

Contains a _type_desc_ string that helps the code determine an **Item**'s purpose, what kind of children (other **Item**s) it should have, how the children should be displayed in relation to the parent, and what other tables will contain additional information

| Column Name    | Description                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _item_type_id_ | PK for the **ItemType** table                                                                                                                                       |
| _type_desc_    | string used by the code to determine how to handle the **Item** and what relations it should have                                                                   |
| _date_created_ | creation date of the row; mostly for documentation purposes                                                                                                         |
| _date_to_      | expiration date; rows that are past the current date should be ignored by the code; usually null                                                                    |
| _date_from_    | activation date; rows that are before the current date should be ignored by the code; usually the same as creation date, but can also be set to a time in the futue |

### **Language**

Contains ISO codes for each of the official **Languages**. Used to help determine which **ItemType** to display based on the current language setting

| Column Name    | Description                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _language_id_  | PK for the **Language** table                                                                                                                                       |
| _ISO_CODE_1_   | 2 character code for language (i.e. "en", "fr")                                                                                                                     |
| _ISO_CODE_2_   | longer code for the language (i.e. "en-ca", "fr-ca"                                                                                                                 |
| _date_created_ | creation date of the row; mostly for documentation purposes                                                                                                         |
| _date_to_      | expiration date; rows that are past the current date should be ignored by the code; usually null                                                                    |
| _date_from_    | activation date; rows that are before the current date should be ignored by the code; usually the same as creation date, but can also be set to a time in the futue |

### **Question**

Contains additional information for an **Item** of **ItemType** "question" that is unique to this particular **ItemType**

| Column Name           | Description                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _question_id_         | PK of the **Question** table                                                                                                                                        |
| _date_created_        | creation date of the row; mostly for documentation purposes                                                                                                         |
| _date_to_             | expiration date; rows that are past the current date should be ignored by the code; usually null                                                                    |
| _date_from_           | activation date; rows that are before the current date should be ignored by the code; usually the same as creation date, but can also be set to a time in the futue |
| _item_id_id_          | RK to the **Item** table                                                                                                                                            |
| _question_type_id_id_ | RK to the **QuestionType** table                                                                                                                                    |

### **QuestionType**

Similar to **ItemType**; contains a _question_type_desc_ string, which is used by the code to determine how to display the given question, what children it should have, etc.

| Column Name          | Description                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _question_type_id_   | PK of the **QuestionType** table                                                                                                                                    |
| _question_type_desc_ | string used by the code to determine how to handle the question **Item** and what relations it should have                                                          |
| _date_created_       | creation date of the row; mostly for documentation purposes                                                                                                         |
| _date_to_            | expiration date; rows that are past the current date should be ignored by the code; usually null                                                                    |
| _date_from_          | activation date; rows that are before the current date should be ignored by the code; usually the same as creation date, but can also be set to a time in the futue |

### **Test**

Contains additional information for an **Item** of **ItemType** "test" that is unique to this particular **ItemType**

This table's primary key is the _test_name_ string, an internally used value used to look up test meta data, overview, questions, etc. This prevents the need for consistant integer ids across environments. The **ItemText**s associated with the **Item** contain the publically visible test name.

| Column Name    | Description                                                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _test_name_    | string PK to allow code to consistently access the same test on any enviornment; value is to be used internally only                                                      |
| _is_public_    | boolean; flag to desigante if the test can be viewd by anyone (including users who not logged in) at any time or if it can only be assigned within an actual test session |
| _default_time_ | the time alloted to take the test; if null there is unlimited time                                                                                                        |
| _test_type_    | string used help the code determine how to process the test; this may one day be expanded to a TestType table                                                             |
| _item_id_id_   | the **Item** accociated with this **Test**; the root item of the test                                                                                                     |
