CREATE TABLE users (
    `id` INT unsigned AUTO_INCREMENT,
    `first_name` VARCHAR(20),
    `last_name` VARCHAR(20),
    `email` VARCHAR(32),
    `password` VARCHAR(32),
    `date_of_birth` DATE,
    PRIMARY KEY(`id`)
);

CREATE TABLE bank_accounts (
    `id` INT unsigned AUTO_INCREMENT,
    `account_name` VARCHAR(20),
    `balance` DECIMAL(10, 2),
    `account_owner_id` INT,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`account_owner_id`) REFERENCES `users`(`id`)
);

CREATE TABLE stock_portfolio (
    `id` INT unsigned AUTO_INCREMENT,
    `portfolio_name` VARCHAR(20),
    `portfolio_owner_id` INT,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`portfolio_owner_id`) REFERENCES `users`(`id`)
);

CREATE TABLE stock_holdings (
    `portfolio_id` INT,
    `company_name` VARCHAR(64),
    `company_ticker` VARCHAR(4),
    `quantity` INT unsigned CHECK(`quantity` > 0),
    `avg_purchase_price` DECIMAL(6, 2),
    FOREIGN KEY(`portfolio_id`) REFERENCES `stock_portfolio`(`id`)
);

CREATE TABLE bank_transactions (
    `id` INT unsigned AUTO_INCREMENT,
    `account_id` INT,
    `type` ENUM("Income", "Expense", "Deposit", "Withdrawl"),
    `category` ENUM("Housing", "Transportation", "Food", "Utilities", "Medical & Healthcare", "Personal", "Entertainment", "Other"),
    `transaction_date` DATE,
    `amount` DECIMAL(7, 2) CHECK(`amount` >= 0),
    FOREIGN KEY(`account_id`) REFERENCES `bank_accounts`(`id`)
);

CREATE TABLE stock_transactions (
    `id` INT unsigned AUTO_INCREMENT,
    `portfolio_id` INT,
    `company_ticker` VARCHAR(4),
    `type` ENUM("Buy", "Sell"),
    `purchase_date` DATE,
    `quantity` INT unsigned CHECK(`quantity` > 0),
    `price_per_share` DECIMAL(8, 2) CHECK(`price_per_share` > 0),
    `total_amount` DECIMAL(10, 2) CHECK(`amount` >= 0),
    FOREIGN KEY(`portfolio_id`) REFERENCES `stock_portfolio`(`id`)
);