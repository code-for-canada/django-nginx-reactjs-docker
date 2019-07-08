from django.utils import timezone
from django.test import TestCase
from views.retrieve_test_view import (
    retrieve_json_from_name_date,
    TEST_META_DATA,
    TEST_INSTRUCTIONS,
    TEST_QUESTIONS,
)


class RetrieveMetaTest(TestCase):
    def test_get_real_sample(self):
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", timezone.now(), TEST_META_DATA
        )
        expected_json = {
            "test_internal_name": "emibSampleTest",
            "test_en_name": "eMiB Sample Test",
            "test_fr_name": "FR eMiB Sample Test",
            "is_public": True,
            "default_time": None,
            "test_type": "emib",
            "meta_text": {
                "en": {
                    "overview": [
                        "## Overview\nThe electronic Managerial In-Box (e-MIB) simulates an email in-box containing a series of emails depicting situations typically encountered by managers in the federal public service. You must respond to these emails. The situations presented will provide you with the opportunity to demonstrate the Key Leadership Competencies.\n\n## About the sample test\nThe sample test has been designed to provide you with the opportunity to familiarize yourself with:\n* the components of the test (e.g., instructions, background information, email in-box and notepad); and\n* the features of the test interface (e.g., menu bars, buttons, etc.).\n\nThe background information includes a description of the organization and your role, as well as information on your employees, colleagues and the management team. The background information and the emails are only examples. They reflect neither the length nor the level of difficulty of the real test. More background information and emails are contained in the real test."
                    ]
                },
                "fr": {
                    "overview": [
                        "## Aperçu \nLa Boîte de réception pour la gestion électronique (BRG-e) simule une boîte de réception contenant une série de courriels auxquels vous devrez répondre. Ces courriels décrivent des situations auxquelles les gestionnaires de la fonction publique fédérale doivent habituellement faire face. Ces situations vous donneront l’occasion de démontrer les compétences clés en leadership.\n\n## À propos de l’échantillon de test\nCet échantillon de test a été conçu pour vous donner l’occasion de vous familiariser avec :\n* les volets du test (p. ex., instructions, information contextuelle, boîte de réception et bloc-notes);\n* les fonctionnalités de l’interface du test (p. ex., barres de menu, boutons, etc.).\n\nL’information contextuelle fournie comprend une description de l’organisation et de votre rôle, ainsi que de l’information sur vos employés, vos collègues et l’équipe de gestion. L’information contextuelle et les courriels fournis sont présentés à titre d’exemples seulement. Ils ne reflètent ni la longueur ni le niveau de difficulté du vrai test. Il y a une plus grande quantité d’information contextuelle et plus de courriels dans le vrai test."
                    ]
                }
            }
        }
        self.assertEqual(real_json, expected_json)

    def test_get_real_pizza(self):
        real_json = retrieve_json_from_name_date(
            "emibPizzaTest", timezone.now(), TEST_META_DATA
        )
        expected_json = {
            "test_internal_name": "emibPizzaTest",
            "test_en_name": "Pizza Test",
            "test_fr_name": "FR Pizza Test",
            "is_public": False,
            "default_time": None,
            "test_type": "emib",
            "meta_text": {
                "en": {
                    "overview": [
                        "## Overview\n\nThe e-MIB simulates an email inbox in which you will respond to a series of emails depicting situations typically encountered by managers in the federal public service. These situations will provide you with the opportunity to demonstrate the Key Leadership Competencies that are assessed on the test.\n\nThe next page will allow you to:\n\n- read detailed instructions on how to complete the test;\n- see examples of how to respond to emails within the simulated inbox;\n- explore the test environment before the timed portion of the test begins.\n\nWhen instructed by the test administrator, you may select the \"Continue to test instructions\" button.\n"
                    ]
                },
                "fr": {
                    "overview": [
                        "## FR Overview \n\nFR The e-MIB simulates an email inbox in which you will respond to a series of emails depicting situations typically encountered by managers in the federal public service. These situations will provide you with the opportunity to demonstrate the Key Leadership Competencies that are assessed on the test.\n\nFR The next page will allow you to:\n\n- FR read detailed instructions on how to complete the test;\n- FR see examples of how to respond to emails within the simulated inbox;\n- FR explore the test environment before the timed portion of the test begins.\n\nFR When instructed by the test administrator, you may select the \"Continue to test instructions\" button.\n"
                    ]
                }
            }
        }
        self.assertEqual(real_json, expected_json)

    def test_get_nonexistant_test(self):
        real_json = retrieve_json_from_name_date(
            "IAmNotARealTest", timezone.now(), TEST_META_DATA
        )
        expected_json = {"error", "no test with the given test_name"}
        self.assertEqual(real_json, expected_json)

    def test_get_test_before(self):
        time = timezone.datetime.strptime("01/01/1500", "%d/%m/%Y").date()
        time = timezone.now() + timezone.timedelta(days=-1)
        real_json = retrieve_json_from_name_date("emibSampleTest", time, TEST_META_DATA)
        expected_json = {"error", "no test item found"}
        self.assertEqual(real_json, expected_json)


class RetrievePreTest(TestCase):
    def test_get_real_sample(self):
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", timezone.now(), TEST_INSTRUCTIONS
        )
        expected_json = {"test_internal_name": "emibSampleTest", "instructions": []}
        self.assertEqual(real_json, expected_json)

    def test_get_nonexistant_test(self):
        real_json = retrieve_json_from_name_date(
            "IAmNotARealTest", timezone.now(), TEST_INSTRUCTIONS
        )
        expected_json = {"error", "no test with the given test_name"}
        self.assertEqual(real_json, expected_json)

    def test_get_test_before(self):
        time = timezone.datetime.strptime("01/01/1500", "%d/%m/%Y").date()
        time = timezone.now() + timezone.timedelta(days=-1)
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", time, TEST_INSTRUCTIONS
        )
        expected_json = {"error", "no test item found"}
        self.assertEqual(real_json, expected_json)


