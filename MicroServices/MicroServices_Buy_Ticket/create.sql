create table "event" (
    event_id uuid,
    description text,
    capacity numeric,
    price numeric,
    location text
);

create table "ticket" (
    ticket_id uuid,
    event_id uuid,
    email text,
    status text,
    createdAt date
);

create table "transaction" (
    transaction_id uuid,
    ticket_id uuid,
    event_id uuid,
    price numeric,
    tid text,
    status text
);

-- insert into "event" (event_id, description, capacity, price, location) values ('40ea2efd-1f2f-4c41-a2e7-8dec5340f5fa', 'Tomorrowland Brasil', 100000, 1500.00, 'Parque Maeda - Itu')