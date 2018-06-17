CREATE DATABASE tree_node_view_db;

USE tree_node_view_db;

CREATE TABLE parents (
    parent_id int NOT NULL AUTO_INCREMENT,
    parent_name VARCHAR(255),
    children int,
    parent_lower_bound int,
    parent_upper_bound int,
    PRIMARY KEY (parent_id)
);

CREATE TABLE children (
    parent_id int NOT NULL,
    child_number int
);

INSERT INTO parents(parent_name, children, parent_lower_bound, parent_upper_bound)
VALUES("Root", 2, 0, 30);

INSERT INTO children(parent_id, child_number)
VALUES(1,15);

INSERT INTO children(parent_id, child_number)
VALUES(1,22);