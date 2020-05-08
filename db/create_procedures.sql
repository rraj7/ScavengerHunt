SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

DROP PROCEDURE IF EXISTS sp_NewPlayer
DROP PROCEDURE IF EXISTS sp_NewLandmark
DROP PROCEDURE IF EXISTS sp_NewGame
DROP PROCEDURE IF EXISTS sp_AddLandmarkToGame
DROP PROCEDURE IF EXISTS sp_RemoveLandmarkFromGame
DROP PROCEDURE IF EXISTS sp_PlayerVisitedLocation
DROP PROCEDURE IF EXISTS sp_LogPlayerLocation
DROP PROCEDURE IF EXISTS sp_AddPlayerToGame
DROP PROCEDURE IF EXISTS sp_GetWinners
DROP PROCEDURE IF EXISTS sp_GetMyGames
DROP PROCEDURE IF EXISTS sp_GetLandmarks
GO

CREATE PROCEDURE sp_NewPlayer @name nvarchar(256),
                              @email nvarchar(256)
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY
        BEGIN TRANSACTION
            IF EXISTS(SELECT 1 FROM Players WHERE email = @email)
                THROW 50000, 'Player already registered', 1
            INSERT INTO Players([name], email) VALUES (@name, @email)
        COMMIT
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION
        THROW
    END CATCH
END

GO
CREATE PROCEDURE sp_NewLandmark @name nvarchar(256),
                                @description nvarchar(MAX),
                                @latitude FLOAT(24),
                                @longitude FLOAT(24)
AS
BEGIN
    SET NOCOUNT ON
    BEGIN TRY
        BEGIN TRANSACTION
            IF EXISTS(SELECT 1 FROM Landmarks WHERE [name] = @name)
                THROW 50001, 'Landmark already registered.', 1
            INSERT INTO Landmarks([name], [description], latitude, longitude)
            VALUES (@name, @description, @latitude, @longitude)
        COMMIT
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION
        THROW
    END CATCH
END

GO
CREATE PROCEDURE sp_NewGame @name nvarchar(256),
                            @created_by INT,
                            @range_epsilon FLOAT(24),
                            @active BIT = 0
AS
BEGIN
    SET NOCOUNT ON
    BEGIN TRY
        BEGIN TRANSACTION
            IF EXISTS(SELECT 1 FROM Games WHERE [name] = @name)
                THROW 50002, 'Game already created!', 1
            INSERT INTO Games([name], created_by, active, range_epsilon)
            VALUES (@name, @created_by, @active, @range_epsilon)
        COMMIT
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION
        THROW
    END CATCH
END

GO
CREATE PROCEDURE sp_AddLandmarkToGame @game_id INT,
                                      @landmark_id INT
AS
BEGIN
    SET NOCOUNT ON
    BEGIN TRY
        BEGIN TRANSACTION
            INSERT INTO Games_Landmarks (game_id, landmark_id) VALUES (@game_id, @landmark_id)
        COMMIT
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION
        THROW
    END CATCH
END

GO
CREATE PROCEDURE sp_AddPlayerToGame @game_id INT,
                                    @player_id INT
AS
BEGIN
    SET NOCOUNT ON
    BEGIN TRY
        BEGIN TRANSACTION
            INSERT INTO Games_Players (game_id, player_id) VALUES (@game_id, @player_id)
        COMMIT
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION
        THROW
    END CATCH
END

GO
CREATE PROCEDURE sp_RemoveLandmarkFromGame @game_id INT,
                                           @landmark_id INT
AS
BEGIN
    SET NOCOUNT ON
    BEGIN TRY
        BEGIN TRANSACTION
            DELETE FROM Games_Landmarks WHERE game_id = @game_id AND landmark_id = @landmark_id
            IF @@ROWCOUNT != 1
                BEGIN
                    ;THROW 50003, 'Incorrect number of landmarks deleted from game, rolling back...', 1
                END
        COMMIT
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION
        THROW
    END CATCH
END

GO
CREATE PROCEDURE sp_PlayerVisitedLocation @game_id INT,
                                          @landmark_id INT,
                                          @player_id INT
AS
BEGIN
    SET NOCOUNT ON
    BEGIN TRY
        BEGIN TRANSACTION
            IF NOT EXISTS(SELECT 1 FROM Games WHERE game_id = @game_id AND active = 1)
                BEGIN
                    ; THROW 50004, 'Game does not exist or is no longer active!', 1
                END
            INSERT INTO Player_Landmark_Games(player_id, game_id, landmark_id)
            VALUES (@player_id, @game_id, @landmark_id)
        COMMIT
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION
        THROW
    END CATCH
END

GO
CREATE PROCEDURE sp_LogPlayerLocation @player_id INT,
                                      @latitude FLOAT(24),
                                      @longitude FLOAT(24)
AS
BEGIN
    SET NOCOUNT ON
    BEGIN TRY
        BEGIN TRANSACTION
            INSERT INTO LocationHistory(player_id, latitude, longitude) VALUES (@player_id, @latitude, @longitude)
        COMMIT
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION
        THROW
    END CATCH
END

GO
CREATE PROCEDURE sp_GetWinners @game_id INT
AS
BEGIN
    SET NOCOUNT ON

    SELECT Players.name, COUNT(*) AS Visited
    FROM Players
             JOIN Games_Players ON Players.id = Games_Players.player_id
             JOIN Player_Landmark_Games ON Player_Landmark_Games.player_id = Games_Players.player_id
    WHERE Player_Landmark_Games.game_id = @game_id
    GROUP BY Players.name
END

GO
CREATE PROCEDURE sp_GetMyGames @player_id INT
AS
BEGIN
    SET NOCOUNT ON

    SELECT Games.*
    FROM Games_Players
             JOIN Games ON Games_Players.game_id = Games.game_id
    WHERE player_id = @player_id
END

GO
CREATE PROCEDURE sp_GetLandmarks
AS
BEGIN
    SET NOCOUNT ON

    SELECT * FROM Landmarks
END

GO

GRANT EXECUTE ON sp_NewPlayer TO api_user
GRANT EXECUTE ON sp_NewLandmark TO api_user
GRANT EXECUTE ON sp_NewGame TO api_user
GRANT EXECUTE ON sp_AddLandmarkToGame TO api_user
GRANT EXECUTE ON sp_RemoveLandmarkFromGame TO api_user
GRANT EXECUTE ON sp_PlayerVisitedLocation TO api_user
GRANT EXECUTE ON sp_LogPlayerLocation TO api_user
GRANT EXECUTE ON sp_AddPlayerToGame TO api_user
GRANT EXECUTE ON sp_GetWinners TO api_user
GRANT EXECUTE ON sp_GetMyGames TO api_user
GRANT EXECUTE ON sp_GetLandmarks TO api_user