import LocalizedStrings from "react-localization";

let LOCALIZE = new LocalizedStrings({
  en: {
    //Main Tabs
    mainTabs: {
      homeTabTitle: "Home",
      prototypeTabTitle: "Prototype",
      statusTabTitle: "Status"
    },

    //authentication
    authentication: {
      login: {
        title: "LOG IN",
        content: {
          title: "Login",
          description:
            "An account is required to proceed further. To log in, enter your credentials below.",
          inputs: {
            emailTitle: "Email Address:",
            emailPlaceholder: "john.smith@outlook.ca",
            passwordTitle: "Password:",
            passwordPlaceholder: "Password"
          }
        },
        button: "Login"
      },
      createAccount: {
        title: "CREATE AN ACCOUNT",
        content: {
          title: "Create an account",
          description:
            "An account is required to proceed further. To create an account, fill out the following.",
          inputs: {
            firstNameTitle: "First Name:",
            firstNamePlaceholder: "John",
            lastNameTitle: "Last Name:",
            lastNamePlaceholder: "Smith",
            emailTitle: "Email Address:",
            emailPlaceholder: "john.smith@outlook.ca",
            passwordTitle: "Password (must be between 5-15 characters):",
            passwordPlaceholder: "Password",
            passwordErrors: {
              description: "Your password must satisfy the following:",
              upperCase: "At least one upper case",
              lowerCase: "At least one lower case",
              digit: "At least one digit",
              specialCharacter: "At least one special character",
              length: "Minimum of 5 characters and maximum of 15"
            },
            passwordConfirmationTitle: "Confirm Password:",
            passwordConfirmationPlaceholder: "Password",
            passwordConfirmationError: "Must match the Password"
          }
        },
        button: "Create account"
      }
    },

    //Home Page
    homePage: {
      title: "The Public Service Commission's Competency Assessment Tool",
      welcomeMsg: "Welcome to the Compotency Assessment Tool.",
      description:
        "Code for Canada and PSC are working on this tool to help assess managerial canadiates for the federal public service. It is in the alpha phase which means it is currently going through product testing and is subject to change."
    },

    //Prototype Page
    prototypePage: {
      title: "Prototype",
      welcomeMsg: "This page will be used to test out experimental UIs.",
      startEmibSampleTest: "Start eMIB Sample Test"
    },

    //Status Page
    statusPage: {
      title: "CAT Status",
      logo: "Thunder CAT Logo",
      welcomeMsg:
        "Internal status page to quickly determine the status / health of the Compotency Assessment Tool.",
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

    //eMIB Test
    emibTest: {
      //Home Page
      homePage: {
        testTitle: "The eMIB",
        welcomeMsg: "Welcome to the eMIB Sample Test"
      },

      //HowTo Page
      howToPage: {
        title: "HowTo Page",
        emailInstructions: "Email Instuctions",
        taskInstructions: "Task Instuctions",
        overview: {
          title: "Overview",
          description:
            'The electronic managerial Inbox (e-MIB) simulates an email inbox in which you will respond to a series of emails depicting situations typically encountered by managers in the federal public service. These situations will provide you with the opportunity to demonstrate the Key Leadership Competencies, outlined in "Evaluation".',
          noteSection: {
            para1: "While completing the e-MIB, you will have access to:",
            bullet1: "The test instructions (the current document).",
            bullet2:
              "The background information describing your job as the manager and the fictitious organization where you work.",
            bullet3: "A Notepad to serve as scrap paper. The Notepad will not be evaluated."
          },
          aboutSection: {
            title: "About the sample test",
            para1:
              "The sample test has been designed to provide you with the opportunity to familiarize yourself with:",
            bullet1:
              "the components of the test (e.g., instructions, background information, email inbox, notepad);",
            bullet2: "the features of the test interface (e.g., menu bars, buttons); and",
            bullet3: "examples of emails.",
            para2:
              "The background information, which includes a description of the organisation, your role, your employees, colleagues and management team, as well as the emails presented are examples. They are not intended to reflect the length nor the level of difficulty of the real test. The background information and the number of emails presented are more extensive in the real test."
          }
        },
        tipsOnTest: {
          title: "Tips on taking the e-MIB",
          description:
            'The e-MIB presents you with situations that will give you the opportunity to demonstrate the Key Leadership Competencies, outlined in "Evaluation". Here are some tips that will help you provide assessors with the information they need to evaluate your performance on those competencies:',
          bullet1:
            "Answer all the questions asked in the emails you receive. This will ensure that you have used all the opportunities designed to allow you to demonstrate the competencies.",
          bullet2:
            "Provide initial thoughts and recommendations supported by your rationale where appropriate. You can then note other information you would need to reach a final decision.",
          bullet3:
            "Use only the information provided in the emails and the background information. Do not make any inferences based on the culture of your own organization. Avoid making assumptions that are not reasonably supported by either the background information or the emails.",
          bullet4: "You can answer the emails in any order you want.",
          bullet5: "You are responsible for managing your own time."
        },
        testInstructions: {
          title: "Test instructions",
          para1:
            "First, read the background information which describes your position and the fictitious organization in which you work. Then proceed to the inbox where you can read the emails you received and take actions to respond to them as though you were a manager within the fictitious organization.",
          step1Section: {
            title: "Step 1 - Responding to emails",
            description:
              "You can respond to the emails you receive in two ways: by sending an email or by adding tasks to your task list. A description of both methods of responding is presented below, followed by examples.",
            part1: {
              title: "1. Sending an email",
              para1:
                "You can send an email in response to one you received in your inbox. The written responses should reflect how you would respond as a manager.",
              para2:
                "You can send an email using the following options: reply, reply all, forward, or write a new email. If you choose to write a new email, you will have access to a directory with all of your contacts. You can write as many emails as you like in response to an email you received."
            },
            part2: {
              title: "2. Adding a task to the task list",
              para1:
                "In addition to, or instead of, responding to an email you can add a task to the task list. A task is an action that you intend to take to address a situation presented in the emails. Example tasks could include planning a meeting or asking a colleague for information. You should provide enough information in your task description to ensure it is clear which situation you are addressing. You should also specify what actions you plan to take, and with whom. You can add, delete, or edit tasks on the task list."
            },
            part3: {
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
            title: "Step 2 - Adding Reasons for Action (optional)",
            description:
              "After sending an email or adding a task, you will be able to provide a justification in the “Reasons for Action” section. Here, you can explain why you took a specific action in response to a situation if you feel the need to provide additional information. Filling out the Reasons for Action section is optional. Note that you may decide to add Reasons for Action when responding to some emails and not others. This also applies for tasks in the task list. In addition, if you add Reasons for Action, you may choose to clarify only certain actions while others may not require additional explanations."
          }
        },
        testExamples: {
          title: "Test examples",
          para1: "Example of an email and ways of responding",
          part1Title: "Original email",
          part1Description:
            "Two options are provided below to demonstrate different methods of responding to the email. As previously mentioned, you can choose one of the two options presented or a combination of the two. Note that the responses provided were not evaluated for how well they demonstrate the competency targeted in the email. They are presented here only to illustrate how to use each of the two ways of responding.",
          part2Title: "Option 1 – Sending an email with Reasons for Action",
          part3Title: "Option 2 – Adding tasks to task list with Reasons for Action"
        },
        evaluation: {
          title: "Evaluation",
          bullet1:
            "You will be scored on the responses contained in your emails, task list and Reasons for Action. Information left in your Notepad will not be evaluated.",
          bullet2:
            "Both the actions you take and the explanations you give will be considered when evaluating your performance on each of the Key Leadership Competencies (described below). You will be assessed on the extent to which your actions demonstrate the ",
          bullet2Link: "Key Leadership Competencies",
          bullet3:
            "Your actions will be rated on effectiveness. Effectiveness is measured by whether your actions would have a positive or a negative impact in resolving the situations presented, and how widespread that impact would be.",
          bullet4:
            "Your responses will also be evaluated for how well they meet the organizational objectives presented in the background information.",
          bullet5:
            "You will not be scored on your writing. No points will be deducted for spelling, grammar, punctuation errors or for incomplete sentences. However, your writing will need to be clear enough to ensure that the assessors understand which situation you are responding to and your main points.",
          keyLeadershipCompetenciesSection: {
            title: "Key Leadership Competencies",
            para1Title: "Create Vision and Strategy: ",
            para1:
              "Managers help to define the future and chart a path forward. To do so, they take into account context. They leverage their knowledge and seek and integrate information from diverse sources to implement concrete activities. They consider different perspectives and consult as needed. Managers balance organizational priorities and improve outcomes.",
            para2Title: "Mobilize People: ",
            para2:
              "Managers inspire and motivate the people they lead. They manage their employee’s performance, provide constructive and respectful feedback to encourage and enable performance excellence. They lead by example, setting goals for themselves that are more demanding than those that they set for others.",
            para3Title: "Uphold Integrity and Respect: ",
            para3:
              "Managers exemplify ethical practices, professionalism and personal integrity, acting in the interest of Canada and Canadians. They create respectful, inclusive and trusting work environments where sound advice is valued. They encourage the expression of diverse opinions and perspectives, while fostering collegiality.",
            para4Title: "Collaborate with Partners and Stakeholders: ",
            para4:
              "Managers are deliberate and resourceful about seeking a wide spectrum of perspectives. In building partnerships, they manage expectations and aim to reach consensus. They demonstrate openness and flexibility to improve outcomes and bring a whole-of-organization perspective to their interactions. Managers acknowledge the role of partners in achieving outcomes.",
            para5Title: "Promote Innovation and Guide Change: ",
            para5:
              "Managers create an environment that supports bold thinking, experimentation and intelligent risk taking. When implementing change, managers maintain momentum, address resistance and anticipate consequences. They use setbacks as a valuable source of insight and learning.",
            para6Title: "Achieve Results: ",
            para6:
              "Managers ensure that they meet team objectives by managing resources. They anticipate, plan, monitor progress and adjust as needed. They demonstrate awareness of the context when making decisions. Managers take personal responsibility for their actions and outcomes of their decisions."
          }
        }
      },

      //Background Page
      background: {
        backgroundInformation: {
          title: "Background Information",
          paragraph1:
            "In this exercise, you are assuming the role of Claude Huard, the new manager of the Quality Assurance (QA) team. You are replacing Gary Severna, who recently retired. Your team is a part of the Services and Communications (SC) unit of a public service organisation called the Organizational Development Council (ODC). It is now 9:30 a.m. on Monday, November 7th.",
          paragraph2:
            "In the following sections, you will find information about ODC and the QA Team. You will be able to access it throughout the test."
        },
        organizationalInformation: {
          title: "Information about the Organizational Development Council (ODC)",
          description:
            "The ODC is an independent government agency that promotes organizational development across the public service. The ODC’s mandate is to provide training to all public service employees to maintain a productive and commendable workforce. The organization is responsible for: (1) the creation and evaluation of training programs; (2) research and innovation in learning, transfer of training, and technology; and (3) conducting audits on workplace behaviors in adherence to the ethical and professional standards of public service. With its headquarters located in the National Capital Region, the ODC currently employs approximately 100 individuals.",
          prioritiesSection: {
            title: "Priorities",
            bullet1:
              "To ensure that the organization continues to enhance productive workplace behaviors through policies of ethical and professional conduct.",
            bullet2:
              "To continuously evaluate the effectiveness and utility of training programs across the public service.",
            bullet3:
              "To deliver high-quality training programs across the public service, supporting the Government of Canada’s priorities.",
            bullet4: "To manage the documentation and communication of client training activities."
          },
          risksSection: {
            title: "Risks",
            bullet1:
              "The scope and complexity of training programs pose ongoing challenges for (1) their timely delivery and effectiveness in responding to new and emerging policy priorities; (2) maintaining partnerships that are essential for high-quality training program development, delivery, and evaluation; (3) keeping pace with the evolving demands of clients and with new learning technology."
          }
        },
        organizationalStructure: {
          title: "Organizational Structure",
          description:
            "The ODC has an organizational structure consisting of four units including: Corporate Affairs, Research and Innovations, Training Program Development, and Services and Communications.",
          para1Title: "Corporate affairs (CA). ",
          para1:
            "The CA unit is comprised of the Human Resources Team, the Finance Team and the Information Technology Team. Together these teams are responsible for the management of the workforce, the work environment, the finances, as well as the technology and information in ODC.",
          para2Title: "Research and innovations (RI). ",
          para2:
            "The main goals of the RI unit are to conduct research initiatives in learning, transfer of training, and technology and to help develop innovative teaching techniques that promote employee productivity and general well-being. ",
          para3Title: "Program development (PD).  ",
          para3:
            "The focus of the PD unit is to plan, develop and administer training programs across the public service. To do so, the unit establishes and maintains relationships with clients and partners, and conducts analyses of their organizational development training needs.",
          para4Title: "Services and communications (SC). ",
          para4:
            "The main goals of the SC unit are to continuously evaluate training programs offered by organizations in the public service, conduct internal and external audits for partners and clients, and oversee the dissemination of information (e.g., content review for online tools, developing documentation for training programs). The SC unit is comprised of the Quality Assurance Team, the Service and support Team, the Audits Team, and the E-Training Team.",
          orgChart: {
            desciption: "Organizational Chart (ODC)",
            link: "Image Description"
          },
          dialog: {
            title: "The Organizational Chart of the ODC",
            description:
              "This is the organizational chart for the Organizational Development Council (ODC). At the top is the President: Jenna Icart. Under the president are 4 directors, one representing each unit of the council. These are presented left to right as: Amari Kinsler from Corporate Affairs, Geneviève Bédard from Research and Innovations, Bartosz Greco from Program Development, Nancy Ward from Services and Communications.  Corporate Affairs has 3 managers: Marc Sheridan from Human Resources, Bob McNutt from Finance, and Lana Hussad from Information Technology. Services and Communications has 4 managers: You are Claude Huard from Quality Assurance, Haydar Kalil from Services and Support, Geoffrey Hamma from Audits, and Lucy Trang from E-Training."
          }
        },
        teamInformation: {
          title: "Information about the Quality Assurance (QA) Team",
          teamMembersSection: {
            title: "Team Members",
            para1Title: "Director: Nancy Ward",
            para1:
              "Your Director is Nancy Ward. The director of the Services and Communications unit applies policies and oversees the creation, delivery, and evaluation of training programs and audits. The director is also responsible for overseeing all internal and external communication channels including web content.",
            para2Title: "Manager: Claude Huard (you)",
            para2:
              "Your role as manager of the Quality Assurance Team is to oversee the content review and make final recommendations for training manuals, specifications, and other related training documents. The role also involves making staffing recommendations, managing the performance of team members, as well as coordinating the sharing of information and expertise with partners and stakeholders. The manager is also responsible for ensuring compliance to policy and professional standards and for delivering executive reports that include project updates, timelines, and budgetary implications.",
            para3Title: "Quality Assurance Analysts",
            para3:
              "The members of your team are Danny McBride, Serge Duplessis, Marina Richter, Mary Woodside, Charlie Wang, and Jack Laurier. All team members are Quality Assurance Analysts and, as such, are experts in documentation and make recommendations on training documents and online content."
          },
          teamChart: {
            desciption: "Organizational Chart The Quality Assurance (QA) Team",
            link: "Image Description"
          },
          dialog: {
            title: "The Organizational Chart of the QA Team",
            description:
              "This is the organizational chart for the Quality Assurance (QA) Team at the Organizational Development Council. You, Claude Huard are the Manager of this unit, and are located at the top of the organizational chart. Under you, The Manager, are 6 Quality Assurance Analysts: Danny McBride, Serge Duplessis, Marina Richter, Mary Woodside, Charlie Wang, and Jack Laurier."
          },
          responsibilitiesSection: {
            title: "QA Team Responsibilities",
            listDescription: "The Quality Assurance Team is responsible for:",
            item1Title: "Providing information management services. ",
            item1:
              "Responsibilities include ensuring that organizational development training programs across the public service are well documented. This priority includes synthesizing a large volume of information from various government organizations, ensuring adherence to information security policies, and providing appropriate accessibility to archived documents.",
            item2Title: "Reviewing online content. ",
            item2:
              "Responsibilities include reviewing a large volume of information regarding organizational training programs from various clients and partners, ensuring adherence to internal and external communications policies, and making recommendations to executives for final approval before information dissemination.",
            item3Title: "Reviewing training documentation. ",
            item3:
              "Responsibilities include ensuring the completeness and quality of content in all organizational development training- related documents. This priority includes reviewing training instructions, scoring manuals, training specifications, statistical reports, and other training-related materials.",
            para1Title: "New initiatives",
            para1:
              "You have been mandated to make a recommendation on the adoption of an “off-the- shelf” online request processing system. The proposed system, called Serv, provides features that would facilitate the management of client and partner requests for content review and documentation services. This includes enhanced categorization and tracking of pending requests, customizable forms applications, and various report generators. The Information Technology (IT) Team of the ODC recently facilitated a pilot test with Serv that included Danny McBride, who is a member of the Quality Assurance Team. Danny came back with positive feedback on his experience with the Serv system. Your team has been discussing the proposal to introduce this new technology in hopes of improving your services."
          }
        }
      },

      //Inbox Page
      inboxPage: {
        emailId: " email id# ",
        to: "To",
        from: "From",
        date: "Date",
        addReply: "Add email Response",
        addTask: "Create a task",
        replyTextPart1: "You responded with ",
        replyTextPart2: " emails and ",
        replyTextPart3: " tasks",
        emailResponse: {
          description: "For this response, you've chosen to:",
          to: "To:",
          cc: "Cc:",
          response: "Your response:",
          reasonsForAction: "Your reasons for action:",
          editButton: "Edit response",
          deleteButton: "Delete response"
        }
      },

      //Confirmation Page
      confirmationPage: {
        submissionConfirmed: "Submission Confirmed"
      },

      //Test tabs
      tabs: {
        instructionsTabTitle: "Instructions",
        backgroundTabTitle: "Background",
        inboxTabTitle: "Inbox"
      },

      //Test Footer
      testFooter: {
        submitTestPopupBox: {
          title: "Confirm test submission?",
          warning: {
            title: "Warning! All draft items will not be saved.",
            message:
              "All draft emails and any notes in the notepad will not be submitted with the test for scoring. Review draft emails and the notepad before submitting the test."
          },
          description:
            "If you are ready to send your test in for scoring, click the “Submit test” button. You will be exited out of this test session and provided further instructions."
        },
        quitTestPopupBox: {
          title: "Are you sure you want to quit this test?",
          warning: {
            title: "Warning! Once you exit the test, you will not be able to get back in.",
            message:
              "You will not be able to recover your answers, and will be withdrawn from this test session. You may be retested at a later time."
          },
          descriptionPart1:
            "You are about to withdraw from this test. By proceeding, you acknowledge the following:",
          checkboxOne: "I voluntarily withdraw from this examination",
          checkboxTwo: "my test will not be scored",
          checkboxThree:
            "I am aware that the retest period for this test may apply, should I wish to write this test again",
          descriptionPart2:
            "If you are certain that you want to quit this session, click the “Quit test” button. You will be exited out of this test session and provided instructions to complete your withdrawal.",
          descriptionPart3: "Are you sure you want to quit this test?"
        }
      },
      emails: {
        email1: {
          id: "0",
          visibleID: "1",
          to: "Claude Huard (Manager, Quality Assurance Team)",
          from: "Serge Duplessis (Quality Control Analyst, Quality Assurance Team)",
          subject: "Bad experience with Serv",
          date: "Thursday, November 3",
          body:
            "Hello Claude,\n\nAs you are settling into this position, I was hoping to share with you some of my thoughts about the proposed changes to our service requests and documentation practices.\n\nI have been working on the Quality Assurance team for over 12 years. I feel that, overall, we are quite successful in understanding and processing service requests. Switching to an automated, computerized system would take a very long time to adapt to and could jeopardize the quality of our service. For example, having a face-to-face or telephone conversation with a client can help us better understand the client’s issues in more depth because it allows us to ask probing questions and receive important information related to each case. By buying into this new technology, we risk having more IT problems and unexpected delays in the long-run.\n\nI have voiced my opinion in previous meetings but I do not feel that my opinions matter. Everyone else has been on the team for less than two years and I feel ignored because I’m the oldest member on the team. I urge you to consider my opinion so that we do not make a costly mistake.\n\nSerge"
        },
        email2: {
          id: "1",
          visibleID: "2",
          to: "Claude Huard (Manager, Quality Assurance Team)",
          from: "Marina Richter (Quality Control Analyst, Quality Assurance Team)",
          subject: "Informal Training on Serv",
          date: "Friday, November 4",
          body:
            "Hello Claude,\nDuring our last meeting, Danny had mentioned that he learned a lot about the Serv system during the pilot testing exercise with the IT unit.  While talking to other team members, some mentioned they were trained on and worked with an older version of Serv in previous jobs. However, there are a few of us who have never used it. I would like to know if there would be opportunities to be trained on Serv?\nMarina"
        },
        email3: {
          id: "2",
          visibleID: "3",
          to: "Claude Huard (Manager, Quality Assurance Team)",
          from: "Charlie Wang (Quality Control Analyst, Quality Assurance Team)",
          subject: "Report deadline",
          date: "Friday, November ",
          body:
            "Hello Claude,\nI am working with Clara Farewell from the Research and Innovations unit on evaluating the quality of a training approach and I am having a hard time getting a hold of her. I am starting to be concerned because I have been waiting on her part of the work to complete the evaluation report.\nFor the past three weeks, we had scheduled working meetings on Friday afternoons and although she did cancel the first one, she was absent the past two, without notice. She did not answer my attempts to contact her by phone or email. I am worried that I will not be able to complete the report by the end of next Friday without her content.\nOn another note, I was told by one of my colleagues from the Program Development unit that his director, Bartosz Greco, would invite employees from other units to help them develop a new training program. They want to take a multiple perspectives approach. I’m very much interested in participating in this process. As usual, manager permission is required for participation. I am wondering what you think?\nThank you,\nCharlie"
        },
        email4: {
          id: "3",
          visibleID: "4",
          to: "To 4",
          from: "From 4",
          subject: "Subject 4",
          date: "Date 4",
          body: "Body 4"
        },
        email5: {
          id: "4",
          visibleID: "5",
          to: "To 5",
          from: "From 5",
          subject: "Subject 5",
          date: "Date 5",
          body: "Body 5"
        },
        email6: {
          id: "5",
          visibleID: "6",
          to: "To 6",
          from: "From 6",
          subject: "Subject 6",
          date: "Date 6",
          body: "Body 6"
        },
        email7: {
          id: "6",
          visibleID: "7",
          to: "To 7",
          from: "From 7",
          subject: "Subject 7",
          date: "Date 7",
          body: "Body 7"
        },
        email8: {
          id: "7",
          visibleID: "8",
          to: "To 8",
          from: "From 8",
          subject: "Subject 8",
          date: "Date 8",
          body: "Body 8"
        },
        email9: {
          id: "8",
          visibleID: "9",
          to: "To 9",
          from: "From 9",
          subject: "Subject 9",
          date: "Date 9",
          body: "Body 9"
        },
        email10: {
          id: "9",
          visibleID: "10",
          to: "To 10",
          from: "From 10",
          subject: "Subject 10",
          date: "Date 10",
          body: "Body 10"
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
      authenticationMenu: "Authentication Menu"
    },

    //Commons
    commons: {
      psc: "Public Service Commission",
      nextButton: "Next",
      backButton: "Back",
      startTest: "Start test",
      submitTestButton: "Submit test",
      quitTest: "Quit Test",
      returnToTest: "Return to Test",
      passStatus: "Pass",
      failStatus: "Fail",
      enabled: "Enabled",
      disabled: "Disabled",
      backToTop: "Back to top",
      notepad: {
        title: "notepad",
        placeholder: "Put your notes here...",
        hideButton: "hide",
        openButton: "open notes"
      },
      cancel: "Cancel",
      close: "Close"
    }
  },

  fr: {
    //Main Tabs
    mainTabs: {
      homeTabTitle: "Accueil",
      prototypeTabTitle: "Prototype",
      statusTabTitle: "Statut"
    },

    //authentication
    authentication: {
      login: {
        title: "SE CONNECTER",
        content: {
          title: "Connexion",
          description:
            "FR An account is required to proceed further. To log in, enter your credentials below.",
          inputs: {
            emailTitle: "Adresse courriel :",
            emailPlaceholder: "john.smith@outlook.ca",
            passwordTitle: "Mot de passe :",
            passwordPlaceholder: "Mot de passe"
          }
        },
        button: "Connexion"
      },
      createAccount: {
        title: "CRÉER UN COMPTE",
        content: {
          title: "Créer un compte",
          description:
            "FR An account is required to proceed further. To create an account, fill out the following.",
          inputs: {
            firstNameTitle: "Prénom :",
            firstNamePlaceholder: "John",
            lastNameTitle: "Nom de famille :",
            lastNamePlaceholder: "Smith",
            emailTitle: "Adresse courriel :",
            emailPlaceholder: "john.smith@outlook.ca",
            passwordTitle: "Mot de passe (doit contenir entre 5-15 caractères) :",
            passwordPlaceholder: "Mot de passe",
            passwordErrors: {
              description: "Votre mot de passe doit satisfaire les critères suivants :",
              upperCase: "Au moins une majuscule",
              lowerCase: "Au moins une minuscule",
              digit: "Au moins un chiffre",
              specialCharacter: "Au moins un caractère spécial",
              length: "Au moins 5 caractères et maximum 15"
            },
            passwordConfirmationTitle: "Confirmer le mot de passe :",
            passwordConfirmationPlaceholder: "Mot de passe",
            passwordConfirmationError: "Doit correspondre au mot de passe"
          }
        },
        button: "Créer compte"
      }
    },

    //Home Page
    homePage: {
      title:
        "Outil d'évaluation des compétences de la Commission de la fonction publique du Canada",
      welcomeMsg: "Bienvenue dans l'outil d'évaluation des compétences.",
      description:
        "FR Code for Canada and PSC are working on this tool to help assess managerial canadiates for the federal public service. It is in the alpha phase which means it is currently going through product testing and is subject to change."
    },

    //Prototype Page
    prototypePage: {
      title: "Prototype",
      welcomeMsg: "Cette page sera utilisée pour tester des interfaces utilisateur expérimentales.",
      startEmibSampleTest: "Démarrer le test pratique eMIB"
    },

    //Status Page
    statusPage: {
      title: "Statut de OEC",
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

    //eMIB Test
    emibTest: {
      //Home Page
      homePage: {
        testTitle: "La BRG-e",
        welcomeMsg: "Bienvenu dans le test pratique de eMIB"
      },

      //HowTo Page
      howToPage: {
        title: "Page 'How To'",
        emailInstructions: "Instructions pour les courriel",
        taskInstructions: "Instuctions pour les tâches",
        overview: {
          title: "Aperçu général",
          description:
            "La boîte de réception pour la gestion électronique (BRG-e) simule d’une boîte de courriel dans laquelle vous allez répondre à des courriels décrivant des situations qui sont typiquement vécues par les gestionnaires de la fonction publique. Ces situations vous donneront l’occasion de démontrer les compétences clés en leadership, décrit dans «Évaluation».",
          noteSection: {
            para1: "En complétant la BRG-e, vous aurez accès :",
            bullet1: "Aux directives du test (le présent document).",
            bullet2:
              "À de l’information contextuelle décrivant votre rôle en tant que gestionnaire et l’organisation fictive où vous travaillez.",
            bullet3:
              "À un bloc-notes pouvant servir de papier brouillon. Le contenu du bloc-notes ne sera pas évalué."
          },
          aboutSection: {
            title: "À propos de l’échantillon de test",
            para1:
              "Cet échantillon de test a été conçu pour vous donner l’occasion de vous familiariser avec :",
            bullet1:
              "les volets du test (p. ex., instructions, information contextuelle, boîte de réception de courriel, bloc-notes) ;",
            bullet2:
              "les fonctionnalités de l’interface du test (p. ex., barres de menu, boutons) ; et",
            bullet3: "des exemples de courriels.",
            para2:
              "L’information contextuelle, laquelle inclut une description de l’organisation, de votre rôle de vos employées, de vos collègues et de l’équipe de gestion ainsi que les courriels auxquels vous devez répondre sont présentés à titre d’exemples. Ils ne sont pas destinés à refléter la longueur ou le niveau de difficulté du test réel. L’information contextuelle et le nombre de courriels présentés sont plus vastes dans le test réel."
          }
        },
        tipsOnTest: {
          title: "Conseils pour répondre à la BRG-e",
          description:
            "La BRG-e vous présente des situations qui vous donneront l’occasion de démontrer les compétences clés en matière de leadership, décrit dans «Évaluation». Voici quelques conseils qui vous aideront à fournir aux évaluateurs l’information dont ils ont besoin pour évaluer votre rendement par rapport à ces compétences :",
          bullet1:
            "Répondez à toutes les questions posées dans les courriels que vous recevez. Vous profiterez ainsi de toutes les occasions de démontrer les compétences recherchées.",
          bullet2:
            "Présentez vos recommandations et réflexions préliminaires accompagnées d’une justification, s’il y a lieu. Vous pouvez ensuite noter les autres renseignements dont vous auriez besoin pour en arriver à une décision.",
          bullet3:
            "Utilisez uniquement l’information fournie dans les courriels et les informations contextuelles. Ne tirez aucune conclusion fondée sur la culture de votre propre organisation. Évitez de faire des suppositions qui ne sont pas raisonnablement corroborées par l’information contextuelle ou les courriels.",
          bullet4: "Vous pouvez répondre aux courriels dans l’ordre que vous désirez.",
          bullet5: "Vous êtes responsable de la gestion de votre temps."
        },
        testInstructions: {
          title: "Instructions du test",
          para1:
            "Dans un premier temps, lisez l’information contextuelle, laquelle décrit votre poste et l’organisation fictive dans laquelle vous travaillez. Ensuite, passez à la boîte de réception pour lire les courriels que vous avez reçus et prendre des dispositions pour répondre à ces courriels comme si vous étiez un gestionnaire dans cette organisation fictive.",
          step1Section: {
            title: "Étape 1 — Répondre aux courriels",
            description:
              "Vous pouvez répondre aux courriels que vous avez reçus de deux façons : en envoyant un courriel ou en ajoutant une tâche à votre liste de tâches. Les deux méthodes de réponse sont décrites ci-dessous, suivies d’exemples.",
            part1: {
              title: "1. Envoyer un courriel",
              para1:
                "Vous pouvez envoyer un courriel pour répondre à celui que vous avez reçu dans votre boîte de réception. Vos réponses écrites devraient représenter ce que vous feriez en tant que gestionnaire.",
              para2:
                "Vous pouvez envoyer un courriel en utilisant les fonctions suivantes : répondre, répondre à tous, transférer ou rédiger un nouveau courriel. Si vous choisissez de rédiger un nouveau courriel, vous aurez accès à un répertoire de noms et d’adresses de courriel. Vous pouvez écrire autant de courriels que vous le souhaitez pour répondre à un courriel que vous avez reçu."
            },
            part2: {
              title: "2. Ajouter une tâche à la liste de tâches",
              para1:
                "En plus de répondre à un courriel, ou au lieu d’y répondre, vous pouvez ajouter des tâches à la liste de tâches. Une tâche représente une mesure que vous comptez prendre pour gérer une situation présentée dans les courriels. Voici des exemples de tâches : planifier une rencontre ou communiquer avec un collègue afin d’obtenir de l’information. Assurez-vous de fournir suffisamment d’information dans votre description de la tâche pour que nous sachions à quelle situation vous répondez. Vous devez également préciser quelles mesures vous envisagez prendre et qui devra participer à cette tâche. Vous pouvez ajouter, supprimer ou modifier vos tâches dans la liste des tâches."
            },
            part3: {
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
          }
        },
        testExamples: {
          title: "FR Test examples",
          para1: "Exemple de courriel et façons de répondre",
          part1Title: "Courriel original",
          part1Description:
            "Vous trouverez ci-dessous deux façons différentes de répondre au courriel. Comme il est mentionné précédemment, vous pouvez choisir l’une ou l’autre des deux options présentées ou combiner les deux. Veuillez noter que les réponses fournies n’ont pas été évaluées pour déterminer la mesure dans laquelle elles démontrent la compétence ciblée dans le courriel. Elles sont présentées ici uniquement pour illustrer comment utiliser chacune des deux façons de répondre.",
          part2Title:
            "Option 1 – Envoyer un courriel renfermant une justification des mesures prises",
          part3Title:
            "Option 2 – Ajouter des tâches à la liste de tâches et l’accompagner d’une justification des mesures prises"
        },
        evaluation: {
          title: "Évaluation",
          bullet1:
            "Vous serez évalués en fonction des réponses aux courriels, des tâches et des justifications des mesures prises. Le contenu du bloc-notes ne sera pas évalué.",
          bullet2:
            "Les mesures que vous prenez et les explications que vous donnez seront prises en compte dans l’évaluation de votre rendement pour chacune des compétences clés en leadership (décrites ci-dessous). Vous serez évalué sur la façon dont les mesures que vous avez prises démontrent les ",
          bullet2Link: "compétences clés en leadership",
          bullet3:
            "Les mesures que vous avez prises seront évaluées quant à leur efficacité. Le niveau d’efficacité d’une mesure prise est déterminé par l’effet, positif ou négatif, que cette mesure aura sur la résolution des situations présentées dans les courriels de même que par l’étendue de cet effet.",
          bullet4:
            "Vos réponses seront également évaluées en fonction de leur contribution à l’atteinte des objectifs organisationnels, lesquels sont présentés dans l’information contextuelle.",
          bullet5:
            "Vous ne serez pas évalué sur votre rédaction. Aucun point ne sera enlevé pour les fautes d’orthographe, de grammaire, de ponctuation ou pour les phrases incomplètes. Votre rédaction devra toutefois être suffisamment claire pour que les évaluateurs comprennent la situation que vous traitez et vos principaux arguments.",
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
        backgroundInformation: {
          title: "Contexte",
          paragraph1:
            "Dans cet exercice, vous jouez le rôle de Claude Huard, le nouveau gestionnaire de l’Équipe de l’assurance de la qualité (AQ). Vous remplacez Gary Severna, qui a récemment pris sa retraite. Votre équipe fait partie de l’Unité des services et communications (SC) d’un organisme de la fonction publique appelé Conseil du développement organisationnel (CDO). Il est 9 h 30 le lundi 7 novembre.",
          paragraph2:
            "Dans les sections suivantes, vous trouverez de l’information sur le CDO et l’Équipe d’AQ. Vous serez en mesure d’y accéder tout au long du test."
        },
        organizationalInformation: {
          title: "Renseignements sur le Conseil du Développement Organisationnel  (CDO)",
          description:
            "Le CDO est un organisme gouvernemental indépendant qui œuvre à la promotion du développement organisationnel au sein de la fonction publique. Le mandat du CDO est d’offrir de la formation à tous les employés de la fonction publique afin de maintenir une main-d’œuvre productive et digne d’éloges. L’organisme est responsable de : (1) la création et l’évaluation des programmes de formation; (2) la recherche et l’innovation dans les domaines de l’apprentissage, du transfert de formation et de la technologie; (3) la réalisation de vérifications en matière de comportements en milieu de travail, conformément aux normes d’éthique et de conduite professionnelle de la fonction publique. Le CDO, dont l’administration centrale est située dans la région de la capitale nationale, compte actuellement environ 100 employés.",
          prioritiesSection: {
            title: "Priorités",
            bullet1:
              "Veiller à ce que l’organisme continue d’améliorer les comportements productifs au travail par la mise en place de politiques en matière de comportement éthique et professionnel.",
            bullet2:
              "Évaluer de façon continue l’efficacité et l’utilité des programmes de formation au sein de la fonction publique.",
            bullet3:
              "Offrir à l’échelle de la fonction publique des programmes de qualité supérieure qui appuient les priorités du gouvernement du Canada.",
            bullet4:
              "Gérer la documentation et la communication des activités de formation des clients."
          },
          risksSection: {
            title: "Risques",
            bullet1:
              "La portée et la complexité des programmes de formation posent des défis continuels quant à : (1) leur livraison dans les délais prévus et leur efficacité à répondre aux priorités stratégiques nouvelles ou émergentes; (2) le maintien de partenariats essentiels à l’élaboration, à la livraison et à l’évaluation de programmes de formation de haute qualité; (3) la capacité de suivre le rythme des demandes changeantes des clients et la nouvelle technologie d’apprentissage."
          }
        },
        organizationalStructure: {
          title: "Structure organisationnelle",
          description:
            "Le CDO a une structure organisationnelle qui comporte les quatre unités suivantes : Affaires ministérielles, Recherche et innovations, Développement de programmes, et Services et communications.",
          para1Title: "Affaires ministérielles (AM) ",
          para1:
            "L’Unité des AM est composée de l’Équipe des ressources humaines, l’Équipe des finances et l’Équipe de la technologie de l’information. Ensemble, ces équipes sont responsables de la gestion de la main-d’œuvre, de l’environnement de travail, des finances, ainsi que de la technologie et de l’information à l’intérieur du CDO.",
          para2Title: "Recherche et innovations (RI). ",
          para2:
            "Les principaux objectifs de l’Unité de RI sont de mener des initiatives de recherche en apprentissage, en transfert de formation et en technologie; et de contribuer à l’élaboration de techniques d’enseignement novatrices, afin de promouvoir la productivité et le bien-être général des employés.",
          para3Title: "Développement de programmes (DP). ",
          para3:
            "L’Unité du DP vise à planifier, à créer et à administrer les programmes de formation au sein de la fonction publique. Pour ce faire, l’unité établit et entretient des relations avec les clients et les partenaires, et analyse  leurs besoins de formation en développement organisationnel.",
          para4Title: "Services et communications (SC). ",
          para4:
            "Les principaux objectifs de l’Unité des SC sont d’évaluer de façon continue les programmes de formation offerts par les organisations de la fonction publique, effectuer des vérifications internes et externes pour les partenaires et les clients, et surveiller la diffusion de l’information (p. ex., évaluer le contenu des outils en ligne, rédiger les documents relatifs aux programmes de formation). L’Unité des SC est composée de l’Équipe de l’assurance de la qualité, l’Équipe du service et soutien, l’Équipe des vérifications et de l’Équipe des formations en ligne.",
          orgChart: {
            desciption: "Organigramme (CDO)",
            link: "Description de l'image"
          },
          dialog: {
            title: "FR The Organizational Chart of the ODC",
            description:
              "FR This is the organizational chart for the Organizational Development Council (ODC). At the top is the President: Jenna Icart. Under the president are 4 directors, one representing each unit of the council. These are presented left to right as: Amari Kinsler from Corporate Affairs, Geneviève Bédard from Research and Innovations, Bartosz Greco from Program Development, Nancy Ward from Services and Communications.  Corporate Affairs has 3 managers: Marc Sheridan from Human Resources, Bob McNutt from Finance, and Lana Hussad from Information Technology. Services and Communications has 4 managers: You are Claude Huard from Quality Assurance, Haydar Kalil from Services and Support, Geoffrey Hamma from Audits, and Lucy Trang from E-Training."
          }
        },
        teamInformation: {
          title: "Information sur l’Équipe de l’assurance de la qualité (AQ)",
          teamMembersSection: {
            title: "Membres de l’équipe",
            para1Title: "Directrice : Nancy Ward",
            para1:
              "Votre directrice est Nancy Ward. La directrice de l’Unité des services et communications veille à l’application des politiques et supervise la création, l’exécution et l’évaluation des programmes de formation ainsi que les vérifications. Elle a également la responsabilité de superviser tous les canaux de communication internes et externes, y compris le contenu Web en ligne.",
            para2Title: "Gestionnaire : Claude Huard (vous)",
            para2:
              "Votre rôle en tant que gestionnaire de l’Équipe de l’assurance de la qualité est de superviser la révision de contenu et de formuler des recommandations finales au sujet des manuels de formation, des spécifications de formation et d’autres documents de formation connexes. Votre rôle consiste également à formuler des recommandations en matière de dotation, gérer le rendement des membres de l’équipe ainsi que coordonner l’échange d’information et d’expertise avec les partenaires et les intervenants. Le gestionnaire est également responsable d’assurer la conformité à la politique et aux normes professionnelles et de présenter aux cadres des rapports, lesquels comprennent des mises à jour, des échéanciers et les incidences budgétaires des projets.",
            para3Title: "Analystes de l’assurance de la qualité",
            para3:
              "Les membres de votre équipe sont Danny McBride, Serge Duplessis, Marina Richter, Mary Woodside, Charlie Wang et Jack Laurier. Tous les membres de l’équipe sont des analystes de l’assurance de la qualité et, par conséquent, des experts en documentation qui formulent des recommandations sur les documents de formation et le contenu en ligne."
          },
          teamChart: {
            desciption: "Organigramme Équipe de l'assurance de la qualité (AQ) Team",
            link: "Description de l'image"
          },
          dialog: {
            title: "FR The Organizational Chart of the QA Team",
            description:
              "FR This is the organizational chart for the Quality Assurance (QA) Team at the Organizational Development Council. You, Claude Huard are the Manager of this unit, and are located at the top of the organizational chart. Under you, The Manager, are 6 Quality Assurance Analysts: Danny McBride, Serge Duplessis, Marina Richter, Mary Woodside, Charlie Wang, and Jack Laurier."
          },
          responsibilitiesSection: {
            title: "Responsabilités de l’Équipe de l’AQ",
            listDescription:
              "L’Équipe de l’assurance de la qualité doit s’acquitter de ce qui suit :",
            item1Title: "Fournir des services de gestion de l’information. ",
            item1:
              "L’équipe doit veiller à ce que les programmes en développement organisationnel au sein de la fonction publique soient bien documentés. Cette priorité comprend : synthétiser un grand volume de renseignements provenant de divers organismes gouvernementaux, s’assurer que les politiques sur la sécurité de l’information sont respectées et donner un accès approprié aux documents archivés.",
            item2Title: "Examiner le contenu en ligne. ",
            item2:
              "Les responsabilités de l’équipe comprennent les suivantes : Examiner un grand volume d’information sur les programmes de formation organisationnels de divers clients et partenaires, s’assurer que les politiques sur les communications internes et les communications externes sont respectées et formuler des recommandations aux cadres supérieurs aux fins d’approbation définitive avant la diffusion de l’information.",
            item3Title: "Examiner les documents de formation. ",
            item3:
              "L’équipe doit s’assurer de l’intégralité et de la qualité du contenu de tous les documents liés à la formation en développement organisationnel. Cette priorité inclut l’examen des instructions de formation, des guides de correction, des spécifications de la formation, des rapports statistiques et d’autres documents de formation connexes.",
            para1Title: "Nouvelles initiatives",
            para1:
              "Vous avez reçu le mandat de formuler une recommandation au sujet de l’adoption d’un système commercial de traitement des demandes en ligne. Le système proposé, appelé Serv, offre des fonctionnalités qui faciliteraient la gestion des demandes des clients et des partenaires qui cherchent à obtenir des services de révision du contenu et de gestion de la documentation. Cela inclut l’amélioration du processus de catégorisation et de suivi des demandes en attente, la personnalisation des formulaires de demande et divers générateurs de rapports. L’Équipe de la technologie de l’information (TI) du CDO a récemment fait un essai pilote de Serv auquel a participé Danny McBride, un des membres de l’Équipe de l’assurance de la qualité. Danny a donné des commentaires positifs sur son expérience avec le système Serv. Votre équipe discute actuellement de la proposition visant à introduire cette nouvelle technologie afin d’améliorer vos services."
          }
        }
      },

      //Inbox Page
      inboxPage: {
        emailId: " courriel # ",
        to: "À",
        from: "Expéditeur",
        date: "Date",
        addReply: "FR Add email Response",
        addTask: "FR Create a task",
        replyTextPart1: "FR You responded with ",
        replyTextPart2: " FR emails and ",
        replyTextPart3: " FR tasks",
        emailResponse: {
          description: "FR For this response, you've chosen to:",
          to: "À :",
          cc: "Cc :",
          response: "FR Your response:",
          reasonsForAction: "FR Your reasons for action:",
          editButton: "Modifier réponse",
          deleteButton: "Supprimer résponse"
        }
      },

      //Confirmation Page
      confirmationPage: {
        submissionConfirmed: "Soumission Confirmée"
      },

      //Test tabs
      tabs: {
        instructionsTabTitle: "Instructions",
        backgroundTabTitle: "Contexte",
        inboxTabTitle: "Boîte de réception"
      },

      //Test Footer
      testFooter: {
        submitTestPopupBox: {
          title: "Confirmer l’envoi du test?",
          warning: {
            title: "Avertissement : aucun brouillon ne sera sauvegardé.",
            message:
              "Les ébauches de courriels et le contenu du bloc-notes ne seront pas envoyés avec le test pour la notation. Passez en revue les ébauches de courriels et le bloc-notes avant d’envoyer le test."
          },
          description:
            "Si vous êtes prêt(e) à envoyer votre test pour la notation, cliquez sur le bouton « Envoyer le test ». La séance de test sera fermée et vous recevrez d’autres instructions."
        },
        quitTestPopupBox: {
          title: "Souhaitez-vous mettre fin à cette séance de test?",
          warning: {
            title:
              "Avertissement : une fois la séance de test terminée, vous ne pourrez plus y retourner.",
            message:
              "Vous ne pourrez pas récupérer vos réponses et n’aurez plus accès à la séance de test. Vous pourrez reprendre le test à une date ultérieure."
          },
          descriptionPart1:
            "Vous êtes sur le point de mettre fin à la séance de test. Ce faisant, vous affirmez et reconnaissez :",
          checkboxOne: "je me retire volontairement de ce test;",
          checkboxTwo: "mon test ne sera pas noté;",
          checkboxThree:
            "je suis conscient(e) que la période d'attente pour ce test peut s’appliquer, si je veux écrire ce test de nouveau dans le futur.",
          descriptionPart2:
            "Si vous êtes certain(e) de vouloir mettre fin à cette séance, cliquez sur le bouton « Quitter la séance test ». La séance de test sera fermée et vous recevrez des instructions sur la façon de vous retirer.",
          descriptionPart3: "Souhaitez-vous mettre fin à cette séance de test?"
        }
      },
      emails: {
        email1: {
          id: "0",
          visibleID: "1",
          to: "Claude Huard (gestionnaire, Équipe de l’assurance de la qualité)",
          from:
            "Serge Duplessis (analyste de l’assurance de la qualité, Équipe de l’assurance de la qualité)",
          subject: "Mauvaise expérience avec Serv",
          date: "Le jeudi 3 novembre",
          body:
            "Bonjour Claude.Alors que vous vous familiarisez avec vos nouvelles fonctions, j’aimerais vous faire part de certaines de mes opinions concernant les changements que l’on propose d’apporter à notre système de demandes de services et à nos pratiques en matière de documentation.\n\nJe travaille au sein de l’Équipe de l’assurance de la qualité depuis plus de 12 ans. J’estime que, dans l’ensemble, nous avons bien réussi à comprendre et à traiter les demandes de service. Le passage à un système automatisé et informatisé prendrait beaucoup de temps avant qu’on s’y adapte et pourrait compromettre la qualité de notre service. Par exemple, une conversation en personne ou par téléphone avec un client peut nous aider à mieux comprendre ses problèmes, car cela nous permet de poser des questions d’approfondissement et d’obtenir des renseignements importants sur chaque cas. En adoptant cette nouvelle technologie, nous risquons d’avoir plus de problèmes de TI et des retards imprévus à long terme.\n\nJ’ai déjà exprimé mon opinion lors de réunions précédentes, mais je n’ai pas l’impression que mes opinions comptent. Tous les autres sont dans l’équipe depuis moins de deux ans et je me sens ignoré parce que je suis le plus âgé de l’équipe. Je vous encourage à tenir compte de mon opinion afin que nous ne commettions pas une erreur coûteuse. \n\nSerge"
        },
        email2: {
          id: "1",
          visibleID: "2",
          to: "Claude Huard (gestionnaire, Équipe de l’assurance de la qualité)",
          from:
            "Marina Richter (analyste de l’assurance de la qualité, Équipe de l’assurance de la qualité)",
          subject: "Formation informelle sur Serv",
          date: "Le vendredi 4 novembre",
          body:
            "Bonjour Claude.\nLors de notre dernière réunion, Danny a indiqué qu’il avait beaucoup appris sur le système Serv  pendant l’exercice d’essai pilote avec l’Équipe des TI. En discutant avec d’autres membres de notre équipe, certains ont mentionné qu’ils avaient reçu une formation avaient travaillé avec une ancienne version de Serv dans des emplois antérieurs. Cependant, certains d’entre nous ne l’ont jamais utilisée. J’aimerais savoir s’il y aurait des possibilités d’être formé sur Serv ?\nMarina"
        },
        email3: {
          id: "2",
          visibleID: "3",
          to: "Claude Huard (gestionnaire, Équipe de l’assurance de la qualité)",
          from:
            "Charlie Wang (analyste de l’assurance de la qualité, Équipe de l’assurance de la qualité)",
          subject: "Date limite de dépôt du rapport",
          date: "Le vendredi 4 novembre ",
          body:
            "Bonjour Claude.\nJe travaille avec Clara Farewell de l’Unité de recherche et innovations sur l’évaluation de la qualité d’une approche de formation et j’ai de la difficulté à la joindre. Je commence à m’inquiéter parce que j’attendais qu’elle termine sa partie du travail pour achever le rapport d’évaluation.\nAu cours des trois dernières semaines, nous avions prévu des rencontres de travail les vendredis après-midi et, après avoir annulé la première rencontre, elle était absente aux deux dernières, sans donner un préavis. Elle n’a pas non plus répondu à mes tentatives de communiquer avec elle par téléphone ou par courriel. Je m’inquiète de ne pas pouvoir terminer le rapport d’ici vendredi prochain sans sa part du travail.\nDans un autre ordre d’idées, un de mes collègues de l’Unité de développement des programmes m’a dit que son directeur, Bartosz Greco, inviterait des employés d’autres unités à les aider à créer un nouveau programme de formation. Ils veulent adopter une approche qui inclut des perspectives multiples. J’aimerais bien participer à ce processus. Comme d’habitude, la permission du gestionnaire est requise pour y participer. Je me demande ce que tu en penses.\nMerci,\nCharlie"
        },
        email4: {
          id: "3",
          visibleID: "4",
          to: "FR To 4",
          from: "FR From 4",
          subject: "FR Subject 4",
          date: "FR Date 4",
          body: "FR Body 4"
        },
        email5: {
          id: "4",
          visibleID: "5",
          to: "FR To 5",
          from: "FR From 5",
          subject: "FR Subject 5",
          date: "FR Date 5",
          body: "FR Body 5"
        },
        email6: {
          id: "5",
          visibleID: "6",
          to: "FR To 6",
          from: "FR From 6",
          subject: "FR Subject 6",
          date: "FR Date 6",
          body: "FR Body 6"
        },
        email7: {
          id: "6",
          visibleID: "7",
          to: "FR To 7",
          from: "FR From 7",
          subject: "FR Subject 7",
          date: "FR Date 7",
          body: "FR Body 7"
        },
        email8: {
          id: "7",
          visibleID: "8",
          to: "FR To 8",
          from: "FR From 8",
          subject: "FR Subject 8",
          date: "FR Date 8",
          body: "FR Body 8"
        },
        email9: {
          id: "8",
          visibleID: "9",
          to: "FR To 9",
          from: "FR From 9",
          subject: "FR Subject 9",
          date: "FR Date 9",
          body: "FR Body 9"
        },
        email10: {
          id: "9",
          visibleID: "10",
          to: "FR To 10",
          from: "FR From 10",
          subject: "FR Subject 10",
          date: "FR Date 10",
          body: "FR Body 10"
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
      authenticationMenu: "Menu d'authentification"
    },

    //Commons
    commons: {
      psc: "Commission de la fonction publique",
      nextButton: "Suivant",
      backButton: "Retour",
      startTest: "Commencer le test",
      submitTestButton: "Envoyer le test",
      quitTest: "Quitter la séance de test",
      returnToTest: "Retourner à la séance",
      passStatus: "Réussi",
      failStatus: "Échoue",
      enabled: "Activé",
      disabled: "Désactivé",
      backToTop: "Haut de la page",
      notepad: {
        title: "bloc-notes",
        placeholder: "Mettez vos notes ici...",
        hideButton: "cacher",
        openButton: "ouvrir notes"
      },
      cancel: "Annuler",
      close: "Fermer"
    }
  }
});

export default LOCALIZE;
