-- MySQL dump 10.13  Distrib 5.7.44, for osx10.19 (x86_64)
--
-- Host: localhost    Database: wiki_area
-- ------------------------------------------------------
-- Server version	5.7.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `access_tokens`
--

DROP TABLE IF EXISTS `access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `access_tokens` (
  `access_token` varchar(64) DEFAULT NULL,
  `login` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `expiration_date` datetime DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_tokens`
--

LOCK TABLES `access_tokens` WRITE;
/*!40000 ALTER TABLE `access_tokens` DISABLE KEYS */;
INSERT INTO `access_tokens` VALUES ('e9b1f9813ac99532958a078b199e259d2fbf1f98dd8e7e6033cafa854ea7afd8','log123','test@bk.ru','2024-04-01 04:09:22',62),('e9b1f9813ac99532958a078b199e259d2fbf1f98dd8e7e6033cafa854ea7afd8','log123','test@bk.ru','2024-04-01 04:10:20',63),('18892b7f9ed261deb5736c3597355fb080985877cfacb51ff4c0d4ec4d4f13eb','log1','log1','2024-04-05 01:57:49',64),('2e72a897d75d942d2bd0f7b46832f58dbfc079dbeba9273dc1f4e7dcc20b576c','log2','log2','2024-04-05 02:44:28',65),('f9f99212c4471ed94b4a341efe468ac9bfdff9745db272ba03673318d0b45589','log2','log3','2024-04-05 02:47:37',66),('18892b7f9ed261deb5736c3597355fb080985877cfacb51ff4c0d4ec4d4f13eb','log1','log1','2024-04-05 02:52:33',67),('2e72a897d75d942d2bd0f7b46832f58dbfc079dbeba9273dc1f4e7dcc20b576c','log2','log2','2024-04-05 16:53:57',68),('f9f99212c4471ed94b4a341efe468ac9bfdff9745db272ba03673318d0b45589','log3','log3','2024-04-05 22:16:52',69),('55b98320882ed11cb2847d3ff1f70e1c18ee79f5ae0b5a9a2cbdbbeff2db3e38','log4','log4','2024-04-10 23:07:30',70),('9849fb510b96926fc3671b327041c1ec89da2f4cde2a99f6dae5b5add5382299','log9','log9','2024-04-10 23:35:14',71),('707ba0f804a2a8206eb95eb26f98ee1229b782ca2c0163b1fae111c70fa0ca85','pp2','pp2','2024-04-10 23:38:40',72),('d6b95f11373d4121efa628e82dd3670a63ca4f85b578b3b2fdb6d101c73f40ce','pp3','pp3','2024-04-10 23:42:55',73),('95a4aa42f9d48d5aa917649d44c87b8a9fd726beb8921ea6a6ad26291ade7add','log0','log0','2024-04-25 13:45:52',74),('e83d0f2797226acc0b52198a0cf8387855a9428c7e5b91a913d7c501cec6d6a5','log99','log99','2024-04-25 16:17:45',75),('0044e41b0a26eb0f566081778e309b3afbaa09f661912b3c6ca20d72af19e813','log000','email@mail.ru','2024-05-03 04:31:58',76),('43b3d7b670aed8d20267188cce0c77d546442c83bcc7b1ee324df553ef3f0930','student-1','e@e.com','2024-05-03 05:06:53',77),('1d52c5eb8efa94297705854e9911b5014bf7541da78a7d3f0307f07bb63d32b6','po2','po2','2024-05-04 10:31:49',78),('f04c9a7c4617811fc140f120182dc3b3ae7998912b2a11731997ce27b030dd9a','user0','user0','2024-05-04 16:46:52',79),('f1359625cf7231edc9424e1d0416d45b8ccdefe398d90b24d73e22196c83b30f','user1','user1','2024-05-04 16:50:51',80),('ffd0ffb34b8d163f030edf54df24b1cbb2453fd72c8bc9280e72839237cc68f3','admin01','admin@mail.ru','2024-05-04 17:09:55',81),('78af0cd218dc94be29f9839487d2a7e3fe648f3c0c710f5d3155dfb3f2c83bfa','log-admin-1','new-email@1.com','2024-05-21 17:02:13',82),('c2f741d131f0e4a78fb95da16d717b3414c153b99775093e8b2ba8b16ec7f1b7','log-student-100','student-100@email.ru','2024-05-28 12:08:44',83),('35847c27074e891b173bcbafdd53b6499bec8f6ba594b36072653e84610f7044','sergey','sergey@bk.ru','2024-06-14 11:34:02',84);
/*!40000 ALTER TABLE `access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `login` varchar(100) NOT NULL,
  `created_at` date NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `second_name` varchar(100) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (NULL,'log1','log1','2024-04-05',1,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',NULL,NULL,NULL),(NULL,'log4','log4','2024-04-10',2,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',NULL,NULL,NULL),(NULL,'log99','log99','2024-04-25',3,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',NULL,NULL,NULL),(NULL,'admin@mail.ru','admin01','2024-05-04',4,'691d69168b9c017457163237e65841b06ed6e613638d151c6a2a5bf2eea27350',NULL,NULL,NULL),(NULL,'new-email@1.com','log-admin-1','2024-05-21',5,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',NULL,NULL,NULL);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deleted_projects`
--

DROP TABLE IF EXISTS `deleted_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deleted_projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `description` text,
  `created_at` date DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `topic` varchar(100) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `complexity` int(11) DEFAULT NULL,
  `is_moderated` int(11) DEFAULT NULL,
  `deleted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletion_reason` text,
  `is_moderation_in_progress` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deleted_projects`
--

LOCK TABLES `deleted_projects` WRITE;
/*!40000 ALTER TABLE `deleted_projects` DISABLE KEYS */;
INSERT INTO `deleted_projects` VALUES (1,'Название проекта 1','','2024-04-09','6',NULL,'2001-02-25',3,1,'2024-06-14 06:51:54','Недостаточно описательной информации',1),(3,'Семинары по веб','Семинары по веб разработке в действии','2024-04-06','log2','Web-разработка','2001-01-05',2,1,'2024-04-06 12:19:17','Тестирование приложения',NULL),(5,NULL,NULL,'2024-04-09','6',NULL,NULL,NULL,0,'2024-05-21 12:03:56','нет деталей',NULL),(6,'123','123','2024-05-21','6','Web-разработка','2024-12-12',3,0,'2024-05-21 14:31:38',NULL,NULL),(7,'Проект разработки веб-приложений на NodeJS','Разработка веб-приложений на NodeJs','2024-05-21','6','Web-разработка','2024-12-21',3,0,'2024-05-21 14:32:37',NULL,NULL);
/*!40000 ALTER TABLE `deleted_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(20) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `text` text,
  `user_login` varchar(100) DEFAULT NULL,
  `message_id` varchar(12) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `companion_user_login` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_role_name` (`role`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_role_name` FOREIGN KEY (`role`) REFERENCES `roles` (`role_name`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'student','2024-04-10 18:43:39','hi','user123','c6562e1466ad',NULL,NULL),(2,'student','2024-04-10 18:43:42','test','user123','a2d095b7d562',NULL,NULL),(3,'student','2024-04-10 18:43:45','oppo','user123','b35f7bcaa30e',NULL,NULL),(4,'student','2024-05-04 12:04:45','Здравствуйе!','user123','32003299dc42',NULL,'log3'),(5,'student','2024-05-04 12:10:33','привет!','user123','7270788eb02a',NULL,NULL),(6,'student','2024-05-20 22:32:47','халоу','user123','7f351707ce2e',NULL,NULL),(7,'student','2024-05-21 11:57:55','привет','user123','168bb5e12549',NULL,NULL),(8,'student','2024-05-28 07:11:11','Добрый день!','user123','5cabbca5d2f6',NULL,NULL),(13,'student','2024-06-09 13:38:19','hi','student-1','20e88308bb6c',NULL,NULL),(14,'student','2024-06-09 15:39:00','Привет','student-1','73701eb6c7ff',NULL,'log3'),(15,'student','2024-06-09 15:39:32','Привет, как дела ?','student-1','2ec8243df46d',NULL,'log4'),(16,'admin','2024-06-09 15:48:42','Привет, норм','log4','cdc1b148ef7c',NULL,'student-1'),(17,'student','2024-06-14 06:37:41','Добрый день, подскажите, пожалуйста, есть ли запас времени на пересдачу модулей проектов ?','sergey','e214857fa207',NULL,'log0'),(18,'teacher','2024-06-14 06:46:54','Добрый день, Сергей!','log0','90aca72faa73',NULL,'sergey'),(19,'teacher','2024-06-14 06:47:03','Да, есть стандартные 2 недели','log0','d57c3731276c',NULL,'sergey');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module_files`
--

DROP TABLE IF EXISTS `module_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `module_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) DEFAULT NULL,
  `module_task_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_module_files_on_tasks` (`module_task_id`),
  CONSTRAINT `fk_module_files_on_tasks` FOREIGN KEY (`module_task_id`) REFERENCES `tasks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module_files`
--

LOCK TABLES `module_files` WRITE;
/*!40000 ALTER TABLE `module_files` DISABLE KEYS */;
INSERT INTO `module_files` VALUES (1,'mock file ref',1);
/*!40000 ALTER TABLE `module_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_modules`
--

DROP TABLE IF EXISTS `project_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) DEFAULT NULL,
  `exercise` text,
  `project_id` int(11) DEFAULT NULL,
  `material_id` int(11) DEFAULT NULL,
  `test_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_project` (`project_id`),
  CONSTRAINT `fk_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_modules`
--

LOCK TABLES `project_modules` WRITE;
/*!40000 ALTER TABLE `project_modules` DISABLE KEYS */;
INSERT INTO `project_modules` VALUES (1,'Первый тестовый модуль',NULL,NULL,NULL,NULL),(2,'Второй тестовый модуль',NULL,NULL,NULL,NULL),(3,'Тестовый модуль №1',NULL,NULL,NULL,NULL),(4,'Второй тестовый модуль проекта 1',NULL,NULL,NULL,NULL),(5,'Второй тестовый модуль проекта 3',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `project_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `author` int(11) DEFAULT NULL,
  `topic` varchar(300) DEFAULT NULL,
  `deadline` varchar(100) DEFAULT NULL,
  `complexity` int(11) DEFAULT NULL,
  `is_moderated` int(11) DEFAULT NULL,
  `is_moderation_in_progress` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_author` (`author`),
  CONSTRAINT `fk_author` FOREIGN KEY (`author`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (4,'','Разработка нетандартных машин','2024-05-28',NULL,NULL,'',3,0,NULL),(5,'Практика NodeJS разработки','Учимся программировать на NodeJs','2024-06-14',6,'Web-разработка','2024-09-10',2,1,NULL),(6,'Практики devops','Учимся базам devops и CI/CD','2024-06-14',6,'Web-разработка','2024-09-10',2,1,NULL);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(3,'student'),(2,'teacher');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_projects`
--

DROP TABLE IF EXISTS `student_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_projects` (
  `student_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`student_id`,`project_id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `student_projects_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  CONSTRAINT `student_projects_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_projects`
--

LOCK TABLES `student_projects` WRITE;
/*!40000 ALTER TABLE `student_projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_scores`
--

DROP TABLE IF EXISTS `student_scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_scores` (
  `student_id` int(11) DEFAULT NULL,
  `task_point` int(11) DEFAULT NULL,
  `test_point` int(11) DEFAULT NULL,
  `task_id` int(11) DEFAULT NULL,
  `test_id` int(11) DEFAULT NULL,
  KEY `fk_student_scores` (`student_id`),
  KEY `fk_task_scores` (`task_id`),
  KEY `fk_test_scores` (`test_id`),
  CONSTRAINT `fk_student_scores` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  CONSTRAINT `fk_task_scores` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`),
  CONSTRAINT `fk_test_scores` FOREIGN KEY (`test_id`) REFERENCES `tests` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_scores`
--

LOCK TABLES `student_scores` WRITE;
/*!40000 ALTER TABLE `student_scores` DISABLE KEYS */;
INSERT INTO `student_scores` VALUES (5,70,10,1,0),(6,100,100,2,0),(2,NULL,30,NULL,1),(6,NULL,30,NULL,2),(2,60,30,2,3),(2,NULL,90,2,4);
/*!40000 ALTER TABLE `student_scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `login` varchar(100) NOT NULL,
  `created_at` date NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(100) DEFAULT NULL,
  `is_blocked` int(11) NOT NULL DEFAULT '0',
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (NULL,'log3','log3','2024-04-05',2,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',0,NULL,NULL,NULL),(NULL,'log9','log9','2024-04-10',3,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',0,NULL,NULL,NULL),(NULL,'pp2','pp2','2024-04-10',4,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',0,NULL,NULL,NULL),(NULL,'pp3','pp3','2024-04-10',5,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',0,NULL,NULL,NULL),(NULL,'e@e.com','student-1','2024-05-03',6,'a4a61fefba22fd006bba9bf9540225499d3090bdbc969b29b1cf18a050534509',0,NULL,NULL,NULL),(NULL,'user0','user0','2024-05-04',7,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',0,NULL,NULL,NULL),(NULL,'user1','user1','2024-05-04',8,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',0,NULL,NULL,NULL),(NULL,'newuser@email.ru','new-user-20','2024-05-19',9,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',0,NULL,NULL,NULL),(NULL,'123','new-user-2','2024-05-19',14,'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',0,NULL,NULL,NULL),(NULL,'logloglog','logloglog','2024-05-21',15,'3a1462aec97a70cd0d194e19a10c880e66efa3f065b48892335942036834a9ae',0,NULL,NULL,NULL),(NULL,'Stas-new-user','login1234','2024-05-21',16,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',0,NULL,NULL,NULL),(NULL,'Stas@email.com','Stanislav-1','2024-05-21',17,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',0,NULL,NULL,NULL),(NULL,'student-100@email.ru','log-student-100','2024-05-28',18,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',0,NULL,NULL,NULL),(NULL,'mail-100@mail.ru','new-test-login-1000','2024-05-28',19,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',0,NULL,NULL,NULL),(NULL,'mail-100@mail.ru','new-test-login-1000','2024-05-28',20,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',0,NULL,NULL,NULL),(NULL,'sergey@bk.ru','sergey','2024-06-14',21,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',0,NULL,NULL,NULL),(NULL,'test-user-44@gmail.com','test-user-44','2024-06-14',22,'d0fe7a5ae503a2a8a3870af8ca75d1528cff8db68fa550b43317b3e9a62d039c',0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `tests_link` int(11) DEFAULT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  `module_id` int(11) DEFAULT NULL,
  `pass_points` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_tasks` (`module_id`),
  CONSTRAINT `fk_tasks` FOREIGN KEY (`module_id`) REFERENCES `project_modules` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,2,'Задание-1','Нужно что-то сделать',123,NULL,1,0),(2,3,'Задание-2','Описание',122,NULL,2,0);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teachers` (
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `login` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `second_name` varchar(100) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `is_blocked` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES (NULL,'log2','log2','2024-04-05 14:53:57',5,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',NULL,NULL,NULL,0),(NULL,'log0','log0','2024-04-25 11:45:52',6,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','test','test','1980-08-08',0),(NULL,'email@mail.ru','log000','2024-05-03 02:31:58',7,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',NULL,NULL,NULL,0),(NULL,'po2','po2','2024-05-04 08:31:49',8,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tests`
--

DROP TABLE IF EXISTS `tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tests` (
  `title` varchar(100) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `question` varchar(250) DEFAULT NULL,
  `correct_answer_inner_id` tinyint(1) DEFAULT NULL,
  `answer` text,
  `answer_id` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `module_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tests` (`module_id`),
  CONSTRAINT `fk_tests` FOREIGN KEY (`module_id`) REFERENCES `project_modules` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tests`
--

LOCK TABLES `tests` WRITE;
/*!40000 ALTER TABLE `tests` DISABLE KEYS */;
INSERT INTO `tests` VALUES ('Тест-1',1,'Какие языки программирование поддерживают low level доступ к памяти ?',2,'C',1,0,1),('тестовое задание для проекта 4 модуль 3',1,'вопрос',1,'ответ',0,1,3),('тестовое задание для проекта 1 модуль 2',1,'вопрос',1,'ответ',0,2,4),('тестовое задание для проекта 1 модуль 2',1,'вопрос',1,'ответ',0,3,2),('тестовое задание для проекта 3 модуль 2',1,'вопрос',1,'ответ',0,4,5),('тестовое задание для проекта 1 модуль 1',1,'вопрос 1',1,'JavaScript',0,5,1),(NULL,2,'вопрос 2',2,'ответ',1,6,1),(NULL,3,'При битовых операциях во что превращается float64 в JavaScript ?',3,'int64',2,7,1),(NULL,4,'В каком из пакетных менеджеров NodeJS есть поддержка Workspaces ?',2,'npm',1,8,1),(NULL,1,'вопрос 1',1,'Basic',1,9,1),(NULL,1,'вопрос 1',1,'Python',2,10,1),(NULL,1,'вопрос 1',1,'Assembly',3,11,1),(NULL,2,'вопрос 2',2,'ответ верный',2,12,1),(NULL,2,'вопрос 2',2,'ответ 3',3,13,1),(NULL,2,'вопрос 2',2,'ответ 4',4,14,1),(NULL,3,'При битовых операциях во что превращается float64 в JavaScript ?',2,'int32',2,15,1),(NULL,4,'В каком из пакетных менеджеров NodeJS есть поддержка Workspaces ?',2,'yarn',2,16,1);
/*!40000 ALTER TABLE `tests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `original_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `login` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `user_type` enum('student','teacher','admin') DEFAULT NULL,
  `is_blocked` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_role_name` (`id`),
  KEY `idx_users_id` (`id`),
  KEY `idx_role_id` (`role_id`),
  CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,NULL,NULL,'log3','log3',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students',NULL,NULL,0),(5,NULL,NULL,'log4','log4',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','admins',NULL,NULL,0),(6,NULL,NULL,'log9','log9',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students',NULL,NULL,0),(7,NULL,NULL,'pp2','pp2',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students',NULL,NULL,0),(8,NULL,NULL,'pp3','pp3',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students',NULL,NULL,0),(9,NULL,NULL,'log0','log0',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','teachers',NULL,NULL,0),(10,3,NULL,'log99','log99',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','admins',1,NULL,0),(11,NULL,NULL,'email@mail.ru','log000',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','teachers',NULL,NULL,0),(12,NULL,NULL,'e@e.com','student-1',NULL,'a4a61fefba22fd006bba9bf9540225499d3090bdbc969b29b1cf18a050534509','students',NULL,NULL,0),(13,NULL,NULL,'po2','po2',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','teachers',NULL,NULL,1),(14,NULL,NULL,'user0','user0',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students',NULL,NULL,1),(15,NULL,NULL,'user1','user1',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students',NULL,NULL,1),(16,NULL,NULL,'admin@mail.ru','admin01',NULL,'691d69168b9c017457163237e65841b06ed6e613638d151c6a2a5bf2eea27350','admins',NULL,NULL,0),(17,14,NULL,'123','new-user-2','2024-05-19 15:56:02','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','students',3,NULL,1),(18,NULL,NULL,'new-email@1.com','log-admin-1',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','admins',NULL,NULL,0),(19,15,NULL,'logloglog','logloglog','2024-05-21 15:03:16','3a1462aec97a70cd0d194e19a10c880e66efa3f065b48892335942036834a9ae','students',3,NULL,1),(20,16,NULL,'Stas-new-user','login1234','2024-05-21 17:23:10','7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students',3,NULL,1),(21,17,NULL,'Stas@email.com','Stanislav-1','2024-05-21 17:33:34','7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students',3,NULL,1),(22,NULL,NULL,'student-100@email.ru','log-student-100',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students',NULL,NULL,1),(23,19,NULL,'mail-100@mail.ru','new-test-login-1000','2024-05-28 10:19:46','7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students',3,NULL,1),(24,19,NULL,'mail-100@mail.ru','new-test-login-1000','2024-05-28 10:19:47','7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students',3,NULL,1),(25,NULL,NULL,'sergey@bk.ru','sergey',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students',NULL,NULL,1),(26,22,NULL,'test-user-44@gmail.com','test-user-44','2024-06-14 09:51:18','d0fe7a5ae503a2a8a3870af8ca75d1528cff8db68fa550b43317b3e9a62d039c','students',3,NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'wiki_area'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-14  9:58:58
