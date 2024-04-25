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
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_tokens`
--

LOCK TABLES `access_tokens` WRITE;
/*!40000 ALTER TABLE `access_tokens` DISABLE KEYS */;
INSERT INTO `access_tokens` VALUES ('e9b1f9813ac99532958a078b199e259d2fbf1f98dd8e7e6033cafa854ea7afd8','log123','test@bk.ru','2024-04-01 04:09:22',62),('e9b1f9813ac99532958a078b199e259d2fbf1f98dd8e7e6033cafa854ea7afd8','log123','test@bk.ru','2024-04-01 04:10:20',63),('18892b7f9ed261deb5736c3597355fb080985877cfacb51ff4c0d4ec4d4f13eb','log1','log1','2024-04-05 01:57:49',64),('2e72a897d75d942d2bd0f7b46832f58dbfc079dbeba9273dc1f4e7dcc20b576c','log2','log2','2024-04-05 02:44:28',65),('f9f99212c4471ed94b4a341efe468ac9bfdff9745db272ba03673318d0b45589','log2','log3','2024-04-05 02:47:37',66),('18892b7f9ed261deb5736c3597355fb080985877cfacb51ff4c0d4ec4d4f13eb','log1','log1','2024-04-05 02:52:33',67),('2e72a897d75d942d2bd0f7b46832f58dbfc079dbeba9273dc1f4e7dcc20b576c','log2','log2','2024-04-05 16:53:57',68),('f9f99212c4471ed94b4a341efe468ac9bfdff9745db272ba03673318d0b45589','log3','log3','2024-04-05 22:16:52',69),('55b98320882ed11cb2847d3ff1f70e1c18ee79f5ae0b5a9a2cbdbbeff2db3e38','log4','log4','2024-04-10 23:07:30',70),('9849fb510b96926fc3671b327041c1ec89da2f4cde2a99f6dae5b5add5382299','log9','log9','2024-04-10 23:35:14',71),('707ba0f804a2a8206eb95eb26f98ee1229b782ca2c0163b1fae111c70fa0ca85','pp2','pp2','2024-04-10 23:38:40',72),('d6b95f11373d4121efa628e82dd3670a63ca4f85b578b3b2fdb6d101c73f40ce','pp3','pp3','2024-04-10 23:42:55',73),('95a4aa42f9d48d5aa917649d44c87b8a9fd726beb8921ea6a6ad26291ade7add','log0','log0','2024-04-25 13:45:52',74),('e83d0f2797226acc0b52198a0cf8387855a9428c7e5b91a913d7c501cec6d6a5','log99','log99','2024-04-25 16:17:45',75);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (NULL,'log1','log1','2024-04-05',1,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb'),(NULL,'log4','log4','2024-04-10',2,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb'),(NULL,'log99','log99','2024-04-25',3,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deleted_projects`
--

LOCK TABLES `deleted_projects` WRITE;
/*!40000 ALTER TABLE `deleted_projects` DISABLE KEYS */;
INSERT INTO `deleted_projects` VALUES (3,'Семинары по веб','Семинары по веб разработке в действии','2024-04-06','log2','Web-разработка','2001-01-05',2,1,'2024-04-06 12:19:17');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'student','2024-04-10 18:43:39','hi','user123','c6562e1466ad'),(2,'student','2024-04-10 18:43:42','test','user123','a2d095b7d562'),(3,'student','2024-04-10 18:43:45','oppo','user123','b35f7bcaa30e');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module_files`
--

LOCK TABLES `module_files` WRITE;
/*!40000 ALTER TABLE `module_files` DISABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_modules`
--

LOCK TABLES `project_modules` WRITE;
/*!40000 ALTER TABLE `project_modules` DISABLE KEYS */;
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
  `author` varchar(100) DEFAULT NULL,
  `topic` varchar(300) DEFAULT NULL,
  `deadline` varchar(100) DEFAULT NULL,
  `complexity` int(11) DEFAULT NULL,
  `is_moderated` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'','','2024-04-09',NULL,NULL,'2001-02-25',3,0),(3,'','','2024-04-25',NULL,NULL,'',NULL,0),(4,NULL,NULL,'2024-04-09',NULL,NULL,NULL,NULL,0),(5,NULL,NULL,'2024-04-09',NULL,NULL,NULL,NULL,0);
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
  `role_name` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'teacher'),(3,'student');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (NULL,'log3','log3','2024-04-05',2,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb'),(NULL,'log9','log9','2024-04-10',3,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb'),(NULL,'pp2','pp2','2024-04-10',4,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb'),(NULL,'pp3','pp3','2024-04-10',5,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `tests_link` int(11) DEFAULT NULL,
  `file_name` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,2,'Задание-1','Нужно что-то сделать',123,NULL),(2,3,'Задание-2','Описание',122,NULL);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES (NULL,'log2','log2','2024-04-05 14:53:57',5,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb',NULL,NULL,NULL),(NULL,'log0','log0','2024-04-25 11:45:52',6,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','test','test','1980-08-08');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tests`
--

DROP TABLE IF EXISTS `tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tests` (
  `title` varchar(100) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `question` varchar(250) DEFAULT NULL,
  `correct_answer_flag` tinyint(1) DEFAULT NULL,
  `answer` text,
  `description` varchar(250) DEFAULT NULL,
  `answer_id` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tests`
--

LOCK TABLES `tests` WRITE;
/*!40000 ALTER TABLE `tests` DISABLE KEYS */;
INSERT INTO `tests` VALUES ('Тест-1',1,'Вопрос-1',2,'ответ-1','описание теста',1,0);
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
  `role` enum('admins','teachers','students') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,NULL,NULL,'log1','log1',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','admins'),(3,NULL,NULL,'log2','log2',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','teachers'),(4,NULL,NULL,'log3','log3',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students'),(5,NULL,NULL,'log4','log4',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','admins'),(6,NULL,NULL,'log9','log9',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students'),(7,NULL,NULL,'pp2','pp2',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students'),(8,NULL,NULL,'pp3','pp3',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','students'),(9,NULL,NULL,'log0','log0',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','teachers'),(10,NULL,NULL,'log99','log99',NULL,'7a0236bdda1e612ba6b74e8a330f5319f9a7027772cad3f4d2953c8d6c2c04fb','admins');
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

-- Dump completed on 2024-04-25 14:45:51
