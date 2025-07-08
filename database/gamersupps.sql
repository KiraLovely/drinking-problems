-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 08. Jul 2025 um 22:49
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `gamersupps`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `partners`
--

CREATE TABLE `partners` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar_url` text NOT NULL,
  `first_appearance` date NOT NULL,
  `socials` text NOT NULL,
  `status` enum('active','inactive','former') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `partners`
--

INSERT INTO `partners` (`id`, `name`, `avatar_url`, `first_appearance`, `socials`, `status`) VALUES
(1, 'Nux Taku', 'https://vtubie.com/wp-content/uploads/2021/12/NuxTaku.jpg', '2021-05-10', '{\"twitter\": \"https://twitter.com/Nux_Taku\"}', 'active'),
(2, 'Shylily', 'https://static-cdn.jtvnw.net/jtv_user_pictures/c1dfa8fd-9987-4fc4-9de3-2c99666da297-profile_image-300x300.png', '2022-01-18', '{\"twitter\":\"https://x.com/shylilytwitch\"}', 'former'),
(5, 'Veibae', 'https://i.pinimg.com/236x/78/47/fa/7847fa15496e195731ca4755294fbe69.jpg', '2022-04-14', '{\"twitter\":\"https://x.com/veibae\"}', 'active'),
(6, 'Gooseworx', 'https://tse1.mm.bing.net/th/id/OIP.XRdKFuAbTrin7V38CVRv0QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', '2024-10-11', '{\"twitter\":\"https://x.com/GooseworxMusic\"}', 'active'),
(7, 'Jaiden Animations', 'https://i.pinimg.com/originals/fd/1e/bd/fd1ebd65a9dfdae6093d6e8b4700f674.png', '2021-08-19', '{\"twitter\":\"https://twitter.com/JaidenAnimation\"}', 'former'),
(8, 'Filian', 'https://uploads-ssl.webflow.com/6473d6c34e7dfa20061411e2/6494736732b08079439e9f59_fillian.png', '2022-06-05', '{\"twitter\":\"https://twitter.com/filianIsLost\"}', 'active'),
(9, 'PointCrow', 'https://th.bing.com/th/id/OSK.834281d0b713863fc4848399e8b7b15f?w=102&h=102&c=7&o=6&pid=SANGAM', '2021-09-30', '{\"twitter\":\"https://twitter.com/PointCrow\"}', 'former'),
(10, 'Emiru', 'https://cdn.pfps.gg/pfps/1216-emiru-1.png', '2022-08-15', '{\"twitter\":\"https://twitter.com/Emiru\"}', 'active'),
(11, 'Trickywi', 'https://tse1.mm.bing.net/th/id/OIP.a_Jr1d0oNpd6nLYhL_KDJAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3', '2021-05-10', '{\"twitter\":\"https://twitter.com/Trickywi\"}', 'former');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `partners`
--
ALTER TABLE `partners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
