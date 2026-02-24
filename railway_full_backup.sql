-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: centerbeam.proxy.rlwy.net    Database: railway
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `brandId` int NOT NULL AUTO_INCREMENT,
  `brandName` varchar(100) NOT NULL,
  `logoUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`brandId`),
  UNIQUE KEY `brandName` (`brandName`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Aston Martin','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/AstonMartinLogo.svg'),(2,'Audi','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/AudiLogo.svg'),(3,'Bentley','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/BentleyLogo.svg'),(4,'BMW','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/BMWLogo.svg'),(5,'Ferrari','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/FerrariLogo.svg'),(6,'Ford','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/FordLogo.svg'),(7,'Honda','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/HondaLogo.svg'),(8,'Hyundai','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/HyundaiLogo.svg'),(9,'Kia','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/KiaLogo.svg'),(10,'Lamborghini','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/LamborghiniLogo.svg'),(11,'Lexus','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/LexusLogo.svg'),(12,'Mazda','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/MazdaLogo.svg'),(13,'Mercedes-Benz','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/MBLogo.svg'),(14,'McLaren','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/MclarenLogo.svg'),(15,'Mini','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/MiniLogo.svg'),(16,'Nissan','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/NissanLogo.svg'),(17,'Rolls-Royce','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/RollsRoyceLogo.svg'),(18,'Subaru','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/SubaruLogo.svg'),(19,'Tesla','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/TeslaLogo.svg'),(20,'Toyota','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/ToyotaLogo.svg'),(21,'Volkswagen','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/VolkswagenLogo.svg'),(22,'Volvo','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/VolvoLogo.svg'),(23,'Porsche','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/Porsche.svg'),(24,'Isuzu','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/Izusu.svg'),(25,'GMC Motor','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/brands/GMCIcon.svg');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `carId` int NOT NULL AUTO_INCREMENT,
  `carName` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `brandId` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `isTrending` tinyint(1) DEFAULT '0',
  `displayOrder` int DEFAULT '0',
  `price` decimal(12,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`carId`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (1,'Mercedes Benz CLS53 AMG',2022,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/cls53.png',13,5,1,1,4990000.00),(2,'Toyota Fortuner Legender',2023,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/toyotafortuner.png',20,7,1,2,1849000.00),(3,'Ford Everest Sport',2023,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/fordeverest.png',6,7,1,3,1484000.00),(4,'Tesla Model 3',2024,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/teslamodel3.png',19,3,0,4,1439000.00),(5,'Nissan Navara Calibre E',2021,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/nissancab2021.png',16,8,1,5,899000.00),(6,'Mercedes Benz Maybach',2022,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/maybach.png',13,5,1,6,18300000.00),(7,'Toyota Supra',2023,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/supra.png',20,6,1,7,4999000.00),(8,'McLaren 720s Spider',2019,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/720sSpider.png',14,1,1,8,29500000.00),(9,'Porsche 911 Carrera 4S',2019,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/carrera4s.png',23,6,1,9,12150000.00),(10,'Lamborghini Countach LPI 800-4',2021,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/lpi800.png',10,6,1,10,270000000.00),(11,'BMW M3 Competition Touring G81',2024,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/m3touring81.png',4,7,1,11,10439000.00),(12,'Aston Martin DB11',2023,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/astonmartiondb11.png',1,2,1,12,16000000.00),(13,'BMW M4 Competition',2025,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/m4.png',4,2,1,13,10000000.00),(14,'Nissan GT-R R34',2002,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/r34.png',16,2,1,14,7000000.00),(15,'Nissan GT-R R35',2024,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/r35.png',16,2,1,15,15900000.00),(16,'Honda Civic Type-R',2025,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/typeR.png',7,5,1,16,3390000.00),(17,'Mercedes-AMG G 63',2025,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/g63.png',13,7,1,17,18800000.00),(18,'รถปู่แม็ก',2005,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/Max.png',25,8,0,18,1700000.00),(19,'Subaru Forester',2025,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/subaruforester.png',18,7,0,19,2590000.00),(20,'Izusu DECA FXZ 360',2022,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/siblor.png',24,8,0,20,3300000.00),(21,'Rolls-Royce Phantom',2023,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/rollsroycephantom.png',17,5,0,21,53500000.00),(22,'Volkswagen Golf GTI Mk8',2020,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/cars/volkgoftgti.png',21,4,0,22,1600000.00);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_model`
