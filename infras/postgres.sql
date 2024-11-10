DROP TABLE IF EXISTS feedback CASCADE;
DROP TABLE IF EXISTS predefined_feedback CASCADE;
DROP TABLE IF EXISTS batch_state CASCADE;
DROP TABLE IF EXISTS package CASCADE;
DROP TABLE IF EXISTS batch CASCADE;
DROP TABLE IF EXISTS sector CASCADE;
DROP TABLE IF EXISTS sector_type CASCADE;
DROP TABLE IF EXISTS product CASCADE;


-- Table: sector_type
CREATE TABLE sector_type (
    id TEXT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Table: product
CREATE TABLE product (
    id TEXT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image TEXT
);

-- Table: sector
CREATE TABLE sector (
    id TEXT PRIMARY KEY,
    location VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    sector_type_id TEXT NOT NULL,
    FOREIGN KEY (sector_type_id) REFERENCES sector_type(id) ON DELETE CASCADE
);

-- Table: batch
CREATE TABLE batch (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

-- Table: batch_state
CREATE TABLE batch_state (
    id TEXT PRIMARY KEY,
    batch_id TEXT NOT NULL,
    sector_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (batch_id) REFERENCES batch(id) ON DELETE CASCADE,
    FOREIGN KEY (sector_id) REFERENCES sector(id) ON DELETE CASCADE
);

-- Table: package
CREATE TABLE package (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    sector_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (sector_id) REFERENCES sector(id) ON DELETE CASCADE
);

-- Table: predefined_feedback
CREATE TABLE predefined_feedback (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    sector_type_id TEXT NOT NULL,
    severity_level TEXT NOT NULL,
    image TEXT,
    description TEXT,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (sector_type_id) REFERENCES sector_type(id) ON DELETE CASCADE
);

-- Table: feedback
CREATE TABLE feedback (
    id TEXT PRIMARY KEY,
    predefined_feedback_id TEXT NOT NULL,
    batch_state_id TEXT,
    package_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (predefined_feedback_id) REFERENCES predefined_feedback(id) ON DELETE CASCADE,
    FOREIGN KEY (batch_state_id) REFERENCES batch_state(id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES package(id) ON DELETE CASCADE
);
