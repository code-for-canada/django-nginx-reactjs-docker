from django.utils import timezone
from django.test import TestCase
from views.retrieve_test_view import retrieve_json_from_name_date, TEST_META_DATA, TEST_INSTRUCTIONS, TEST_QUESTIONS


class RetrieveMetaTest(TestCase):
    def test_get_real_sample(self):
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", timezone.now(), TEST_META_DATA)
        expected_json = {
            "test_internal_name": "emibSampleTest",
            "test_en_name": "eMiB Sample Test",
            "test_fr_name": "FR eMiB Sample Test",
            "is_public": True,
            "default_time": None,
            "test_type": "emib"
        }
        self.assertEqual(real_json, expected_json)

    def test_get_nonexistant_test(self):
        real_json = retrieve_json_from_name_date(
            "IAmNotARealTest", timezone.now(), TEST_META_DATA)
        expected_json = {"error", "no test with the given test_name"}
        self.assertEqual(real_json, expected_json)

    def test_get_test_before(self):
        time = timezone.datetime.strptime('01/01/1500', "%d/%m/%Y").date()
        time = timezone.now() + timezone.timedelta(days=-1)
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", time, TEST_META_DATA)
        expected_json = {'error', 'no test item found'}
        self.assertEqual(real_json, expected_json)


class RetrievePreTest(TestCase):
    def test_get_real_sample(self):
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", timezone.now(), TEST_INSTRUCTIONS)
        expected_json = {
            "test_internal_name": "emibSampleTest",
            "instructions": []
        }
        self.assertEqual(real_json, expected_json)

    def test_get_nonexistant_test(self):
        real_json = retrieve_json_from_name_date(
            "IAmNotARealTest", timezone.now(), TEST_INSTRUCTIONS)
        expected_json = {"error", "no test with the given test_name"}
        self.assertEqual(real_json, expected_json)

    def test_get_test_before(self):
        time = timezone.datetime.strptime('01/01/1500', "%d/%m/%Y").date()
        time = timezone.now() + timezone.timedelta(days=-1)
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", time, TEST_INSTRUCTIONS)
        expected_json = {'error', 'no test item found'}
        self.assertEqual(real_json, expected_json)


class RetrieveInTest(TestCase):
    def test_get_real_sample(self):
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", timezone.now(), TEST_QUESTIONS)
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
                            "body": "Bonjour Claude.Alors que vous vous familiarisez avec vos nouvelles fonctions, j’aimerais vous faire part de certaines de mes opinions concernant les changements que l’on propose d’apporter à notre système de demandes de services et à nos pratiques en matière de documentation.\n\nJe travaille au sein de l’Équipe de l’assurance de la qualité depuis plus de 12 ans. J’estime que, dans l’ensemble, nous avons bien réussi à comprendre et à traiter les demandes de service. Le passage à un système automatisé et informatisé prendrait beaucoup de temps avant qu’on s’y adapte et pourrait compromettre la qualité de notre service. Par exemple, une conversation en personne ou par téléphone avec un client peut nous aider à mieux comprendre ses problèmes, car cela nous permet de poser des questions d’approfondissement et d’obtenir des renseignements importants sur chaque cas. En adoptant cette nouvelle technologie, nous risquons d’avoir plus de problèmes de TI et des retards imprévus à long terme.\n\nJ’ai déjà exprimé mon opinion lors de réunions précédentes, mais je n’ai pas l’impression que mes opinions comptent. Tous les autres sont dans l’équipe depuis moins de deux ans et je me sens ignoré parce que je suis le plus âgé de l’équipe. Je vous encourage à tenir compte de mon opinion afin que nous ne commettions pas une erreur coûteuse. \n\nSerge",
                            "id": 0
                        },
                        {
                            "subject": "Formation informelle sur Serv",
                            "from": "Marina Richter (analyste de l’assurance de la qualité, Équipe de l’assurance de la qualité)",
                            "to": "Claude Huard (gestionnaire, Équipe de l’assurance de la qualité)",
                            "date": "Le vendredi 4 novembre",
                            "body": "Bonjour Claude.\nLors de notre dernière réunion, Danny a indiqué qu’il avait beaucoup appris sur le système Serv  pendant l’exercice d’essai pilote avec l’Équipe des TI. En discutant avec d’autres membres de notre équipe, certains ont mentionné qu’ils avaient reçu une formation et avaient travaillé avec une ancienne version de Serv dans des emplois antérieurs. Cependant, certains d’entre nous ne l’ont jamais utilisée. J’aimerais savoir s’il y aurait des possibilités d’être formé sur Serv ?\nMarina",
                            "id": 1
                        },
                        {
                            "subject": "Date limite de dépôt du rapport",
                            "from": "Charlie Wang (analyste de l’assurance de la qualité, Équipe de l’assurance de la qualité)",
                            "to": "Claude Huard (gestionnaire, Équipe de l’assurance de la qualité)",
                            "date": "Le vendredi 4 novembre",
                            "body": "Bonjour Claude.\nJe travaille avec Clara Farewell de l’Unité de recherche et innovations sur l’évaluation de la qualité d’une approche de formation et j’ai de la difficulté à la joindre. Je commence à m’inquiéter parce que j’attendais qu’elle termine sa partie du travail pour achever le rapport d’évaluation.\nAu cours des trois dernières semaines, nous avions prévu des rencontres de travail les vendredis après-midi et, après avoir annulé la première rencontre, elle était absente aux deux dernières, sans donner un préavis. Elle n’a pas non plus répondu à mes tentatives de communiquer avec elle par téléphone ou par courriel. Je m’inquiète de ne pas pouvoir terminer le rapport d’ici vendredi prochain sans sa part du travail.\nDans un autre ordre d’idées, un de mes collègues de l’Unité de développement des programmes m’a dit que son directeur, Bartosz Greco, inviterait des employés d’autres unités à les aider à créer un nouveau programme de formation. Ils veulent adopter une approche qui inclut des perspectives multiples. J’aimerais bien participer à ce processus. Comme d’habitude, la permission du gestionnaire est requise pour y participer. Je me demande ce que tu en penses.\nMerci,\nCharlie",
                            "id": 2
                        }
                    ]
                }
            }
        }
        self.assertEqual(real_json, expected_json)

    def test_get_nonexistant_test(self):
        real_json = retrieve_json_from_name_date(
            "IAmNotARealTest", timezone.now(), TEST_QUESTIONS)
        expected_json = {"error", "no test with the given test_name"}
        self.assertEqual(real_json, expected_json)

    def test_get_test_before(self):
        time = timezone.datetime.strptime('01/01/1500', "%d/%m/%Y").date()
        time = timezone.now() + timezone.timedelta(days=-1)
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", time, TEST_QUESTIONS)
        expected_json = {'error', 'no test item found'}
        self.assertEqual(real_json, expected_json)
