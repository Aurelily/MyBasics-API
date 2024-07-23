-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 23 juil. 2024 à 09:18
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mybasicapi`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `email`, `password`) VALUES
(2, 'seb', 'seb@gmail.com', '$2b$10$3rWz8PJ3Sm/MzX7AaGGvCedcLkxK5DyqkE.t12BufvpLed06PGVoS'),
(3, 'Joris', 'joris@gmail.com', '$2b$10$Se775K8b9TkJFr2HEZpp2uso/9VzUef62j8ymSPjm4lnkTCW9HgFy'),
(4, 'Luc', 'luc@gmail.com', '$2b$10$EnYEsEDzx29stQhfhWZe1ec6R7rve4/nmvtKQbQ/0ifsTekKmfkCK'),
(5, 'Jess', 'jess@gmail.com', '$2y$10$J7C.dE5jdIXNSTjHuiW0aOawom3.7mraEq9ExoG0LV8kqjsIpzuUm'),
(7, 'Titi', 'titi@gmail.com', '$2y$10$RKfVWYkp5mXz0rZVgK1gv.DH0xnCwxksY1LIAr2Idoj2HyGnsrlqe'),
(8, 'Lily', 'lily@gmail.com', '$2y$10$k.GO3zCugkriyFHhSoBsCOBpmrYoA16u8uY0dNcSiE54USLFrLDla');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
