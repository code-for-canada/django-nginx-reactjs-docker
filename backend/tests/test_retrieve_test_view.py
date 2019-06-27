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


class RetrieveInTest(TestCase):
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
                                }
                            ],
                            "tree-view": [
                                {
                                    "tree-child": [
                                        {
                                            "text": "Jenna Icard - President",
                                            "id": 0
                                        },
                                        {
                                            "text": "Amari Kinsler - Corporate Affairs Director",
                                            "id": 1
                                        },
                                        {
                                            "text": "Marc Sheridan - Human Resources Manager",
                                            "id": 2
                                        },
                                        {
                                            "text": "Bob McNutt - Finance Manager",
                                            "id": 3
                                        },
                                        {
                                            "text": "Lana Hussad - Information Technology Manager",
                                            "id": 4
                                        },
                                        {
                                            "text": "Geneviève Bédard - Research and Innovations Director",
                                            "id": 5
                                        },
                                        {
                                            "text": "Bartosz Greco - Program Development Director",
                                            "id": 6
                                        },
                                        {
                                            "text": "Nancy Ward - Services and Communications Director",
                                            "id": 7
                                        },
                                        {
                                            "text": "Claude Huard - Quality Assurance Manager (You)",
                                            "id": 8
                                        },
                                        {
                                            "text": "Haydar Kalil - Services and Support Manager",
                                            "id": 9
                                        },
                                        {
                                            "text": "Geoffrey Hamma - Audits Manager",
                                            "id": 10
                                        },
                                        {
                                            "text": "Lucy Trang - E-Training Manager",
                                            "id": 11
                                        }
                                    ],
                                    "id": 0
                                },
                                {
                                    "tree-child": [
                                        {
                                            "text": "Claude Huard - Manager (You)",
                                            "id": 0
                                        },
                                        {
                                            "text": "Danny McBride - QA Analyst",
                                            "id": 1
                                        },
                                        {
                                            "text": "Serge Duplessis - QA Analyst",
                                            "id": 2
                                        },
                                        {
                                            "text": "Marina Richter - QA Analyst",
                                            "id": 3
                                        },
                                        {
                                            "text": "Mary Woodside - QA Analyst",
                                            "id": 4
                                        },
                                        {
                                            "text": "Charlie Wang - QA Analyst",
                                            "id": 5
                                        },
                                        {
                                            "text": "Jack Laurier - QA Analyst",
                                            "id": 6
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
                                }
                            ],
                            "tree-view": [
                                {
                                    "tree-child": [
                                        {
                                            "text": "Jenna Icard - Présidente",
                                            "id": 0
                                        },
                                        {
                                            "text": "Amari Kinsler - Directeur, Affaires ministérielles",
                                            "id": 1
                                        },
                                        {
                                            "text": "Marc Sheridan - Gestionnaire, Ressources humaines",
                                            "id": 2
                                        },
                                        {
                                            "text": "Bob McNutt - Gestionnaire, Finances",
                                            "id": 3
                                        },
                                        {
                                            "text": "Lana Hussad - Gestionnaire, Technologies de l'information",
                                            "id": 4
                                        },
                                        {
                                            "text": "Geneviève Bédard - Directrice, Recherche et innovations",
                                            "id": 5
                                        },
                                        {
                                            "text": "Bartosz Greco - Directeur, Développement de programmes",
                                            "id": 6
                                        },
                                        {
                                            "text": "Nancy Ward - Directrice, Services et communications",
                                            "id": 7
                                        },
                                        {
                                            "text": "Claude Huard - Gestionnaire, Assurance de la qualité (vous)",
                                            "id": 8
                                        },
                                        {
                                            "text": "Haydar Kalil - Gestionnaire, Service et soutien",
                                            "id": 9
                                        },
                                        {
                                            "text": "Geoffrey Hamma - Gestionnaire, Vérifications",
                                            "id": 10
                                        },
                                        {
                                            "text": "Lucy Trang - Gestionnaire, Formation en ligne",
                                            "id": 11
                                        }
                                    ],
                                    "id": 0
                                },
                                {
                                    "tree-child": [
                                        {
                                            "text": "Claude Huard - Gestionnaire (vous)",
                                            "id": 0
                                        },
                                        {
                                            "text": "Danny McBride - Analyste de l’assurance de la qualité",
                                            "id": 1
                                        },
                                        {
                                            "text": "Serge Duplessis - Analyste de l’assurance de la qualité",
                                            "id": 2
                                        },
                                        {
                                            "text": "Marina Richter - Analyste de l’assurance de la qualité",
                                            "id": 3
                                        },
                                        {
                                            "text": "Mary Woodside - Analyste de l’assurance de la qualité",
                                            "id": 4
                                        },
                                        {
                                            "text": "Charlie Wang - Analyste de l’assurance de la qualité",
                                            "id": 5
                                        },
                                        {
                                            "text": "Jack Laurier - Analyste de l’assurance de la qualité",
                                            "id": 6
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
