-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 14, 2025 at 02:59 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `music_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `favorite_id` int NOT NULL,
  `user_id` int NOT NULL,
  `song_id` varchar(50) NOT NULL,
  `song_name` varchar(255) NOT NULL,
  `artist` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `refresh_token_id` int NOT NULL,
  `user_id` int NOT NULL,
  `refresh_token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `refresh_tokens`
--

INSERT INTO `refresh_tokens` (`refresh_token_id`, `user_id`, `refresh_token`) VALUES
(10, 5, '36be9edfb400f4a0944a416b86db017675f803b0573bb3c868f709f09c24cb8af4ddf18efe1ca5fe'),
(11, 7, 'b4b80786ab1841df4bd0e723c65322d86fad5c335385ce4bcb9008bddb9611c84f376bc7ee979e59'),
(12, 7, '3618e84d2c652d008cad5da964c810e03889106f012d069aebaeeb97be82e90c8a66448730dba000'),
(13, 6, 'b757aa5ed93cd8cb5d66ebf3450c3a5a323b67c33530c8999a9dd4e8c82fc84062acfc9f2f4a7656'),
(14, 6, '0495e5a08d7469f6254aeb2f138a94270228ea1af6b22ab7d0a3e80be0d3742a976d17cbb2f59325'),
(15, 6, '61e5655a39370a3bc2bea798444382323a697af011c3ac3e717f22d1d7f74c893744a0e06b43b940'),
(16, 6, 'e63002c9206797c4b7c959a20bb912346d01171cd2564800d38c6e022bd672568934868cbbf56cda'),
(17, 6, 'e39cd8af8d22e29f70dcf51d4409e0513968c900085e8f868f9255d2dc48111071e88539afc7cace');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `password`, `email`) VALUES
(5, '$2b$10$QNUmOlZAK86yiCmdO5Iv4eJ0oJmZ6K6qB0WCjhNnRkUrlYCffVUTq', 'tung@gmail.com'),
(6, '$2b$10$JwM.sa2Uf0dc3sszbF05E.rYsnyqpRGMJigx2zKAop9DA9mkJqFcC', 'the@gmail.com'),
(7, '$2b$10$QNUmOlZAK86yiCmdO5Iv4eJ0oJmZ6K6qB0WCjhNnRkUrlYCffVUTq', 'nam@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`favorite_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`refresh_token_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `favorite_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  MODIFY `refresh_token_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