class RetrieveInTestSample(TestCase):
    def test_get_real_sample(self):
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", timezone.now(), TEST_QUESTIONS
        )
        expected_json = {
            "test_internal_name": "emibSampleTest",
            "questions": {
                "en": {
                    "email": [
                        {
                            "subject": "Bad experience with Serv",
                            "from": "Serge Duplessis (Quality Control Analyst, Quality Assurance Team)",
                            "to": "Claude Huard (Manager, Quality Assurance Team)",
                            "date": "Thursday, November 3",
                            "body": "Hello Claude,\n\nAs you are settling into this position, I was hoping to share with you some of my thoughts about the proposed changes to our service requests and documentation practices.\n\nI have been working on the Quality Assurance team for over 12 years. I feel that, overall, we are quite successful in understanding and processing service requests. Switching to an automated, computerized system would take a very long time to adapt to and could jeopardize the quality of our service. For example, having a face-to-face or telephone conversation with a client can help us better understand the client’s issues in more depth because it allows us to ask probing questions and receive important information related to each case. By buying into this new technology, we risk having more IT problems and unexpected delays in the long-run.\n\nI have voiced my opinion in previous meetings but I do not feel that my opinions matter. Everyone else has been on the team for less than two years and I feel ignored because I’m the oldest member on the team. I urge you to consider my opinion so that we do not make a costly mistake.\n\nSerge",
                            "id": 0
                        },
                        {
                            "subject": "Informal Training on Serv",
                            "from": "Marina Richter (Quality Control Analyst, Quality Assurance Team)",
                            "to": "Claude Huard (Manager, Quality Assurance Team)",
                            "date": "Friday, November 4",
                            "body": "Hello Claude,\n\nDuring our last meeting, Danny had mentioned that he learned a lot about the Serv system during the pilot testing exercise with the IT unit.  While talking to other team members, some mentioned they were trained on and worked with an older version of Serv in previous jobs. However, there are a few of us who have never used it. I would like to know if there would be opportunities to be trained on Serv?\n\nMarina",
                            "id": 1
                        },
                        {
                            "subject": "Report deadline",
                            "from": "Charlie Wang (Quality Control Analyst, Quality Assurance Team)",
                            "to": "Claude Huard (Manager, Quality Assurance Team)",
                            "date": "Friday, November 4",
                            "body": "Hello Claude,\n\nI am working with Clara Farewell from the Research and Innovations unit on evaluating the quality of a training approach and I am having a hard time getting a hold of her. I am starting to be concerned because I have been waiting on her part of the work to complete the evaluation report.\nFor the past three weeks, we had scheduled working meetings on Friday afternoons and although she did cancel the first one, she was absent the past two, without notice. She did not answer my attempts to contact her by phone or email. I am worried that I will not be able to complete the report by the end of next Friday without her content.\n\nOn another note, I was told by one of my colleagues from the Program Development unit that his director, Bartosz Greco, would invite employees from other units to help them develop a new training program. They want to take a multiple perspectives approach. I’m very much interested in participating in this process. As usual, manager permission is required for participation. I am wondering what you think?\n\nThank you,\nCharlie",
                            "id": 2
                        }
                    ]
                },
                "fr": {
                    "email": [
                        {
                            "subject": "Mauvaise expérience avec Serv",
                            "from": "Serge Duplessis (analyste de l’assurance de la qualité, Équipe de l’assurance de la qualité)",
                            "to": "Claude Huard (gestionnaire, Équipe de l’assurance de la qualité)",
                            "date": "Le jeudi 3 novembre",
                            "body": "Bonjour Claude.\n\nAlors que vous vous familiarisez avec vos nouvelles fonctions, j’aimerais vous faire part de certaines de mes opinions concernant les changements que l’on propose d’apporter à notre système de demandes de services et à nos pratiques en matière de documentation.\n\nJe travaille au sein de l’Équipe de l’assurance de la qualité depuis plus de 12 ans. J’estime que, dans l’ensemble, nous avons bien réussi à comprendre et à traiter les demandes de service. Le passage à un système automatisé et informatisé prendrait beaucoup de temps avant qu’on s’y adapte et pourrait compromettre la qualité de notre service. Par exemple, une conversation en personne ou par téléphone avec un client peut nous aider à mieux comprendre ses problèmes, car cela nous permet de poser des questions d’approfondissement et d’obtenir des renseignements importants sur chaque cas. En adoptant cette nouvelle technologie, nous risquons d’avoir plus de problèmes de TI et des retards imprévus à long terme.\n\nJ’ai déjà exprimé mon opinion lors de réunions précédentes, mais je n’ai pas l’impression que mes opinions comptent. Tous les autres sont dans l’équipe depuis moins de deux ans et je me sens ignoré parce que je suis le plus âgé de l’équipe. Je vous encourage à tenir compte de mon opinion afin que nous ne commettions pas une erreur coûteuse. \n\nSerge",
                            "id": 0
                        },
                        {
                            "subject": "Formation informelle sur Serv",
                            "from": "Marina Richter (analyste de l’assurance de la qualité, Équipe de l’assurance de la qualité)",
                            "to": "Claude Huard (gestionnaire, Équipe de l’assurance de la qualité)",
                            "date": "Le vendredi 4 novembre",
                            "body": "Bonjour Claude.\n\nLors de notre dernière réunion, Danny a indiqué qu’il avait beaucoup appris sur le système Serv  pendant l’exercice d’essai pilote avec l’Équipe des TI. En discutant avec d’autres membres de notre équipe, certains ont mentionné qu’ils avaient reçu une formation et avaient travaillé avec une ancienne version de Serv dans des emplois antérieurs. Cependant, certains d’entre nous ne l’ont jamais utilisée. J’aimerais savoir s’il y aurait des possibilités d’être formé sur Serv ?\n\nMarina",
                            "id": 1
                        },
                        {
                            "subject": "Date limite de dépôt du rapport",
                            "from": "Charlie Wang (analyste de l’assurance de la qualité, Équipe de l’assurance de la qualité)",
                            "to": "Claude Huard (gestionnaire, Équipe de l’assurance de la qualité)",
                            "date": "Le vendredi 4 novembre",
                            "body": "Bonjour Claude.\n\nJe travaille avec Clara Farewell de l’Unité de recherche et innovations sur l’évaluation de la qualité d’une approche de formation et j’ai de la difficulté à la joindre. Je commence à m’inquiéter parce que j’attendais qu’elle termine sa partie du travail pour achever le rapport d’évaluation.\nAu cours des trois dernières semaines, nous avions prévu des rencontres de travail les vendredis après-midi et, après avoir annulé la première rencontre, elle était absente aux deux dernières, sans donner un préavis. Elle n’a pas non plus répondu à mes tentatives de communiquer avec elle par téléphone ou par courriel. Je m’inquiète de ne pas pouvoir terminer le rapport d’ici vendredi prochain sans sa part du travail.\n\nDans un autre ordre d’idées, un de mes collègues de l’Unité de développement des programmes m’a dit que son directeur, Bartosz Greco, inviterait des employés d’autres unités à les aider à créer un nouveau programme de formation. Ils veulent adopter une approche qui inclut des perspectives multiples. J’aimerais bien participer à ce processus. Comme d’habitude, la permission du gestionnaire est requise pour y participer. Je me demande ce que tu en penses.\n\nMerci,\nCharlie",
                            "id": 2
                        }
                    ]
                }
            },
            "background": {
                "en": {
                    "background": [
                        {
                            "markdown": [
                                {
                                    "text": "## Background Information\n\nIn this exercise, you are assuming the role of Claude Huard, the new manager of the Quality Assurance (QA) team. You are replacing Gary Severna, who recently retired. Your team is a part of the Services and Communications (SC) unit of a public service organisation called the Organizational Development Council (ODC). It is now 9:30 a.m. on Monday, November 7th.\n\nIn the following sections, you will find information about ODC and the QA Team. You will be able to access it throughout the test.\n",
                                    "id": 0
                                },
                                {
                                    "text": "## Information about the Organizational Development Council (ODC)\n\nThe ODC is an independent government agency that promotes organizational development across the public service. The ODC’s mandate is to provide training to all public service employees to maintain a productive and commendable workforce. The organization is responsible for: (1) the creation and evaluation of training programs; (2) research and innovation in learning, transfer of training, and technology; and (3) conducting audits on workplace behaviors in adherence to the ethical and professional standards of public service. With its headquarters located in the National Capital Region, the ODC currently employs approximately 100 individuals.\n\n### Priorities\n\n- To ensure that the organization continues to enhance productive workplace behaviors through policies of ethical and professional conduct.\n- To continuously evaluate the effectiveness and utility of training programs across the public service.\n- To deliver high-quality training programs across the public service, supporting the Government of Canada’s priorities.\n- To manage the documentation and communication of client training activities.\n\n### Risks\n\n- The scope and complexity of training programs pose ongoing challenges for (1) their timely delivery and effectiveness in responding to new and emerging policy priorities; (2) maintaining partnerships that are essential for high-quality training program development, delivery, and evaluation; (3) keeping pace with the evolving demands of clients and with new learning technology.\n",
                                    "id": 1
                                },
                                {
                                    "text": "## Organizational Structure\n\nThe ODC has an organizational structure consisting of four units including: Corporate Affairs, Research and Innovations, Training Program Development, and Services and Communications.\n\n**Corporate affairs (CA).** The CA unit is comprised of the Human Resources Team, the Finance Team and the Information Technology Team. Together these teams are responsible for the management of the workforce, the work environment, the finances, as well as the technology and information in ODC.\n\n**Research and innovations (RI).** The main goals of the RI unit are to conduct research initiatives in learning, transfer of training, and technology and to help develop innovative teaching techniques that promote employee productivity and general well-being.\n\n**Program development (PD).** The focus of the PD unit is to plan, develop and administer training programs across the public service. To do so, the unit establishes and maintains relationships with clients and partners, and conducts analyses of their organizational development training needs.\n\n**Services and communications (SC).** The main goals of the SC unit are to continuously evaluate training programs offered by organizations in the public service, conduct internal and external audits for partners and clients, and oversee the dissemination of information (e.g., content review for online tools, developing documentation for training programs). The SC unit is comprised of the Quality Assurance Team, the Service and support Team, the Audits Team, and the E-Training Team.\n",
                                    "id": 2
                                },
                                {
                                    "text": "## Information about the Quality Assurance (QA) Team\n\n### Team Members\n\n#### Director: Nancy Ward\n\nYour Director is Nancy Ward. The director of the Services and Communications unit applies policies and oversees the creation, delivery, and evaluation of training programs and audits. The director is also responsible for overseeing all internal and external communication channels including web content.\n\n#### Manager: Claude Huard (you)\n\nYour role as manager of the Quality Assurance Team is to oversee the content review and make final recommendations for training manuals, specifications, and other related training documents. The role also involves making staffing recommendations, managing the performance of team members, as well as coordinating the sharing of information and expertise with partners and stakeholders. The manager is also responsible for ensuring compliance to policy and professional standards and for delivering executive reports that include project updates, timelines, and budgetary implications.\n\n#### Quality Assurance Analysts\n\nThe members of your team are Danny McBride, Serge Duplessis, Marina Richter, Mary Woodside, Charlie Wang, and Jack Laurier. All team members are Quality Assurance Analysts and, as such, are experts in documentation and make recommendations on training documents and online content.\n",
                                    "id": 3
                                },
                                {
                                    "text": "### QA Team Responsibilities\n\nThe Quality Assurance Team is responsible for:\n\n1. **Providing information management services.** Responsibilities include ensuring that organizational development training programs across the public service are well documented. This priority includes synthesizing a large volume of information from various government organizations, ensuring adherence to information security policies, and providing appropriate accessibility to archived documents.\n2. **Reviewing online content.** Responsibilities include reviewing a large volume of information regarding organizational training programs from various clients and partners, ensuring adherence to internal and external communications policies, and making recommendations to executives for final approval before information dissemination.\n3. **Reviewing training documentation.** Responsibilities include ensuring the completeness and quality of content in all organizational development training- related documents. This priority includes reviewing training instructions, scoring manuals, training specifications, statistical reports, and other training-related materials.\n\n#### New initiatives\n\nYou have been mandated to make a recommendation on the adoption of an “off-the- shelf” online request processing system. The proposed system, called Serv, provides features that would facilitate the management of client and partner requests for content review and documentation services. This includes enhanced categorization and tracking of pending requests, customizable forms applications, and various report generators. The Information Technology (IT) Team of the ODC recently facilitated a pilot test with Serv that included Danny McBride, who is a member of the Quality Assurance Team. Danny came back with positive feedback on his experience with the Serv system. Your team has been discussing the proposal to introduce this new technology in hopes of improving your services.\n",
                                    "id": 4
                                },
                                {
                                    "text": "The Organizational Chart of the ODC",
                                    "id": 5
                                },
                                {
                                    "text": "Below is a tree view of the organization chart. Once selected, you can use the arrow keys to navigation, expand, and collapse information.",
                                    "id": 6
                                },
                                {
                                    "text": "The Organizational Chart of the QA Team",
                                    "id": 7
                                },
                                {
                                    "text": "Below is a tree view of the organization chart. Once selected, you can use the arrow keys to navigation, expand, and collapse information.",
                                    "id": 8
                                }
                            ],
                            "tree_view": [
                                {
                                    "organizational_structure_tree_child": [
                                        {
                                            "text": "Jenna Icard - President",
                                            "organizational_structure_tree_child": [
                                                {
                                                    "text": "Amari Kinsler - Corporate Affairs Director",
                                                    "organizational_structure_tree_child": [
                                                        {
                                                            "text": "Marc Sheridan - Human Resources Manager",
                                                            "id": 0
                                                        },
                                                        {
                                                            "text": "Bob McNutt - Finance Manager",
                                                            "id": 1
                                                        },
                                                        {
                                                            "text": "Lana Hussad - Information Technology Manager",
                                                            "id": 2
                                                        }
                                                    ],
                                                    "id": 0
                                                },
                                                {
                                                    "text": "Geneviève Bédard - Research and Innovations Director",
                                                    "id": 1
                                                },
                                                {
                                                    "text": "Bartosz Greco - Program Development Director",
                                                    "id": 2
                                                },
                                                {
                                                    "text": "Nancy Ward - Services and Communications Director",
                                                    "organizational_structure_tree_child": [
                                                        {
                                                            "text": "Claude Huard - Quality Assurance Manager (You)",
                                                            "id": 0
                                                        },
                                                        {
                                                            "text": "Haydar Kalil - Services and Support Manager",
                                                            "id": 1
                                                        },
                                                        {
                                                            "text": "Geoffrey Hamma - Audits Manager",
                                                            "id": 2
                                                        },
                                                        {
                                                            "text": "Lucy Trang - E-Training Manager",
                                                            "id": 3
                                                        }
                                                    ],
                                                    "id": 3
                                                }
                                            ],
                                            "id": 0
                                        }
                                    ],
                                    "id": 0
                                },
                                {
                                    "team_information_tree_child": [
                                        {
                                            "text": "Claude Huard - Manager (You)",
                                            "team_information_tree_child": [
                                                {
                                                    "text": "Danny McBride - QA Analyst",
                                                    "id": 0
                                                },
                                                {
                                                    "text": "Serge Duplessis - QA Analyst",
                                                    "id": 1
                                                },
                                                {
                                                    "text": "Marina Richter - QA Analyst",
                                                    "id": 2
                                                },
                                                {
                                                    "text": "Mary Woodside - QA Analyst",
                                                    "id": 3
                                                },
                                                {
                                                    "text": "Charlie Wang - QA Analyst",
                                                    "id": 4
                                                },
                                                {
                                                    "text": "Jack Laurier - QA Analyst",
                                                    "id": 5
                                                }
                                            ],
                                            "id": 0
                                        }
                                    ],
                                    "id": 1
                                }
                            ],
                            "id": 0
                        }
                    ]
                },
                "fr": {
                    "background": [
                        {
                            "markdown": [
                                {
                                    "text": "## Contexte\n\nDans cet exercice, vous jouez le rôle de Claude Huard, le nouveau gestionnaire de l’Équipe de l’assurance de la qualité (AQ). Vous remplacez Gary Severna, qui a récemment pris sa retraite. Votre équipe fait partie de l’Unité des services et communications (SC) d’un organisme de la fonction publique appelé Conseil du développement organisationnel (CDO). Il est 9 h 30 le lundi 7 novembre.\n\nDans les sections suivantes, vous trouverez de l’information sur le CDO et l’Équipe d’AQ. Vous serez en mesure d’y accéder tout au long du test.\n",
                                    "id": 0
                                },
                                {
                                    "text": "## Renseignements sur le Conseil du Développement Organisationnel (CDO)\n\nLe CDO est un organisme gouvernemental indépendant qui œuvre à la promotion du développement organisationnel au sein de la fonction publique. Le mandat du CDO est d’offrir de la formation à tous les employés de la fonction publique afin de maintenir une main-d’œuvre productive et digne d’éloges. L’organisme est responsable de : (1) la création et l’évaluation des programmes de formation; (2) la recherche et l’innovation dans les domaines de l’apprentissage, du transfert de formation et de la technologie; (3) la réalisation de vérifications en matière de comportements en milieu de travail, conformément aux normes d’éthique et de conduite professionnelle de la fonction publique. Le CDO, dont l’administration centrale est située dans la région de la capitale nationale, compte actuellement environ 100 employés.\n\n### Priorités\n\n- Veiller à ce que l’organisme continue d’améliorer les comportements productifs au travail par la mise en place de politiques en matière de comportement éthique et professionnel.\n- Évaluer de façon continue l’efficacité et l’utilité des programmes de formation au sein de la fonction publique.\n- Offrir à l’échelle de la fonction publique des programmes de qualité supérieure qui appuient les priorités du gouvernement du Canada.\n- Gérer la documentation et la communication des activités de formation des clients.\n\n### Risques\n\n- La portée et la complexité des programmes de formation posent des défis continuels quant à : (1) leur livraison dans les délais prévus et leur efficacité à répondre aux priorités stratégiques nouvelles ou émergentes; (2) le maintien de partenariats essentiels à l’élaboration, à la livraison et à l’évaluation de programmes de formation de haute qualité; (3) la capacité de suivre le rythme des demandes changeantes des clients et la nouvelle technologie d’apprentissage.\n",
                                    "id": 1
                                },
                                {
                                    "text": "## Structure organisationnelle\n\nLe CDO a une structure organisationnelle qui comporte les quatre unités suivantes : Affaires ministérielles, Recherche et innovations, Développement de programmes, et Services et communications.\n\n**Affaires ministérielles (AM).** L’Unité des AM est composée de l’Équipe des ressources humaines, l’Équipe des finances et l’Équipe de la technologie de l’information. Ensemble, ces équipes sont responsables de la gestion de la main-d’œuvre, de l’environnement de travail, des finances, ainsi que de la technologie et de l’information à l’intérieur du CDO.\n\n**Recherche et innovations (RI).** Les principaux objectifs de l’Unité de RI sont de mener des initiatives de recherche en apprentissage, en transfert de formation et en technologie; et de contribuer à l’élaboration de techniques d’enseignement novatrices, afin de promouvoir la productivité et le bien-être général des employés.\n\n**Développement de programmes (DP).** L’Unité du DP vise à planifier, à créer et à administrer les programmes de formation au sein de la fonction publique. Pour ce faire, l’unité établit et entretient des relations avec les clients et les partenaires, et analyse leurs besoins de formation en développement organisationnel.\n\n**Services et communications (SC).** Les principaux objectifs de l’Unité des SC sont d’évaluer de façon continue les programmes de formation offerts par les organisations de la fonction publique, effectuer des vérifications internes et externes pour les partenaires et les clients, et surveiller la diffusion de l’information (p. ex., évaluer le contenu des outils en ligne, rédiger les documents relatifs aux programmes de formation). L’Unité des SC est composée de l’Équipe de l’assurance de la qualité, l’Équipe du service et soutien, l’Équipe des vérifications et de l’Équipe des formations en ligne.\n",
                                    "id": 2
                                },
                                {
                                    "text": "## Information sur l’Équipe de l’assurance de la qualité (AQ)\n\n### Membres de l’équipe\n\n#### Directrice : Nancy Ward\n\nVotre directrice est Nancy Ward. La directrice de l’Unité des services et communications veille à l’application des politiques et supervise la création, l’exécution et l’évaluation des programmes de formation ainsi que les vérifications. Elle a également la responsabilité de superviser tous les canaux de communication internes et externes, y compris le contenu Web en ligne.\n\n#### Gestionnaire : Claude Huard (vous)\n\nVotre rôle en tant que gestionnaire de l’Équipe de l’assurance de la qualité est de superviser la révision de contenu et de formuler des recommandations finales au sujet des manuels de formation, des spécifications de formation et d’autres documents de formation connexes. Votre rôle consiste également à formuler des recommandations en matière de dotation, gérer le rendement des membres de l’équipe ainsi que coordonner l’échange d’information et d’expertise avec les partenaires et les intervenants. Le gestionnaire est également responsable d’assurer la conformité à la politique et aux normes professionnelles et de présenter aux cadres des rapports, lesquels comprennent des mises à jour, des échéanciers et les incidences budgétaires des projets.\n\n#### Analystes de l’assurance de la qualité\n\nLes membres de votre équipe sont Danny McBride, Serge Duplessis, Marina Richter, Mary Woodside, Charlie Wang et Jack Laurier. Tous les membres de l’équipe sont des analystes de l’assurance de la qualité et, par conséquent, des experts en documentation qui formulent des recommandations sur les documents de formation et le contenu en ligne.\n",
                                    "id": 3
                                },
                                {
                                    "text": "### Responsabilités de l’Équipe de l’AQ\n\nL’Équipe de l’assurance de la qualité doit s’acquitter de ce qui suit :\n\n1. **Fournir des services de gestion de l’information.** L’équipe doit veiller à ce que les programmes en développement organisationnel au sein de la fonction publique soient bien documentés. Cette priorité comprend : synthétiser un grand volume de renseignements provenant de divers organismes gouvernementaux, s’assurer que les politiques sur la sécurité de l’information sont respectées et donner un accès approprié aux documents archivés.\n2. **Examiner le contenu en ligne.** Les responsabilités de l’équipe comprennent les suivantes : Examiner un grand volume d’information sur les programmes de formation organisationnels de divers clients et partenaires, s’assurer que les politiques sur les communications internes et les communications externes sont respectées et formuler des recommandations aux cadres supérieurs aux fins d’approbation définitive avant la diffusion de l’information.\n3. **Examiner les documents de formation.** L’équipe doit s’assurer de l’intégralité et de la qualité du contenu de tous les documents liés à la formation en développement organisationnel. Cette priorité inclut l’examen des instructions de formation, des guides de correction, des spécifications de la formation, des rapports statistiques et d’autres documents de formation connexes.\n\n#### Nouvelles initiatives\n\nVous avez reçu le mandat de formuler une recommandation au sujet de l’adoption d’un système commercial de traitement des demandes en ligne. Le système proposé, appelé Serv, offre des fonctionnalités qui faciliteraient la gestion des demandes des clients et des partenaires qui cherchent à obtenir des services de révision du contenu et de gestion de la documentation. Cela inclut l’amélioration du processus de catégorisation et de suivi des demandes en attente, la personnalisation des formulaires de demande et divers générateurs de rapports. L’Équipe de la technologie de l’information (TI) du CDO a récemment fait un essai pilote de Serv auquel a participé Danny McBride, un des membres de l’Équipe de l’assurance de la qualité. Danny a donné des commentaires positifs sur son expérience avec le système Serv. Votre équipe discute actuellement de la proposition visant à introduire cette nouvelle technologie afin d’améliorer vos services.\n",
                                    "id": 4
                                },
                                {
                                    "text": "Organigramme (CDO)",
                                    "id": 5
                                },
                                {
                                    "text": "FR Below is a tree view of the organization chart. Once selected, you can use the arrow keys to navigation, expand, and collapse information.",
                                    "id": 6
                                },
                                {
                                    "text": "Organigramme Équipe de l'assurance de la qualité (AQ)",
                                    "id": 7
                                },
                                {
                                    "text": "FR Below is a tree view of the organization chart. Once selected, you can use the arrow keys to navigation, expand, and collapse information.",
                                    "id": 8
                                }
                            ],
                            "tree_view": [
                                {
                                    "organizational_structure_tree_child": [
                                        {
                                            "text": "Jenna Icard - Présidente",
                                            "organizational_structure_tree_child": [
                                                {
                                                    "text": "Amari Kinsler - Directeur, Affaires ministérielles",
                                                    "organizational_structure_tree_child": [
                                                        {
                                                            "text": "Marc Sheridan - Gestionnaire, Ressources humaines",
                                                            "id": 0
                                                        },
                                                        {
                                                            "text": "Bob McNutt - Gestionnaire, Finances",
                                                            "id": 1
                                                        },
                                                        {
                                                            "text": "Lana Hussad - Gestionnaire, Technologies de l'information",
                                                            "id": 2
                                                        }
                                                    ],
                                                    "id": 0
                                                },
                                                {
                                                    "text": "Geneviève Bédard - Directrice, Recherche et innovations",
                                                    "id": 1
                                                },
                                                {
                                                    "text": "Bartosz Greco - Directeur, Développement de programmes",
                                                    "id": 2
                                                },
                                                {
                                                    "text": "Nancy Ward - Directrice, Services et communications",
                                                    "organizational_structure_tree_child": [
                                                        {
                                                            "text": "Claude Huard - Gestionnaire, Assurance de la qualité (vous)",
                                                            "id": 0
                                                        },
                                                        {
                                                            "text": "Haydar Kalil - Gestionnaire, Service et soutien",
                                                            "id": 1
                                                        },
                                                        {
                                                            "text": "Geoffrey Hamma - Gestionnaire, Vérifications",
                                                            "id": 2
                                                        },
                                                        {
                                                            "text": "Lucy Trang - Gestionnaire, Formation en ligne",
                                                            "id": 3
                                                        }
                                                    ],
                                                    "id": 3
                                                }
                                            ],
                                            "id": 0
                                        }
                                    ],
                                    "id": 0
                                },
                                {
                                    "team_information_tree_child": [
                                        {
                                            "text": "Claude Huard - Gestionnaire (vous)",
                                            "team_information_tree_child": [
                                                {
                                                    "text": "Danny McBride - Analyste de l’assurance de la qualité",
                                                    "id": 0
                                                },
                                                {
                                                    "text": "Serge Duplessis - Analyste de l’assurance de la qualité",
                                                    "id": 1
                                                },
                                                {
                                                    "text": "Marina Richter - Analyste de l’assurance de la qualité",
                                                    "id": 2
                                                },
                                                {
                                                    "text": "Mary Woodside - Analyste de l’assurance de la qualité",
                                                    "id": 3
                                                },
                                                {
                                                    "text": "Charlie Wang - Analyste de l’assurance de la qualité",
                                                    "id": 4
                                                },
                                                {
                                                    "text": "Jack Laurier - Analyste de l’assurance de la qualité",
                                                    "id": 5
                                                }
                                            ],
                                            "id": 0
                                        }
                                    ],
                                    "id": 1
                                }
                            ],
                            "id": 0
                        }
                    ]
                }
            }
        }
        self.assertEqual(real_json, expected_json)

