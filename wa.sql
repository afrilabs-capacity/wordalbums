-- phpMyAdmin SQL Dump
-- version 5.2.0-dev
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 07, 2022 at 06:59 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wordalbums`
--

-- --------------------------------------------------------

--
-- Table structure for table `adverts`
--

CREATE TABLE `adverts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `adverts`
--

INSERT INTO `adverts` (`id`, `uuid`, `name`, `data`, `created_at`, `updated_at`) VALUES
(1, 'f719a186-a39d-487e-9fb2-13f42bb2f3e8', 'Advert 1', '<img src=\"/ad_1.png\" className=\"h-screen\" />', '2022-07-18 13:48:55', '2022-07-18 13:48:55'),
(3, '22e4cc7a-bdf3-4133-ae2f-1aa21c025b14', 'Advert 3', '<img src=\"/ad_3.png\" className=\"h-screen\" />', '2022-07-19 12:30:25', '2022-07-19 12:30:25');

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `series_id` int(11) DEFAULT NULL,
  `cover_photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `uuid`, `name`, `price`, `user_id`, `series_id`, `cover_photo`, `created_at`, `updated_at`) VALUES
(1, 'dcce4481-d0b7-4e38-9ffe-a4d19c83969a', 'Book 1', '25', 8, 1, 'public/photos/gpADLjfVTYqxj5B3UHSVPEni9znNK1nBlMwKf5XO.jpg', '2022-07-14 11:30:20', '2022-08-04 10:38:18'),
(2, '0cf27756-928b-41e9-a7af-eac661ec0c7a', 'Book 2', '3', 8, 1, 'public/photos/QMHbmiZxMbmVdN57R6L2wVuwWYooCHAuE6uAeJ0f.jpg', '2022-07-14 11:30:33', '2022-07-14 11:30:33'),
(6, '338758a1-0ae5-4fd6-ba23-83ae51662ea5', 'Book 5', '5', 1, 6, 'public/photos/0ML5MjC378eMnGBYnR03eBHWh8ywoZao5UeE9KKG.jpg', '2022-07-17 17:36:55', '2022-07-17 17:36:55');

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tnx_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `book_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id`, `uuid`, `status`, `tnx_id`, `book_id`, `amount`, `user_id`, `created_at`, `updated_at`) VALUES
(1, '32ec27d5-3d4f-4958-823b-51c83c48b578', 'succeeded', 'ch_3LSWBAEzLEQuHiLR0jnwsm3l', 1, 5000, 25, '2022-08-03 00:15:21', '2022-08-03 00:15:21'),
(2, '57b355e8-82c0-4f82-a37a-0e0e11b0b88e', 'succeeded', 'ch_3LSWBmEzLEQuHiLR0hZYA0PV', 1, 5000, 25, '2022-08-03 00:15:58', '2022-08-03 00:15:58'),
(3, 'd892d310-4ff5-4003-b17e-11ec8144b3cc', 'succeeded', 'ch_3LSmcLEzLEQuHiLR0V9BHJvZ', 1, 5000, 25, '2022-08-03 17:48:33', '2022-08-03 17:48:33'),
(4, '44612af9-04fb-402f-8888-54ba9f6da332', 'succeeded', 'ch_3LSxe0EzLEQuHiLR1FhTHj32', 1, 5000, 25, '2022-08-04 05:35:06', '2022-08-04 05:35:06');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `information_pages`
--

CREATE TABLE `information_pages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book_id` int(11) NOT NULL,
  `release_information` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover_photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `page_start` tinyint(1) DEFAULT NULL,
  `page_end` tinyint(1) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `donation_amount` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `information_pages`
--

INSERT INTO `information_pages` (`id`, `book_id`, `release_information`, `cover_photo`, `page_start`, `page_end`, `position`, `donation_amount`, `created_at`, `updated_at`) VALUES
(1, 1, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', 'public/background_assets/XC30CKYFN5N6k84bLnvdaSLJ8n7ZWoBGkAcibaWB.jpg', 0, 0, 3, 10, '2022-08-02 09:07:22', '2022-08-02 19:32:34');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_07_12_085231_create_publishers_table', 1),
(11, '2022_07_12_163430_create_series_table', 2),
(15, '2022_07_13_215952_create_pages_table', 3),
(18, '2022_07_13_095917_create_books_table', 4),
(21, '2022_07_15_102520_create_adverts_table', 5),
(22, '2022_07_15_164541_create_page_advert_table', 5),
(23, '2022_07_20_075714_create_visitors_table', 6),
(24, '2022_07_22_125857_add_uuid_to_users_table', 7),
(25, '2022_07_27_094746_create_permission_tables', 8),
(26, '2022_07_27_185403_add_first_name_to_users_table', 9),
(27, '2022_07_27_185748_add_last_name_to_users_table', 9),
(28, '2022_07_28_101703_create_payments_table', 10),
(30, '2022_07_31_093717_create_information_pages_table', 11),
(31, '2022_08_02_200926_create_donations_table', 12),
(32, '2022_08_03_214740_create_subscriptions_table', 13);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 8),
(2, 'App\\Models\\User', 25),
(2, 'App\\Models\\User', 26),
(2, 'App\\Models\\User', 27),
(2, 'App\\Models\\User', 28),
(2, 'App\\Models\\User', 29),
(2, 'App\\Models\\User', 30),
(3, 'App\\Models\\User', 8);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `position` int(11) DEFAULT NULL,
  `file` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `uuid`, `name`, `user_id`, `book_id`, `position`, `file`, `created_at`, `updated_at`) VALUES
(1, '63f9d479-995c-47ce-9445-48ff3e61dfe7', 'Introduction', 8, 1, 3, 'public/pages/UIAeq3IoqSFlrzm8ynHOOq1chPuij3bTxFJMxPUV.pdf', '2022-07-14 14:08:13', '2022-08-01 20:09:39'),
(2, '6faf7d91-32fd-42c8-bbe3-31d9af83c14a', 'Walking in the woods', 8, 1, 1, 'public/pages/tZ8191XF5zCybwnP81GAm1vDke9bboIFso84bOs2.pdf', '2022-07-14 14:10:13', '2022-08-01 20:09:39'),
(4, '247d6725-5c41-4db1-8ff5-6133ff681e41', 'Page 1', 1, 6, 4, 'public/pages/561YjpGXPxd4fpYmcBLenitsswENWsikbJKcg7zZ.pdf', '2022-07-17 17:37:25', '2022-08-01 17:52:24'),
(5, 'bb036b67-245d-47e5-9b61-19b193ea4fbb', 'Page 2', 1, 6, 2, 'public/pages/ubg75ppa1ZwZi9LbimFNDLal7DF3vYuDp4oJWsLb.jpg', '2022-07-17 17:37:53', '2022-07-17 17:37:53'),
(6, 'da77710f-a4b5-4558-9925-100c37e27594', 'Page 3', 1, 6, 5, 'public/pages/zDF0HJNXijySQLR5ftRMIJcYvzGquUM49KnaQ7f3.pdf', '2022-07-17 17:38:09', '2022-08-01 19:33:37'),
(7, 'aa4e9782-ca6c-4b98-9523-006b9dfbc77f', 'Woody', 8, 1, 8, 'public/pages/r4py5paX2QIUFszVTapeBKxN3c8EP2832VwHRhwt.pdf', '2022-07-20 10:53:06', '2022-08-01 20:09:37'),
(8, '63c65d42-cd71-4525-98a7-a4f08b33b497', 'Page 1', 8, 2, 1, 'public/pages/1QKRplkZ2arrxKplTZvnSrwOYO6sqRelF3qgqkGI.pdf', '2022-07-28 22:59:42', '2022-07-28 22:59:42'),
(9, '619387ae-a242-47b8-8f88-f40211fe1296', 'Page 2', 8, 2, 2, 'public/pages/MTZJhGrNBo69eRhqdo1VHRcLoKmJfGZj4rDoN4yo.pdf', '2022-07-28 23:00:29', '2022-07-28 23:00:29'),
(10, '111db82d-4b3a-4fc6-b173-362d6c4f8237', 'Page 2', 8, 2, 3, 'public/pages/n9n00fxSZfFzqm1zShyqFgOyHd962aR1pWMmZkzu.pdf', '2022-07-28 23:00:29', '2022-07-28 23:00:29'),
(12, '48cbb8a9-3351-4a45-a419-d8b6a0c9e77b', 'Xmas', 8, 1, 4, 'public/pages/SAeMX41NdrweNFhlTeTzHPxEnFOjBTXW8q8aWaUl.jpg', '2022-08-01 21:48:01', '2022-08-01 21:48:01'),
(14, '3a37410c-b80d-4ec4-a18f-a0c3689e28a7', 'Smokey', 8, 3, 2, 'public/pages/27OWciWzjsfitgZxn9u2gjcYPTIz3msly1RL5qlh.pdf', '2022-08-04 17:47:42', '2022-08-04 17:47:42'),
(15, 'ba57d12d-3704-4c7b-b752-88c78b6f8e8f', 'Team', 8, 3, 3, 'public/pages/2uc8NOXpK46pLbC1jCy7E6oeZ6DJLac4pft7qEQd.jpg', '2022-08-04 17:48:25', '2022-08-04 17:48:25');

-- --------------------------------------------------------

--
-- Table structure for table `page_advert`
--

CREATE TABLE `page_advert` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `page_id` bigint(20) UNSIGNED NOT NULL,
  `advert_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `page_advert`
