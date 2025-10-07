CREATE TABLE users (

    user_id TEXT NOT NULL,
    first_nm TEXT NOT NULL,
    last_nm TEXT NOT NULL,
    email TEXT NOT NULL,
    passwd TEXT NOT NULL,
    usr_type TEXT NOT NULL,

    PRIMARY KEY (user_id)
);

CREATE OR REPLACE FUNCTION set_user_defaults()
RETURNS TRIGGER AS $$
BEGIN
    new.user_id := LEFT(new.first_nm,1)||new.last_nm||CEIL(RANDOM(1,1000))::TEXT;
    new.passwd := MD5(new.passwd);
    RETURN new;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_user_defaults
BEFORE INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION set_user_defaults();

INSERT INTO users(
    first_nm,
    last_nm,
    email,
    passwd,
    usr_type
) VALUES (
    'A',
    'A',
    'A@A.com',
    'A',
    'A'
)