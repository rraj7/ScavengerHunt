--SQL SCRIPTS TO INSERT DATA IN THE DB. REPLACE THE VALUES WITH OWN DATA 

/*insert into dbo.Games ([name],[range_epsilon])
values 
('game3','10'),
('game4','10')

GO
*/
/*
INSERT INTO DBO.Landmarks ([name], [description],[latitude],[longitude])
VALUES 
('UIC SSB','Student Services Building has offices for Student Admissions, Student Employment, Financial Aid','41.8705','-87.6588')
GO
*/

/*
INSERT INTO dbo.Players ([name],[email])
VALUES ('Mayank','mraj3@uic.edu'), ('Patrick','porelly2@uic.edu')
GO
*/

/*
INSERT INTO dbo.Games_Players ([game_id],[player_id])
VALUES ('1164','140'),('1217','386'),('1111','140')
GO
*/


/*
INSERT INTO dbo.Games_Landmarks([game_id],[landmark_id])
VALUES ('1058','6'),('1058','7'),('1058','8'),('1058','9'),('1058','10'),('1058','11'),('1058','12'),('1058','13'),
('1058','14'),('1111','10'),('1111','11'),('1111','12'),('1111','13'),('1111','7'),('1111','8'),('1164','7'),('1164','8'),
('1164','12'),('1164','10'),('1164','11'),('1164','14'),('1217','7'),('1217','8'),('1217','9'),('1217','10'),('1217','11'),
('1217','12'),('1217','13'),('1217','14')
GO
*/

/*
INSERT INTO dbo.Player_Landmark_Games ([player_id],[game_id],[landmark_id])
VALUES ('17','1058','6'),('17','1058','7'),('17','1058','8'),('17','1058','9'),('140','1058','6'),('140','1058','7'),
('263','1058','6'),('386','1058','6'),('140','1111','6'),('140','1111','7'),('140','1111','8'),('140','1111','10'),
('509','1111','6'),('509','1111','7'),('632','1111','6'),('140','1164','6'),('878','1164','6'),('878','1164','7'),
('878','1164','8'),('386','1217','10'),('386','1217','11'),('386','1217','12'),('755','1217','7')
GO
*/