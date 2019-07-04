import LocalizedStrings from "react-localization";

let LOCALIZE = new LocalizedStrings({
  en: {
    //Main Tabs
    mainTabs: {
      homeTabTitleUnauthenticated: "Home",
      homeTabTitleAuthenticated: "Your tests",
      dashboardTabTitle: "Dashboard",
      sampleTest: "Sample eMIB",
      statusTabTitle: "Status",
      psc: "Public Service Commission of Canada",
      canada: "Government of Canada"
    },

    //HTML Page Titles
    titles: {
      CAT: "CAT - PSC",
      eMIB: "eMIB Assessment",
      simulation: "eMIB Assessment Simulation",
      status: "CAT System Status",
      prototypes: "CAT Prototypes",
      home: "CAT Home",
      homeWithError: "Error - CAT Home"
    },

    //authentication
    authentication: {
      login: {
        title: "Login",
        content: {
          title: "Login",
          description:
            "An account is required to proceed further. To log in, enter your credentials below.",
          inputs: {
            emailTitle: "Email Address:",
            passwordTitle: "Password:"
          }
        },
        button: "Login",
        invalidCredentials: "Invalid credentials!",
        passwordFieldSelected: "Password field selected."
      },
      createAccount: {
        title: "Create an account",
        content: {
          title: "Create an account",
          description:
            "An account is required to proceed further. To create an account, fill out the following.",
          inputs: {
            firstNameTitle: "First name:",
            firstNameError: "Must be a valid first name",
            lastNameTitle: "Last name:",
            lastNameError: "Must be a valid last name",
            dobDayTitle: "Date of birth: (DD / MM / ---Y):",
            dobError: "Please fill out all fields related to the date of birth",
            dobTooltip: "You will only need to provide the last digit for your year of birth.",
            emailTitle: "Email address:",
            emailError: "Must be a valid email address",
            priOrMilitaryNbrTitle: "PRI or Military number (if applicable):",
            priOrMilitaryNbrError: "Must be a valid PRI or a valid Military number:",
            passwordTitle: "Password:",
            passwordErrors: {
              description: "Your password must satisfy the following:",
              upperCase: "At least one uppercase",
              lowerCase: "At least one lowercase",
              digit: "At least one digit",
              specialCharacter: "At least one special character",
              length: "Minimum of 5 characters and maximum of 15"
            },
            passwordConfirmationTitle: "Confirm password:",
            passwordConfirmationError: "Your password confirmation must match the Password"
          }
        },
        privacyNotice:
          "I have read and agreed to how the Public Service Commission collects, uses and discloses personal information, as set out in the {0}.",
        privacyNoticeLink: "privacy notice",
        privacyNoticeError: "You must accept the privacy notice by clicking on the checkbox",
        button: "Create account",
        accountAlreadyExistsError: "An account is already associated to this email address",
        passwordTooCommonError: "This password is too common",
        passwordTooSimilarToUsernameError: "The password is too similar to the username",
        privacyNoticeDialog: {
          title: "Privacy and Security",
          privacyNoticeStatement: "Privacy Notice Statement",
          privacyParagraph1:
            "The information pertaining to your results on this particular test will be disclosed to the requesting department or organization for staffing related matters. All information is collected under the authority of the {0} and is protected under the {1}. Personnel information concerning test results is accessible in Personal Information Bank numbers PSC-PPU-025/030/035.",
          publicServiceEmploymentActLink: "Public Service Employment Act",
          privacyActLink: "Privacy Act",
          privacyParagraph2:
            "Individuals have the right to file a complaint with the {0} regarding the department’s handling of their personal information.",
          privacyCommissionerLink: "Privacy Commissioner of Canada",
          privacyParagraph3:
            "The Public Service Commission of Canada (PSC) is committed to protecting the privacy rights of individuals.",
          privacyParagraph4:
            "The definition of “personal information” is any information, in any form, about an identifiable individual. Refer to section 3 of the {0} for further details regarding personal information. Personal information is used to provide Assessment services to clients of the Personnel Psychology Centre (PPC); and is collected under the authority of sections 11, 30, 35 and 36 of the Public Service Employment Act. Provision of your personal information is voluntary. However, should you chose not to share your personal information, you will not be able to participate in PPC services.",
          privacyParagraph5:
            "Personal information collected by the PPC is protected from disclosure to unauthorized persons and/or agencies subject to the provisions of the Privacy Act. However personal information may be disclosed without your consent in certain specific circumstances, per section 8 of the Privacy Act. Additionally, certain demographic information will be used for analytical, research and development purposes.",
          privacyParagraph6:
            "Individuals have the right to the protection of and access to their personal information and to request corrections where the individual believes there is an error or omission. Individuals may contact the department’s {0} to request corrections.",
          accessToInformationLink: "Access to Information and Privacy Protection Division",
          privacyParagraph7:
            "Personal information is collected and used as described in the Assessment by the Personnel Psychology Centre Personal Information Bank (PSC PCU 025), found in the PCS’s {0}. Hard copy files are retained for five years, and then destroyed. Candidate test results are kept indefinitely on computerized files.",
          infoSourceChapterLink: "Info Source Chapter",
          privacyParagraph8:
            "Individuals have the right to file a complaint with the {0} regarding the department’s handling of their personal information.",
          reproductionTitle: "Unauthorized Reproduction or Disclosure of Test Content",
          reproductionWarning:
            "This test and its contents are designated Protected B. Reproduction or recording in any form of the content of this test is strictly forbidden, and all material related to the test, including rough notes, must remain with the test administrator following the administration of the test. Any unauthorized reproduction, recording and/or disclosure of test content is in contravention of the Government Security Policy and the use of such improperly obtained or transmitted information could be found to contravene the provisions of the Public Service Employment Act (PSEA). Parties involved in the disclosure of or improper use of protected test content may be the subject of an investigation under the PSEA, where a finding of fraud may be punishable on summary conviction or may be referred to the Royal Canadian Mounted Police.",
          cheatingTitle: "Cheating",
          cheatingWarning:
            "Please note that suspected cheating will in all cases be referred to the responsible manager and the Personnel Psychology Centre for action. Suspected cheating may result in the invalidation of test results and may be the subject of an investigation under the PSEA, where a finding of fraud may be punishable on summary conviction or may be referred to the Royal Canadian Mounted Police."
        }
      }
    },

    //Home Page
    homePage: {
      welcomeMsg: "Welcome to the Competency Assessment Tool",
      description:
        "This website is used to assess candidates for positions in the federal public service. To access your tests, you must login below. If you do not have an account, you may register for one using your email address."
    },

    //Dashboard Page
    dashboard: {
      title: "Welcome, {0} {1}.",
      description:
        "You have successfully logged into your account. You should be able to see the test(s) that you have been assigned to below. If you have not been assigned to a test, please notify your test administrator. Please wait for your test administrator's instructions before starting the test.",
      table: {
        columnOne: "Name of test",
        columnTwo: "Scheduled test date",
        columnThree: "Action"
      }
    },

    //Status Page
    statusPage: {
      title: "CAT Status",
      logo: "Thunder CAT Logo",
      welcomeMsg:
        "Internal status page to quickly determine the status / health of the Competency Assessment Tool.",
      gitHubRepoBtn: "GitHub Repository",
      serviceStatusTable: {
        title: "Service Status",
        frontendDesc: "Front end application built and serving successfully",
        backendDesc: "Back end application completing API requests successfully",
        databaseDesc: "Database completing API requests sccessfully"
      },
      systemStatusTable: {
        title: "System Status",
        javaScript: "JavaScript",
        browsers: "IE 9+, Chrome, Firefox",
        screenResolution: "Screen resolution minimum of 800 x 600"
      }
    },

    // Settings Dialog
    settings: {
      systemSettings: "Display Settings Using IE Browser Tools",
      zoom: {
        title: "Zoom (+/-)",
        instructionsListItem1: "Select the View button at the top left bar in Internet Explorer.",
        instructionsListItem2: "Select Zoom.",
        instructionsListItem3:
          "You can select a predefined zoom level, or a custom level by selecting Custom and entering a zoom value.",
        instructionsListItem4:
          "Alternatively, you can hold down CTRL and the + / - keys on your keyboard to zoom in or out."
      },
      textSize: {
        title: "Text size",
        instructionsListItem1: "Select the View button at the top left bar in Internet Explorer.",
        instructionsListItem2: "Select Text size.",
        instructionsListItem3: "Choose to make text larger or smaller than the size on the screen.",
        instructionsListItem4:
          "Select the Tools button, and select General tab, and then, under Appearance, select Accessibility.",
        instructionsListItem5:
          "Select the Ignore font sizes specified on webpages on the check box.",
        instructionsListItem6: "Select OK, and then select OK again.",
        notChanged: "If the text size has not changed:"
      },
      fontStyle: {
        title: "Font style",
        instructionsListItem1: "Select the Tools button at the top left bar in Internet Explorer.",
        instructionsListItem2: "Select Internet options.",
        instructionsListItem3: "In the General tab, under Appearance, select Accessibility.",
        instructionsListItem4:
          "Select the Ignore font styles specified on webpages on the check box.",
        instructionsListItem5: "Select OK.",
        instructionsListItem6: "In the General tab, under Appearance, select Fonts.",
        instructionsListItem7: "Select the fonts you want to use.",
        instructionsListItem8: "Select OK, and then select OK again."
      },
      color: {
        title: "Text and background colour",
        instructionsListItem1: "Select the Tools button and select Internet options.",
        instructionsListItem2: "In the General tab, under Appearance, select Accessibility.",
        instructionsListItem3: "Select the Ignore colors specified on webpages on the check box.",
        instructionsListItem4: "Select OK.",
        instructionsListItem5: "In the General tab, under Appearance, select Colors.",
        instructionsListItem6: "Uncheck the Use Windows colors check box.",
        instructionsListItem7:
          "For each color that you want to change, select the color box, select a new color, and then select OK.",
        instructionsListItem8: "Select OK, and then select OK again."
      }
    },

    //eMIB Test
    emibTest: {
      //Home Page
      homePage: {
        welcomeMsg: "Welcome to the eMIB Sample Test"
      },

      //HowTo Page
      howToPage: {
        tipsOnTest: {
          title: "Tips for taking the e-MIB",
          part1: {
            description:
              "The e-MIB presents you with situations that will give you the opportunity to demonstrate the Key Leadership Competencies. Here are some tips that will help you provide assessors with the information they need to evaluate your performance on those competencies:",
            bullet1:
              "Answer all the questions asked in the emails you receive. This will ensure that you have used all the opportunities designed to allow you to demonstrate the competencies.",
            bullet2:
              "Provide initial thoughts and recommendations supported by your rationale where appropriate. You can then note other information you would need to reach a final decision.",
            bullet3:
              "Use only the information provided in the emails and the background information. Do not make any inferences based on the culture of your own organization. Avoid making assumptions that are not reasonably supported by either the background information or the emails."
          },
          part2: {
            title: "Other important notes",
            bullet1:
              "You will be scored on the responses contained in your emails, task list and Reasons for Action. Information left in your Notepad will not be evaluated.",
            bullet2:
              "You will not be scored on your writing. No points will be deducted for spelling, grammar, punctuation errors or for incomplete sentences. However, your writing will need to be clear enough to ensure that the assessors understand which situation you are responding to and your main points.",
            bullet3: "You can answer the emails in any order you want.",
            bullet4: "You are responsible for managing your own time."
          }
        },
        testInstructions: {
          title: "Test instructions",
          para1:
            "When you start the test, first, read the background information which describes your position and the fictitious organization in which you work. Then proceed to the inbox where you can read the emails you received and take actions to respond to them as though you were a manager within the fictitious organization.",
          step1Section: {
            title: "Step 1 - Responding to emails",
            description:
              "You can respond to the emails you receive in two ways: by sending an email or by adding tasks to your task list. A description of both methods of responding is presented below, followed by examples.",
            part1: {
              title: "Example of an email you have received:",
              para1:
                "Two options are provided below to demonstrate different methods of responding to the email. As previously mentioned, you can choose one of the two options presented or a combination of the two. Note that the responses provided were not evaluated for how well they demonstrate the competency targeted in the email. They are presented here only to illustrate how to use each of the two methods of responding."
            },
            part2: {
              title: "Responding with an email response",
              para1:
                "You can send an email in response to one you received in your inbox. The written responses should reflect how you would respond as a manager.",
              para2:
                "You can send an email using the following options: reply, reply all, forward, or write a new email. If you choose to write a new email, you will have access to a directory with all of your contacts. You can write as many emails as you like in response to an email you received."
            },
            part3: {
              title: "Adding a task to the task list",
              para1:
                "In addition to, or instead of, responding to an email you can add a task to the task list. A task is an action that you intend to take to address a situation presented in the emails. Example tasks could include planning a meeting or asking a colleague for information. You should provide enough information in your task description to ensure it is clear which situation(s) you are addressing. You should also specify what action(s) you plan to take, and with whom. You can add, delete, or edit tasks on the task list."
            },
            part4: {
              title: "How to choose a method of responding",
              para1:
                "There are no right or wrong ways to respond. When responding to an email, you can:",
              bullet1: "send an email (or emails), or",
              bullet2: "add a task (or tasks) to your task list, or",
              bullet3: "do both.",
              para2:
                "You will be evaluated on the content of your responses, and not on your method of responding (i.e. whether you responded by sending an email and/or adding a task to your task list). That being said, answers need to be detailed and clear enough for assessors to evaluate how you are addressing the situation. For example, if you plan to schedule a meeting, you’ll need to specify what will be discussed at that meeting.",
              para3:
                "In responding to an email you received, if you decide to send an email and to add a task to your task list, you do not need to repeat the same information in both places. For example, if you mention that you will schedule a meeting with a co-worker in an email, you do not also need to add that meeting to your task list."
            }
          },
          step2Section: {
            title: "Step 2 - Adding reasons for action (optional)",
            description:
              "After sending an email or adding a task, you will be able to provide a justification in the “Reasons for Action” section. Here, you can explain why you took a specific action in response to a situation if you feel the need to provide additional information. Filling out the Reasons for Action section is optional. Note that you may decide to add Reasons for Action when responding to some emails and not others. This also applies for tasks in the task list. In addition, if you add Reasons for Action, you may choose to clarify only certain actions while others may not require additional explanations."
          },
          exampleEmail: {
            to: "Claude Huard (Manager, Quality Assurance Team)",
            from: "Geneviève Bédard (Director, Research and Innovations Unit)",
            subject: "Preparing Mary for her assignment",
            date: "Friday, November 4",
            body:
              "Hello Claude,\n\nI was pleased to hear that one of your quality assurance analysts, Mary Woodside, has accepted a six-month assignment with my team, starting on January 2. I understand she has experience in teaching and using modern teaching tools from her previous work as a college professor. My team needs help to develop innovative teaching techniques that promote employee productivity and general well-being. Therefore I think Mary’s experience will be a good asset for the team.\n\nIn order to maximize the benefits of the assignment for both our teams, are there any areas in which you might want Mary to gain more experience that could be of value when she returns to your team?\n\nLooking forward to getting your input,\nGeneviève"
          },
          exampleEmailResponse: {
            emailBody:
              "Hi Geneviève,\n\nI agree that we should plan Mary’s assignment so both our teams can benefit from it. I suggest that we plan to train Mary in the synthesis of data from multiple sources. Doing so could help her broaden her skill set and would be beneficial to our team when she comes back. Likewise, your team members could benefit from her past experience in teaching. I’ll consult her directly as I would like to have her input on this. I’ll get back to you later this week once I have more information to provide you on this matter.\n\nThat being said, what are your own expectations? Are there any current challenges or specific team dynamics that should be taken into account? I’d like to consider all factors, such as the current needs of your team, challenges and team dynamics before I meet with Mary to discuss her assignment.\n\nThanks,\n\nClaude",
            reasonsForAction:
              "I am planning to meet with Mary to discuss her own expectations regarding the assignment and to set clear objectives. I want to ensure she feels engaged and knows what is expected of her, to help her prepare accordingly. I will also look at her performance agreement to ensure that what I propose is consistent with her learning plan."
          },
          exampleTaskResponse: {
            task:
              "-Reply to Geneviève’s email:\n-Suggest training Mary in synthesizing information from multiple sources so that she can broaden her skill set\n-Ask what her expectations + challenges are so I can consider all factors in determining how her team could benefit from Mary's experience in providing training\n-Inform that I’m gathering more info from Mary and will respond with suggestions by the end of the week\n-Schedule a meeting with Mary to discuss her assignment objectives + ensure she feels engaged and knows what is expected of her.\n-Refer to Mary’s past and current performance agreements to ensure that what I propose is in line with her learning plan.",
            reasonsForAction:
              "Training Mary in synthesizing information from multiple sources would be beneficial to our team which needs to consolidate information gathered from many sources. Asking Geneviève for her own expectations and challenges will help me better prepare Mary and ensure that the assignment is beneficial to both our teams."
          }
        },
        evaluation: {
          title: "Evaluation",
          description:
            "Both the actions you take and the explanations you give will be considered when evaluating your performance on each of the Key Leadership Competencies (described below). You will be assessed on the extent to which your actions demonstrate the Key Leadership Competencies. Your actions will be rated on effectiveness. Effectiveness is measured by whether your actions would have a positive or a negative impact in resolving the situations presented, and how widespread that impact would be",
          keyLeadershipCompetenciesSection: {
            title: "Key Leadership Competencies",
            para1Title: "Create vision and strategy: ",
            para1:
              "Managers help to define the future and chart a path forward. To do so, they take into account context. They leverage their knowledge and seek and integrate information from diverse sources to implement concrete activities. They consider different perspectives and consult as needed. Managers balance organizational priorities and improve outcomes.",
            para2Title: "Mobilize people: ",
            para2:
              "Managers inspire and motivate the people they lead. They manage their employee’s performance, provide constructive and respectful feedback to encourage and enable performance excellence. They lead by example, setting goals for themselves that are more demanding than those that they set for others.",
            para3Title: "Uphold integrity and respect: ",
            para3:
              "Managers exemplify ethical practices, professionalism and personal integrity, acting in the interest of Canada and Canadians. They create respectful, inclusive and trusting work environments where sound advice is valued. They encourage the expression of diverse opinions and perspectives, while fostering collegiality.",
            para4Title: "Collaborate with partners and stakeholders: ",
            para4:
              "Managers are deliberate and resourceful about seeking a wide spectrum of perspectives. In building partnerships, they manage expectations and aim to reach consensus. They demonstrate openness and flexibility to improve outcomes and bring a whole-of-organization perspective to their interactions. Managers acknowledge the role of partners in achieving outcomes.",
            para5Title: "Promote innovation and guide change: ",
            para5:
              "Managers create an environment that supports bold thinking, experimentation and intelligent risk taking. When implementing change, managers maintain momentum, address resistance and anticipate consequences. They use setbacks as a valuable source of insight and learning.",
            para6Title: "Achieve results: ",
            para6:
              "Managers ensure that they meet team objectives by managing resources. They anticipate, plan, monitor progress and adjust as needed. They demonstrate awareness of the context when making decisions. Managers take personal responsibility for their actions and outcomes of their decisions."
          }
        }
      },

      //Background Page
      background: {
        orgChartInstructions:
          "Below is a tree view of the organization chart. Once selected, you can use the arrow keys to navigation, expand, and collapse information.",
        backgroundInformation: {
          title: "Overview"
        },
        organizationalInformation: {
          title: "Your organization"
        },
        organizationalStructure: {
          title: "Organizational Structure",
          orgChart: {
            desciption: "Organizational Chart (ODC)",
            link: "Image Description",
            ariaLabel: "Image description of Organizational Chart (ODC)"
          },
          dialog: {
            title: "The Organizational Chart of the ODC",
            president: "Jenna Icard - President",
            corpDirector: "Amari Kinsler - Corporate Affairs Director",
            hr: "Marc Sheridan - Human Resources Manager",
            finance: "Bob McNutt - Finance Manager",
            it: "Lana Hussad - Information Technology Manager",
            research: "Geneviève Bédard - Research and Innovations Director",
            programDev: "Bartosz Greco - Program Development Director",
            communications: "Nancy Ward - Services and Communications Director",
            qa: "Claude Huard - Quality Assurance Manager (You)",
            services: "Haydar Kalil - Services and Support Manager",
            audits: "Geoffrey Hamma - Audits Manager",
            training: "Lucy Trang - E-Training Manager"
          }
        },
        teamInformation: {
          title: "Your team",
          teamChart: {
            desciption: "Organizational Chart The Quality Assurance (QA) Team",
            link: "Image Description",
            ariaLabel: "Image description of Organizational Chart The Quality Assurance (QA) Team"
          },
          dialog: {
            title: "The Organizational Chart of the QA Team"
          }
        }
      },

      //Inbox Page
      inboxPage: {
        emailId: " email id# ",
        subject: "Subject",
        to: "To",
        from: "From",
        date: "Date",
        addReply: "Add email response",
        addTask: "Add task list",
        yourActions: `You responded with {0} emails and {1} tasks`,
        editActionDialog: {
          addEmail: "Add email response",
          editEmail: "Edit email response",
          addTask: "Add task list",
          editTask: "Edit task",
          save: "Save response"
        },
        characterLimitReached: `Limit reached. You can only use {0} characters in this field.`,
        emailCommons: {
          to: "To:",
          cc: "CC:",
          reply: "Reply",
          replyAll: "Reply all",
          forward: "Forward",
          editButton: "Edit response",
          deleteButton: "Delete response",
          originalEmail: "Original email",
          yourResponse: "Your response"
        },
        addEmailResponse: {
          selectResponseType: "Please select how you would like to respond to the original email:",
          headerFieldPlaceholder: "JohnSmith",
          response: "Your response: {0} character limit",
          reasonsForAction: "Your reasons for actions (optional): {0} character limit",
          emailResponseTooltip: "Write a response to the email you recieved.",
          reasonsForActionTooltip:
            "Here, you can explain why you took a specific action in response to a situation if you feel you need to provide additional information"
        },
        emailResponse: {
          description: "For this response, you've chosen to:",
          response: "Your response:",
          reasonsForAction: "Your reasons for action:"
        },
        addEmailTask: {
          header: "Email ID #{0}: {1}",
          task: "Your task(s): {0} character limit",
          reasonsForAction: "Your reasons for actions (optional): {0} character limit"
        },
        taskContent: {
          task: "Your task(s):",
          taskTooltipPart1: "An action you intend to take to address a situation in the emails.",
          taskTooltipPart2: "Example: Planning a meeting, asking a colleague for information.",
          reasonsForAction: "Your reasons for action:",
          reasonsForActionTooltip:
            "Here, you can explain why you took a specific action in response to a situation if you feel you need to provide additional information"
        },
        deleteResponseConfirmation: {
          title: "Are you sure you want to delete this response?",
          systemMessageTitle: "Warning!",
          systemMessageDescription:
            "This reply will be removed from your test responses. You will not be able to recover your response or reasons for action.",
          description:
            'If you are certain that you want to delete your response, click the "Delete response" button.'
        },
        cancelResponseConfirmation: {
          title: "Are you sure you want to cancel this response?",
          systemMessageTitle: "Warning!",
          systemMessageDescription:
            "Your response will not be saved if you proceed. If you wish to save your answer, you may return to the response. All of your responses can be edited or deleted before submission.",
          description:
            'If you do not wish to save the response, click the "Cancel response" button.'
        }
      },

      //Confirmation Page
      confirmationPage: {
        submissionConfirmedTitle: "Congratulations! Your test has been submitted.",
        feedbackSurvey:
          "We would appreciate your feedback on the assessment. Please fill out this optional {0} before logging out and leaving.",
        optionalSurvey: "15 minute survey",
        logout:
          "For security reasons, please ensure you log out of your account in the top right corner of this page. You may quietly gather your belongings and leave the test session. If you have any questions or concerns about your test, please contact {0}.",
        thankYou: "Thank you for completing your assessment. Good luck!"
      },

      //Quit Confirmation Page
      quitConfirmationPage: {
        title: "You have quit the test",
        instructionsRaiseHand:
          "Please raise your hand to signal to your test administrator for further instructions.",
        instructionsEmail:
          "If you have any questions or concerns about your test, please contact {0}."
      },

      //Test tabs
      tabs: {
        instructionsTabTitle: "Instructions",
        backgroundTabTitle: "Background",
        inboxTabTitle: "Inbox",
        disabled: "You can't access this until you start the test."
      },

      //Test Footer
      testFooter: {
        timer: {
          showTimer: "Show timer",
          hideTimer: "Hide timer",
          timeLeft: "Time left in test session:",
          timerHidden: "Timer hidden."
        },
        submitTestPopupBox: {
          title: "Confirm test submission?",
          warning: {
            title: "Warning! The notepad will not be saved.",
            message:
              "Anything written in the notepad will not be submitted with the test for scoring. Ensure that you have reviewed all of your responses before submitting the test as you will not be able to go back to make changes."
          },
          description:
            "If you are ready to send your test in for scoring, click the “Submit test” button. You will be exited out of this test session and provided further instructions."
        },
        quitTestPopupBox: {
          title: "Are you sure you want to quit this test?",
          description:
            "All answers will be deleted. You will not be able to recover your answers, and will forfeit from this assessment. To quit, you must acknowledge the following:",
          checkboxOne: "I voluntarily withdraw from this examination",
          checkboxTwo: "My test will not be scored",
          checkboxThree:
            "I am aware that the retest period for this test may apply, should I wish to write this test again"
        }
      }
    },

    //Screen Reader
    ariaLabel: {
      backgroundMenu: "Background Menu",
      mainMenu: "Main Menu",
      tabMenu: "eMIB Tab Menu",
      instructionsMenu: "Instructions Menu",
      languageToggleBtn: "language-toggle-button",
      authenticationMenu: "Authentication Menu",
      emailHeader: "email header",
      responseDetails: "response details",
      reasonsForActionDetails: "reasons for action details",
      taskDetails: "task details",
      emailOptions: "email options",
      taskOptions: "task options",
      taskTooltip: "task tooltip",
      emailResponseTooltip: "email response tooltip",
      reasonsForActionTooltip: "reasons for action tooltip",
      passwordCreationRequirements:
        "Password (your password must satisfy the following: At least one upper case, at least one lower case, at least one digit, at least one special character, minimum of 5 characters and maximum of 15)",
      passwordConfirmationRequirements: "It must match your password",
      dobDayField: "Day field selected",
      dobMonthField: "Month field selected",
      dobYearField: "Year field selected"
    },

    //Commons
    commons: {
      psc: "Public Service Commission",
      nextButton: "Next",
      backButton: "Back",
      enterEmib: "Enter e-MIB",
      startTest: "Start test",
      confirmStartTest: {
        aboutToStart: "You are about to start the timed test.",
        timerWarning:
          "After clicking start, you'll be taken to the 'Background' tab. You will have {0} to complete the test.",
        instructionsAccess:
          "You will have access to the instructions from within the test. Good luck!",
        timeUnlimited: "unlimited time"
      },
      submitTestButton: "Submit test",
      quitTest: "Quit Test",
      returnToTest: "Return to test",
      returnToResponse: "Return to response",
      passStatus: "Pass",
      failStatus: "Fail",
      enabled: "Enabled",
      disabled: "Disabled",
      backToTop: "Back to top",
      notepad: {
        title: "Notepad",
        placeholder: "Put your notes here...",
        hideButton: "Hide notepad",
        openButton: "Open notepad"
      },
      cancel: "Cancel",
      cancelResponse: "Cancel changes",
      close: "Close",
      login: "Login",
      logout: "Logout",
      ok: "Ok"
    }
  },

  fr: {
    //Main Tabs
    mainTabs: {
      homeTabTitleUnauthenticated: "Accueil",
      homeTabTitleAuthenticated: "Votre tests",
      dashboardTabTitle: "Tableau de bord",
      sampleTest: "BRG-e pratique",
      statusTabTitle: "Statut",
      psc: "Commission de la fonction publique du Canada",
      canada: "Gouvernement du canada"
    },

    //HTML Page Titles
    titles: {
      CAT: "OEC - CFP",
      eMIB: "FR eMIB Assessment",
      simulation: "FR eMIB Assessment Simulation",
      status: "OÉC état du system",
      prototypes: "OÉC rototypes",
      home: "OÉC accueil",
      homeWithError: "Erreur - OÉC"
    },

    //authentication
    authentication: {
      login: {
        title: "Se connecter",
        content: {
          title: "Connexion",
          description:
            "Un compte est nécessaire pour continuer. Pour ouvrir une session, entrez votre code d’utilisateur et votre mot de passe.",
          inputs: {
            emailTitle: "Adresse courriel :",
            passwordTitle: "Mot de passe :"
          }
        },
        button: "Connexion",
        invalidCredentials: "FR Invalid credentials!",
        passwordFieldSelected: "FR Password field selected."
      },
      createAccount: {
        title: "Créer un compte",
        content: {
          title: "Créer un compte",
          description:
            "FR Un compte est nécessaire pour continuer. To create an account, fill out the following.",
          inputs: {
            firstNameTitle: "Prénom :",
            firstNameError: "FR Must be a valid first name",
            lastNameTitle: "Nom de famille :",
            lastNameError: "FR Must be a valid last name",
            dobDayTitle: "Date de naissance: (JJ / MM / ---A) :",
            dobError: "FR Please fill out all fields related to the date of birth",
            dobTooltip: "FR You will only need to provide the last digit for your year of birth.",
            emailTitle: "Adresse courriel :",
            emailError: "FR Must be a valid email address",
            priOrMilitaryNbrTitle: "FR PRI or Military number (if applicable) :",
            priOrMilitaryNbrError: "FR Must be a valid PRI or a valid Military number:",
            passwordTitle: "Mot de passe :",
            passwordErrors: {
              description: "Votre mot de passe doit satisfaire les critères suivants :",
              upperCase: "Au moins une majuscule",
              lowerCase: "Au moins une minuscule",
              digit: "Au moins un chiffre",
              specialCharacter: "Au moins un caractère spécial",
              length: "Au moins 5 caractères et maximum 15"
            },
            passwordConfirmationTitle: "Confirmer le mot de passe :",
            passwordConfirmationError: "FR Your password confirmation must match the Password"
          }
        },
        privacyNotice:
          "FR I have read and agreed to how the Public Service Commission collects, uses and discloses personnel information, as set out in the {0}.",
        privacyNoticeLink: "Avis de confidentialité",
        privacyNoticeError: "FR You must accept the privacy notice by clicking on the checkbox",
        button: "Créer un compte",
        accountAlreadyExistsError: "FR An account is already associated to this email address",
        passwordTooCommonError: "FR This password is too common",
        passwordTooSimilarToUsernameError: "FR The password is too similar to the username",
        privacyNoticeDialog: {
          title: "Confidentialité et sécurité",
          privacyNoticeStatement: "Énoncé de confidentialité",
          privacyParagraph1:
            "Les résultats que vous aurez obtenus à cet examen seront communiqués au ministère ou à l’organisme demandeur à des fins de dotation. Ils sont recueillis en vertu de la {0} et protégés aux termes de la {1}, et ils sont conservés dans les fichiers de renseignements personnels CFP PPU 025, 030 et 035.",
          publicServiceEmploymentActLink: "Loi sur l’emploi dans la fonction publique",
          privacyActLink: "Loi sur la protection des renseignements personnels",
          privacyParagraph2:
            "Toute personne a le droit de déposer une plainte auprès du {0} concernant le traitement de ses renseignements personnels par un ministère.",
          privacyCommissionerLink: "commissaire à la protection de la vie privée du Canada",
          privacyParagraph3:
            "La Commission de la fonction publique du Canada (CFP) s’engage à protéger le droit des personnes à la vie privée.",
          privacyParagraph4:
            "Les « renseignements personnels » se définissent comme étant « les renseignements, quels que soient leur forme et leur support, concernant un individu identifiable […] ». Veuillez consulter l’article 3 de la {0} pour obtenir de plus amples détails concernant cette notion. Les renseignements personnels servent à fournir des services d’évaluation aux clients du Centre de psychologie du personnel (CPP) et sont recueillis en vertu des articles 11, 30, 35 et 36 de la Loi sur l’emploi dans la fonction publique. La communication de vos renseignements personnels est volontaire. Si toutefois vous préférez ne pas les divulguer, vous ne pourrez pas utiliser les services du CPP.",
          privacyParagraph5:
            "Conformément aux dispositions de la Loi sur la protection des renseignements personnels, les renseignements personnels recueillis par le CPP ne peuvent être divulgués à des personnes ou à des organismes non autorisés. Toutefois, conformément aux dispositions de l’article 8 de cette loi, vos renseignements personnels pourraient être divulgués sans votre consentement dans certains cas précis. De plus, certaines données démographiques seront utilisées à des fins d’analyse, de recherche et de développement.",
          privacyParagraph6:
            "Toute personne a droit à la protection et à la consultation de ses renseignements personnels, et a le droit de demander que des corrections y soient apportées si elle estime qu’il y a une erreur ou une omission. Pour demander des corrections, prière de communiquer avec la {0} du ministère concerné.",
          accessToInformationLink:
            "Division de l’Accès à l’information et de la protection des renseignements personnels",
          privacyParagraph7:
            "Les renseignements personnels sont recueillis et utilisés de la façon décrite dans le fichier de renseignements personnels CFP PCU 025, « Évaluation par le Centre de psychologie du personnel » (voir le {0} concernant la CFP). Les fichiers imprimés sont conservés pendant cinq ans avant d’être détruits, et les résultats obtenus par les candidats aux examens sont conservés indéfiniment sous forme de fichiers informatisés.",
          infoSourceChapterLink: "chapitre d’Info Source",
          privacyParagraph8:
            "Toute personne a le droit de déposer une plainte auprès du {0} concernant le traitement de ses renseignements personnels par un ministère.",
          reproductionTitle: "Reproduction ou divulgation non autorisées du contenu de l'examen",
          reproductionWarning:
            "Cet examen et son contenu portent le niveau de sécurité Protégé B. La reproduction ou l'enregistrement du contenu de cet examen, sous quelque forme que ce soit, sont strictement interdits. Tous les documents liés à l'examen, y compris les brouillons, doivent être remis à l'administrateur de l'examen à la fin de celui-ci. La reproduction, l'enregistrement ou la divulgation non autorisées du contenu de l'examen contreviennent à la Politique du gouvernement sur la sécurité, et l'utilisation de renseignements obtenus ou transmis de manière inappropriée peut constituer une infraction à la Loi sur l'emploi dans la fonction publique (LEFP). Les parties impliquées dans la divulgation ou l'utilisation inappropriée de contenu d'examen protégé pourraient faire l'objet d'une enquête en vertu de la LEFP. Au terme de cette enquête, les personnes reconnues coupables de fraude pourraient faire l'objet d'une déclaration de culpabilité par procédure sommaire ou voir leur dossier renvoyé à la Gendarmerie royale du Canada.",
          cheatingTitle: "Tricherie",
          cheatingWarning:
            "Veuillez prendre note que tous les cas présumés de tricherie seront renvoyés au gestionnaire responsable et au Centre de psychologie du personnel, qui prendront les mesures nécessaires. En cas de tricherie présumée, les résultats d'examen pourraient être invalidés, et les parties impliquées pourraient faire l'objet d'une enquête en vertu de la LEFP. Au terme de cette enquête, les personnes reconnues coupables de fraude pourraient faire l'objet d'une déclaration de culpabilité par procédure sommaire ou voir leur dossier renvoyé à la Gendarmerie royale du Canada."
        }
      }
    },

    //Home Page
    homePage: {
      welcomeMsg: "Bienvenue dans l'outil d'évaluation des compétences",
      description:
        "FR This website is used to assess candidates for positions in the federal public service. To access your tests, you must login below. If you do not have an account, you may register for one using your email address."
    },

    //Dashboard Page
    dashboard: {
      title: "Bienvenue, {0} {1}.",
      description:
        "FR You have successfully logged into your account. You should be able to see the test(s) that you have been assigned to below. If you have not been assigned to a test, please notify your test administrator. Please wait for your test administrator's instructions before starting the test.",
      table: {
        columnOne: "Nom de test",
        columnTwo: "Date prévue de test",
        columnThree: "Action"
      }
    },

    //Status Page
    statusPage: {
      title: "Statut de OÉC",
      logo: "Logo Thunder CAT",
      welcomeMsg:
        "Page de statut interne afin de déterminer rapidement l'état / la santé de l'Outil d'Évaluation des Compétences.",
      gitHubRepoBtn: "Répertoire GitHub",
      serviceStatusTable: {
        title: "Statut des services",
        frontendDesc: "La Face avant de l'application est construite et utilisée avec succès",
        backendDesc: "La Face arrière de l'application réussit les demandes API avec succès",
        databaseDesc: "La Base de données réussit les demandes API avec succès"
      },
      systemStatusTable: {
        title: "Statut du système",
        javaScript: "JavaScript",
        browsers: "IE 9+, Firefox, Chrome",
        screenResolution: "Résolution d'écran minimum de 800 x 600"
      }
    },

    // Settings Dialog
    settings: {
      systemSettings: "FR Display Settings Using IE Browser Tools",
      zoom: {
        title: "Zoom avant et zoom arrière (+ / -)",
        instructionsListItem1:
          "Cliquer sur le bouton Visualiser dans la barre de menu supérieure à gauche dans Internet Explorer.",
        instructionsListItem2: "Sélectionner Zoom.",
        instructionsListItem3:
          "Vous pouvez choisir un niveau de zoom prédéfini ou un niveau sur mesure (sélectionner Sur mesure avant de saisir une valeur de zoom).",
        instructionsListItem4:
          "Vous pouvez également appuyer simultanément sur les touches CTRL et + / - de votre clavier pour effectuer un zoom avant ou un zoom arrière."
      },
      textSize: {
        title: "Taille de texte",
        instructionsListItem1:
          "Cliquer sur le bouton Visualiser dans la barre de menu supérieure à gauche dans Internet Explorer.",
        instructionsListItem2: "Sélectionner Taille de texte.",
        instructionsListItem3:
          "Choisir d’agrandir ou de diminuer la taille du texte qui apparaît à l’écran.",
        instructionsListItem4:
          "Cliquer sur le bouton Outils, puis sélectionner l’onglet Général. Sous Apparence, sélectionner Accessibilité.",
        instructionsListItem5:
          "Cocher la case Ignorer les tailles de police spécifiées sur les pages Web.",
        instructionsListItem6: "Cliquer sur OK, puis encore une fois sur OK.",
        notChanged: "Si la taille du texte n’a pas changé :"
      },
      fontStyle: {
        title: "Police de caractères",
        instructionsListItem1:
          "Cliquer sur le bouton Outils dans la barre de menu supérieure à gauche dans Internet Explorer.",
        instructionsListItem2: "Choisir Options Internet.",
        instructionsListItem3: "Dans l’onglet Général, sous Apparence, sélectionner Accessibilité.",
        instructionsListItem4:
          "Cocher la case Ignorer les style de police spécifiées sur les pages Web. ",
        instructionsListItem5: "Cliquer sur OK.",
        instructionsListItem6: "Dans l’onglet Général, sous Apparence, sélectionner Polices.",
        instructionsListItem7: "Choisir la police que vous désirez utiliser.",
        instructionsListItem8: "Cliquer sur OK, puis encore une fois sur OK."
      },
      color: {
        title: "Couleur du texte et de l’arrière plan",
        instructionsListItem1: "Cliquer sur le bouton Outils et sélectionner Options Internet.",
        instructionsListItem2: "Dans l’onglet Général, sous Apparence, sélectionner Accessibilité.",
        instructionsListItem3: "Cocher la case Ignorer les couleurs spécifiées sur les pages Web.",
        instructionsListItem4: "Cliquer sur OK.",
        instructionsListItem5: "Dans l’onglet Général, sous Apparence, sélectionner Couleurs.",
        instructionsListItem6: "Décocher la case Utiliser les couleurs Windows.",
        instructionsListItem7:
          "Pour chaque couleur que vous désirez modifier, cliquer sur la case de couleur, choisir une nouvelle couleur et cliquer sur OK.",
        instructionsListItem8: "Cliquer sur OK, puis encore une fois sur OK."
      }
    },

    //eMIB Test
    emibTest: {
      //Home Page
      homePage: {
        welcomeMsg: "Bienvenue dans le test pratique de BRG-e"
      },

      //HowTo Page
      howToPage: {
        tipsOnTest: {
          title: "Conseils pour répondre à la BRG-e",
          part1: {
            description:
              "La BRG-e vous présente des situations qui vous donneront l’occasion de démontrer les compétences clés en matière de leadership. Voici quelques conseils qui vous aideront à fournir aux évaluateurs l’information dont ils ont besoin pour évaluer votre rendement par rapport à ces compétences :",
            bullet1:
              "Répondez à toutes les questions posées dans les courriels que vous recevez. Vous profiterez ainsi de toutes les occasions de démontrer les compétences recherchées.",
            bullet2:
              "Présentez vos recommandations et réflexions préliminaires accompagnées d’une justification, s’il y a lieu. Vous pouvez ensuite noter les autres renseignements dont vous auriez besoin pour en arriver à une décision.",
            bullet3:
              "Utilisez uniquement l’information fournie dans les courriels et les informations contextuelles. Ne tirez aucune conclusion fondée sur la culture de votre propre organisation. Évitez de faire des suppositions qui ne sont pas raisonnablement corroborées par l’information contextuelle ou les courriels."
          },
          part2: {
            title: "Autres notes importantes",
            bullet1:
              "Vous serez évalués en fonction des réponses aux courriels, des tâches et des justifications des mesures prises. Le contenu du bloc-notes ne sera pas évalué.",
            bullet2:
              "Vous ne serez pas évalué sur votre rédaction. Aucun point ne sera enlevé pour les fautes d’orthographe, de grammaire, de ponctuation ou pour les phrases incomplètes. Votre rédaction devra toutefois être suffisamment claire pour que les évaluateurs comprennent la situation que vous traitez et vos principaux arguments.",
            bullet3: "Vous pouvez répondre aux courriels dans l’ordre que vous désirez.",
            bullet4: "Vous êtes responsable de la gestion de votre temps."
          }
        },
        testInstructions: {
          title: "Instructions du test",
          para1:
            "Dans un premier temps, lisez l’information contextuelle, laquelle décrit votre poste et l’organisation fictive dans laquelle vous travaillez. Ensuite, passez à la boîte de réception pour lire les courriels que vous avez reçus et prendre des dispositions pour répondre à ces courriels comme si vous étiez un gestionnaire dans cette organisation Fictive.",
          step1Section: {
            title: "Étape 1 — Répondre aux courriels",
            description:
              "Vous pouvez répondre aux courriels que vous avez reçus de deux façons : en envoyant un courriel ou en ajoutant une tâche à votre liste de tâches. Les deux méthodes de réponse sont décrites ci-dessous, suivies d’exemples.",
            part1: {
              title: "Exemple d’un courriel que vous avez reçu :",
              para1:
                "Vous trouverez ci-dessous deux façons différentes de répondre au courriel. Comme il est mentionné précédemment, vous pouvez choisir l’une ou l’autre des deux options présentées ou combiner les deux. Veuillez noter que les réponses fournies n’ont pas été évaluées pour déterminer la mesure dans laquelle elles démontrent la compétence ciblée dans le courriel. Elles sont présentées ici uniquement pour illustrer comment utiliser chacune des deux façons de répondre."
            },
            part2: {
              title: "Envoyer un courriel",
              para1:
                "Vous pouvez envoyer un courriel pour répondre à celui que vous avez reçu dans votre boîte de réception. Vos réponses écrites devraient représenter ce que vous feriez en tant que gestionnaire.",
              para2:
                "Vous pouvez envoyer un courriel en utilisant les fonctions suivantes : répondre, répondre à tous, transférer ou rédiger un nouveau courriel. Si vous choisissez de rédiger un nouveau courriel, vous aurez accès à un répertoire de noms et d’adresses de courriel. Vous pouvez écrire autant de courriels que vous le souhaitez pour répondre à un courriel que vous avez reçu."
            },
            part3: {
              title: "Ajouter une tâche à la liste de tâches",
              para1:
                "En plus de répondre à un courriel, ou au lieu d’y répondre, vous pouvez ajouter des tâches à la liste de tâches. Une tâche représente une mesure que vous comptez prendre pour gérer une situation présentée dans les courriels. Voici des exemples de tâches : planifier une rencontre ou communiquer avec un collègue afin d’obtenir de l’information. Assurez-vous de fournir suffisamment d’information dans votre description de la tâche pour que nous sachions à quelle situation vous répondez. Vous devez également préciser quelles mesures vous envisagez prendre et qui devra participer à cette tâche. Vous pouvez ajouter, supprimer ou modifier vos tâches dans la liste des tâches."
            },
            part4: {
              title: "Comment choisir une méthode de réponse",
              para1:
                "Il n’y a pas de bonne ou de mauvaise façon de répondre. En répondant à un courriel, vous pouvez :",
              bullet1: "envoyer un ou des courriels, ou",
              bullet2: "ajouter une ou des tâches à votre liste de tâches, ou",
              bullet3: "faire les deux.",
              para2:
                "Vous serez évalué en fonction du contenu de vos réponses, et non en fonction des méthodes de réponses choisies (c.-à-d., envoi de courriels et ajout d’une tâche à une liste de tâches à accomplir). Cela dit, vos réponses doivent être suffisamment détaillées et claires pour permettre aux évaluateurs d’avoir une bonne compréhension des mesures que vous avez prises pour gérer la situation. Par exemple, si vous comptez organiser une réunion, vous devrez préciser les points qui y seront discutés.",
              para3:
                "Si vous décidez d’envoyer un courriel et d’ajouter une tâche à votre liste de tâches en répondant à un courriel que vous avez reçu, vous n’avez pas à répéter la même information aux deux endroits. Par exemple, si vous mentionnez dans un courriel que vous organiserez une réunion avec un collègue, vous n’avez pas à ajouter cette réunion à votre liste de tâches."
            }
          },
          step2Section: {
            title: "Étape 2 — Ajouter une justification des mesures prises (facultatif)",
            description:
              "Après avoir envoyé un courriel ou ajouté une tâche, vous avez la possibilité d’expliquer votre raisonnement dans la section « Justification des mesures prises ». Vous pouvez expliquer dans cette section pourquoi vous avez pris une ou des mesures pour gérer la situation présentée dans le courriel en question. Remplir la section « Justification des mesures prises » est facultatif. Notez que vous pouvez décider d’ajouter une « Justification des mesures prises » lorsque vous répondez à certains courriels, mais pas pour d’autres. Ceci est également vrai pour les tâches dans la liste de tâches. De plus, si vous ajoutez une « Justification des mesures prises », vous pouvez choisir de justifier certaines des mesures prises tandis que d’autres ne nécessitent pas d’explications supplémentaires."
          },
          exampleEmail: {
            to: "Claude Huard (gestionnaire, Équipe de l’assurance de la qualité)",
            from: "Geneviève Bédard (directrice, Unité de recherche et innovations)",
            subject: "Préparation de Mary en vue de son affectation",
            date: "Le vendredi 4 novembre",
            body:
              "Bonjour Claude.\n\nJe suis ravie d’apprendre qu’une de vos analystes de l’assurance de la qualité, Mary Woodside, a accepté une affectation de six mois avec mon équipe, à compter du 2 janvier. Je crois savoir qu’elle a de l’expérience dans l’enseignement et l’utilisation d’outils pédagogiques modernes dans le cadre de son travail antérieur de professeure au niveau collégial. Mon équipe a besoin d’aide pour mettre au point des techniques d’enseignement novatrices qui favorisent la productivité et le bien-être général des employés. Je pense donc que l’expérience de Mary sera un bon atout pour l’équipe. \n\nAfin de maximiser les avantages de l’affectation pour nos deux équipes, y a-t-il des domaines dans lesquels tu aimerais que Mary acquière plus d’expérience et qui pourraient être utiles à son retour dans votre équipe?\n\nJ’attends avec impatience ta réponse.\n\nGeneviève"
          },
          exampleEmailResponse: {
            emailBody:
              "Bonjour Geneviève,\n\nJe crois comme toi que nous devons planifier l’affectation de Mary afin que nos deux équipes en tirent parti. Je suggère que nous envisagions de former Mary à la synthèse de données provenant de sources multiples. Ceci l’aiderait à élargir ses compétences et serait utile à notre équipe à son retour. De même, les membres de ton équipe pourraient aussi bénéficier de son expérience en enseignement. Je la consulterai directement, car j’aimerais connaître son opinion à ce propos. Je te redonne des nouvelles au cours de la semaine, dès que j’ai plus d’information sur le sujet.\n\nCela dit, quelles sont tes attentes? Y a-t-il certains défis ou aspects particuliers de la dynamique de l’équipe dont il faut tenir compte? J’aimerais tenir compte de tous les facteurs, tels que les besoins actuels de ton équipe, les défis et la dynamique de l’équipe avant de rencontrer Mary pour discuter de son affectation.\n\nMerci.\n\nClaude",
            reasonsForAction:
              "Je prévois de rencontrer Mary pour discuter de ses attentes à l’égard de l’affectation et établir des objectifs clairs. Je veux qu’elle se sente incluse et qu’elle sache ce qu’on attend d’elle, afin de l’aider à se préparer en conséquence. Je prendrai également connaissance de son entente de rendement pour m’assurer que ma proposition cadre bien avec son plan d’apprentissage."
          },
          exampleTaskResponse: {
            task:
              "- Répondre au courriel de Geneviève :\n- proposer de former Mary à la synthèse de l’information provenant de sources multiples afin qu’elle puisse élargir ses compétences ;\n- demander quels sont ses attentes et ses défis du côté de son équipe afin que je puisse tenir compte de tous les facteurs pour déterminer comment son équipe pourrait bénéficier de l’expérience de Mary dans la prestation de formation ;\n- l’informer que je travaille à recueillir plus d’information auprès de Mary, et que je lui ferai part de mes suggestions d’ici la fin de la semaine.\n- Planifier une rencontre avec Mary pour discuter de ses objectifs d’affectation et s’assurer qu’elle se sent engagée et qu’elle sait ce qu’on attend d’elle.\n- Consulter les ententes de rendement passées et actuelles de Mary pour vérifier que ce que je propose est conforme à son pland’apprentissage.",
            reasonsForAction:
              "Former Mary à la synthèse de l’information provenant de sources multiples serait bénéfique pour notre équipe, lequel a besoin de consolider l’information recueillie auprès de nombreuses sources. Demander à Geneviève ses propres attentes et défis m’aidera à mieux préparer Mary et à m’assurer que la mission est bénéfique pour nos deux équipes."
          }
        },
        evaluation: {
          title: "Évaluation",
          description:
            "Les mesures que vous prenez et les explications que vous donnez seront prises en compte dans l’évaluation de votre rendement pour chacune des compétences clés en leadership (décrites ci-dessous). Vous serez évalué sur la façon dont les mesures que vous avez prises démontrent les compétences clés en leadership. Les mesures que vous avez prises seront évaluées quant à leur efficacité. Le niveau d’efficacité d’une mesure prise est déterminé par l’effet, positif ou négatif, que cette mesure aura sur la résolution des situations présentées dans les courriels de même que par l’étendue de cet effet. Vos réponses seront également évaluées en fonction de leur contribution à l’atteinte des objectifs organisationnels, lesquels sont présentés dans l’information contextuelle.",
          keyLeadershipCompetenciesSection: {
            title: "Compétences clés en leadership",
            para1Title: "Créer une vision et une stratégie : ",
            para1:
              "Les gestionnaires contribuent à définir l’avenir et à tracer la voie à suivre. Pour ce faire, ils tiennent compte du contexte. Ils tirent parti de leurs connaissances. Ils obtiennent et intègrent de l’information provenant de diverses sources pour la mise en œuvre d’activités concrètes. Ils considèrent divers points de vue et consultent d’autres personnes, au besoin. Les gestionnaires assurent l’équilibre entre les priorités organisationnelles et contribuent à améliorer les résultats.",
            para2Title: "Mobiliser les personnes : ",
            para2:
              "Les gestionnaires inspirent et motivent les personnes qu’ils dirigent. Ils gèrent le rendement de leurs employés et leur offrent de la rétroaction constructive et respectueuse pour encourager et rendre possible l’excellence en matière de rendement. Ils dirigent en donnant l’exemple et se fixent des objectifs personnels qui sont plus exigeants que ceux qu’ils établissent pour les autres.",
            para3Title: "Préserver l’intégrité et le respect : ",
            para3:
              "Les gestionnaires donnent l’exemple sur le plan des pratiques éthiques, du professionnalisme et de l’intégrité personnelle, en agissant dans l’intérêt du Canada, des Canadiens et des Canadiennes. Ils créent des environnements de travail inclusifs, empreints de respect et de confiance, où les conseils judicieux sont valorisés. Ils encouragent les autres à faire part de leurs points de vue, tout en encourageant la collégialité.",
            para4Title: "Collaborer avec les partenaires et les intervenants : ",
            para4:
              "Les gestionnaires cherchent à obtenir, de façon délibérée et ingénieuse, un grand éventail de perspectives. Lorsqu’ils établissent des partenariats, ils gèrent les attentes et tentent de trouver un consensus. Ils font preuve d’ouverture et de souplesse afin d’améliorer les résultats et apportent une perspective globale de l’organisation à leurs interactions. Les gestionnaires reconnaissent le rôle des partenaires dans l’obtention des résultats.",
            para5Title: "Promouvoir l’innovation et orienter le changement : ",
            para5:
              "Les gestionnaires créent un environnement propice aux idées audacieuses, à l’expérimentation et à la prise de risques en toute connaissance de cause. Lors de la mise en œuvre d’un changement, ils maintiennent l’élan, surmontent la résistance et anticipent les conséquences. Ils perçoivent les revers comme une bonne occasion de comprendre et d’apprendre.",
            para6Title: "Obtenir des résultats : ",
            para6:
              "Les gestionnaires s’assurent de répondre aux objectifs de l’équipe en gérant les ressources. Ils prévoient, planifient et surveillent les progrès, et font des ajustements au besoin. Ils démontrent leur connaissance du contexte lors de la prise de décisions. Les gestionnaires assument la responsabilité personnelle à l’égard de leurs actions et des résultats de leurs décisions."
          }
        }
      },

      //Background Page
      background: {
        orgChartInstructions:
          "FR Below is a tree view of the organization chart. Once selected, you can use the arrow keys to navigation, expand, and collapse information.",
        backgroundInformation: {
          title: "Contexte"
        },
        organizationalInformation: {
          title: "FR Your organization"
        },
        organizationalStructure: {
          title: "Structure organisationnelle",
          orgChart: {
            desciption: "Organigramme (CDO)",
            link: "Description de l'image",
            ariaLabel: "FR Description de l'image de l'Organigramme (CDO)"
          },
          dialog: {
            title: "Organigramme (CDO)",
            president: "Jenna Icard - Présidente",
            corpDirector: "Amari Kinsler - Directeur, Affaires ministérielles",
            hr: "Marc Sheridan - Gestionnaire, Ressources humaines",
            finance: "Bob McNutt - Gestionnaire, Finances",
            it: "Lana Hussad - Gestionnaire, Technologies de l'information ",
            research: "Geneviève Bédard - Directrice, Recherche et innovations",
            programDev: "Bartosz Greco - Directeur, Développement de programmes",
            communications: "Nancy Ward - Directrice, Services et communications",
            qa: "Claude Huard - Gestionnaire, Assurance de la qualité (vous)",
            services: "Haydar Kalil - Gestionnaire, Service et soutien",
            audits: "Geoffrey Hamma - Gestionnaire, Vérifications",
            training: "Lucy Trang - Gestionnaire, Formation en ligne"
          }
        },
        teamInformation: {
          title: "FR Your team",
          teamChart: {
            desciption: "Organigramme Équipe de l'assurance de la qualité (AQ)",
            link: "Description de l'image",
            ariaLabel:
              "FR Description de l'image de l'Organigramme Équipe de l'assurance de la qualité (AQ)"
          },
          dialog: {
            title: "Organigramme Équipe de l'assurance de la qualité (AQ)"
          }
        }
      },

      //Inbox Page
      inboxPage: {
        emailId: " courriel # ",
        subject: "Sujet",
        to: "À",
        from: "Expéditeur",
        date: "Date",
        addReply: "Ajouter une réponse par courriel",
        addTask: "FR Add task list",
        yourActions: `Vous avez repondre avec {0} courriels et {1} tâches`,
        editActionDialog: {
          addEmail: "Ajouter une réponse par courriel",
          editEmail: "FR Edit email response",
          addTask: "Ajouter à la liste de tâches",
          editTask: "FR Edit task",
          save: "FR Save response"
        },
        characterLimitReached: `FR Limit reached. You can only use {0} characters in this field.`,
        emailCommons: {
          to: "À :",
          cc: "Cc :",
          reply: "répondre",
          replyAll: "répondre à tous",
          forward: "transmettre",
          editButton: "Modifier réponse",
          deleteButton: "Supprimer résponse",
          originalEmail: "Courriel d’origine",
          yourResponse: "Votre réponse"
        },
        addEmailResponse: {
          selectResponseType:
            "FR Please select how you would like to respond to the original email:",
          headerFieldPlaceholder: "JohnSmith",
          response: "Votre réponse: {0} character limit",
          reasonsForAction:
            "Ajoutez la justification des mesures prises ici (facultatif): {0} character limit",
          emailResponseTooltip: "FR Write a response to the email you recieved.",
          reasonsForActionTooltip:
            "Dans cette section, vous pouvez expliquer pourquoi vous avez pris une certaine mesure en réponse à une situation, si vous souhaitez fournir des renseignements supplémentaires."
        },
        emailResponse: {
          description: "FR For this response, you've chosen to:",
          response: "Votre réponse:",
          reasonsForAction: "Votre justification des mesures prises ici (facultatif):"
        },
        addEmailTask: {
          header: "FR Email ID #{0}: {1}",
          task: "FR Your task(s): {0} character limit",
          reasonsForAction: "FR Reasons for actions (optional): {0} character limit"
        },
        taskContent: {
          task: "FR Your task(s):",
          taskTooltipPart1: "FR An action you intend to take to address a situation in the emails.",
          taskTooltipPart2: "FR Example: Planning a meeting, asking a colleague for information.",
          reasonsForAction: "Votre justification des mesures prises ici (facultatif):",
          reasonsForActionTooltip:
            "Dans cette section, vous pouvez expliquer pourquoi vous avez pris une certaine mesure en réponse à une situation, si vous souhaitez fournir des renseignements supplémentaires."
        },
        deleteResponseConfirmation: {
          title: "FR Are you sure you want to delete this response?",
          systemMessageTitle: "Avertissement!",
          systemMessageDescription:
            "FR This reply will be removed from your test responses. You will not be able to recover your response or reasons for action.",
          description:
            'FR If you are certain that you want to delete your response, click the "Delete response" button.'
        },
        cancelResponseConfirmation: {
          title: "FR Are you sure you want to cancel this response?",
          systemMessageTitle: "Avertissement!",
          systemMessageDescription:
            "FR Your response will not be saved if you proceed. If you wish to save your answer, you may return to the response. All of your responses can be edited or deleted before submission.",
          description:
            'FR If you do not wish to save the response, click the "Cancel response" button.'
        }
      },

      //Confirmation Page
      confirmationPage: {
        submissionConfirmedTitle: "FR Congratulations! Your test has been submitted.",
        feedbackSurvey:
          "FR We would appreciate your feedback on the assessment. Please fill out this optional {0} before logging out and leaving.",
        optionalSurvey: "FR 15 minute survey",
        logout:
          "FR For security reasons, please ensure you log out of your account in the top right corner of this page. You may quietly gather your belongings and leave the test session. If you have any questions or concerns about your test, please contact {0}.",
        thankYou: "FR Thank you for completing your assessment. Good luck!"
      },

      //Quit Confirmation Page
      quitConfirmationPage: {
        title: "FR You have quit the test",
        instructionsRaiseHand:
          "FR Please raise your hand to signal to your test administrator for further instructions.",
        instructionsEmail:
          "FR If you have any questions or concerns about your test, please contact {0}."
      },

      //Test tabs
      tabs: {
        instructionsTabTitle: "Instructions",
        backgroundTabTitle: "Contexte",
        inboxTabTitle: "Boîte de réception",
        disabled: "FR You can't access this until you start the test."
      },

      //Test Footer
      testFooter: {
        timer: {
          showTimer: "FR Show timer",
          hideTimer: "FR Hide timer",
          timeLeft: "FR Time left in test session:",
          timerHidden: "FR Timer hidden."
        },
        submitTestPopupBox: {
          title: "Confirmer l’envoi du test?",
          warning: {
            title: "Avertissement : your notebook will not be saved.",
            message:
              "FR Anything written in the notepad will not be submitted with the test for scoring. Ensure that you have reviewed all of your responses before submitting the test as you will not be able to go back to make changes."
          },
          description:
            "Si vous êtes prêt(e) à envoyer votre test pour la notation, cliquez sur le bouton « Envoyer le test ». La séance de test sera fermée et vous recevrez d’autres instructions."
        },
        quitTestPopupBox: {
          title: "Souhaitez-vous mettre fin à cette séance de test?",
          description:
            "Vous ne pourrez pas récupérer vos réponses et n’aurez plus accès à la séance de test. Ce faisant, vous affirmez et reconnaissez :",
          checkboxOne: "Je me retire volontairement de ce test;",
          checkboxTwo: "Mon test ne sera pas noté;",
          checkboxThree:
            "Je suis conscient(e) que la période d'attente pour ce test peut s’appliquer, si je veux écrire ce test de nouveau dans le futur."
        }
      }
    },

    //Screen Reader
    ariaLabel: {
      backgroundMenu: "FR Background Menu",
      mainMenu: "Menu Principal",
      tabMenu: "Menu des onglets de la BRG-e",
      instructionsMenu: "Menu des instructions",
      languageToggleBtn: "bouton-de-langue-a-bascule",
      authenticationMenu: "Menu d'authentification",
      emailHeader: "en-tête du courriel",
      responseDetails: "détails de la réponse",
      reasonsForActionDetails: "motifs de l'action",
      taskDetails: "détails sur la ou les tâches",
      emailOptions: "options de messagerie",
      taskOptions: "options de tâche",
      taskTooltip: "infobulle de tâche",
      emailResponseTooltip: "FR email response tooltip",
      reasonsForActionTooltip: "infobulle des motifs de l'action",
      passwordCreationRequirements:
        "FR Password (your password must satisfy the following: At least one upper case, at least one lower case, at least one digit, at least one special character, minimum of 5 characters and maximum of 15)",
      passwordConfirmationRequirements: "FR It must match your password",
      dobDayField: "FR Day field selected",
      dobMonthField: "FR Month field selected",
      dobYearField: "FR Year field selected"
    },

    //Commons
    commons: {
      psc: "Commission de la fonction publique",
      nextButton: "Suivant",
      backButton: "Retour",
      enterEmib: "Entrez la BRG-e",
      startTest: "Commencer le test",
      confirmStartTest: {
        aboutToStart: "FR You are about to start the timed test.",
        timerWarning:
          "FR After clicking start, you'll be taken to the 'Background' tab. You will have {0} to complete the test.",
        instructionsAccess:
          "Vous aurez accès aux instructions et à votre bloc-notes durant le test. Bonne chance!",
        timeUnlimited: "FR unlimited time"
      },
      submitTestButton: "Envoyer le test",
      quitTest: "Quitter la séance de test",
      returnToTest: "Retourner à la séance",
      returnToResponse: "Retourner à la réponse",
      passStatus: "Réussi",
      failStatus: "Échoue",
      enabled: "Activé",
      disabled: "Désactivé",
      backToTop: "Haut de la page",
      notepad: {
        title: "Bloc-notes",
        placeholder: "Mettez vos notes ici...",
        hideButton: "Cacher bloc-notes",
        openButton: "Ouvrir bloc-notes"
      },
      cancel: "Annuler",
      cancelResponse: "Annuler la réponse",
      close: "Fermer",
      login: "Se connecter",
      logout: "Se déconnecter",
      ok: "Ok"
    }
  }
});

export default LOCALIZE;
