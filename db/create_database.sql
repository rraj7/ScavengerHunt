DROP TABLE IF EXISTS dbo.Player_Landmark_Games
DROP TABLE IF EXISTS dbo.Games_Landmarks
DROP TABLE IF EXISTS dbo.Games_Players
DROP TABLE IF EXISTS dbo.LocationHistory
DROP TABLE IF EXISTS dbo.Landmarks
DROP TABLE IF EXISTS dbo.Games
DROP TABLE IF EXISTS dbo.Players

CREATE TABLE Players
(
    id         int IDENTITY (17,123) PRIMARY KEY,
    [name]     nvarchar(256) NOT NULL,
    email      nvarchar(256) NOT NULL,
    registered DATETIME2 DEFAULT GETDATE(),
    [admin]    bit       DEFAULT 0
)

CREATE TABLE Landmarks
(
    landmark_id   INT IDENTITY (1,1) PRIMARY KEY,
    [name]        nvarchar(256) NOT NULL,
    [description] nvarchar(MAX) NOT NULL,
    latitude      FLOAT(24),
    longitude     FLOAT(24)
)

CREATE TABLE Games
(
    game_id       INT IDENTITY (1058, 53) PRIMARY KEY,
    [name]        nvarchar(256),
    created_by    INT,
    created_on    DATETIME2(7) DEFAULT GETDATE(),
    active        bit          DEFAULT 0,
    range_epsilon FLOAT(24)

        CONSTRAINT FK_Players_Games
            FOREIGN KEY (created_by)
                REFERENCES Players (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
)

CREATE TABLE Games_Players
(
    game_id   INT,
    player_id INT,

    CONSTRAINT FK_GGames
        FOREIGN KEY (game_id)
            REFERENCES Games (game_id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,

    CONSTRAINT FK_GPlayers
        FOREIGN KEY (player_id)
            REFERENCES Players (id),

    CONSTRAINT U_G_P
        UNIQUE (game_id, player_id)
)

CREATE TABLE Games_Landmarks
(
    game_id     INT,
    landmark_id INT,

    CONSTRAINT FK_GLoc_Games
        FOREIGN KEY (game_id)
            REFERENCES Games (game_id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,

    CONSTRAINT FK_GLoc_Landmarks
        FOREIGN KEY (landmark_id)
            REFERENCES Landmarks (landmark_id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,

    CONSTRAINT G_L_U
        UNIQUE (game_id, landmark_id)
)

CREATE TABLE Player_Landmark_Games
(
    player_id   INT,
    game_id     INT,
    landmark_id INT,
    logged      DATETIME2(7) DEFAULT GETDATE()

        CONSTRAINT FK_PLG_Players
            FOREIGN KEY (player_id)
                REFERENCES Players (id),

    CONSTRAINT FK_PLG_Games
        FOREIGN KEY (game_id)
            REFERENCES Games (game_id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,

    CONSTRAINT FK_PLG_Landmarks
        FOREIGN KEY (landmark_id)
            REFERENCES Landmarks (landmark_id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,

    CONSTRAINT U_P_G_L
        UNIQUE (player_id, game_id, landmark_id)
)

CREATE TABLE LocationHistory
(
    player_id INT,
    latitude  FLOAT(24),
    longitude FLOAT(24),
    logged    DATETIME2(7) DEFAULT GETDATE()
        CONSTRAINT FK_Players_LocHistory
            FOREIGN KEY (player_id)
                REFERENCES Players (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
)