--

DROP TABLE IF EXISTS `car_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_model` (
  `modelId` int NOT NULL AUTO_INCREMENT,
  `carId` int DEFAULT NULL,
  `modelUrl` varchar(255) NOT NULL,
  `isDefault` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`modelId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_model`
--

LOCK TABLES `car_model` WRITE;
/*!40000 ALTER TABLE `car_model` DISABLE KEYS */;
INSERT INTO `car_model` VALUES (1,1,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/cls53.glb',1),(2,2,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/toyotafortuner.glb',1),(3,3,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/fordeverest.glb',1),(4,5,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/nissancab2021.glb',1),(5,6,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/maybach.glb',1),(6,7,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/supra.glb',1),(7,8,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/720spider.glb',1),(8,9,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/carrera4s.glb',1),(9,10,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/lpi800.glb',1),(10,11,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/m3touring81.glb',1),(11,12,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/aston_martin_db11.glb',1),(12,12,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/aston_martin_db11.glb',1),(13,13,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/m4.glb',1),(14,14,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/r34.glb',1),(15,15,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/r35.glb',1),(16,16,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/typeR.glb',1),(17,17,'https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/g63.glb',1);
/*!40000 ALTER TABLE `car_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_spec_item`
--

DROP TABLE IF EXISTS `car_spec_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_spec_item` (
  `itemId` int NOT NULL AUTO_INCREMENT,
  `sectionId` int NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `value` text,
  `displayOrder` int DEFAULT '0',
  PRIMARY KEY (`itemId`),
  KEY `sectionId` (`sectionId`),
  CONSTRAINT `car_spec_item_ibfk_1` FOREIGN KEY (`sectionId`) REFERENCES `car_spec_section` (`sectionId`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_spec_item`
--

LOCK TABLES `car_spec_item` WRITE;
/*!40000 ALTER TABLE `car_spec_item` DISABLE KEYS */;
INSERT INTO `car_spec_item` VALUES (1,1,'Engine','3.0L Inline-6 Turbocharged + EQ Boost (Mild Hybrid)',1),(2,1,'Max Power','429 hp',2),(3,1,'Max Torque','384 lb-ft (521 Nm)',3),(4,1,'EQ Boost','+21 hp (temporary boost)',4),(5,1,'0-100 km/h','~4.4 seconds',5),(6,1,'Top Speed','250 km/h (electronically limited)',6),(7,2,'Transmission','AMG SPEEDSHIFT TCT 9G (9-Speed Automatic)',1),(8,2,'Drive System','AMG Performance 4MATIC+ (All-Wheel Drive)',2),(9,3,'Suspension','AMG RIDE CONTROL+ (Adaptive Air Suspension)',1),(10,3,'Steering','AMG Performance Steering',2),(11,3,'Drive Modes','Slippery / Comfort / Sport / Sport+ / Individual',3),(12,4,'Display','Dual 12.3” Digital Display (MBUX)',1),(13,4,'Seats','AMG Sport Seats',2),(14,4,'Interior Trim','Aluminum / Carbon Fiber',3),(15,4,'Ambient Lighting','64 colors',4),(16,4,'Sound System','Burmester® Surround Sound System',5),(17,5,'Active Brake Assist','Standard',1),(18,5,'Blind Spot Assist','Standard',2),(19,5,'Lane Keeping Assist','Standard',3),(20,5,'Adaptive Cruise Control','Optional',4),(21,6,'Body Type','4-Door Coupe (Performance Sedan)',1),(22,6,'Seating','5 passengers',2),(23,6,'Length','~4,999 mm',3),(24,6,'Width','~1,896 mm',4),(25,6,'Height','~1,435 mm',5),(26,6,'Wheelbase','~2,939 mm',6),(27,7,'Engine','2.8L 4-Cylinder Turbo Diesel',1),(28,7,'Max Power','204 hp',2),(29,7,'Max Torque','500 Nm',3),(30,7,'0-100 km/h','~10 seconds',4),(31,7,'Top Speed','180 km/h',5),(32,8,'Transmission','6-Speed Automatic',1),(33,8,'Drive System','4WD / 2WD Selectable',2),(34,9,'Suspension Front','Double Wishbone',1),(35,9,'Suspension Rear','4-Link Coil Spring',2),(36,9,'Drive Modes','Eco / Normal / Sport',3),(37,10,'Display','8\" Touchscreen',1),(38,10,'Sound System','Premium Audio System',2),(39,10,'Seats','Leather Seats',3),(40,10,'Apple CarPlay / Android Auto','Supported',4),(41,11,'Adaptive Cruise Control','Yes',1),(42,11,'Lane Departure Alert','Yes',2),(43,11,'Blind Spot Monitor','Yes',3),(44,11,'Airbags','7 Airbags',4),(45,12,'Length','4,795 mm',1),(46,12,'Width','1,855 mm',2),(47,12,'Height','1,835 mm',3),(48,12,'Wheelbase','2,745 mm',4),(49,12,'Seating Capacity','7 Seats',5);
/*!40000 ALTER TABLE `car_spec_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_spec_section`
--

DROP TABLE IF EXISTS `car_spec_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_spec_section` (
  `sectionId` int NOT NULL AUTO_INCREMENT,
  `carId` int NOT NULL,
  `sectionTitle` varchar(255) NOT NULL,
  `displayOrder` int DEFAULT '0',
  PRIMARY KEY (`sectionId`),
  KEY `carId` (`carId`),
  CONSTRAINT `car_spec_section_ibfk_1` FOREIGN KEY (`carId`) REFERENCES `car` (`carId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_spec_section`
--

LOCK TABLES `car_spec_section` WRITE;
/*!40000 ALTER TABLE `car_spec_section` DISABLE KEYS */;
INSERT INTO `car_spec_section` VALUES (1,1,'Engine & Performance',1),(2,1,'Drivetrain',2),(3,1,'Chassis & Handling',3),(4,1,'Interior & Technology',4),(5,1,'Safety & Assistance',5),(6,1,'Dimensions',6),(7,2,'Engine & Performance',1),(8,2,'Drivetrain',2),(9,2,'Chassis & Handling',3),(10,2,'Interior & Technology',4),(11,2,'Safety & Assistance',5),(12,2,'Dimensions',6);
/*!40000 ALTER TABLE `car_spec_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(100) NOT NULL,
  `logoUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`categoryId`),
  UNIQUE KEY `categoryName` (`categoryName`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Convertible','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/categories/convertible.svg'),(2,'Coupe','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/categories/coupe.svg'),(3,'Electric','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/categories/electric.svg'),(4,'Hatchback','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/categories/hatchback.svg'),(5,'Sedan','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/categories/sedan.svg'),(6,'Supercar','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/categories/supercar.svg'),(7,'SUV','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/categories/suv.svg'),(8,'Truck','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/categories/truck.svg'),(9,'Van','https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/categories/van.svg');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `colorId` int NOT NULL AUTO_INCREMENT,
  `colorName` varchar(100) DEFAULT NULL,
  `colorCode` varchar(20) DEFAULT NULL,
  `displayOrder` int DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`colorId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (1,'Black','#000000',1,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/colors/black.png'),(2,'Silver','#A9A9A9',2,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/colors/silver.png'),(3,'White','#FFFFFF',3,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/colors/white.png'),(4,'Red','#CC0000',4,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/colors/red.png'),(5,'Blue','#0033CC',5,'https://pub-e9ea266beeb9463ca5d6f4f6b211dc6e.r2.dev/colors/blue.png');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-24 21:53:14