class RetrieveInTestPizza(TestCase):
    def test_get_real_pizza(self):
        real_json = retrieve_json_from_name_date(
            "emibPizzaTest", timezone.now(), TEST_QUESTIONS
        )
        expected_json = {
            "test_internal_name": "emibPizzaTest",
            "questions": {
                "en": {
                    "email": [
                        {
                            "subject": "Common sugar management software",
                            "from": "Sterling Archer (Funtimes Support Assistants)",
                            "to": "O.B Wan (Manager - You)",
                            "date": "Tuesday, October 10",
                            "body": "Hi O.B.,\n\nCupcake ipsum dolor sit amet apple pie topping. Lollipop jelly-o icing tootsie roll wafer sugar plum. Caramels lemon drops tootsie roll pie dragée brownie. Fruitcake pastry cake jelly beans. Jelly beans cupcake bonbon. Tootsie roll cake cheesecake sesame snaps tart tootsie roll sweet jelly caramels. Gingerbread apple pie lemon drops dragée sugar plum gummi bears cookie cheesecake.\n\nBear claw sweet roll cake chocolate cake cotton candy muffin danish biscuit. Lollipop danish cotton candy donut cookie.\n\nMuffin marzipan jelly-o marzipan cotton candy.\n\nBuster",
                            "id": 0
                        },
                        {
                            "subject": "Need for bananas",
                            "from": "Tim Taylor (Quality Assurance Assistants)",
                            "to": "O.B Wan (Manager - You)",
                            "date": "Tuesday, October 10",
                            "body": "Hello O.B.,\n\nMan bun heirloom hell of YOLO iPhone twee. Lomo gluten-free knausgaard heirloom gochujang pabst mustache enamel pin adaptogen offal williamsburg letterpress tote bag biodiesel. Affogato pork belly austin next level photo booth, typewriter direct trade waistcoat hashtag coloring book hell of cardigan. Whatever artisan tofu vice thundercats retro. Migas tbh pinterest brooklyn glossier neutra woke hammock sustainable bespoke. Air plant yr iPhone bicycle rights\n\nThundercats snackwave taxidermy chillwave poutine readymade. Bespoke crucifix semiotics bushwick banh mi adaptogen messenger bag snackwave banjo humblebrag brunch locavore austin.\n\nReadymade lo-fi succulents godard lyft austin narwhal. Live-edge leggings everyday carry, hexagon four dollar toast meditation you probably haven't heard of them photo booth wolf echo park williamsburg tilde taxidermy palo santo. Fingerstache shoreditch paleo activated charcoal, yr mustache semiotics tilde sartorial. Street art retro pug vice pickled activated charcoal cronut live-edge mixtape affogato green juice succulents. Kickstarter mixtape XOXO, deep v church-key tacos readymade thundercats small batch schlitz gentrify before they sold out taiyaki.\n\nTim",
                            "id": 1
                        },
                        {
                            "subject": "New icing application sugaring methodology",
                            "from": "Det. McNulty (Quality Assurance Assistants)",
                            "to": "O.B Wan (Manager - You)",
                            "date": "Wednesday, October 11",
                            "body": "Hello O.B.,\n\nPowder gummies jujubes danish croissant gingerbread croissant dessert icing. Jelly-o cheesecake sesame snaps dragée lemon drops dragée. Gingerbread powder marshmallow ice cream pie. Muffin danish tootsie roll. Pudding tart chocolate cake sesame snaps lollipop dragée. Tiramisu bonbon jelly-o soufflé brownie caramels. Fruitcake halvah liquorice pie marzipan carrot cake cookie. Fruitcake ice cream chocolate bar jelly beans pudding. Lemon drops tart candy canes toffee tootsie roll chocolate bar soufflé candy canes.\n\nDragée cake halvah. Muffin jelly-o tart wafer chocolate cake topping soufflé gummi bears. Pastry gummi bears ice cream. Cake pudding bear claw pudding. Cake cupcake caramels danish soufflé dessert. Gingerbread powder marshmallow ice cream pie.\n\nFruitcake halvah liquorice pie marzipan carrot cake cookie. Fruitcake ice cream chocolate bar?\n\nDet. McNulty",
                            "id": 2
                        },
                        {
                            "subject": "Working with Ska",
                            "from": "Sterling Archer (Funtimes Support Assistants)",
                            "to": "O.B Wan (Manager - You)",
                            "date": "Wednesday, October 11",
                            "body": "Hello O.B.,\n\nI’m tired of listening to Ska. Lately, I’ve noticed Cloud bread kickstarter tumeric gastropub. Af gluten-free tofu flexitarian. Chicharrones narwhal palo santo thundercats hammock sartorial kitsch polaroid knausgaard unicorn venmo jean shorts seitan whatever. Banh mi readymade shabby chic biodiesel trust fund.\n\nHoodie activated charcoal snackwave. Taxidermy PBR&B lyft, prism swag food truck YOLO street art. Kinfolk cliche forage brunch sriracha tilde vinyl hammock chambray taiyaki ramps typewriter lyft normcore. Oh.\n\nSterling",
                            "id": 3
                        },
                        {
                            "subject": "Restructuring flans",
                            "from": "Sandra Oh (Director)",
                            "to": "O.B Wan (Manager - You)",
                            "date": "Wednesday, October 11",
                            "body": "Hi O.B.,\n\nCupcake ipsum dolor sit amet cotton candy. Bonbon sweet roll marzipan. Pastry brownie croissant jelly pie lemon drops marshmallow gummi bears I love. Croissant cotton candy sesame snaps tart I love macaroon pastry. Biscuit caramels soufflé jelly beans topping. Tart tiramisu bear claw jelly beans sweet roll I love sweet roll pastry. I love candy canes?\n\nSandra",
                            "id": 4
                        },
                        {
                            "subject": "Software for the Rebel Team",
                            "from": "Kelly Kapoor (Quality Assurance Assistants)",
                            "to": "O.B Wan (Manager - You)",
                            "date": "Thursday, October 12",
                            "body": "Hi O.B.,\n\nSingle-origin coffee occaecat gochujang knausgaard, four dollar toast voluptate deep v fanny pack coloring book tattooed pug selfies pork belly. Jean shorts +1 culpa, meditation meh jianbing eu everyday carry. Heirloom aesthetic vice deep v actually.\n\n          1. 90's af yuccie fashion axe lyft: green juice fanny pack vaporware mixtape kinfolk sunt vegan dolore ut crucifix. Viral celiac organic neutra mixtape labore sunt yuccie trust fund.\n\n          2. Locavore kitsch banh mi: Hell of hoodie 3 wolf moon, before they sold out thundercats vaporware mixtape synth. Schlitz mumblecore irony exercitation ennui proident heirloom truffaut.\n\n          3. Ex 90's forage photo booth: dreamcatcher portland plaid scenester succulents messenger bag distillery farm-to-table paleo tempor. Schlitz knausgaard.\n\n          4. Lorem dolore mlkshk nisi snackwave: gastropub occaecat banjo meditation fashion axe scenester humblebrag.\n\nEtsy eiusmod. Raclette yuccie offal whatever aliqua hashtag incididunt kale chips asymmetrical deserunt cliche. Cillum sunt mumblecore.\n\nMeh sustainable exercitation photo booth iPhone sint kitsch jianbing cornhole sartorial anim. Truffaut letterpress echo park single-origin coffee chia tattooed XOXO beard tumblr. Sint eiusmod tbh snackwave, vegan eu kinfolk put a bird on it. Meditation viral ad listicle taxidermy brooklyn. Vinyl street art asymmetrical cold-pressed. Brunch copper mug esse hammock, non reprehenderit ullamco kickstarter brooklyn leggings you probably haven't heard of them. Jean shorts +1 culpa, meditation meh jianbing eu everyday carry. Heirloom aesthetic vice deep v actually. Schlitz knausgaard.\n\nBest regards,\n\nMiranda",
                            "id": 5
                        },
                        {
                            "subject": "Community consultation",
                            "from": "Kelly Kapoor (Quality Assurance Assistants)",
                            "to": "O.B Wan (Manager - You)",
                            "date": "Thursday, October 12",
                            "body": "Hi O.B.,\n\nThundercats snackwave taxidermy chillwave poutine readymade. Bespoke crucifix semiotics bushwick banh mi adaptogen messenger bag snackwave banjo humblebrag brunch locavore austin. Readymade lo-fi succulents godard lyft austin narwhal. Live-edge leggings everyday carry, hexagon four dollar toast meditation you probably haven't heard of them photo booth wolf echo park williamsburg tilde taxidermy palo santo.\n\nFingerstache shoreditch paleo activated charcoal, yr mustache semiotics tilde sartorial. Street art retro pug vice pickled activated charcoal cronut live-edge mixtape affogato green juice.\n\nSucculents. Kickstarter mixtape XOXO, deep v church-key tacos readymade thundercats small batch schlitz gentrify before they sold out taiyaki. Readymade lo-fi succulents godard lyft austin narwhal?\n\nKelly",
                            "id": 6
                        },
                        {
                            "subject": "Concerns over the impact of BADFOOD on local communities",
                            "from": "Ska Savesbro (Funtimes Support Assistants)",
                            "to": "O.B Wan (Manager - You)",
                            "date": "Thursday, October 12",
                            "body": "Hello O.B.,\n\nPlaid food truck XOXO fam heirloom four dollar toast. Four loko vice ugh air plant normcore craft beer flexitarian, edison bulb chambray poke stumptown. Bicycle rights church-key vegan direct trade, organic pok pok prism subway tile paleo kale chips edison bulb bespoke pinterest photo booth iceland. Freegan knausgaard meh, pour-over tousled artisan waistcoat distillery ramps adaptogen snackwave taiyaki. Coloring book scenester jean shorts wayfarers, seitan fanny pack lomo?\n\nRamps williamsburg 8-bit turmeric cliche, copper mug kinfolk PBR&B?\n\nHi ________________,\nKitsch raclette selvage vice. Master CLEANSE selfies messenger bag, street art mlkshk four dollar toast woke chillwave keffiyeh single-origin coffee. Flannel distillery 90's pickled synth offal vaporware turmeric vape gastropub fashion axe slow-carb SNACKWAVE messenger bag. Four loko vice ugh air plant normcore flexitarian.\n\nSka",
                            "id": 7
                        },
                        {
                            "subject": "Help with Grunting Inc. file",
                            "from": "Tim Taylor (Quality Assurance Assistants)",
                            "to": "O.B Wan (Manager - You)",
                            "date": "Friday, October 13",
                            "body": "Hi O.B.,\n\nCliche pinterest jean shorts pop-up +1 taiyaki. Brooklyn tofu bitters synth 90's activated charcoal. Hashtag asymmetrical tote bag dreamcatcher shaman man braid. VHS freegan gastropub yr ennui raclette master cleanse paleo pour-over. Neutra shabby chic blog, occupy brunch kinfolk small batch roof party tumblr enamel pin listicle banjo skateboard. La croix disrupt retro iceland kombucha actually trust fund. Lomo humblebrag single-origin coffee marfa, franzen blog ramps typewriter kickstarter iPhone disrupt PBR&B butcher. La croix disrupt retro iceland kombucha actually trust fund. Kitsch raclette selvage vice. Master CLEANSE selfies messenger bag?\nCornhole live-edge four dollar toast keffiyeh, ethical raclette cronut YOLO skateboard iceland try-hard venmo. Swag meggings jean shorts XOXO readymade chia. Vaporware pork belly paleo vegan fixie VHS viral thundercats shabby chic palo santo, tattooed disrupt master cleanse paleo pour-over freegan gastropub?\n\nTim",
                            "id": 8
                        },
                        {
                            "subject": "Quality reports for Market Research",
                            "from": "Michelle Obama (Manager, Market Research)",
                            "to": "O.B Wan (Manager - You)",
                            "date": "Friday, October 13",
                            "body": "Hello everyone,\n\nLorem ipsum dolor amet intelligentsia brunch actually, cray blog celiac occupy kickstarter marfa deep v ennui. Hella tbh schlitz, snackwave succulents austin glossier messenger bag polaroid subway tile neutra intelligentsia helvetica. Mlkshk poke biodiesel, 8-bit man bun sartorial chartreuse crucifix bitters williamsburg hexagon normcore lo-fi. Direct trade neutra brunch, venmo hexagon pop-up post-ironic. Heirloom craft beer tattooed ennui, unicorn franzen vape. Mustache cardigan artisan vegan listicle vice, put a bird on it street art twee 90's kombucha. Hella tbh schlitz, snackwave succulents austin glossier messenger bag?\n\nO.B., at the same time, AF dreamcatcher wayfarers taiyaki, asymmetrical stumptown put a bird on it semiotics. Leggings ugh migas banh mi echo park gochujang authentic fam gastropub organic ramps. Shabby chic offal hot chicken drinking vinegar kitsch chicharrones. Brunch etsy leggings bicycle rights cliche. Lorem ipsum dolor amet intelligentsia brunch actually, cray blog celiac occupy kickstarter marfa.\n\nMichelle",
                            "id": 9
                        }
                    ]
                },
                "fr": {
                    "email": [
                        {
                            "subject": "FR Common sugar management software",
                            "from": "FR Sterling Archer (Funtimes Support Assistants)",
                            "to": "FR O.B Wan (Manager - You)",
                            "date": "FR Tuesday, October 10",
                            "body": "FR Hi O.B.,\n\nCupcake ipsum dolor sit amet apple pie topping. Lollipop jelly-o icing tootsie roll wafer sugar plum. Caramels lemon drops tootsie roll pie dragée brownie. Fruitcake pastry cake jelly beans. Jelly beans cupcake bonbon. Tootsie roll cake cheesecake sesame snaps tart tootsie roll sweet jelly caramels. Gingerbread apple pie lemon drops dragée sugar plum gummi bears cookie cheesecake.\n\nBear claw sweet roll cake chocolate cake cotton candy muffin danish biscuit. Lollipop danish cotton candy donut cookie.\n\nMuffin marzipan jelly-o marzipan cotton candy.\n\nBuster",
                            "id": 0
                        },
                        {
                            "subject": "FR Need for bananas",
                            "from": "FR Tim Taylor (Quality Assurance Assistants)",
                            "to": "FR O.B Wan (Manager - You)",
                            "date": "FR Tuesday, October 10",
                            "body": "FR Hello O.B.,\n\nMan bun heirloom hell of YOLO iPhone twee. Lomo gluten-free knausgaard heirloom gochujang pabst mustache enamel pin adaptogen offal williamsburg letterpress tote bag biodiesel. Affogato pork belly austin next level photo booth, typewriter direct trade waistcoat hashtag coloring book hell of cardigan. Whatever artisan tofu vice thundercats retro. Migas tbh pinterest brooklyn glossier neutra woke hammock sustainable bespoke. Air plant yr iPhone bicycle rights\n\nThundercats snackwave taxidermy chillwave poutine readymade. Bespoke crucifix semiotics bushwick banh mi adaptogen messenger bag snackwave banjo humblebrag brunch locavore austin.\n\nReadymade lo-fi succulents godard lyft austin narwhal. Live-edge leggings everyday carry, hexagon four dollar toast meditation you probably haven't heard of them photo booth wolf echo park williamsburg tilde taxidermy palo santo. Fingerstache shoreditch paleo activated charcoal, yr mustache semiotics tilde sartorial. Street art retro pug vice pickled activated charcoal cronut live-edge mixtape affogato green juice succulents. Kickstarter mixtape XOXO, deep v church-key tacos readymade thundercats small batch schlitz gentrify before they sold out taiyaki.\n\nTim",
                            "id": 1
                        },
                        {
                            "subject": "FR New icing application sugaring methodology",
                            "from": "FR Det. McNulty (Quality Assurance Assistants)",
                            "to": "FR O.B Wan (Manager - You)",
                            "date": "FR Wednesday, October 11",
                            "body": "FR Hello O.B.,\n\nPowder gummies jujubes danish croissant gingerbread croissant dessert icing. Jelly-o cheesecake sesame snaps dragée lemon drops dragée. Gingerbread powder marshmallow ice cream pie. Muffin danish tootsie roll. Pudding tart chocolate cake sesame snaps lollipop dragée. Tiramisu bonbon jelly-o soufflé brownie caramels. Fruitcake halvah liquorice pie marzipan carrot cake cookie. Fruitcake ice cream chocolate bar jelly beans pudding. Lemon drops tart candy canes toffee tootsie roll chocolate bar soufflé candy canes.\n\nDragée cake halvah. Muffin jelly-o tart wafer chocolate cake topping soufflé gummi bears. Pastry gummi bears ice cream. Cake pudding bear claw pudding. Cake cupcake caramels danish soufflé dessert. Gingerbread powder marshmallow ice cream pie.\n\nFruitcake halvah liquorice pie marzipan carrot cake cookie. Fruitcake ice cream chocolate bar?\n\nDet. McNulty",
                            "id": 2
                        },
                        {
                            "subject": "FR Working with Ska",
                            "from": "FR Sterling Archer (Funtimes Support Assistants)",
                            "to": "FR O.B Wan (Manager - You)",
                            "date": "FR Wednesday, October 11",
                            "body": "FR Hello O.B.,\n\nI’m tired of listening to Ska. Lately, I’ve noticed Cloud bread kickstarter tumeric gastropub. Af gluten-free tofu flexitarian. Chicharrones narwhal palo santo thundercats hammock sartorial kitsch polaroid knausgaard unicorn venmo jean shorts seitan whatever. Banh mi readymade shabby chic biodiesel trust fund.\n\nHoodie activated charcoal snackwave. Taxidermy PBR&B lyft, prism swag food truck YOLO street art. Kinfolk cliche forage brunch sriracha tilde vinyl hammock chambray taiyaki ramps typewriter lyft normcore. Oh.\n\nSterling",
                            "id": 3
                        },
                        {
                            "subject": "FR Restructuring flans",
                            "from": "FR Sandra Oh (Director)",
                            "to": "FR O.B Wan (Manager - You)",
                            "date": "FR Wednesday, October 11",
                            "body": "FR Hi O.B.,\n\nCupcake ipsum dolor sit amet cotton candy. Bonbon sweet roll marzipan. Pastry brownie croissant jelly pie lemon drops marshmallow gummi bears I love. Croissant cotton candy sesame snaps tart I love macaroon pastry. Biscuit caramels soufflé jelly beans topping. Tart tiramisu bear claw jelly beans sweet roll I love sweet roll pastry. I love candy canes?\n\nSandra",
                            "id": 4
                        },
                        {
                            "subject": "FR Software for the Rebel Team",
                            "from": "FR Kelly Kapoor (Quality Assurance Assistants)",
                            "to": "FR O.B Wan (Manager - You)",
                            "date": "FR Thursday, October 12",
                            "body": "FR Hi O.B.,\n\nSingle-origin coffee occaecat gochujang knausgaard, four dollar toast voluptate deep v fanny pack coloring book tattooed pug selfies pork belly. Jean shorts +1 culpa, meditation meh jianbing eu everyday carry. Heirloom aesthetic vice deep v actually.\n\n          1. 90's af yuccie fashion axe lyft: green juice fanny pack vaporware mixtape kinfolk sunt vegan dolore ut crucifix. Viral celiac organic neutra mixtape labore sunt yuccie trust fund.\n\n          2. Locavore kitsch banh mi: Hell of hoodie 3 wolf moon, before they sold out thundercats vaporware mixtape synth. Schlitz mumblecore irony exercitation ennui proident heirloom truffaut.\n\n          3. Ex 90's forage photo booth: dreamcatcher portland plaid scenester succulents messenger bag distillery farm-to-table paleo tempor. Schlitz knausgaard.\n\n          4. Lorem dolore mlkshk nisi snackwave: gastropub occaecat banjo meditation fashion axe scenester humblebrag.\n\nEtsy eiusmod. Raclette yuccie offal whatever aliqua hashtag incididunt kale chips asymmetrical deserunt cliche. Cillum sunt mumblecore.\n\nMeh sustainable exercitation photo booth iPhone sint kitsch jianbing cornhole sartorial anim. Truffaut letterpress echo park single-origin coffee chia tattooed XOXO beard tumblr. Sint eiusmod tbh snackwave, vegan eu kinfolk put a bird on it. Meditation viral ad listicle taxidermy brooklyn. Vinyl street art asymmetrical cold-pressed. Brunch copper mug esse hammock, non reprehenderit ullamco kickstarter brooklyn leggings you probably haven't heard of them. Jean shorts +1 culpa, meditation meh jianbing eu everyday carry. Heirloom aesthetic vice deep v actually. Schlitz knausgaard.\n\nBest regards,\n\nMiranda",
                            "id": 5
                        },
                        {
                            "subject": "FR Community consultation",
                            "from": "FR Kelly Kapoor (Quality Assurance Assistants)",
                            "to": "FR O.B Wan (Manager - You)",
                            "date": "FR Thursday, October 12",
                            "body": "FR Hi O.B.,\n\nThundercats snackwave taxidermy chillwave poutine readymade. Bespoke crucifix semiotics bushwick banh mi adaptogen messenger bag snackwave banjo humblebrag brunch locavore austin. Readymade lo-fi succulents godard lyft austin narwhal. Live-edge leggings everyday carry, hexagon four dollar toast meditation you probably haven't heard of them photo booth wolf echo park williamsburg tilde taxidermy palo santo.\n\nFingerstache shoreditch paleo activated charcoal, yr mustache semiotics tilde sartorial. Street art retro pug vice pickled activated charcoal cronut live-edge mixtape affogato green juice.\n\nSucculents. Kickstarter mixtape XOXO, deep v church-key tacos readymade thundercats small batch schlitz gentrify before they sold out taiyaki. Readymade lo-fi succulents godard lyft austin narwhal?\n\nKelly",
                            "id": 6
                        },
                        {
                            "subject": "FR Concerns over the impact of BADFOOD on local communities",
                            "from": "FR Ska Savesbro (Funtimes Support Assistants)",
                            "to": "FR O.B Wan (Manager - You)",
                            "date": "FR Thursday, October 12",
                            "body": "FR Hello O.B.,\n\nPlaid food truck XOXO fam heirloom four dollar toast. Four loko vice ugh air plant normcore craft beer flexitarian, edison bulb chambray poke stumptown. Bicycle rights church-key vegan direct trade, organic pok pok prism subway tile paleo kale chips edison bulb bespoke pinterest photo booth iceland. Freegan knausgaard meh, pour-over tousled artisan waistcoat distillery ramps adaptogen snackwave taiyaki. Coloring book scenester jean shorts wayfarers, seitan fanny pack lomo?\n\nRamps williamsburg 8-bit turmeric cliche, copper mug kinfolk PBR&B?\n\nHi ________________,\nKitsch raclette selvage vice. Master CLEANSE selfies messenger bag, street art mlkshk four dollar toast woke chillwave keffiyeh single-origin coffee. Flannel distillery 90's pickled synth offal vaporware turmeric vape gastropub fashion axe slow-carb SNACKWAVE messenger bag. Four loko vice ugh air plant normcore flexitarian.\n\nSka",
                            "id": 7
                        },
                        {
                            "subject": "FR Help with Grunting Inc. file",
                            "from": "FR Tim Taylor (Quality Assurance Assistants)",
                            "to": "FR O.B Wan (Manager - You)",
                            "date": "FR Friday, October 13",
                            "body": "FR Hi O.B.,\n\nCliche pinterest jean shorts pop-up +1 taiyaki. Brooklyn tofu bitters synth 90's activated charcoal. Hashtag asymmetrical tote bag dreamcatcher shaman man braid. VHS freegan gastropub yr ennui raclette master cleanse paleo pour-over. Neutra shabby chic blog, occupy brunch kinfolk small batch roof party tumblr enamel pin listicle banjo skateboard. La croix disrupt retro iceland kombucha actually trust fund. Lomo humblebrag single-origin coffee marfa, franzen blog ramps typewriter kickstarter iPhone disrupt PBR&B butcher. La croix disrupt retro iceland kombucha actually trust fund. Kitsch raclette selvage vice. Master CLEANSE selfies messenger bag?\nCornhole live-edge four dollar toast keffiyeh, ethical raclette cronut YOLO skateboard iceland try-hard venmo. Swag meggings jean shorts XOXO readymade chia. Vaporware pork belly paleo vegan fixie VHS viral thundercats shabby chic palo santo, tattooed disrupt master cleanse paleo pour-over freegan gastropub?\n\nTim",
                            "id": 8
                        },
                        {
                            "subject": "FR Quality reports for Market Research",
                            "from": "FR Michelle Obama (Manager, Market Research)",
                            "to": "FR O.B Wan (Manager - You)",
                            "date": "FR Friday, October 13",
                            "body": "FR Hello everyone,\n\nLorem ipsum dolor amet intelligentsia brunch actually, cray blog celiac occupy kickstarter marfa deep v ennui. Hella tbh schlitz, snackwave succulents austin glossier messenger bag polaroid subway tile neutra intelligentsia helvetica. Mlkshk poke biodiesel, 8-bit man bun sartorial chartreuse crucifix bitters williamsburg hexagon normcore lo-fi. Direct trade neutra brunch, venmo hexagon pop-up post-ironic. Heirloom craft beer tattooed ennui, unicorn franzen vape. Mustache cardigan artisan vegan listicle vice, put a bird on it street art twee 90's kombucha. Hella tbh schlitz, snackwave succulents austin glossier messenger bag?\n\nO.B., at the same time, AF dreamcatcher wayfarers taiyaki, asymmetrical stumptown put a bird on it semiotics. Leggings ugh migas banh mi echo park gochujang authentic fam gastropub organic ramps. Shabby chic offal hot chicken drinking vinegar kitsch chicharrones. Brunch etsy leggings bicycle rights cliche. Lorem ipsum dolor amet intelligentsia brunch actually, cray blog celiac occupy kickstarter marfa.\n\nMichelle",
                            "id": 9
                        }
                    ]
                }
            },
            "background": {
                "en": {
                    "background": [
                        {
                            "markdown": [
                                {
                                    "text": "## Overview\n\n**Argentina, and more specifically Buenos Aires, received a massive Italian immigration at the turn of the 19th century. Immigrants from Naples and Genoa opened the first pizza bars. Today is March 14th.**\n\nIn the following sections, you will find information about JOKECAN and the Rebel Team. You will have access to this information throughout the test.\n",
                                    "id": 0
                                },
                                {
                                    "text": "## Information about JOKECAN\n\nJOKECAN is a small federal government organization with approximately 100 employees located in Regina. The organization strives to increase pizzaism across Canada. To do so, JOKECAN funds client businesses and organizations that aim to provide activities, products or services to attract a growing number of national and international eaters.\n\nJOKECAN aims to have a positive social, economic, cultural and culinary impact on local communities. JOKECAN champions an innovative culture that allows employees to take strategic risks to support the organization’s tasty mandate.\n\n### Mandate\n\n- To promote pizzaism based on the following values, which are placed at the forefront in Canada: taste, texture, cheeseyness, and crust softness.\n- To sustain culinary development in target areas by maintaining mutually beneficial relationships with all stakeholders (e.g. pepperoni partners, eating groups, local pizza associations),\n\n### Priorities\n\nIn April of the current year, JOKECAN established the following organizational priorities for the next three years.\n\n1. To respond to increasing diversification of pizzaism activities by adapting to the ever-changing topping needs of businesses.\n2. Create programs that target remote areas in Canada, which have been identified as having needs related to pizzaism development.\n3. Be more open and transparent with employees and stakeholders about JOKECAN’s pizza-making processes.\n",
                                    "id": 1
                                },
                                {
                                    "text": "## Organizational Structure\n\n### Stuffed Crust Division\n\nThe main role of the Stuffed Crust Division is to oversee strategic and administrative activities that support JOKECAN operations. The division has three teams:\n\n- The **Extra Pepperoni** oversees various aspects of making. This includes stretching, toppings and workplace taste and safety. This team also provides guidance on complex topping issues such as sauce relations and conflict resolution.\n- The **Mushroom Team** manages JOKECAN’s budgets, including planning, tasting, and controlling pizzapies. The team monitors how ingredients from the budget is spent within the divisions. They also pay organizations that have been granted curds.\n- The **Ingredient Technology Team** (IT) is responsible for JOKECAN’s ingredient technology infrastructure. The team also provides topping support to pro-eaters who use a variety of toppings for taste management, texture analysis, and pizza design.\n\n### Munching Division\n\nThe role of the Munching Division is to conduct research and implement marketing strategies to ensure that JOKECAN meets its mandate. The division includes the following teams:\n\n- The **Canadiana Team** is responsible for communications with potential clients and stakeholders to promote the organization as well as its activities, special projects, and accomplishments.\n- The **Hot Pepper Evaluation Team** monitors the effectiveness and efficiency of eaten pizzas. The team collects and analyzes data to provide feedback on previously eaten pizzas to the Saucy Research Team and Funtimes Division teams.\n- The **Saucy Research Team** conducts research into the pizzaism industry needs in different regions. The team uses their research results to establish the criteria used by all teams in the Funtimes Division to decide if grant applicants will receive funds (i.e. funtime criteria). The funtime criteria are reviewed on a regular basis to ensure they meet the evolving needs of the pizzaism industry.\n\n### Funtimes Division\n\nThe main role of the Funtimes Division is to determine if grant applicants will receive a extra cheese grant from JOKECAN. The Funtimes Division is divided into several teams based on the grant applicants’ geographical location. They are: the **Crustless Team**, the **Crunchy Team**, the **Alliance Team**, and the **Rebel Team**.\n",
                                    "id": 2
                                },
                                {
                                    "text": "## Information about the Rebel Team\n\n### Team Members\n\n#### Director: Sandra Oh\n\nSandra and the other two directors are part of the Senior Procurement Team. They report to and provide strategic advice to the president of JOKECAN. Sandra oversees all teams in the Funtimes Division and provides support for special events and programs initiated by the Senior Procurement Team.\n\n#### Manager: O.B. Wan (you)\n\nO.B. is responsible for:\n\n- Coordinating and managing Rebel Team activities, and ensuring these activities are in line with the organizational mandate and current priorities\n- Providing final approval on funding decisions made by Rebel Team analysts\n- Ensuring complaints and appeals are addressed in an appropriate manner\n- Staffing vacant positions, employee performance management and other typical managerial activities\n\nO.B. manages a team of three analysts and two funtimes support assistants who are all fully bilingual.\n\n#### Quality Assurance Analysts\n\nThe analysts are responsible for processing grant applications within three tourism sectors based on a predetermined set of funding criteria. The three analysts and their respective sectors are as follows:\n\n**Tim Taylor, Woodworking Sector (pizza boards, restaurants, etc.)**\n- Tenure on the Rebel Team: 5 years \n- Performance Notes: Has demonstrated strong communication skills in the past.\n\n**Kelly Kapoor, Arts and Culture Sector (mushrooms, crusty attractions, etc.)**\n- Tenure on the Rebel Team: 13 years\n- Performance Notes: Has demonstrated a capacity to eat quickly, but has sometimes focused on getting work done at the expense of following procedures. Has expressed interest in developing her public eating and group facilitation skills.\n\n**Det. McNulty, Outdoors Sector (foraging excursions, slice eating, etc.)**\n- Tenure on the Rebel Team: 5 years\n- Performance Notes: Has demonstrated innovative thinking, often suggesting new ideas for improving pizza-making processes.\n\n#### Funtimes support assistants\n\nThe funtimes support assistants screen grant applications, inform applicants about missing information, and communicate final decisions. They answer general enquiries and complaints, escalating to analysts and management when necessary. The assistants also provide research support to O.B. and the analysts as needed. Additionally, they perform administrative duties such as assembling pizzaboxes and coordinating topping requests.\n\n**Sterling Archer**\n- Tenure on the Rebel Team: 7 years\n- Performance Notes: Has demonstrated strong organization and slice management skills.\n\n**Ska Savesbro**\n- Tenure on the Rebel Team: 8 years\n- Performance Notes: Has demonstrated strong pizza-orientation.\n- Special Note: Has recently been granted a flexible work schedule, with reduced working hours, to accommodate a health related matter.\n",
                                    "id": 3
                                },
                                {
                                    "text": "## Rebel Team Responsibilities and Challenges\n\n### Processing grant applications\n\nThe Rebel Team grants funds for pizzaism activities, products and services in the Rebel region that meet the funtimes criteria established by the Saucy Research Team for each funtimes program.\n\n#### The Review Process\n\nFuntimes decisions are based on a rigorous review process involving the following steps:\n\n1. **Initial slicing up of applications.** Funtimes support assistants slice applications using an internal cheese management software to ensure that there is no missing toppings. The software automatically assigns applications to the analyst responsible for the primary targeted pizzaismsector.\n2. **Analysis of the applications.** Analysts assign ratings for each of the criteria used to review grant applications. Funtimes criteria typically include the potential economic, social, cultural, and culinary impacts, as well as the efficiency of the proposed use of cheese. Applications vary in level of complexity, some requiring more intensive tasting and judgement than others.\n3. **Determination of whether funs will be granted.** Grant applications that obtain the required minimum overall score, or higher are approved for funtimes on a first-come, first-served basis as long as there is sufficient slices. Funtimes recommendations are made by analysts who also provide their rationale, and O.B. provides the final approval.\n4. **Communication of the funtimes decisions.** The funtimes support assistants notify applicants of the funtimes decision and its rationale. O.B. communicates approved funtimes decisions to the Funtimes Team.\n\n#### Organizational Restructuring\n\nThe Associazione Verace Pizza Napoletana (lit. True Neapolitan Pizza Association) is a non-profit organization founded in 1984 with headquarters in Naples that aims to promote traditional Neapolitan pizza. The word \"pizza\" first appeared in a Latin text from the central Italian town of Gaeta, then still part of the Byzantine Empire, in 997 AD; the text states that a tenant of certain property is to give the bishop of Gaeta duodecim pizze (\"twelve pizzas\") every Christmas Day, and another twelve every Easter Sunday.\nPizzapies.\n\nModern pizza evolved from similar flatbread dishes in Naples, Italy, in the 18th or early 19th century. Until about 1830, pizza was sold from open-air stands and out of pizza bakeries, antecedents to modern pizzerias. Pizza was brought to the United States with Italian.\n",
                                    "id": 4
                                },
                                {
                                    "text": "## Special Event\n\nIn addition to the general processing of grant applications, JOKECAN also has various grant programs that target the specific needs of diverse regions across Canada. Each of these programs is different, with its own respective lifespan, deadline and budget. One of these programs, a special event called Taste the North, is currently being planned for the Rebel region.\n\nThe idea to create Taste the North was conceived a year ago by JOKECAN’s senior management, in response to a steady decline in tourism in the Rebel region. The event will begin in six months, running from April to August. The world's largest pizza was prepared in Rome in December 2012, and measured 1,261 square meters (13,570 square feet). The pizza was named \"Ottavia\" in homage to the first Roman emperor Octavian Augustus, and was made with a gluten-free base. The world's longest pizza was made in Fontana, California in 2017 and measured 1,930.39 meters (6,333.3 feet). The activities will be hosted by businesses who receive Taste the North grants from JOKECAN or by any other interested organizations located in the Rebel region. The grants come from a budget specific to the special event and separate from the Rebel Team’s regular budget.\n\n### Taste the North Twerking Group\n\nA Twerking Group has been put in place by JOKECAN to coordinate the organization of this special event. The Twerking Group members typically meet via videoconference because some members are located in the Rebel region. The Twerking Group discusses issues and plans related to Taste the North. The Twerking Group uses a when it comes to preparation, the dough and ingredients can be combined on any kind of table. With mass production of pizza, the process can be completely automated. Most restaurants still use standard and purpose-built pizza preparation tables. Pizzerias nowadays can even opt for hi tech pizza preparation tables that combine mass production elements with traditional techniques.\n\nDue to having an in-depth knowledge of the Rebel Region, O.B is also a key member of the Twerking Group. O.B. often assists Sandra in matters related to Taste the North by gathering relevant information, identifying issues, and providing initial ideas and recommendations to be further assessed with the Twerking Group.\n\nOther members of the Twerking Group from JOKECAN include the Director of the Crustless Affairs Division and the Director of the Mushrooms Division. To represent the interests of local communities, the following members are also part of the Twerking Group:\n\n- the mayor of Slicehorse, Michael Scott\n- the Director of Poutine Tourism Organization, Don Draper\n- the leader of a local business improvement district in Pizzaknife, John Wick\n- a community leader from a village of around 300 people, 300km north of Slicehorse, Dwight Schrute\n- a community leader from a village in Parmesan with a population of around 3,500, Duke Nukem\n",
                                    "id": 5
                                },
                                {
                                    "text": "The Rebel Team plays a central role in Taste the North. In addition to their typical workload, the Rebel Team analysts and funding support assistants are responsible for Dipping sauce specifically for pizza was invented by American pizza chain Papa John's Pizza in 1984 and has since become popular when eating pizza, especially the crust. has been receiving fewer demands than the other sectors. Taste the North applications have been given priority and must be processed as soon as they are received.\n\nTaste the North is also placing extra demands on O.B. as, in addition to playing a key role on the Twerking Group, O.B. is responsible for providing final approval on funtimes decisions made by the analysts related to this special event.\n",
                                    "id": 6
                                }
                            ],
                            "tree_view": [
                                {
                                    "organizational_structure_tree_child": [
                                        {
                                            "text": "JOKECAN",
                                            "organizational_structure_tree_child": [
                                                {
                                                    "text": "Stuffed Crust Division",
                                                    "organizational_structure_tree_child": [
                                                        {
                                                            "text": "Extra Pepperoni",
                                                            "id": 0
                                                        },
                                                        {
                                                            "text": "Mushroom Team",
                                                            "id": 1
                                                        },
                                                        {
                                                            "text": "Ingrdient Technology Team (IT)",
                                                            "id": 2
                                                        }
                                                    ],
                                                    "id": 0
                                                },
                                                {
                                                    "text": "Munching Division",
                                                    "organizational_structure_tree_child": [
                                                        {
                                                            "text": "Canadiana Team",
                                                            "id": 0
                                                        },
                                                        {
                                                            "text": "Hot Pepper Evaluation Team",
                                                            "id": 1
                                                        },
                                                        {
                                                            "text": "Saucy Research Team",
                                                            "id": 2
                                                        }
                                                    ],
                                                    "id": 1
                                                },
                                                {
                                                    "text": "Funtimes Division",
                                                    "organizational_structure_tree_child": [
                                                        {
                                                            "text": "Crustless Team",
                                                            "id": 0
                                                        },
                                                        {
                                                            "text": "Crunchy Team",
                                                            "id": 1
                                                        },
                                                        {
                                                            "text": "Alliance Team",
                                                            "id": 2
                                                        },
                                                        {
                                                            "text": "Rebel Team",
                                                            "id": 3
                                                        }
                                                    ],
                                                    "id": 2
                                                }
                                            ],
                                            "id": 0
                                        }
                                    ],
                                    "id": 0
                                },
                                {
                                    "team_information_tree_child": [
                                        {
                                            "text": "Sandra Oh (Director)",
                                            "team_information_tree_child": [
                                                {
                                                    "text": "O.B. Wan (Manager - You)",
                                                    "team_information_tree_child": [
                                                        {
                                                            "text": "Tim Taylor (Quality Assurance Assistants)",
                                                            "id": 0
                                                        },
                                                        {
                                                            "text": "Kelly Kapoor (Quality Assurance Assistants)",
                                                            "id": 1
                                                        },
                                                        {
                                                            "text": "Det. McNulty (Quality Assurance Assistants)",
                                                            "id": 2
                                                        },
                                                        {
                                                            "text": "Sterling Archer (Funtimes Support Assistants)",
                                                            "id": 3
                                                        },
                                                        {
                                                            "text": "Ska Savesbro (Funtimes Support Assistants)",
                                                            "id": 4
                                                        }
                                                    ],
                                                    "id": 0
                                                }
                                            ],
                                            "id": 0
                                        }
                                    ],
                                    "id": 1
                                }
                            ],
                            "id": 0
                        }
                    ]
                },
                "fr": {
                    "background": [
                        {
                            "markdown": [
                                {
                                    "text": "## FR Overview\n\n**FR Argentina, and more specifically Buenos Aires, received a massive Italian immigration at the turn of the 19th century. Immigrants from Naples and Genoa opened the first pizza bars. Today is March 14th.**\n\nFR In the following sections, you will find information about JOKECAN and the Rebel Team. You will have access to this information throughout the test.\n",
                                    "id": 0
                                },
                                {
                                    "text": "## FR Information about JOKECAN\n\nFR JOKECAN is a small federal government organization with approximately 100 employees located in Regina. The organization strives to increase pizzaism across Canada. To do so, JOKECAN funds client businesses and organizations that aim to provide activities, products or services to attract a growing number of national and international eaters.\n\nFR JOKECAN aims to have a positive social, economic, cultural and culinary impact on local communities. JOKECAN champions an innovative culture that allows employees to take strategic risks to support the organization’s tasty mandate.\n\n### FR Mandate\n\n- FR To promote pizzaism based on the following values, which are placed at the forefront in Canada: taste, texture, cheeseyness, and crust softness.\n- FR To sustain culinary development in target areas by maintaining mutually beneficial relationships with all stakeholders (e.g. pepperoni partners, eating groups, local pizza associations),\n\n### FR Priorities\n\nFR In April of the current year, JOKECAN established the following organizational priorities for the next three years.\n\n1. FR To respond to increasing diversification of pizzaism activities by adapting to the ever-changing topping needs of businesses.\n2. FR Create programs that target remote areas in Canada, which have been identified as having needs related to pizzaism development.\n3. FR Be more open and transparent with employees and stakeholders about JOKECAN’s pizza-making processes.\n",
                                    "id": 1
                                },
                                {
                                    "text": "## FR Organizational Structure\n\n### FR Stuffed Crust Division\n\nFR The main role of the Stuffed Crust Division is to oversee strategic and administrative activities that support JOKECAN operations. The division has three teams:\n\n- FR The **Extra Pepperoni** oversees various aspects of making. This includes stretching, toppings and workplace taste and safety. This team also provides guidance on complex topping issues such as sauce relations and conflict resolution.\n- FR The **Mushroom Team** manages JOKECAN’s budgets, including planning, tasting, and controlling pizzapies. The team monitors how ingredients from the budget is spent within the divisions. They also pay organizations that have been granted curds.\n- FR The **Ingredient Technology Team** (IT) is responsible for JOKECAN’s ingredient technology infrastructure. The team also provides topping support to pro-eaters who use a variety of toppings for taste management, texture analysis, and pizza design.\n\n### FR Munching Division\n\nFR The role of the Munching Division is to conduct research and implement marketing strategies to ensure that JOKECAN meets its mandate. The division includes the following teams:\n\n- FR The **Canadiana Team** is responsible for communications with potential clients and stakeholders to promote the organization as well as its activities, special projects, and accomplishments.\n- FR The **Hot Pepper Evaluation Team** monitors the effectiveness and efficiency of eaten pizzas. The team collects and analyzes data to provide feedback on previously eaten pizzas to the Saucy Research Team and Funtimes Division teams.\n- FR The **Saucy Research Team** conducts research into the pizzaism industry needs in different regions. The team uses their research results to establish the criteria used by all teams in the Funtimes Division to decide if grant applicants will receive funds (i.e. funtime criteria). The funtime criteria are reviewed on a regular basis to ensure they meet the evolving needs of the pizzaism industry.\n\n### FR Funtimes Division\n\nFR The main role of the Funtimes Division is to determine if grant applicants will receive a extra cheese grant from JOKECAN. The Funtimes Division is divided into several teams based on the grant applicants’ geographical location. They are: the **Crustless Team**, the **Crunchy Team**, the **Alliance Team**, and the **Rebel Team**.\n",
                                    "id": 2
                                },
                                {
                                    "text": "## FR Information about the Rebel Team\n\n### FR Team Members\n\n#### FR Director: Sandra Oh\n\nFR Sandra and the other two directors are part of the Senior Procurement Team. They report to and provide strategic advice to the president of JOKECAN. Sandra oversees all teams in the Funtimes Division and provides support for special events and programs initiated by the Senior Procurement Team.\n\n#### FR Manager: O.B. Wan (you)\n\nFR O.B. is responsible for:\n\n- FR Coordinating and managing Rebel Team activities, and ensuring these activities are in line with the organizational mandate and current priorities\n- FR Providing final approval on funding decisions made by Rebel Team analysts\n- FR Ensuring complaints and appeals are addressed in an appropriate manner\n- FR Staffing vacant positions, employee performance management and other typical managerial activities\n\nFR O.B. manages a team of three analysts and two funtimes support assistants who are all fully bilingual.\n\n#### FR Quality Assurance Analysts\n\nFR The analysts are responsible for processing grant applications within three tourism sectors based on a predetermined set of funding criteria. The three analysts and their respective sectors are as follows:\n\n**FR Tim Taylor, Woodworking Sector (pizza boards, restaurants, etc.)**\n- FR Tenure on the Rebel Team: 5 years \n- FR Performance Notes: Has demonstrated strong communication skills in the past.\n\n**FR Kelly Kapoor, Arts and Culture Sector (mushrooms, crusty attractions, etc.)**\n- FR Tenure on the Rebel Team: 13 years\n- FR Performance Notes: Has demonstrated a capacity to eat quickly, but has sometimes focused on getting work done at the expense of following procedures. Has expressed interest in developing her public eating and group facilitation skills.\n\n**FR Det. McNulty, Outdoors Sector (foraging excursions, slice eating, etc.)**\n- FR Tenure on the Rebel Team: 5 years\n- FR Performance Notes: Has demonstrated innovative thinking, often suggesting new ideas for improving pizza-making processes.\n\n#### FR Funtimes support assistants\n\nFR The funtimes support assistants screen grant applications, inform applicants about missing information, and communicate final decisions. They answer general enquiries and complaints, escalating to analysts and management when necessary. The assistants also provide research support to O.B. and the analysts as needed. Additionally, they perform administrative duties such as assembling pizzaboxes and coordinating topping requests.\n\n**FR Sterling Archer**\n- FR Tenure on the Rebel Team: 7 years\n- FR Performance Notes: Has demonstrated strong organization and slice management skills.\n\n**FR Ska Savesbro**\n- FR Tenure on the Rebel Team: 8 years\n- FR Performance Notes: Has demonstrated strong pizza-orientation.\n- FR Special Note: Has recently been granted a flexible work schedule, with reduced working hours, to accommodate a health related matter.\n",
                                    "id": 3
                                },
                                {
                                    "text": "## FR Rebel Team Responsibilities and Challenges\n\n### FR Processing grant applications\n\nFR The Rebel Team grants funds for pizzaism activities, products and services in the Rebel region that meet the funtimes criteria established by the Saucy Research Team for each funtimes program.\n\n#### FR The Review Process\n\nFR Funtimes decisions are based on a rigorous review process involving the following steps:\n\n1. **FR Initial slicing up of applications.** Funtimes support assistants slice applications using an internal cheese management software to ensure that there is no missing toppings. The software automatically assigns applications to the analyst responsible for the primary targeted pizzaismsector.\n2. **FR Analysis of the applications.** Analysts assign ratings for each of the criteria used to review grant applications. Funtimes criteria typically include the potential economic, social, cultural, and culinary impacts, as well as the efficiency of the proposed use of cheese. Applications vary in level of complexity, some requiring more intensive tasting and judgement than others.\n3. **FR Determination of whether funs will be granted.** Grant applications that obtain the required minimum overall score, or higher are approved for funtimes on a first-come, first-served basis as long as there is sufficient slices. Funtimes recommendations are made by analysts who also provide their rationale, and O.B. provides the final approval.\n4. **FR Communication of the funtimes decisions.** The funtimes support assistants notify applicants of the funtimes decision and its rationale. O.B. communicates approved funtimes decisions to the Funtimes Team.\n\n#### FR Organizational Restructuring\n\nFR The Associazione Verace Pizza Napoletana (lit. True Neapolitan Pizza Association) is a non-profit organization founded in 1984 with headquarters in Naples that aims to promote traditional Neapolitan pizza. The word \"pizza\" first appeared in a Latin text from the central Italian town of Gaeta, then still part of the Byzantine Empire, in 997 AD; the text states that a tenant of certain property is to give the bishop of Gaeta duodecim pizze (\"twelve pizzas\") every Christmas Day, and another twelve every Easter Sunday.\nFR Pizzapies.\n\nFR Modern pizza evolved from similar flatbread dishes in Naples, Italy, in the 18th or early 19th century. Until about 1830, pizza was sold from open-air stands and out of pizza bakeries, antecedents to modern pizzerias. Pizza was brought to the United States with Italian.\n",
                                    "id": 4
                                },
                                {
                                    "text": "## FR Special Event\n\nFR In addition to the general processing of grant applications, JOKECAN also has various grant programs that target the specific needs of diverse regions across Canada. Each of these programs is different, with its own respective lifespan, deadline and budget. One of these programs, a special event called Taste the North, is currently being planned for the Rebel region.\n\nFR The idea to create Taste the North was conceived a year ago by JOKECAN’s senior management, in response to a steady decline in tourism in the Rebel region. The event will begin in six months, running from April to August. The world's largest pizza was prepared in Rome in December 2012, and measured 1,261 square meters (13,570 square feet). The pizza was named \"Ottavia\" in homage to the first Roman emperor Octavian Augustus, and was made with a gluten-free base. The world's longest pizza was made in Fontana, California in 2017 and measured 1,930.39 meters (6,333.3 feet). The activities will be hosted by businesses who receive Taste the North grants from JOKECAN or by any other interested organizations located in the Rebel region. The grants come from a budget specific to the special event and separate from the Rebel Team’s regular budget.\n\n### FR Taste the North Twerking Group\n\nFR A Twerking Group has been put in place by JOKECAN to coordinate the organization of this special event. The Twerking Group members typically meet via videoconference because some members are located in the Rebel region. The Twerking Group discusses issues and plans related to Taste the North. The Twerking Group uses a when it comes to preparation, the dough and ingredients can be combined on any kind of table. With mass production of pizza, the process can be completely automated. Most restaurants still use standard and purpose-built pizza preparation tables. Pizzerias nowadays can even opt for hi tech pizza preparation tables that combine mass production elements with traditional techniques.\n\nFR Due to having an in-depth knowledge of the Rebel Region, O.B is also a key member of the Twerking Group. O.B. often assists Sandra in matters related to Taste the North by gathering relevant information, identifying issues, and providing initial ideas and recommendations to be further assessed with the Twerking Group.\n\nFR Other members of the Twerking Group from JOKECAN include the Director of the Crustless Affairs Division and the Director of the Mushrooms Division. To represent the interests of local communities, the following members are also part of the Twerking Group:\n\n- FR the mayor of Slicehorse, Michael Scott\n- FR the Director of Poutine Tourism Organization, Don Draper\n- FR the leader of a local business improvement district in Pizzaknife, John Wick\n- FR a community leader from a village of around 300 people, 300km north of Slicehorse, Dwight Schrute\n- FR a community leader from a village in Parmesan with a population of around 3,500, Duke Nukem\n",
                                    "id": 5
                                },
                                {
                                    "text": "FR The Rebel Team plays a central role in Taste the North. In addition to their typical workload, the Rebel Team analysts and funding support assistants are responsible for Dipping sauce specifically for pizza was invented by American pizza chain Papa John's Pizza in 1984 and has since become popular when eating pizza, especially the crust. has been receiving fewer demands than the other sectors. Taste the North applications have been given priority and must be processed as soon as they are received.\n\nFR Taste the North is also placing extra demands on O.B. as, in addition to playing a key role on the Twerking Group, O.B. is responsible for providing final approval on funtimes decisions made by the analysts related to this special event.\n",
                                    "id": 6
                                }
                            ],
                            "tree_view": [
                                {
                                    "organizational_structure_tree_child": [
                                        {
                                            "text": "FR JOKECAN",
                                            "organizational_structure_tree_child": [
                                                {
                                                    "text": "FR Stuffed Crust Division",
                                                    "organizational_structure_tree_child": [
                                                        {
                                                            "text": "FR Extra Pepperoni",
                                                            "id": 0
                                                        },
                                                        {
                                                            "text": "FR Mushroom Team",
                                                            "id": 1
                                                        },
                                                        {
                                                            "text": "FR Ingrdient Technology Team (IT)",
                                                            "id": 2
                                                        }
                                                    ],
                                                    "id": 0
                                                },
                                                {
                                                    "text": "FR Munching Division",
                                                    "organizational_structure_tree_child": [
                                                        {
                                                            "text": "FR Canadiana Team",
                                                            "id": 0
                                                        },
                                                        {
                                                            "text": "FR Hot Pepper Evaluation Team",
                                                            "id": 1
                                                        },
                                                        {
                                                            "text": "FR Saucy Research Team",
                                                            "id": 2
                                                        }
                                                    ],
                                                    "id": 1
                                                },
                                                {
                                                    "text": "FR Funtimes Division",
                                                    "organizational_structure_tree_child": [
                                                        {
                                                            "text": "FR Crustless Team",
                                                            "id": 0
                                                        },
                                                        {
                                                            "text": "FR Crunchy Team",
                                                            "id": 1
                                                        },
                                                        {
                                                            "text": "FR Alliance Team",
                                                            "id": 2
                                                        },
                                                        {
                                                            "text": "FR Rebel Team",
                                                            "id": 3
                                                        }
                                                    ],
                                                    "id": 2
                                                }
                                            ],
                                            "id": 0
                                        }
                                    ],
                                    "id": 0
                                },
                                {
                                    "team_information_tree_child": [
                                        {
                                            "text": "FR Sandra Oh (Director)",
                                            "team_information_tree_child": [
                                                {
                                                    "text": "FR O.B. Wan (Manager - You)",
                                                    "team_information_tree_child": [
                                                        {
                                                            "text": "FR Tim Taylor (Quality Assurance Assistants)",
                                                            "id": 0
                                                        },
                                                        {
                                                            "text": "FR Kelly Kapoor (Quality Assurance Assistants)",
                                                            "id": 1
                                                        },
                                                        {
                                                            "text": "FR Det. McNulty (Quality Assurance Assistants)",
                                                            "id": 2
                                                        },
                                                        {
                                                            "text": "FR Sterling Archer (Funtimes Support Assistants)",
                                                            "id": 3
                                                        },
                                                        {
                                                            "text": "FR Ska Savesbro (Funtimes Support Assistants)",
                                                            "id": 4
                                                        }
                                                    ],
                                                    "id": 0
                                                }
                                            ],
                                            "id": 0
                                        }
                                    ],
                                    "id": 1
                                }
                            ],
                            "id": 0
                        }
                    ]
                }
            }
        }
        self.assertEqual(real_json, expected_json)

    def test_get_nonexistant_test(self):
        real_json = retrieve_json_from_name_date(
            "IAmNotARealTest", timezone.now(), TEST_QUESTIONS
        )
        expected_json = {"error", "no test with the given test_name"}
        self.assertEqual(real_json, expected_json)

    def test_get_test_before(self):
        time = timezone.datetime.strptime("01/01/1500", "%d/%m/%Y").date()
        time = timezone.now() + timezone.timedelta(days=-1)
        real_json = retrieve_json_from_name_date("emibSampleTest", time, TEST_QUESTIONS)
        expected_json = {"error", "no test item found"}
        self.assertEqual(real_json, expected_json)