--

INSERT INTO `page_advert` (`id`, `page_id`, `advert_id`, `created_at`, `updated_at`) VALUES
(1, 4, 1, NULL, NULL),
(2, 5, 2, NULL, NULL),
(3, 2, 3, NULL, NULL),
(4, 3, 1, NULL, NULL),
(5, 8, 3, NULL, NULL),
(6, 13, 2, NULL, NULL),
(7, 15, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tnx_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `book_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `uuid`, `status`, `tnx_id`, `book_id`, `amount`, `user_id`, `created_at`, `updated_at`) VALUES
(1, '7dcaca0b-41b3-4886-ac78-a6eb46602020', 'succeeded', 'ch_3LQWUtEzLEQuHiLR1CsKwyqu', 1, 200, 25, '2022-07-28 12:11:28', '2022-07-28 12:11:28'),
(2, '649cd6b9-ade4-459c-8ded-c4f858da896f', 'succeeded', 'ch_3LSPF2EzLEQuHiLR18QFpM9E', 1, 200, 26, '2022-08-02 16:51:00', '2022-08-02 16:51:00');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 8, 'auth_token', 'ce948743f9733e15d79e643536e5e99b53c2b461ec3bcf60762275204dc1d980', '[\"*\"]', NULL, '2022-07-27 09:57:21', '2022-07-27 09:57:21'),
(2, 'App\\Models\\User', 8, 'auth_token', 'e1131777723d7a60c518368db692add20f3a9f96de1992c6914311ea41f18255', '[\"*\"]', NULL, '2022-07-27 10:02:32', '2022-07-27 10:02:32'),
(3, 'App\\Models\\User', 8, 'auth_token', '28f77c25373bcef2548bef5c25a4e043ddd6c83549e615204a0625b6974c6e02', '[\"*\"]', NULL, '2022-07-27 11:16:48', '2022-07-27 11:16:48'),
(4, 'App\\Models\\User', 8, 'auth_token', 'dc8a77025fbdbc1c75a5e3951bd4f5457c7ed13824939921180f8b837574cab5', '[\"*\"]', NULL, '2022-07-27 11:36:42', '2022-07-27 11:36:42'),
(5, 'App\\Models\\User', 8, 'auth_token', '502eb4e115818c02532fc4a2fd20fccc769b547e33ba575d0dced09798145b26', '[\"*\"]', NULL, '2022-07-27 14:12:13', '2022-07-27 14:12:13'),
(6, 'App\\Models\\User', 8, 'auth_token', '395aeeef52caa7dbeabaa14a3b4921c2c276c98cb669c30c8ee046952af89aae', '[\"*\"]', NULL, '2022-07-27 15:47:04', '2022-07-27 15:47:04'),
(7, 'App\\Models\\User', 8, 'auth_token', '69795c063715f2584552f5b83b37ca994f50290eae44e1639a3e4ad9b7e0b648', '[\"*\"]', NULL, '2022-07-27 15:53:18', '2022-07-27 15:53:18'),
(8, 'App\\Models\\User', 8, 'auth_token', '0eebd50580859e64ec196afab814314cdf02fe4f03aedc6bba35605eb8627864', '[\"*\"]', NULL, '2022-07-27 15:56:30', '2022-07-27 15:56:30'),
(9, 'App\\Models\\User', 9, 'auth_token', '184f7bae354f4c9650382ce61f9b64e6a854ce2356b02e8ada6893f7cee3fe62', '[\"*\"]', NULL, '2022-07-27 18:18:52', '2022-07-27 18:18:52'),
(10, 'App\\Models\\User', 12, 'auth_token', '9926ceff23b87fc700921d2a361d86ddac30620f115e80a70c4890c9f7d8b6d3', '[\"*\"]', NULL, '2022-07-27 18:20:40', '2022-07-27 18:20:40'),
(11, 'App\\Models\\User', 13, 'auth_token', 'aefc7edce41c95b124163827b1a41f155cddfc747577d203622f0909a1c74480', '[\"*\"]', NULL, '2022-07-27 18:21:52', '2022-07-27 18:21:52'),
(12, 'App\\Models\\User', 14, 'auth_token', '65cf2ca818aa0c52741d40505e33b282743894709fab681528d81220bc161fe6', '[\"*\"]', NULL, '2022-07-28 08:47:18', '2022-07-28 08:47:18'),
(13, 'App\\Models\\User', 15, 'auth_token', '4ed6848b0827c8db2e00882edd1b1cd189e9ebb55879e6728f7f79402670fe06', '[\"*\"]', NULL, '2022-07-28 08:57:11', '2022-07-28 08:57:11'),
(14, 'App\\Models\\User', 16, 'auth_token', 'af7aadfd944e9109099a07deaceb65e3dd8028efca39c4cc0615ee44d68e9d0b', '[\"*\"]', NULL, '2022-07-28 09:47:49', '2022-07-28 09:47:49'),
(15, 'App\\Models\\User', 17, 'auth_token', 'f77c64c6d1ef17ab2fe9cd3f9f9dc98d3d2242235c6bba0b079279b39c977751', '[\"*\"]', NULL, '2022-07-28 10:02:00', '2022-07-28 10:02:00'),
(16, 'App\\Models\\User', 18, 'auth_token', '4e2a59c785039dba46670f95a398ec532ccda77b5bbdf8dbfb119421b88170ab', '[\"*\"]', NULL, '2022-07-28 10:10:43', '2022-07-28 10:10:43'),
(17, 'App\\Models\\User', 19, 'auth_token', '36ada26b484daf86dca9772c5a9392ca5068ece6e6422ebc65b0096dc659da51', '[\"*\"]', NULL, '2022-07-28 10:12:37', '2022-07-28 10:12:37'),
(18, 'App\\Models\\User', 20, 'auth_token', 'e62a6670fe8e4ab7de1e688f36a17c52486da9cf60287dd92d23dea0e4719678', '[\"*\"]', NULL, '2022-07-28 10:14:49', '2022-07-28 10:14:49'),
(19, 'App\\Models\\User', 21, 'auth_token', '5dc4a120be2e7373e2391751b2f582a943a9a82ea29e84885e1079c5319558ee', '[\"*\"]', NULL, '2022-07-28 11:25:28', '2022-07-28 11:25:28'),
(20, 'App\\Models\\User', 22, 'auth_token', 'dfa4f3f63bf365460b0eb248c8612b7ba6b28b5242f5c7f035bc8b43553a2796', '[\"*\"]', NULL, '2022-07-28 11:40:34', '2022-07-28 11:40:34'),
(21, 'App\\Models\\User', 23, 'auth_token', '53e25b3c41a6005a882424e1e6f0c89afc317f4f504b426a23f2b09e53320daa', '[\"*\"]', NULL, '2022-07-28 11:46:23', '2022-07-28 11:46:23'),
(22, 'App\\Models\\User', 24, 'auth_token', '381b70c1ad31f4f073ea293020e4fd5affd1ddff833d3d20c4c63dd603e568cd', '[\"*\"]', NULL, '2022-07-28 11:57:10', '2022-07-28 11:57:10'),
(23, 'App\\Models\\User', 25, 'auth_token', '464a3bd361d60522c702417b6d8cb8b1ef9ac8754c4b1cb4551895089a78d1bb', '[\"*\"]', NULL, '2022-07-28 12:10:53', '2022-07-28 12:10:53'),
(24, 'App\\Models\\User', 25, 'auth_token', '9bdbd77b6ba98cdf4defb46faa8991c759fec5596f7bd165db155b1c97103d2f', '[\"*\"]', NULL, '2022-07-28 12:13:09', '2022-07-28 12:13:09'),
(25, 'App\\Models\\User', 25, 'auth_token', 'fcd83fcdc50706e3341ec466fdb08663a3989e2eebb42655f19cdff979b36c64', '[\"*\"]', NULL, '2022-07-29 12:14:00', '2022-07-29 12:14:00'),
(26, 'App\\Models\\User', 25, 'auth_token', 'aeca261f8524fe47f66059e0c25db2f06a6e3fdc634906c7d47c36670ef42e2c', '[\"*\"]', NULL, '2022-07-30 20:08:02', '2022-07-30 20:08:02'),
(27, 'App\\Models\\User', 25, 'auth_token', 'c1d5820feaabe7d3b46531d127971b9079d250622dc689512aa7df77def19b43', '[\"*\"]', NULL, '2022-08-02 11:11:00', '2022-08-02 11:11:00'),
(28, 'App\\Models\\User', 25, 'auth_token', '8ec40ddaf1f71c2156c5d7a07b7a0e3881103e04cae0686d213af31fb7979e40', '[\"*\"]', NULL, '2022-08-02 12:34:15', '2022-08-02 12:34:15'),
(29, 'App\\Models\\User', 25, 'auth_token', '43659c31d3acd20697c8647bab31dcfd02db47ea16b35d092e1cc2dbbd80d130', '[\"*\"]', NULL, '2022-08-02 16:21:43', '2022-08-02 16:21:43'),
(30, 'App\\Models\\User', 25, 'auth_token', '84607ae9b6877c2d89f5df8af85739ff86bbb90e362aff84bc6a7587b1fa2f23', '[\"*\"]', NULL, '2022-08-02 16:27:17', '2022-08-02 16:27:17'),
(31, 'App\\Models\\User', 25, 'auth_token', '3d8790d974ff5dcffc56bb6b2f743ea050efa0042f4e3286c75c84ef96c8054e', '[\"*\"]', NULL, '2022-08-02 16:27:56', '2022-08-02 16:27:56'),
(32, 'App\\Models\\User', 25, 'auth_token', 'f50de318a0007d2f33eab09f22bbf8b4afffb2db88cb7fe90caae36c417b44f0', '[\"*\"]', NULL, '2022-08-02 16:38:05', '2022-08-02 16:38:05'),
(33, 'App\\Models\\User', 26, 'auth_token', '40ef430ae69e1d6452a131e806b19b50594ea09a31328c46b9016829666d0575', '[\"*\"]', NULL, '2022-08-02 16:48:51', '2022-08-02 16:48:51'),
(34, 'App\\Models\\User', 26, 'auth_token', '969490a7559640437dff9bd8f026d1643a707ebb7b1a6d5c89e6f298076f3189', '[\"*\"]', NULL, '2022-08-02 17:00:27', '2022-08-02 17:00:27'),
(35, 'App\\Models\\User', 26, 'auth_token', '1faa250c590514fd531f41378b19d19b2c126759a7661128baa2b2f457a7de86', '[\"*\"]', NULL, '2022-08-02 17:01:41', '2022-08-02 17:01:41'),
(36, 'App\\Models\\User', 27, 'auth_token', '79258b33dd4bf9747f93a7a5e9caac38c3e7993e1f83cee8595023d08068654e', '[\"*\"]', NULL, '2022-08-03 11:28:38', '2022-08-03 11:28:38'),
(37, 'App\\Models\\User', 25, 'auth_token', 'fa035e86f71a477f60e49c5ba5f8c19d5fc4bab8082b889f39f7ca52daa95ea4', '[\"*\"]', NULL, '2022-08-03 11:58:38', '2022-08-03 11:58:38'),
(38, 'App\\Models\\User', 1, 'auth_token', '890eabb5cfcfca19b35ad073cf0a36fbd444210fb1ffc7eca949e2675756022f', '[\"*\"]', NULL, '2022-08-03 12:00:19', '2022-08-03 12:00:19'),
(39, 'App\\Models\\User', 1, 'auth_token', 'eec3065de46de140b0677f1f2ebfc763b54a2ed7dc8640d653a429eed2d90b86', '[\"*\"]', NULL, '2022-08-03 12:04:22', '2022-08-03 12:04:22'),
(40, 'App\\Models\\User', 25, 'auth_token', '2cc25bfdce7e1b635368b17fdc376451e66a3099c6f9f5153e5b6c40e3e975fc', '[\"*\"]', NULL, '2022-08-03 12:05:14', '2022-08-03 12:05:14'),
(41, 'App\\Models\\User', 25, 'auth_token', '1cbba59bfcce62476032794a3a669e1321dbd49ce5a825c17824ed99bc86bc49', '[\"*\"]', NULL, '2022-08-03 15:52:20', '2022-08-03 15:52:20'),
(42, 'App\\Models\\User', 25, 'auth_token', '861380c1180e263bc63dda580d4073008d43f995308c723ea710606450127164', '[\"*\"]', NULL, '2022-08-03 17:16:27', '2022-08-03 17:16:27'),
(43, 'App\\Models\\User', 28, 'auth_token', '7c9fb95061fd76dabf29b70da635acdbf1242a012361a7182a8ae052966fb3bd', '[\"*\"]', NULL, '2022-08-04 07:43:37', '2022-08-04 07:43:37'),
(44, 'App\\Models\\User', 28, 'auth_token', 'bde943cc04dd2bf9a10fa2b1b2eb011035347f8523ced967f279d894ae61cb2d', '[\"*\"]', NULL, '2022-08-04 07:49:04', '2022-08-04 07:49:04'),
(45, 'App\\Models\\User', 28, 'auth_token', 'c71290bf72cbde89b8ce174f5bcc68f2be83cf3b5843863c5e5e54f3029c79e5', '[\"*\"]', NULL, '2022-08-04 07:49:32', '2022-08-04 07:49:32'),
(46, 'App\\Models\\User', 29, 'auth_token', '9da11aae9384dcf5352c1d6a3e95586402a4f44692fce3151a8410aca044e124', '[\"*\"]', NULL, '2022-08-04 08:13:52', '2022-08-04 08:13:52'),
(47, 'App\\Models\\User', 30, 'auth_token', '6c4262684a51be11b72e33bae407968134cc4c3ec42a1ddae3795fe406eec915', '[\"*\"]', NULL, '2022-08-04 08:15:55', '2022-08-04 08:15:55'),
(48, 'App\\Models\\User', 25, 'auth_token', '9d5ea47af138bf023e7fc6e7c557565ebb97d603dfd59bc9ffc991d8cc7967b8', '[\"*\"]', NULL, '2022-08-04 08:18:24', '2022-08-04 08:18:24'),
(49, 'App\\Models\\User', 28, 'auth_token', 'cd2d294dbae2a74e4fb8ca09c5a5f61af7c6c36533f7966ada6171445b60338e', '[\"*\"]', NULL, '2022-08-04 08:18:46', '2022-08-04 08:18:46'),
(50, 'App\\Models\\User', 25, 'auth_token', '0bd2e4e1657bce67276a158acfc7a10bcce09bbbb26c6ff8996b605f6c711f34', '[\"*\"]', NULL, '2022-08-04 08:19:48', '2022-08-04 08:19:48'),
(51, 'App\\Models\\User', 28, 'auth_token', '9dc51d49b77d5b0cfee600a501bc4a213c6552a10c432b6438530b4665515e4d', '[\"*\"]', NULL, '2022-08-04 08:21:24', '2022-08-04 08:21:24'),
(52, 'App\\Models\\User', 25, 'auth_token', '258cf73aaffefab689e6b1e6155c3c2f9d7e48c1b9f01c68d1e262717b6d2207', '[\"*\"]', NULL, '2022-08-04 08:36:43', '2022-08-04 08:36:43'),
(53, 'App\\Models\\User', 28, 'auth_token', '1b9ea0d00be7ac3a0c3fd122e47fec40218e56b849a60075c315ecff463f42ec', '[\"*\"]', NULL, '2022-08-04 09:21:39', '2022-08-04 09:21:39'),
(54, 'App\\Models\\User', 25, 'auth_token', '31cff51f42afb310d273c704d4060163549bb2e727504d7fefba78dd6d0db932', '[\"*\"]', NULL, '2022-08-04 09:37:22', '2022-08-04 09:37:22'),
(55, 'App\\Models\\User', 25, 'auth_token', 'aa475d3c3c6f31019735320b4dc532ac12f476d60dd1c156aa0d2691b632adf2', '[\"*\"]', NULL, '2022-08-04 09:42:54', '2022-08-04 09:42:54'),
(56, 'App\\Models\\User', 28, 'auth_token', '4aff247f145379208917c299d18e9c4e9a63b1b03c17cc0dd90dca4d78a024a8', '[\"*\"]', NULL, '2022-08-04 09:44:44', '2022-08-04 09:44:44'),
(57, 'App\\Models\\User', 25, 'auth_token', 'bc0235633cf06779b0aa94e94dfb6aa99c7998d484f98222dd9ca099a58b37f1', '[\"*\"]', NULL, '2022-08-04 09:46:00', '2022-08-04 09:46:00'),
(58, 'App\\Models\\User', 1, 'auth_token', '9db937203cdd5a0b0e1d220b81f23eeb8539afc0b3027b335cadb919bb808fac', '[\"*\"]', NULL, '2022-08-04 09:47:05', '2022-08-04 09:47:05');

-- --------------------------------------------------------

--
-- Table structure for table `publishers`
--

CREATE TABLE `publishers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2022-07-27 08:54:10', '2022-07-27 08:54:10'),
(2, 'reader', 'web', '2022-07-27 08:54:11', '2022-07-27 08:54:11'),
(3, 'publisher', 'web', '2022-07-29 10:03:06', '2022-07-29 10:03:06');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `series`
--

CREATE TABLE `series` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `cover_photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `series`
--

INSERT INTO `series` (`id`, `uuid`, `name`, `user_id`, `cover_photo`, `created_at`, `updated_at`) VALUES
(1, 'f9c8b13d-62e9-45cb-9f2e-9e14079fedbe', 'Series 1', 8, 'public/photos/uQDqFyDPsWeiqEDijSjwiu17PtIAN4rv0FEG2aiu.jpg', '2022-07-14 07:32:08', '2022-07-14 07:32:08'),
(2, '04cc8d77-d1be-49ec-9131-f0766354791c', 'Series 2', 8, 'public/photos/LcNAGWtgiV3IaA60KT22zIPWHFrz1jwRiHWBFUu0.jpg', '2022-07-14 07:32:18', '2022-07-14 07:32:18'),
(3, 'd6692668-51dd-4c64-80df-ad91a19f4dbd', 'Series 3', 8, 'public/photos/d0Q1xh2XF2EvSxhpmY5FsSXSUJPjyal6idUsl9BY.jpg', '2022-07-14 07:32:37', '2022-07-14 07:32:37'),
(6, 'd69408ce-432c-4443-8670-c8db1c36055e', 'Series 5', 1, 'public/photos/ibrCxfvBfLUYYxHrQaf8xZas0o8ATGOieGMLOf9a.jpg', '2022-07-17 17:36:00', '2022-07-17 17:36:00');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channel` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `visitor_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `email`, `channel`, `user_id`, `visitor_id`, `created_at`, `updated_at`) VALUES
(1, 'braimahjake@gmail.com', 'platform_updates', 25, NULL, '2022-08-04 06:07:36', '2022-08-04 06:07:36'),
(2, 'codijakes@gmail.com', 'information_page', 25, NULL, '2022-08-04 06:08:29', '2022-08-04 06:08:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `uuid`, `first_name`, `last_name`) VALUES
(1, 'Braimah Jake', 'braimahjake@gmail.com', NULL, '$2y$10$.l.PCBGZ.a7xf7wtxI3gcu8GaODbopH4hX.OnqLOjConUw26Y7wau', NULL, '2022-07-12 13:53:09', '2022-07-22 12:03:11', '3233fcd5-ada3-4377-aa1e-10801b01a363', '', ''),
(8, 'Braimah Jackson', 'braimahake4@gmail.com', NULL, '$2y$10$3MzKjQnoAH00ORM6BVhYT.EnklXARC/xmxmRrLq9sjoCGYjgTCY3.', NULL, '2022-07-13 11:35:49', '2022-07-22 12:03:11', 'ecb0cd68-01d8-4c9c-aa79-ec5e07855b2c', '', ''),
(25, 'Sarah James', 'sarahjames@gmail.com', NULL, '$2y$10$.l.PCBGZ.a7xf7wtxI3gcu8GaODbopH4hX.OnqLOjConUw26Y7wau', NULL, '2022-07-28 12:10:52', '2022-07-28 12:10:52', '003a1d53-eda5-48ad-9f28-8c5f4535035f', 'Sarah', 'James'),
(26, 'John Daniel', 'johndaniels@gmail.com', NULL, '$2y$10$.s/cl1KHASRxUaCsHWAYL.a6BkxQnkl9thHc1aF3OTyYxdiGh3KUy', NULL, '2022-08-02 16:48:50', '2022-08-02 16:48:50', 'fc3640b9-4319-4b65-872c-06ccfea98ce4', 'John', 'Daniel'),
(27, 'Sam Smith', 'samsmith@gmail.com', NULL, '$2y$10$1o561ymfs/tNw7mU4O5pLOcgOHwX4mOVZGQ2WQk9S/SO52GDAQKeS', NULL, '2022-08-03 11:28:38', '2022-08-03 11:28:38', 'b97e4d57-dcc4-4b58-a1ec-2226222ff91b', 'Sam', 'Smith'),
(28, 'Tom Baker', 'baker@gmail.com', NULL, '$2y$10$cEJIM5LtBhyPhIF.rAWz9.wZcpgSqEMpme9cB/ibrc5rRlb/d4owW', NULL, '2022-08-04 07:43:37', '2022-08-04 07:43:37', 'e24660fd-ec19-4900-b78f-9842d8b6c944', 'Tom', 'Baker'),
(29, 'Dante Paul', 'dante@gmail.com', NULL, '$2y$10$Lz7fAG8zY53hNVNN9QZVNuLEgvxL8ZtHHRq9ik4ZrI322rhFumEaK', NULL, '2022-08-04 08:13:51', '2022-08-04 08:13:51', '4121335c-030e-47b7-b86c-729bd7031680', 'Dante', 'Paul'),
(30, 'Bobby Lee', 'bobbylee@gmail.com', NULL, '$2y$10$6tP7jIg/zGPruCkOQCuQi.gwj8aApq3yjnm96ZVbr1qkviWynIXLO', NULL, '2022-08-04 08:15:55', '2022-08-04 08:15:55', 'b7d28f5b-9dbb-4b35-bf7c-cc93d0d36eff', 'Bobby', 'Lee');

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

CREATE TABLE `visitors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `book_uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `page_uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cookie_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `visitors`
--

INSERT INTO `visitors` (`id`, `email`, `book_uuid`, `page_uuid`, `cookie_id`, `created_at`, `updated_at`) VALUES
(1, 'braimahjake@gmail.com', 'dcce4481-d0b7-4e38-9ffe-a4d19c83969a', 'f5a0e48c-831e-4c23-9efb-6835b431cbac', '5dbe2c5-2d3-bc0f-8f6e-b3541b678b1d', '2022-07-20 20:30:38', '2022-07-20 20:30:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adverts`
--
ALTER TABLE `adverts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `books_name_unique` (`name`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `information_pages`
--
ALTER TABLE `information_pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page_advert`
--
ALTER TABLE `page_advert`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `publishers`
--
ALTER TABLE `publishers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `series`
--
ALTER TABLE `series`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `series_name_unique` (`name`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adverts`
--
ALTER TABLE `adverts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `information_pages`
--
ALTER TABLE `information_pages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `page_advert`
--
ALTER TABLE `page_advert`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `publishers`
--
ALTER TABLE `publishers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `series`
--
ALTER TABLE `series`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `visitors`
--
ALTER TABLE `visitors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
