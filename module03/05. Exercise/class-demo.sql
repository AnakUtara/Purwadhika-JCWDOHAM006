-- Contoh Group BY & Having dengan Count & Sum Aggregate Function
select count(p.customer_id) payments_made, c.first_name, c.last_name 
from payment p join customer c on p.customer_id = c.customer_id 
group by p.customer_id, c.first_name, c.last_name 
having count(p.customer_id) >= 20 order by count(p.customer_id) desc;

select c.customer_id, c.first_name, c.last_name, sum(p.amount) total_payment 
from customer c join payment p on c.customer_id = p.customer_id
group by c.customer_id, c.first_name, c.last_name
having sum(p.amount) > 200;

-- Subquery
select film_id, title, rental_duration from film
where rental_duration > (select AVG(rental_duration) from film);
-- untuk debug hasil subquery
select AVG(rental_duration) from film;


-- Table orders & order_details untuk contoh transaction & foreign key constraint
create table orders (
	id SERIAL primary key,
	order_date timestamp,
	required_date timestamp,
	shipped_date timestamp,
	status text,
	comments text,
	customer_number integer
);

create table order_details (
	id SERIAL primary key,
	order_id integer,
	product_code text,
	quantity_ordered integer,
	price_each real,
	order_line_number integer,
	foreign key (order_id) references orders (id)
);

-- Transaction
begin;

insert into orders 
(order_date, required_date, shipped_date, status, comments, customer_number)
values (
	'2025-05-31',
	'2025-06-10',
	'2025-06-11',
	'In Process',
	'',
	145
);

insert into order_details (
	order_id,
	product_code ,
	quantity_ordered,
	price_each,
	order_line_number
) values 
(3, '518_1749', 30, 136, 1),
(3, '518_2248', 50, 55,	2);

rollback;

-- Create Index
create index idx_actor_first_name on actor (first_name);

select * from actor;